import Router from 'koa-router';

import * as middleware from './user.middleware';

const router = new Router();
router.get('/', middleware.get);

export default router;
