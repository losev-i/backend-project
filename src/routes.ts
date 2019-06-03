import koa from 'koa';
import mount from 'koa-mount';
import bodyparser from 'koa-bodyparser';

import graphiQL from './modules/users/graphiQL';

const app = new koa();
app.use(bodyparser()).use(mount('/', graphiQL));

export default app;
