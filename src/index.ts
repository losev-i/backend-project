import koa from "koa";
import mount from "koa-mount";

import routes from "./routes";

import mongoose from "mongoose";
mongoose.connect("mongodb://localhost/backendProject", {
  useNewUrlParser: true
});
mongoose.set("useCreateIndex", true);

export const app = new koa();

app.use(mount("/", routes));

export default app;
