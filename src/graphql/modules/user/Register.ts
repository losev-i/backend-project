import 'reflect-metadata';
import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import * as bcrypt from 'bcryptjs';

import { User } from '../../entities/User';
import { RegisterInput } from './register/RegisterInput';

@Resolver()
export class RegisterResolver {
	// Jede Resolver-Klasse braucht mindestens eine Query, sonst gibt es einen Generate Schema Error
	@Query(() => User, { nullable: true })
	hello(): string {
		return 'Hello World!';
	}

	@Mutation(() => User)
	async register(@Arg('data')
	{
		firstName,
		lastName,
		email,
		password,
		role
	}: RegisterInput): Promise<User> {
		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await User.create({
			firstName,
			lastName,
			email,
			role,
			password: hashedPassword
		}).save();

		return user;
	}
}
