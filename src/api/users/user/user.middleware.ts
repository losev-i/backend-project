import { ParameterizedContext } from 'koa';
import UserModel from './user.model';

export async function get(ctx: ParameterizedContext, next: () => Promise<any>) {
	const users = await UserModel.find();
	ctx.body = users;
	await next();
}

export async function post(
	ctx: ParameterizedContext,
	next: () => Promise<any>
) {
	const user = await UserModel.create(ctx.request.body);
	ctx.body = user;
	await next();
}
