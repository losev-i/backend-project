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
const sinon_1 = require("sinon");
const proxyquire_1 = __importDefault(require("proxyquire"));
const bson_1 = require("bson");
const testUsers = [
    {
        userName: 'Test1',
        firstName: 'Test1',
        email: 'testMail@web.de',
        lastName: 'Person 1',
        password: 'aaaa'
    },
    {
        userName: 'Test2',
        firstName: 'Test2',
        email: 'testMail@web.de',
        lastName: 'Person2',
        password: 'aaaa'
    }
];
const UserModelMock = {
    find: function () {
        return __awaiter(this, void 0, void 0, function* () {
            return testUsers;
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
const mw = proxyquire_1.default('./user.middleware', {
    './user.model': UserModelImport
});
ava_1.default('fn user.get', (t) => __awaiter(this, void 0, void 0, function* () {
    const ctx = { body: null };
    const userFindSpy = sinon_1.spy(UserModelMock, 'find');
    const next = sinon_1.stub().returns(Promise.resolve());
    yield mw.get(ctx, next);
    t.truthy(userFindSpy.called);
    t.deepEqual(ctx.body, testUsers);
    t.truthy(next.calledOnce);
}));
ava_1.default('fn user.post', (t) => __awaiter(this, void 0, void 0, function* () {
    const newId = new bson_1.ObjectId();
    const ctx = {
        body: null,
        request: { body: testUsers[0] }
    };
    const userPostStub = sinon_1.stub(UserModelMock, 'create').returns(Promise.resolve(Object.assign({}, testUsers[0], { _id: newId })));
    const next = sinon_1.stub().returns(Promise.resolve());
    yield mw.post(ctx, next);
    t.truthy(userPostStub.calledWithExactly(testUsers[0]));
    t.deepEqual(ctx.body, Object.assign({}, testUsers[0], { _id: newId }));
    t.truthy(next.calledOnce);
}));
