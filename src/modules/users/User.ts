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
	@Column({ unique: true })
	@Authorized(Role.ADMIN)
	name!: string;

	/** FirstName */
	@Field()
	@Column('firstName')
	// all logged users can see firstname
	//@Authorized()
	firstName?: string;

	/** LastName */
	@Field()
	@Column('lastName')
	//@Authorized()
	lastName?: string;

	/** Email */
	@Field()
	@Column({ unique: true })
	@Authorized()
	email!: string;

	/** User Password */
	@Column('password')
	password!: string;

	/** User role */
	@Field()
	@Column('role')
	// only admin can see the user role
	@Authorized(Role.ADMIN)
	role!: Role;
}
