import koa from 'koa';
import mount from 'koa-mount';
import {
	graphql,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString
} from 'graphql';
import routes from './routes';

import mongoose from 'mongoose';
import logger from 'koa-logger';
mongoose.connect('mongodb://localhost/backend-project', {
	useNewUrlParser: true
});
mongoose.set('useCreateIndex', true);

export const app = new koa();

app.use(logger());

app.use(mount('/', routes));

export default app;
