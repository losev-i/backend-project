import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';

import { Role, User } from '../../../users/User';
import { getRepository } from 'typeorm';

@Resolver()
export class AuthorizationResolver {
	/**
	 * Getter for all users
	 */
	@Query(returns => [User])
	async getUsers(): Promise<User[]> {
		return await User.find({});
	}

	// TODO: or instead of ADMIN -> Role.ADMIN ?
	/**
	 * Admin can add new user
	 * @param userName Username of the new User
	 * @param firstName Firstname of the new User
	 * @param lastName Lastname of the new User
	 * @param email Email of the new User
	 * @param role Role of the new User
	 */
	@Authorized(Role.ADMIN)
	@Mutation(() => User)
	async addUser(
		@Arg('name') name: string,
		@Arg('firstName') firstName: string,
		@Arg('lastName') lastName: string,
		@Arg('email') email: string,
		@Arg('role') role: Role,
		@Arg('password') password: string
	): Promise<User> {
		// create new user with given data
		const newUser: User = await User.create({
			name,
			firstName,
			lastName,
			email,
			role,
			password
		});
		// add new user to user array
		newUser.save();
		return newUser;
	}

	/**
	 * Admin can delete user by given userName
	 * @param userName User to delete
	 */
	@Authorized(Role.ADMIN)
	@Mutation(() => User)
	async deleteUser(@Arg('name') name: string) {
		getRepository(User).delete({ name: name });

		return { name };
	}
}
