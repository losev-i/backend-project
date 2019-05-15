"use strict";
// Middleware die ueberpruefen soll ob eine gueltige und aktive session besteht
// export async function requireLogin(ctx, next) {
// isAuthenticated() from koa-passport
//     if (ctx.isAuthenticated()) {
//         await next();
//     } else {
//         ctx.status = 401;
//         ctx.body = {
//             errors: [{title: 'Login required', status: 401}]
//         }
//     }
// }
// Leite dann weiter zu der Methode create User
// app.use(route.post'/', create);
