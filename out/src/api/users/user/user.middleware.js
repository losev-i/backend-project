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
function get(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield user_model_1.default.find();
        ctx.body = users;
        yield next();
    });
}
exports.get = get;
function post(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.default.create(ctx.request.body);
        ctx.body = user;
        yield next();
    });
}
exports.post = post;
