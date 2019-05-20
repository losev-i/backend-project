import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { RegisterResolver } from './modules/user/register/Register';
import { FindResolver } from './modules/user/find/Find';
import { LoginResolver } from './modules/user/login/Login';

export async function RootSchema() {
	return await buildSchema({
		resolvers: [RegisterResolver, FindResolver, LoginResolver]
	});
}
