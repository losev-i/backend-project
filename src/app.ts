import koa from 'koa';
import mount from 'koa-mount';
import passport from 'koa-passport';
import {
	graphql,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString
} from 'graphql';
import routes from './routes';

import mongoose from 'mongoose';
import logger from 'koa-logger';
import { IUser, UserSchema } from './api/users/user/user.model';

mongoose.connect('mongodb://localhost/backend-project', {
	useNewUrlParser: true
});
mongoose.set('useCreateIndex', true);

export const app = new koa();

app.keys = ['secret-keys'];

app
	.use(logger())
	.use(mount('/', routes))
	.use(passport.initialize())
	.use(passport.session());

export default app;
