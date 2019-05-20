import { Session } from '../index';
import { BaseStore } from './base';

/**
 * Warning message for `MemoryStore` usage in production.
 */
const warning = `Warning: koa-generic-session\'s MemoryStore is not
    designed for a production environment, as it will leak
    memory, and will not scale past a single process.`;
export class MemoryStore extends BaseStore {

    private sessions: { [sid: string]: Session };
    private timeouts: { [sid: string]: NodeJS.Timer };

    constructor(prefix: string = null) {
        super(prefix);

        // notify user that this store is not
        // meant for a production environment
        if ('production' === process.env.NODE_ENV) {
            console.warn(warning);
        }

        this.sessions = {};
        this.timeouts = {};
    }

    public async set(sid: string, val: Session, ttl?: number): Promise<void> {
        sid = this.prefix + sid;
        ttl = await super.set(sid, val, ttl);

        this.sessions[sid] = val;
        if (sid in this.timeouts) {
            clearTimeout(this.timeouts[sid]);
        }

        this.timeouts[sid] = setTimeout(() => {
            delete this.sessions[sid];
            delete this.timeouts[sid];
        }, ttl);
    }

    public async get(sid: string): Promise<Session> {
        sid = this.prefix + sid;
        return this.sessions[sid] && Object.assign({}, this.sessions[sid]);
    }

    public async destroy(sid: string): Promise<void> {
        sid = this.prefix + sid;
        if (sid in this.timeouts) {
            delete this.sessions[sid];

            clearTimeout(this.timeouts[sid]);
            delete this.timeouts[sid];
        }
    }
}
