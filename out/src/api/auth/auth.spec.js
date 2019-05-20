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
const ava_1 = __importDefault(require("ava"));
const path_1 = __importDefault(require("path"));
const proxyquire_1 = __importDefault(require("proxyquire"));
// import supertest from 'supertest';
const sinon_1 = require("sinon");
const auth_1 = __importDefault(require("./auth"));
const pathMock = {
    join: (...args) => {
        return path_1.default.join(...args);
    }
};
const auth = proxyquire_1.default('./auth', {
    path: pathMock
});
const user = {
    userName: 'inna',
    passport: 'topsecret'
};
ava_1.default('fn auth.login', (t) => __awaiter(this, void 0, void 0, function* () {
    const joinSpy = sinon_1.spy(pathMock, 'join');
    const pathHome = path_1.default.resolve(__dirname);
    yield auth.login(() => Promise.resolve());
    t.truthy(joinSpy.calledWith(auth_1.default.initialize()));
}));
