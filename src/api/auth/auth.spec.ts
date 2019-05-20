import test from 'ava';
import path from 'path';
import proxyquire from 'proxyquire';
// import supertest from 'supertest';
import { spy } from 'sinon';
import { ParameterizedContext, Context } from 'koa';
import passport from './auth';

const pathMock = {
	join: (...args: any[]) => {
		return path.join(...args);
	}
};

const auth = proxyquire('./auth', {
	path: pathMock
});

const user = {
	userName: 'inna',
	passport: 'topsecret'
};

test('fn auth.login', async t => {
	const joinSpy = spy(pathMock, 'join');
	const pathHome = path.resolve(__dirname);

	await auth.login(() => Promise.resolve());

	t.truthy(joinSpy.calledWith(passport.initialize()));
});
