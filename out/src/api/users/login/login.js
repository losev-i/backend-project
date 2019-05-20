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
const passport_local_1 = __importDefault(require("passport-local"));
const koa_passport_1 = __importDefault(require("koa-passport"));
const user_model_1 = require("../user/user.model");
function get(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield next();
    });
}
exports.get = get;
function post(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const LocalStrategy = passport_local_1.default.Strategy;
        koa_passport_1.default.serializeUser((user, done) => {
            done(null, { username: user.userName });
        });
        koa_passport_1.default.deserializeUser((user, done) => __awaiter(this, void 0, void 0, function* () {
            return done(null, user_model_1.UserSchema.methods.getUser(user.userName));
        }));
        const options = {
            userNameField: 'user[email]',
            passwordField: 'user[password]'
        };
        koa_passport_1.default.use(new LocalStrategy(options, (userName, password, done) => {
            () => {
                try {
                    const user = user_model_1.UserSchema.methods.getUser(userName);
                    if (user.userName === userName && user.password === password) {
                        return user;
                    }
                    else {
                        return null;
                    }
                }
                catch (e) {
                    return null;
                }
            };
        }));
        yield next();
    });
}
exports.post = post;
