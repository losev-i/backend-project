import { ParameterizedContext } from "koa";

export async function get(ctx: ParameterizedContext, next: Function) {
  await next();
}
