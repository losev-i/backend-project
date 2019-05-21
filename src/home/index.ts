import koa from "koa";

import Router from "./routes";

export const app = new koa();
app.use(Router.routes());

export const router = Router;
export default app;
