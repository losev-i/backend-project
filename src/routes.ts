import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import mount from 'koa-mount';

import helloWorld from './helloWorld';

const app = new koa();
app.use(bodyparser()).use(mount('/', helloWorld));

export default app;
