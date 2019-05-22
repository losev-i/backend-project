import { User, Role } from '../../../entities/User';
import { plainToClass } from 'class-transformer';
import { ObjectID } from 'typeorm';
import { AuthChecker } from 'type-graphql';

// create function
export function createUser(userData: Partial<User>): User {
	return plainToClass(User, userData);
}

// create three roles to test functionality
export const testUsers = [
	createUser({
		//id: new ObjectID('456'),
		firstName: 'Inna',
		lastName: 'Losev',
		email: 'i@l.de',
		userName: 'ilosev',
		password: '12345',
		role: Role.ADMIN
	}),
	createUser({
		//id: new ObjectID('234'),
		firstName: 'Leon',
		lastName: 'Meister',
		email: 'l@m.de',
		userName: 'lmeister',
		password: '23456',
		role: Role.USER
	}),
	createUser({
		//id: new ObjectID('123'),
		firstName: 'Rene',
		lastName: 'Springer',
		userName: 'Guest',
		password: '34567',
		role: Role.GUEST
	})
];

/**
 * Context
 */
export interface Context {
	/** current user in Context */
	user?: User;
}

export const userAuthChecker: AuthChecker<Context, Role> = (
	{ context: { user } },
	roles: Role[]
) => {
	roles;
	// if @Authorized() check only if user exist
	if (roles.length === 0) {
		return user !== undefined;
	}
	// TODO: checking other roles

	// if no user restrict access
	if (!user) {
		return false;
	}

	// restrict acces if no roles matched
	return false;
};
