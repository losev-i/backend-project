import { Context } from 'koa';

export async function get(ctx: Context, next: Function) {
  ctx.body = 'Hello World!';
  await next();
}
