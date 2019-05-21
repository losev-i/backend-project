import { ParameterizedContext } from 'koa';

/**
 * @desc get request sets body to "Hello World"
 * @param ctx context on get request
 * @param next calling next middleware
 */
export async function get(ctx: ParameterizedContext, next: Function) {
  ctx.body = 'Hello World!';
  await next();
}
