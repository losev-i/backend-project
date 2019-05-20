import { Context } from 'koa';

export async function get(ctx: Context, next: () => Promise<any>) {
  await next();
}

export async function post(ctx: Context, next: () => Promise<any>) {
  await next();
}
