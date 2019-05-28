import 'reflect-metadata';

import bcrypt from 'bcryptjs';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository, Like } from 'typeorm';

import { User } from './user.model';
import { Role } from '../classes/role';

/**
 * Resolver class
 */
@Resolver()
export class UserResolver {
	/**
	 * Query which finds all Users
	 * @returns Array filled with all users
	 */
	@Query(returns => [User], { nullable: true })
	async findUsers() {
		return await getRepository(User).find({});
	}

	/**
	 *
	 * @param value
	 */
	@Query(returns => [User], { nullable: true })
	async findUserBy(@Arg('search', type => String) value: string | Role) {
		return await getRepository(User).find({
			where: [
				{ email: Like(value) },
				{ name: Like(value) },
				{ firstName: Like(value) },
				{ lastName: Like(value) },
				{ role: Like(value) }
			]
		});
	}

	// TODO: delete when not in use
	@Mutation(returns => User, { nullable: true })
	async register(
		@Arg('firstName') firstName: string,
		@Arg('lastName') lastName: string,
		@Arg('password') password: string,
		@Arg('email') email: string,
		@Arg('name') name: string,
		@Arg('role') role: Role
	) {
		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await User.create({
			firstName,
			lastName,
			name,
			email,
			password: hashedPassword,
			role
		}).save();

		return user;
	}
}

export default UserResolver;
