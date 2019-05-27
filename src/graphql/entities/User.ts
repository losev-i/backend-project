import 'reflect-metadata';

import {
	Authorized,
	Field,
	ObjectType,
	registerEnumType,
	Root
} from 'type-graphql';
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

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

/**
 * Entity class
 * Defines the structure of User objects
 */
@ObjectType()
@Entity()
export class User extends BaseEntity {
	/** User ID */
	@ObjectIdColumn()
	// mongoose object id?
	id!: ObjectID;

	/** UserName */
	@Field()
	@Column('text', { unique: true })
	@Authorized(Role.ADMIN)
	userName!: string;

	/** FirstName */
	@Field()
	@Column()
	// all logged users can see firstname
	//@Authorized()
	firstName!: string;

	/** LastName */
	@Field()
	@Column()
	//@Authorized()
	lastName!: string;

	/** Email */
	@Field()
	@Column('text', { unique: true })
	@Authorized()
	email!: string;

	// Warum noch ein Feld mit dem gesamten Namen???
	@Field()
	name(@Root() parent: User): string {
		return `${parent.firstName} ${parent.lastName}`;
	}

	/** User Password */
	@Column()
	password!: string;

	/** User role */
	@Field()
	@Column()
	// only admin can see the user role
	@Authorized(Role.ADMIN)
	role!: Role;
}
