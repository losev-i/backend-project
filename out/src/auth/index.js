"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const routes_1 = __importDefault(require("./routes"));
//nicht neue app erstellen!
exports.app = new koa_1.default();
exports.app.use(routes_1.default.routes());
exports.router = routes_1.default;
exports.default = exports.app;
