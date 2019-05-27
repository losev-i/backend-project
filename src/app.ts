import koa from 'koa';
import mount from 'koa-mount';
<<<<<<< HEAD

import { RootSchema } from './graphql';

const graphqlHTTP = require('koa-graphql');
// import routes from './routes';
// import { GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql';
=======
const graphqlHTTP = require('koa-graphql');
// import routes from './routes';
// import { GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql';
import { RootSchema } from './graphql';
import { GraphQLError } from 'graphql';
>>>>>>> origin/JS-5796
// import { User } from './graphql/entity/User';

export async function app() {
	const app = new koa();

<<<<<<< HEAD
	app.use(
		mount(
			'/graphql',
			graphqlHTTP({
				schema: await RootSchema(),
				graphiql: process.env.NODE_ENV !== 'production'
			})
		)
	);
=======
  app.use(
    mount(
      '/graphql',
      graphqlHTTP({
        schema: await RootSchema(),
        graphiql: process.env.NODE_ENV !== 'production',
        formatError: (error: GraphQLError) => {
          return { ...error, ServerError: error.originalError };
        }
      })
    )
  );
>>>>>>> origin/JS-5796

	return app;
}
