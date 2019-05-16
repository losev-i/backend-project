import koa from 'koa';
import mount from 'koa-mount';
const graphqlHTTP = require('koa-graphql');
import routes from './routes';
import { GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql';
import { RootSchema } from './graphql';
// import { User } from './graphql/schemas/user/user.schema';

export async function app() {
  const app = new koa();
  const schema = await RootSchema();

  app.use(
    mount(
      '/graphql',
      graphqlHTTP({
        schema,
        graphiql: process.env.NODE_ENV !== 'production'
      })
    )
  );

  return app;
}
