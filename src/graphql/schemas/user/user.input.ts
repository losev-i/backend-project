import 'reflect-metadata';
import { User } from './user.schema';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolverInterface,
  Arg,
  Int,
  FieldResolver,
  InputType,
  Field,
  ArgsType
} from 'type-graphql';
import { Length } from 'class-validator';

@InputType()
export class UserInput implements Partial<User> {
  constructor(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  @Length(30, 255)
  email: string;

  @Field()
  password: string;
}
