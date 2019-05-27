import "reflect-metadata";
import { Resolver, Mutation, Arg, Query } from "type-graphql";
import * as bcrypt from "bcryptjs";

import { User } from "../../../entities/User";
import { RegisterInput } from "./RegisterInput";

/**
 * Resolver class
 */
@Resolver()
export class RegisterResolver {
  /**
   * Resolver class needs query, otherwise an error is thrown
   * Will be replaced
   */
  @Query(() => User, { nullable: true })
  hello(): string {
    return "Hello World!";
  }

  /**
   * Registration mutation
   * Has to be extended to include permissions/roles etc. (?)
   * Hashes the password using bcrypt
   * @returns registered User
   */
  @Mutation(() => User)
  async register(@Arg("data")
  {
    firstName,
    lastName,
    email,
    password,
    userName,
    role
  }: RegisterInput): Promise<User> {
    const user = await User.create({
      firstName,
      lastName,
      email,
      userName,
      role,
      password: await bcrypt.hash(password, 12)
    }).save();

    return user;
  }
}
