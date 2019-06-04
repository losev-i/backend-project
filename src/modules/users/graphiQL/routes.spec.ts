import { Server } from 'http';
import Koa from 'koa';
import test, { TestInterface } from 'ava';
import supertest, { SuperTest, Test } from 'supertest';
import getPort from 'get-port';

import router from './routes';

type TestContext = {
  app: Koa;
  port: Number;
  server: Server;
  request: SuperTest<Test>;
};

const _test = test as TestInterface<TestContext>;

_test.beforeEach(async t => {
  const app = new Koa();
  app.use(router.routes());

  const port = await getPort();
  const server = app.listen(port);
  const request = supertest(app.callback());

  t.context = {
    app,
    port,
    server,
    request
  };
});

_test.skip('GET: /', async t => {
  const request = t.context.request;
  const result = await request.get('/').expect(200);

  t.is(result.type, 'application/json');
});
