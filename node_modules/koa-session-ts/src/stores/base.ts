import { EventEmitter } from 'events';
import { Session } from '../index';

export const CONNECT: string = 'CONNECT';
export const DISCONNECT: string = 'DISCONNECT';
export abstract class BaseStore extends EventEmitter {

    // protected prefix: string;

    constructor(protected prefix: string = 'koa:sess') {
        super();
        // this.prefix = prefix;
        // delegate client connect / disconnect event
        // if (typeof store.on === "function") {
        //     this.store.on(EVENT_TYPE_DISCONNECT, this.emit.bind(this, EVENT_TYPE_DISCONNECT));
        //     this.store.on(EVENT_TYPE_CONNECT, this.emit.bind(this, EVENT_TYPE_CONNECT));
        // }
    }

    public abstract async get(sid: string): Promise<Session>;

    public async set(sid: string, sess: Session, ttl?: number): Promise<any> {
        if (!ttl) {
            const maxage = (sess.cookie && sess.cookie.maxAge) || 86400000;
            ttl = maxage;
            // if has cookie.expires, ignore cookie.maxage
            if (sess.cookie && sess.cookie.expires) {
                ttl = Math.ceil(sess.cookie.expires.getTime() - Date.now());
            }
        }
        return ttl;
    }

    public abstract async destroy(sid: string): Promise<void>;
}
