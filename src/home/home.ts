import { ParameterizedContext } from "koa";

export async function get(ctx: ParameterizedContext, next: Function) {
  ctx.body = "Welcome Home";
  await next();
}
