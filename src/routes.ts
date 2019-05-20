import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import mount from 'koa-mount';

import helloWorld from './api/helloWorld';
import user from './api/user';

const app = new koa();
app
  .use(bodyparser())
  .use(mount('/', helloWorld))
  .use(mount('/user', user));

export default app;
