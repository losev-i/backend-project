import koa from 'koa';
import mount from 'koa-mount';
import mongoose from 'mongoose';
import logger from 'koa-logger';

import routes from './routes';

mongoose.connect('mongodb://localhost/backendProject', {
  useNewUrlParser: true
});
mongoose.set('useCreateIndex', true);

export const app = new koa();

app.keys = ['secret-keys'];

app.use(mount('/', routes)).use(logger());

export default app;
