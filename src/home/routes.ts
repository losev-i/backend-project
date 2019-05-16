import Router from "koa-router";

import * as home from "./home";

export const router = new Router();

router.get("/", home.get);

export default router;
