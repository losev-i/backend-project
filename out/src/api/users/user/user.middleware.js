"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("./user.model"));
async function get(ctx, next) {
    await next();
}
exports.get = get;
async function post(ctx, next) {
    const userName = ctx.request.body.userName;
    const password = ctx.request.body.password;
    const response = await user_model_1.default.find({ userName: userName });
    if (typeof response[0] === 'undefined') {
        ctx.status = 401;
        ctx.body = {
            errors: [{ title: 'username not found', status: 401 }]
        };
    }
    if (password !== response[0].password) {
        ctx.status = 401;
        ctx.body = {
            errors: [{ title: 'error on username or password', status: 401 }]
        };
    }
    ctx.redirect('/');
    await next();
}
exports.post = post;
//# sourceMappingURL=user.middleware.js.map