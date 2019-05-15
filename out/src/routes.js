"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_mount_1 = __importDefault(require("koa-mount"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const home_1 = __importDefault(require("./api/home"));
const users_1 = __importDefault(require("./api/users"));
const app = new koa_1.default();
app
    .use(koa_bodyparser_1.default())
    .use(koa_mount_1.default('/', home_1.default))
    .use(koa_mount_1.default('/user', users_1.default));
exports.default = app;
