import Router from "koa-router";

import * as login from "./login";

export const router = new Router();

router.get("/", login.get);

export default router;
