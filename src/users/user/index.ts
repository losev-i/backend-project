import Koa from "koa";

import Router from "./routes";

export const app = new Koa();
app.use(Router.routes());

export const router = Router;
export default app;
