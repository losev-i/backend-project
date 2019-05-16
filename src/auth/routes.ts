import Router from "koa-router";

import * as auth from "./auth";

const router = new Router();

router.get("/", auth.get);

export default router;
