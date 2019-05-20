import 'reflect-metadata';
import { Length, IsEmail } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { InvalidEmail } from './InvalidEmail';

@InputType()
export class LoginInput {
  @Field()
  @InvalidEmail({ message: 'email not found' })
  email!: string;

  @Field()
  password!: string;
}
