import koa from 'koa';
import mount from 'koa-mount';
import bodyparser from 'koa-bodyparser';

import auth from './api/auth';
import home from './api/home';
import login from './api/users/login';
import user from './api/users/user';

const app = new koa();
app.use(bodyparser());
export default app;
