import app from "../src/index";
import _ from "lodash";
import { createConnection } from "typeorm";
import login from "../src/modules/users/login/login";

async function start(options: { port?: number }) {
  await createConnection();
  await login("Leon", "geheim");
  options = _.defaults(options, { port: process.env.PORT || 3000 });
  await app.listen(options);
  console.log(`Server listening on http://localhost:${options.port}`);
}

start({});
