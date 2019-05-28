import { RootSchema } from '../graphQL/rootSchema.graphql';

const Router = require('koa-router');
const graphqlHTTP = require('koa-graphql');

export const router = new Router();

async function asyncRouter() {
	router.all(
		'/',
		graphqlHTTP({
			schema: await RootSchema(),
			graphiql: process.env.NODE_ENV !== 'production'
		})
	);
}

asyncRouter();

export default router;
