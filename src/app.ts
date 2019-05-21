import koa from "koa";
import mount from "koa-mount";
const graphqlHTTP = require("koa-graphql");
// import routes from './routes';
// import { GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql';
import { RootSchema } from "./graphql";
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
      "/graphql",
      graphqlHTTP({
        schema: await RootSchema(),
        graphiql: process.env.NODE_ENV !== "production"
      })
    )
  );
>>>>>>> origin/LM-1202

	return app;
}
