import koa from "koa";
import mount from "koa-mount";

import routes from "./routes";

export const app = new koa();
export default app;
