import 'reflect-metadata';

import { Field, ObjectType, registerEnumType, Root } from 'type-graphql';
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

/**
 * Defines the User Roles
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
	@ObjectIdColumn()
	id!: ObjectID;

	@Field()
	@Column()
	firstName!: string;

	@Field()
	@Column()
	lastName!: string;

	@Field()
	@Column('text', { unique: true })
	email!: string;

	@Field()
	name(@Root() parent: User): string {
		return `${parent.firstName} ${parent.lastName}`;
	}

	@Column()
	password!: string;

	@Field()
	@Column()
	role!: Role;
}
