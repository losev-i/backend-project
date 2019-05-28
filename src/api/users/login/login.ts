import { ParameterizedContext } from 'koa';
import ls from 'passport-local';
import passport from 'koa-passport';
import { IUser, UserSchema } from '../user/user.model';

export async function get(ctx: ParameterizedContext, next: Function) {
	await next();
}

export async function post(ctx: ParameterizedContext, next: Function) {
	const LocalStrategy = ls.Strategy;

	passport.serializeUser((user: IUser, done) => {
		done(null, { username: user.userName });
	});

	passport.deserializeUser(async (user: IUser, done) => {
		return done(null, UserSchema.methods.getUser(user.userName));
	});

	const options = {
		userNameField: 'user[email]',
		passwordField: 'user[password]'
	};

	passport.use(
		new LocalStrategy(options, (userName, password, done) => {
			() => {
				try {
					const user = UserSchema.methods.getUser(userName);
					if (user.userName === userName && user.password === password) {
						return user;
					} else {
						return null;
					}
				} catch (e) {
					return null;
				}
			};
		})
	);

	await next();
}
