import "reflect-metadata";
import { Resolver, Query, Arg } from "type-graphql";
import { User } from "../../../entities/User";

/**
 * Resolver class
 */
@Resolver()
export class FindResolver {
  /**
   * Query which finds User via given email
   * @param email Search criterion
   * @returns User object that matches criterion
   */
  @Query(returns => User, { nullable: true })
  async findByEmail(@Arg("email", type => String) email: string) {
    return await User.findOne({ email: email });
  }

  /**
   * Query which finds all Users
   * @returns Array filled with all users
   */
  @Query(returns => [User], { nullable: true })
  async findUsers() {
    return await User.find({});
  }

  /**
   * Query which finds Users via given name (Consisting of firstName + lastName)
   * @param name Search criterion
   * @returns User objects that matches criterion
   */
  @Query(returns => [User], { nullable: true })
  async findByName(@Arg("name", type => String) name: string) {
    return await User.find({ name: name });
  }

  /**
   * Query which finds Users via given lastName
   * @param lastName Search criterion
   * @returns User objects that matches criterion
   */
  @Query(returns => [User], { nullable: true })
  async findByLastName(@Arg("lastName", type => String) lastName: string) {
    return await User.find({ lastName: lastName });
  }
}
