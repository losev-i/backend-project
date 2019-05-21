import Router from 'koa-router';

import * as mw from './user.middleware';

const router = new Router();
router.get('/', mw.get);
router.post('/', mw.post);

export default router;
