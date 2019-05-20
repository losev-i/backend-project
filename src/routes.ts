import koa from 'koa';
import bodyparser from 'koa-bodyparser';

const app = new koa();
app.use(bodyparser());
export default app;
