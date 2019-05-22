import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';

import { Role, User } from '../../../entities/User';
import { createUser, testUsers } from './auth.helpers';

@Resolver()
export class AuthorizationResolver {
	/** All existing users */
	private userData: User[] = testUsers;

	/**
	 * Getter for all users
	 */
	@Query(returns => [User])
	async getUsers(): Promise<User[]> {
		return await this.userData;
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
	@Authorized('ADMIN')
	@Mutation()
	addUser(
		@Arg('userName') userName: string,
		@Arg('firstName') firstName: string,
		@Arg('lastName') lastName: string,
		@Arg('email') email: string,
		@Arg('role') role: Role
	): User {
		// create new user with given data
		const newUser = createUser({
			userName,
			firstName,
			lastName,
			email,
			role
		});
		// add new user to user array
		this.userData.push(newUser);
		return newUser;
	}

	/**
	 * Admin can delete user by given userName
	 * @param userName User to delete
	 */
	@Authorized('ADMIN')
	@Mutation()
	deleteUser(@Arg('userName') userName: string): boolean {
		const userIndex = this.userData.findIndex(
			user => user.userName === userName
		);
		if (!userIndex) {
			return false;
		}
		// delete user from user array
		this.userData.splice(userIndex, 1);
		return true;
	}
}
