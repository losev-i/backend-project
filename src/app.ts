import koa from 'koa';
import mount from 'koa-mount';
const graphqlHTTP = require('koa-graphql');
// import routes from './routes';
// import { GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql';
import { RootSchema } from './graphql';
import { GraphQLError } from 'graphql';
// import { User } from './graphql/entity/User';

export async function app() {
  const app = new koa();

  app.use(
    mount(
      '/graphql',
      graphqlHTTP({
        schema: await RootSchema(),
        graphiql: process.env.NODE_ENV !== 'production',
        formatError: (error: GraphQLError) => {
          return { ...error, validationError: error.originalError };
        }
      })
    )
  );

  return app;
}
