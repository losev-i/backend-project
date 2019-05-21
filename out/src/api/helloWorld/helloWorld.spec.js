"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const hello = __importStar(require("./helloWorld"));
ava_1.default('fn helloWorld.get', async (t) => {
    const ctxMock = { body: '' };
    await hello.get(ctxMock, () => Promise.resolve());
    t.is(ctxMock.body, 'Hello World!');
});
//# sourceMappingURL=helloWorld.spec.js.map