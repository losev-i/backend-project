"use strict";
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
_test.beforeEach(async (t) => {
    const app = new koa_1.default();
    app.use(routes_1.default.routes());
    const port = await get_port_1.default();
    const server = app.listen(port);
    const request = supertest_1.default(app.callback());
    t.context = {
        app,
        port,
        server,
        request
    };
});
_test('GET: /', async (t) => {
    const request = t.context.request;
    const result = await request.get('/').expect(200);
    t.is(result.type, 'text/plain');
});
//# sourceMappingURL=routes.spec.js.map