import 'reflect-metadata';

import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, Generated, PrimaryColumn } from 'typeorm';

import { Role } from '../classes/role';

/**
 * Entity class
 * Defines the structure of User objects
 */
@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Generated('uuid')
	@Column()
	id!: number;

	@Field()
	@Column({ unique: true })
	name!: string;

	@Field()
	@Column()
	firstName?: string;

	@Field()
	@Column()
	lastName?: string;

	@Field()
	@PrimaryColumn({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@Field(type => Role)
	@Column()
	role!: Role;
}
