import koa from 'koa';
import mount from 'koa-mount';

import routes from './routes';

export const app = new koa();

app.use(mount('/', routes));

export default app;
