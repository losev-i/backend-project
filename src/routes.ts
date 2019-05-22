import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import mount from 'koa-mount';

import auth from './auth';
import home from './home';
import login from './users/login';
import user from './users/user';

const app = new koa();

app
  .use(bodyparser())
  .use(mount('/', home))
  .use(mount('/auth', auth))
  .use(mount('/login', login))
  .use(mount('/user', user));

export default app;
