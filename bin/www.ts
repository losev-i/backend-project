import app from '../src/index';
import _ from 'lodash';

async function start(options: { port?: number }) {
  options = _.defaults(options, { port: process.env.PORT || 3000 });
  await app.listen(options);
  console.log(`Server listening on port ${options.port}`);
}
start({});
