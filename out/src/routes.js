"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_mount_1 = __importDefault(require("koa-mount"));
const auth_1 = __importDefault(require("./auth"));
const home_1 = __importDefault(require("./home"));
const login_1 = __importDefault(require("./users/login"));
const user_1 = __importDefault(require("./users/user"));
// import helloWorld from "./helloWorld";
const app = new koa_1.default();
// app.use(bodyparser()).use(mount("/", helloWorld));
app
    .use(koa_bodyparser_1.default())
    .use(koa_mount_1.default("/", home_1.default))
    .use(koa_mount_1.default("/auth", auth_1.default))
    .use(koa_mount_1.default("/login", login_1.default))
    .use(koa_mount_1.default("/user", user_1.default));
exports.default = app;
