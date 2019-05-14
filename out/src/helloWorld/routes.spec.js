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
const koa_1 = __importDefault(require("koa"));
const ava_1 = __importDefault(require("ava"));
const supertest_1 = __importDefault(require("supertest"));
const get_port_1 = __importDefault(require("get-port"));
const routes_1 = __importDefault(require("./routes"));
const _test = ava_1.default;
_test.beforeEach((t) => __awaiter(this, void 0, void 0, function* () {
    const app = new koa_1.default();
    app.use(routes_1.default.routes());
    const port = yield get_port_1.default();
    const server = app.listen(port);
    const request = supertest_1.default(app.callback());
    t.context = {
        app,
        port,
        server,
        request
    };
}));
_test('GET: /', (t) => __awaiter(this, void 0, void 0, function* () {
    const request = t.context.request;
    const result = yield request.get('/').expect(200);
    t.is(result.type, 'text/plain');
}));
