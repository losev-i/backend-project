import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import mount from 'koa-mount';

import helloWorld from './api/helloWorld';
import login from './api/users/login';
import user from './api/users/user';

const app = new koa();
app
  .use(bodyparser())
  .use(mount('/', helloWorld))
  .use(mount('/login', login))
  .use(mount('/user', user));

export default app;
