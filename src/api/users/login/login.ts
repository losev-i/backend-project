import { ParameterizedContext } from 'koa';

export async function get(ctx: ParameterizedContext, next: Function) {
  ctx.body =
    '<form action="/user" method="POST">\
  <input name="userName" type="text" placeholder="username">\
  <input name="password" type="password" placeholder="password">\
  <button type="submit">Submit</button>\
</form>';
  await next();
}
