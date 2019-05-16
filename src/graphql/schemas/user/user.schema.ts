import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class User {
  @Field(type => ID)
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  password!: string;

  @Field()
  email!: string;
}
