import "reflect-metadata";

import bcrypt from "bcryptjs";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Like } from "typeorm";

import { User } from "./user.model";
import { Role } from "../classes/role";

/**
 * Resolver class
 */
@Resolver()
export class UserResolver {
  /**
   * Query which finds all Users
   * @returns Array filled with all users
   */
  @Query(returns => [User], { nullable: true })
  async findUsers() {
    return await User.find({});
  }

  /**
   * Query for searching user(s) by specific value
   * @param value users value for search
   */
  @Query(returns => [User], { nullable: true })
  async findUserBy(
    @Arg("search", type => String || Role) value: string | Role
  ) {
    // Like ersetzen bei lastName und firstName da case-sensitivity relevant?
    return await User.find({
      where: [
        { email: Like(value) },
        { name: Like(value) },
        { firstName: Like(value) },
        { lastName: Like(value) },
        { role: Like(value) }
      ]
    });
  }

  @Query(returns => [User], { nullable: true })
  async findByRole(@Arg("role", type => Role) value: Role) {
    return await User.find({ role: value });
  }

  // TODO: delete when not in use
  @Mutation(returns => User, { nullable: true })
  async register(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("password") password: string,
    @Arg("email") email: string,
    @Arg("name") name: string,
    @Arg("role") role: Role
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      name,
      email,
      password: hashedPassword,
      role
    }).save();

    return user;
  }
}

export default UserResolver;
