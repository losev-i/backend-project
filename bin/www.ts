import app from '../src/index';
import _ from 'lodash';
import { createConnection } from 'typeorm';

async function start(options: { port?: number }) {
  await createConnection();

  options = _.defaults(options, { port: process.env.PORT || 3000 });
  await app.listen(options, () => {
    console.log(`Server listening on http://localhost:${options.port}`);
  });
}

start({});
