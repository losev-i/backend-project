import { Context } from 'koa';
import { uidSync } from 'uid-ts';
import { BaseStore, CONNECT, DISCONNECT, MemoryStore } from './stores';
import { crc32, parseurl as parse } from './utils';

/** Augmentation of koa */
declare module 'koa' {
    export interface Context {
        sessionId?: any;
        sessionStore: BaseStore;
        session: Session;
        sessionSave: boolean;
        regenerateSession: () => Session;
        // logger?: any;
    }
}

/** Session */
export interface Cookie {
    expires?: Date;
    maxAge?: number;
    httpOnly?: boolean;
    overwrite?: boolean;
    path?: string;
    secure?: boolean;
    signed: boolean;
}

export interface Session {
    cookie: Cookie;
}

const defaultCookie: Cookie = {
    httpOnly: true,
    maxAge: 86400000, // one day in ms
    overwrite: true,
    path: '/',
    secure: false,
    signed: false,
};

const AVAILABEL = 'AVAILABEL';
const PENDING = 'PENDING';
const UNAVAILABLE = 'UNAVAILABLE';

export interface SessionOptions {
    key?: string;
    store?: BaseStore;
    reconnectTimeout?: number;
    cookieOptions?: Cookie;
    defer?: boolean;
    rolling?: boolean;
    allowEmpty?: boolean;
    genSid?: (ctx: Context, length: number) => string;
    errorHandler?: (err: Error, type: string, ctx: Context) => void;
    valid?: (ctx: Context, session: Session) => boolean;
    beforeSave?: (ctx: Context, session: Session) => void;
}

function defaultErrorHanlder(err: Error, type: string, ctx: Context) {
    err.name = 'session middleware ' + type + ' error';
    throw err;
}

function defaultGenSid(ctx: Context, length: number) {
    return uidSync(length);
}

/**
 * get the hash of a session include cookie options.
 */
function hash(sess: Session) {
    return crc32.signed(JSON.stringify(sess));
}

/**
 * check url match cookie's path
 */
function matchPath(ctx: Context, cookiePath: string = '/') {
    const pathname = parse.parseurl(ctx).pathname;
    if (cookiePath === '/') {
        return true;
    }
    if (pathname.indexOf(cookiePath) !== 0) {
        // cookie path does not match
        return false;
    }
    return true;
}

function getSessionId(ctx: Context, key: string, cookieOptions: Cookie) {
    return ctx.cookies.get(key, cookieOptions);
}

function setSessionId(ctx: Context, key: string, sid: string, cookie: Cookie) {
    ctx.cookies.set(key, sid, cookie);
}

function resetSessionId(ctx: Context, key: string) {
    ctx.cookies.set(key, null);
}

function generateSession(cookieOptions: Cookie): Session {
    return { cookie: Object.assign({}, defaultCookie, cookieOptions) };
}

/**
 * setup session store with the given `options`
 *
 * @export
 * @param {SessionOptions} [options={}]
 *   - [`key`] cookie name, defaulting to `koa.sid`
 *   - [`store`] session store instance, default is a MemoryStore
 *   - [`reconnectTimeout`] store reconnectTimeout in `ms`, default is oneday
 *   - [`cookieOptions`] session cookie settings, default is { signed: true}
 *   - [`defer`] defer get session, you should `await this.session` to get the session if
 *      defer is true, default is false
 *   - [`rolling`]  rolling session, always reset the cookie and sessions, default is false
 *   - [`allowEmpty`] allow session empty, default is false
 *   - [`genSid`] you can use your own generator for sid
 *   - [`errorHandler`] handler for session store get or set error
 *   - [`valid`] valid(ctx, session), valid session value before use it
 *   - [`beforeSave`] beforeSave(ctx, session), hook before save session
 * @returns
 */
export default function sessionFactory(options: SessionOptions = {}) {
    const {
        key = 'koa.sid',
        store = new MemoryStore(key),
        reconnectTimeout = 10000,
        cookieOptions = {signed: true},
        defer = false,
        rolling = false,
        allowEmpty = false,
        genSid = defaultGenSid,
        errorHandler = defaultErrorHanlder,
        valid = () => true,
        beforeSave = () => undefined,
    } = options;

    let storeStatus = AVAILABEL;
    let waitStore = async () => Promise.resolve({});
    // reconnect when disconnect
    store.on(DISCONNECT, () => {
        if (storeStatus !== AVAILABEL) {
            return;
        }
        storeStatus = PENDING;
        waitStore = async () => new Promise((resolve, reject) => {
            setTimeout(() => {
                // console.log("Timeout!!!!!!");
                storeStatus = UNAVAILABLE;
                reject(new Error('timeout:session store is unavailable'));
            }, reconnectTimeout);
            store.once(CONNECT, resolve);
        });
    });

    store.on(CONNECT, () => {
        storeStatus = AVAILABEL;
        waitStore = async () => Promise.resolve({});
    });

    // save empty session hash for compare
    const EMPTY_SESSION_HASH = hash(generateSession(cookieOptions));
    return defer ? deferSession : session;

    /**
     *   get session from store
     *   get sessionId from cookie
     *   save sessionId into context
     *   get session from store
     */
    async function getSession(ctx: Context) {
        if (!matchPath(ctx, cookieOptions.path)) {
            return;
        }
        if (storeStatus === PENDING) {
            // store is disconnect and pending;
            await waitStore();
        } else if (storeStatus === UNAVAILABLE) {
            // store is unavailable
            throw new Error('session store is unavailable');
        }

        if (!ctx.sessionId) {
            ctx.sessionId = getSessionId(ctx, key, cookieOptions);
        }

        const logger = ctx.logger || console;
        let session: Session;
        let isNew = false;
        if (!ctx.sessionId) {
            // session id not exist, generate a new one
            session = generateSession(cookieOptions);
            ctx.sessionId = genSid(ctx, 24);
            // now the ctx.cookies.get(key) is null
            isNew = true;
        } else {
            try {
                session = await store.get(ctx.sessionId);
            } catch (err) {
                if (err.code === 'ENOENT') {
                    logger.error('get session error, code = ENOENT');
                } else {
                    logger.error('get session error: ', err.message);
                    errorHandler(err, 'get', ctx);
                }
            }
        }

        // make sure the session is still valid
        if (!session || !valid(ctx, session)) {
            // session is empty or invalid
            session = generateSession(cookieOptions);
            ctx.sessionId = genSid(ctx, 24);
            // now the ctx.cookies.get(key) is null
            resetSessionId(ctx, key);
            isNew = true;
        }

        // get the originHash
        const originalHash = !isNew && hash(session);

        return {
            originalHash,
            session,
            isNew,
        };
    }

    /**
     * after everything done, refresh the session
     *   if session === null; delete it from store
     *   if session is modified, update cookie and store
     */
    async function refreshSession(ctx: Context, session: Session, originalHash, isNew: boolean) {
        const logger = ctx.logger || console;

        // reject any session changes, and do not update session expiry
        if (ctx.sessionSave === false) {
            logger.warn('session save disabled');
            return;
        }

        // delete session
        if (!session) {
            if (!isNew) {
                logger.warn('session set to null, destroy session: %s', ctx.sessionId);
                resetSessionId(ctx, key);
                return await store.destroy(ctx.sessionId);
            }
            logger.warn('a new session and set to null, ignore destroy');
            return;
        }

        // force saving non-empty session
        if (ctx.sessionSave === true) {
            logger.warn('session save forced');
            return await saveNow(ctx, ctx.sessionId, session);
        }

        const newHash = hash(session);
        // if new session and not modified, just ignore
        if (!allowEmpty && isNew && newHash === EMPTY_SESSION_HASH) {
            // new session and do not modified
            return;
        }

        // rolling session will always reset cookie and session
        if (!rolling && newHash === originalHash) {
            // session not modified
            return;
        }

        // session modified
        await saveNow(ctx, ctx.sessionId, session);

    }

    async function saveNow(ctx: Context, sid: string, session: Session) {
        const logger = ctx.logger || console;

        // custom before save hook
        beforeSave(ctx, session);

        // update session
        try {
            await store.set(sid, session);
            setSessionId(ctx, key, sid, session.cookie);
            // saved
        } catch (err) {
            logger.warn('set session error: ', err.message);
            errorHandler(err, 'set', ctx);
        }
    }

    /**
     * common session middleware
     * each request will generate a new session
     *
     * ```
     * let session = this.session;
     * ```
     */
    async function session(ctx: Context, next: () => Promise<any>) {
        // ctx.sessionStore = store;
        // Object.defineProperty(ctx, "sessionStore", {
        //     enumerable: true,
        //     value: store,
        //     writable: false,
        // });
        if (ctx.hasOwnProperty('session')) {
            return await next();
        }
        const logger = ctx.logger || console;
        const result = await getSession(ctx);
        if (!result) {
            return await next();
        }
        // define API's
        Object.defineProperties(ctx, {
            session: {
                enumerable: true,
                value: result.session,
                writable: true,
            },
            sessionStore: {
                enumerable: true,
                value: store,
                writable: false,
            },
            sessionSave: {
                enumerable: true,
                value: null,
                writable: true,
            },
            regenerateSession: {
                enumerable: true,
                async value() {
                    // regenerating session
                    if (!result.isNew) {
                        // destroy the old session
                        await store.destroy(this.sessionId);
                    }

                    this.session = generateSession(cookieOptions);
                    this.sessionId = genSid(this, 24);
                    resetSessionId(this, key);
                    result.isNew = true;
                    return this.session;
                },
                writable: false,
            },
        });

        // make sure `refreshSession` always called
        let firstError = null;
        try {
            await next();
        } catch (err) {
            logger.error('next logic error: %s', err.message);
            firstError = err;
        }
        // can't use finally because `refreshSession` is async
        try {
            await refreshSession(ctx, ctx.session, result.originalHash, result.isNew);
        } catch (err) {
            logger.error('refresh session error: %s', err.message);
            if (firstError) {
                ctx.app.emit('error', err, ctx);
            }
            firstError = firstError || err;
        }
        if (firstError) {
            throw firstError;
        }
    }

    /**
     * defer session middleware
     * only generate and get session when request use session
     *
     * ```
     * let session = await this.session;
     * ```
     */
    async function deferSession(ctx: Context, next) {
        // Object.defineProperty(ctx, "sessionStore", {
        //     enumerable: true,
        //     value: store,
        //     writable: false,
        //     configurable: true,
        // });
        if (ctx.hasOwnProperty('session')) {
            return await next();
        }
        // const logger = ctx.logger || console;
        let isNew: boolean = false;
        let originalHash = null;
        let touchSession: boolean = false;
        let getter: boolean = false;

        // if path not match
        if (!matchPath(ctx, cookieOptions.path)) {
            return await next();
        }

        Object.defineProperties(ctx, {
            _session: {
                enumerable: false,
                value: null,
                writable: true,
            },
            session: {
                async get() {
                    if (touchSession) {
                        return this._session;
                    }
                    touchSession = true;
                    getter = true;

                    const result = await getSession(this);
                    // if cookie path not match
                    // this route's controller should never use session
                    if (!result) {
                        return;
                    }

                    originalHash = result.originalHash;
                    isNew = result.isNew;
                    this._session = result.session;
                    return this._session;
                },
                set(val) {
                    touchSession = true;
                    this._session = val;
                },
            },
            sessionSave: {
                enumerable: true,
                value: null,
                writable: true,
            },
            sessionStore: {
                enumerable: true,
                value: store,
                writable: false,
            },
            regenerateSession: {
                enumerable: true,
                async value() {
                    // make sure that the session has been loaded
                    await this.session;
                    // regenerating session
                    if (!isNew) {
                        // destroy the old session
                        await store.destroy(this.sessionId);
                    }

                    this.session = generateSession(cookieOptions);
                    this.sessionId = genSid(this, 24);
                    resetSessionId(this, key);
                    isNew = true;
                    return await this.session;
                },
                writable: false,
            },
        });
        await next();
        if (touchSession) {
            // if only this.session=, need try to decode and get the sessionID
            if (!getter) {
                ctx.sessionId = getSessionId(ctx, key, cookieOptions);
            }
            await refreshSession(ctx, await ctx.session, originalHash, isNew);
        }
    }
}

export { BaseStore, MemoryStore, CONNECT, DISCONNECT } from './stores';
