import koa from 'koa';
import mount from 'koa-mount';
const graphqlHTTP = require('koa-graphql');
// import routes from './routes';
// import { GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql';
import { RootSchema } from './graphql';
// import { User } from './graphql/entity/User';

export const app = new koa();

app.use(
  mount(
    '/graphql',
    graphqlHTTP({
      schema: RootSchema(),
      graphiql: process.env.NODE_ENV !== 'production'
    })
  )
);

export default app;
