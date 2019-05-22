import 'reflect-metadata';
import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import * as bcrypt from 'bcryptjs';

import { User } from '../../entities/User';
import { RegisterInput } from './register/RegisterInput';

@Resolver()
export class RegisterResolver {
	// every resolver class needs at least one query (generate schema error)
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
