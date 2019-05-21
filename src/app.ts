import koa from 'koa';
import mount from 'koa-mount';
const graphqlHTTP = require('koa-graphql');

import { RootSchema } from './graphql';

export async function app() {
  const app = new koa();

  app.use(
    mount(
      '/graphql',
      graphqlHTTP({
        schema: await RootSchema(),
        graphiql: process.env.NODE_ENV !== 'production'
      })
    )
  );

  return app;
}
