import { registerEnumType } from 'type-graphql';

/**
 * Defines the user roles
 */
export enum Role {
	ADMIN = 'ADMIN',
	USER = 'USER',
	GUEST = 'GUEST'
}

/**
 * Register enum type Role
 */
registerEnumType(Role, {
	name: 'Role',
	description: 'The basic role types'
});
