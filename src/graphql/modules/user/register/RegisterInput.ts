import "reflect-metadata";
import { Length, IsEmail } from "class-validator";
import { InputType, Field } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist";
import { Role } from "../../../entities/User";

/**
 * InputType Class, defines input types
 */
@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 255)
  firstName!: string;

  @Field()
  @Length(1, 255)
  lastName!: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "Email already in use." })
  email!: string;

  @Field()
  password!: string;

  @Field()
  userName!: string;

  @Field(type => Role)
  role!: Role;
}
