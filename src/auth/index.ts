import koa from "koa";

import Router from "./routes";

//nicht neue app erstellen!
export const app = new koa();
app.use(Router.routes());

export const router = Router;
export default app;
