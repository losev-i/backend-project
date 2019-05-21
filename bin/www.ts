<<<<<<< HEAD
import app from '../src/index';
import _ from 'lodash';

/**
 * @desc starts server on port 3000 if not otherwise specified
 * @param options optional port number
 */
async function start(options: { port?: number }) {
  options = _.defaults(options, { port: process.env.PORT || 3000 });
  await app.listen(options);
  console.log(`Server listening on port ${options.port}`);
}
=======
import app from "../src/index";
import _ from "lodash";
import { createConnection } from "typeorm";

async function start(options: { port?: number }) {
  await createConnection();

  options = _.defaults(options, { port: process.env.PORT || 3000 });
  const instance = await app();
  instance.listen(options, () => {
    console.log(`Server listening on http://localhost:${options.port}`);
  });
}

>>>>>>> origin/LM-1202
start({});
