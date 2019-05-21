"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @desc get request sets body to "Hello World"
 * @param ctx context on get request
 * @param next calling next middleware
 */
async function get(ctx, next) {
    ctx.body = 'Hello World!';
    await next();
}
exports.get = get;
//# sourceMappingURL=helloWorld.js.map