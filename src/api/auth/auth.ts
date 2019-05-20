import passport from 'koa-passport';
import session from 'koa-session';
import bodyparser from 'koa-bodyparser';
import ls from 'passport-local';
import app from './index';
import { IUser, UserSchema } from '../users/user/user.model';
import { ParameterizedContext } from 'koa';

export async function get(ctx: ParameterizedContext, next: Function) {
	await next();
}
