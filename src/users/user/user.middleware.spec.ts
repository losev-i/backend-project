import test from "ava";
import { stub, spy } from "sinon";
import proxyquire from "proxyquire";

import { ObjectId } from "bson";
import { IUser } from "./user.model";

const testUsers = [
  {
    userName: "Test1",
    firstName: "Test1",
    email: "testMail@web.de",
    lastName: "Person 1",
    password: "aaaa"
  },
  {
    userName: "Test2",
    firstName: "Test2",
    email: "testMail@web.de",
    lastName: "Person2",
    password: "aaaa"
  }
];

const UserModelMock = {
  find: async function() {
    return testUsers;
  },
  create: async function(user: IUser) {
    return { ...user, _id: new ObjectId() };
  }
};

const UserModelImport = {
  default: UserModelMock,
  UserModel: UserModelMock
};

const mw = proxyquire("./user.middleware", {
  "./user.model": UserModelImport
});

test("fn user.get", async t => {
  const ctx: { body: any } = { body: null };
  const userFindSpy = spy(UserModelMock, "find");
  const next = stub().returns(Promise.resolve());

  await mw.get(ctx, next);

  t.truthy(userFindSpy.called);
  t.deepEqual(ctx.body, testUsers);
  t.truthy(next.calledOnce);
});

test("fn user.post", async t => {
  const newId = new ObjectId();
  const ctx: { body: any; request: { body: any } } = {
    body: null,
    request: { body: testUsers[0] }
  };

  const userPostStub = stub(UserModelMock, "create").returns(
    Promise.resolve({ ...testUsers[0], _id: newId })
  );

  const next = stub().returns(Promise.resolve());

  await mw.post(ctx, next);

  t.truthy(userPostStub.calledWithExactly(testUsers[0]));
  t.deepEqual(ctx.body, { ...testUsers[0], _id: newId });
  t.truthy(next.calledOnce);
});
