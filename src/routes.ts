import koa from "koa";
import mount from "koa-mount";
import bodyparser from "koa-bodyparser";

import graphiQL from "./modules/users/graphiQL";
import { useContainer } from "class-validator";
import login from "./modules/users/login/login";

const app = new koa();
app.use(bodyparser()).use(mount("/", graphiQL));
//.use(mount("/login", (req, res) => {
//   res.header = login(req.name, req.password);
//}))

export default app;
