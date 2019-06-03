import 'reflect-metadata';

import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

import { PlainUser } from '../../shared/plain-user-object';
import { Role } from '../classes/role';

const uuidv4 = require('uuid/v4');
/**
 * Entity class
 * Defines the structure of User objects
 */
@ObjectType()
@Entity()
export class User extends PlainUser {
  @Generated('uuid')
  @PrimaryColumn({ unique: true })
  id!: string;

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
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field(type => Role)
  @Column()
  role!: Role;

  // @BeforeInsert()
  // addId() {
  // 	this.id = uuidv4();
  // }
}
