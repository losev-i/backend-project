import koa from 'koa';
import mount from 'koa-mount';
import logger from 'koa-logger';
const graphqlHTTP = require('koa-graphql');
import { RootSchema } from './graphql';

export async function app() {
	const app = new koa();
	const schema = await RootSchema();

	app.use(logger()).use(
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
