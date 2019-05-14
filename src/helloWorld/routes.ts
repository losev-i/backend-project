import Router from "koa-router";

import * as helloWorld from "./helloWorld";

export const router = new Router();

router.get("/", helloWorld.get);

export default router;
