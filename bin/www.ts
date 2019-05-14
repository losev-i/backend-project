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
start({});
