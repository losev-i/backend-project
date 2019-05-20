import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { RegisterResolver } from './modules/user/Register';
import { FindResolver } from './modules/user/find/Find';
import { LoginResolver } from './modules/user/login/Login';

export async function RootSchema() {
	// definiere resolvers zum schema
	return await buildSchema({
		resolvers: [RegisterResolver, FindResolver, LoginResolver]
	});
}
