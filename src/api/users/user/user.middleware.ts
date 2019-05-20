import { ParameterizedContext } from 'koa';
import UserModel, { IUser } from './user.model';

export async function get(ctx: ParameterizedContext, next: () => Promise<any>) {
  await next();
}

export async function post(
  ctx: ParameterizedContext,
  next: () => Promise<any>
) {
  const userName = ctx.request.body.userName;
  const password = ctx.request.body.password;

  const response = await UserModel.find({ userName: userName });

  if (typeof response[0] === 'undefined') {
    ctx.status = 401;
    ctx.body = {
      errors: [{ title: 'username not found', status: 401 }]
    };
  }
  if (password !== response[0].password) {
    ctx.status = 401;
    ctx.body = {
      errors: [{ title: 'error on username or password', status: 401 }]
    };
  }

  ctx.redirect('/');
  await next();
}
