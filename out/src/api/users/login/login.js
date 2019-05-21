"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function get(ctx, next) {
    ctx.body =
        '<form action="/user" method="POST">\
  <input name="userName" type="text" placeholder="username">\
  <input name="password" type="password" placeholder="password">\
  <button type="submit">Submit</button>\
</form>';
    await next();
}
exports.get = get;
//# sourceMappingURL=login.js.map