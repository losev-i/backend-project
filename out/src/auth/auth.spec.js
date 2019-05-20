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
const sinon_1 = require("sinon");
const bson_1 = require("bson");
const pathMock = {
    join: (...args) => {
        return path_1.default.join(...args);
    }
};
const auth = proxyquire_1.default("./auth", {
    path: pathMock
});
const users = [
    {
        userName: "inna",
        firstName: "Inna",
        email: "il@web.de",
        lastName: "Losev",
        password: "aaaa"
    },
    {
        userName: "lena",
        firstName: "Lena",
        email: "lm@web.de",
        lastName: "Mund",
        password: "bbbb"
    }
];
const UserModelMock = {
    find: function () {
        return __awaiter(this, void 0, void 0, function* () {
            return users;
        });
    },
    create: function (user) {
        return __awaiter(this, void 0, void 0, function* () {
            return Object.assign({}, user, { _id: new bson_1.ObjectId() });
        });
    }
};
const UserModelImport = {
    default: UserModelMock,
    UserModel: UserModelMock
};
ava_1.default("fn auth.login", (t) => __awaiter(this, void 0, void 0, function* () {
    const newId = new bson_1.ObjectId();
    const ctx = {
        body: null,
        request: { body: users[0] }
    };
    const userPostStub = sinon_1.stub(UserModelMock, "create").returns(Promise.resolve(Object.assign({}, users[0], { _id: newId })));
    const next = sinon_1.stub().returns(Promise.resolve());
    yield auth.login();
    t.truthy(userPostStub.calledWithExactly(users[0]));
    t.deepEqual(ctx.body, Object.assign({}, users[0], { _id: newId }));
    t.truthy(next.calledOnce);
}));
