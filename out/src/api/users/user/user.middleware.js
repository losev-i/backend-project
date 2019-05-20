"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("./user.model"));
const koa_passport_1 = __importDefault(require("koa-passport"));
function get(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield next();
    });
}
exports.get = get;
function post(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userName = ctx.request.body.userName;
        const password = ctx.request.body.password;
        const response = yield user_model_1.default.find({ userName: userName });
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
        koa_passport_1.default.serializeUser((user, done) => {
            done(null, { username: user.userName });
        });
        console.log(koa_passport_1.default.session());
        console.log(ctx.session);
        ctx.redirect('/');
        yield next();
    });
}
exports.post = post;
//# sourceMappingURL=user.middleware.js.map