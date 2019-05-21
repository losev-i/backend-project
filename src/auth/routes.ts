import Router from "koa-router";

import * as auth from "./auth";

const router = new Router();

router.get("/", auth.get);
router.get("/login", auth.login);

export default router;
