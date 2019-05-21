"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_mount_1 = __importDefault(require("koa-mount"));
const helloWorld_1 = __importDefault(require("./api/helloWorld"));
const login_1 = __importDefault(require("./api/users/login"));
const user_1 = __importDefault(require("./api/users/user"));
const app = new koa_1.default();
app
    .use(koa_bodyparser_1.default())
    .use(koa_mount_1.default('/', helloWorld_1.default))
    .use(koa_mount_1.default('/login', login_1.default))
    .use(koa_mount_1.default('/user', user_1.default));
exports.default = app;
//# sourceMappingURL=routes.js.map