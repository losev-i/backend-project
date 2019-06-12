import { InputType, Field } from 'type-graphql';
import { Role } from '../classes/role';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class registerInput {
  @Field()
  @IsNotEmpty()
  firstName!: string;

  @Field()
  @IsNotEmpty()
  lastName!: string;

  @Field()
  @IsNotEmpty()
  name!: string;

  @Field()
  @IsNotEmpty()
  password!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  role!: Role;
}
