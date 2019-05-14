import { Context } from 'koa';
import UserModel from './user.model';

export async function get(ctx: Context, next: () => Promise<any>) {
  await next();
}

export async function post(ctx: Context, next: () => Promise<any>) {
  await next();
}
