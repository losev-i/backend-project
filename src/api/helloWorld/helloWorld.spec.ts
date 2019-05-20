import test from 'ava';
import { Context } from 'koa';
import * as hello from './helloWorld';

test('fn helloWorld.get', async t => {
  const ctxMock = { body: '' };

  await hello.get(ctxMock as Context, () => Promise.resolve());

  t.is(ctxMock.body, 'Hello World!');
});
