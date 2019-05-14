import test from 'ava';
import Context from 'koa';
import proxyquire from 'proxyquire';
import { spy } from 'sinon';

const pathMock = {
  join: (...args: any[]) => {}
};
