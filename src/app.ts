import koa from 'koa';
import mount from 'koa-mount';
import mongoClient from 'mongodb';
import {
	graphql,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString
} from 'graphql';
import routes from './routes';

export const app = new koa();

const url = 'backend-project';

mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
	if (err) {
		throw err;
	}

	const database = client.db('backend-project');
	const collection = database.collection('users');
});

app.use(mount('/', routes));

export default app;
