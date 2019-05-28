import 'reflect-metadata';
import { Entity, Column, BaseEntity, ObjectID, ObjectIdColumn } from 'typeorm';
import { ObjectType, Field, Root } from 'type-graphql';
import { Role } from '../classes/role';

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
	@Column({ unique: true })
	name!: string;

	@Field()
	@Column('firstName')
	firstName?: string;

	@Field()
	@Column('lastName')
	lastName?: string;

	@Field()
	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@Field()
	@Column('role')
	role!: Role;
}
