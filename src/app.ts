import koa from 'koa';
import mount from 'koa-mount';
import logger from 'koa-logger';

import routes from './routes';

export const app = new koa();
app.use(logger());
app.use(mount('/', routes));

export default app;
