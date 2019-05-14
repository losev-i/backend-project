import koa from 'koa';
import mount from 'koa-mount';
import bodyparser from 'koa-bodyparser';

const app = new koa();
app.use(bodyparser());

export default app;
