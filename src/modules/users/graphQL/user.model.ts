import 'reflect-metadata';
import { Entity, Column, BaseEntity, Generated, PrimaryColumn } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Role } from '../classes/role';

/**
 * Entity class
 * Defines the structure of User objects
 */
@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Generated('uuid')
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

	@Field()
	@Column()
	role!: Role;
}
