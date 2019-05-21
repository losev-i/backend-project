import "reflect-metadata";
import { InputType, Field } from "type-graphql";
import { InvalidEmail } from "./InvalidEmail";

/**
 * InputType Class, defines input types
 */
@InputType()
export class LoginInput {
  @Field()
  @InvalidEmail({ message: "email not found" })
  email!: string;

  @Field()
  password!: string;
}
