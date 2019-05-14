import 'reflect-metadata';
import { ObjectType, Field, Query, Resolver } from 'type-graphql';

@ObjectType()
export class User {
  constructor(
    //Constructor ist definitiv wichtig
    firstName: string,
    lastName: string,
    password: string,
    email: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.email = email;
  }

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  password: string;

  @Field()
  email: string;
}
