import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import mount from 'koa-mount';

import helloWorld from './api/helloWorld';
import login from './api/users/login';
import user from './api/users/user';
import auth from './api/authentication';
import passport from './api/authentication/auth';

const app = new koa();
app
  .use(bodyparser())
  // .use(
  //   mount('/', function(ctx) {
  //     return passport.authenticate('local', function(err, user, info, status) {
  //       if (user === false) {
  //         ctx.body = { success: false };
  //         ctx.throw(401);
  //       } else {
  //         ctx.body = { success: true };
  //         return ctx.login(user);
  //       }
  //     });
  //   })
  // )
  .use(mount('/', helloWorld))
  .use(mount('/login', login))
  .use(mount('/user', user))
  .use(mount('/auth', auth));

export default app;
