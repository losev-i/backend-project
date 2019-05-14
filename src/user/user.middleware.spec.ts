import test from 'ava';
import { stub, spy } from 'sinon';
import proxyquire from 'proxyquire';

import { IUser } from './user.model';
import { ObjectID } from 'bson';

// an Array filled with User objects for testing purposes
const testUsers = [
    {
        firstName: 'Testy',
        lastName: 'Test',
        password: 'geheim',
        email: 'mail@provider.tld'
    },
    {
        firstName: 'Testy2',
        lastName: 'Test2',
        password: 'geheim',
        email: 'mail2@provider.tld'
    }
];

const UserModelMock = {
    find: async function () {
        return testUsers;
    },
    create: async function (user: IUser) {
        return { ...user, _id: new ObjectID() };
    }
};

const UserModelImport = {
    default: UserModelMock,
    UserModel: UserModelMock
};

// Overriding via proxyquire
const middleware = proxyquire('./user.middleware', {
    './user.model': UserModelImport
});

// Test for the get method of class user
test('fn user.get', async t => {
    const ctx: { body: any } = { body: null };
    const userFindSpy = spy(UserModelMock, 'find');
    const next = stub().returns(Promise.resolve());

    await middleware.get(ctx, next);

    t.truthy(userFindSpy.called);
    t.deepEqual(ctx.body, testUsers);
    t.truthy(next.calledOnce);
});

// Test for the post method of class user
test('fn user.post', async t => {
    const newID = new ObjectID();
    const ctx: { body: any; request: { body: any } } = {
        body: null,
        request: { body: testUsers[0] }
    };

    const userPostStub = stub(UserModelMock, 'create').returns(
        Promise.resolve({ ...testUsers[0], _id: newID })
    );

    const next = stub().returns(Promise.resolve());

    await middleware.post(ctx, next);

    t.truthy(userPostStub.calledWithExactly(testUsers[0]));
    t.deepEqual(ctx.body, { ...testUsers[0], _id: newID });
    t.truthy(next.calledOnce);
});

