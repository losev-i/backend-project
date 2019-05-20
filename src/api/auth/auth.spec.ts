import test from 'ava';
import path from 'path';
import proxyquire from 'proxyquire';
import supertest from 'supertest';
import { spy, stub } from 'sinon';
import { ParameterizedContext, Context } from 'koa';
import { IUser } from '../users/user/user.model';
import { ObjectId } from 'bson';

const pathMock = {
	join: (...args: any[]) => {
		return path.join(...args);
	}
};

const auth = proxyquire('./auth', {
	path: pathMock
});

const users = [
	{
		userName: 'inna',
		firstName: 'Inna',
		email: 'il@web.de',
		lastName: 'Losev',
		password: 'aaaa'
	},
	{
		userName: 'lena',
		firstName: 'Lena',
		email: 'lm@web.de',
		lastName: 'Mund',
		password: 'bbbb'
	}
];

const UserModelMock = {
	find: async function() {
		return users;
	},
	create: async function(user: IUser) {
		return { ...user, _id: new ObjectId() };
	}
};

const UserModelImport = {
	default: UserModelMock,
	UserModel: UserModelMock
};

test('fn auth.login', async t => {
	const newId = new ObjectId();
	const ctx: { body: any; request: { body: any } } = {
		body: null,
		request: { body: users[0] }
	};

	const userPostStub = stub(UserModelMock, 'create').returns(
		Promise.resolve({ ...users[0], _id: newId })
	);

	const next = stub().returns(Promise.resolve());

	await auth.login();

	t.truthy(userPostStub.calledWithExactly(users[0]));
	t.deepEqual(ctx.body, { ...users[0], _id: newId });
	t.truthy(next.calledOnce);
});
