import 'reflect-metadata';

import { buildSchema } from 'type-graphql';

import UserResolver from './user.resolver';

export async function RootSchema() {
	return await buildSchema({
		resolvers: [UserResolver]
	});
}
