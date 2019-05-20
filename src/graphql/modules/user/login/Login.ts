import 'reflect-metadata';
import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { User } from '../User';
import * as bcrypt from 'bcryptjs';
import { LoginInput } from './LoginInput';

/**
 * Resolver class
 */
@Resolver()
export class LoginResolver {
  /**
   * Login mutation
   * Has to be extended to include permissions etc. (?)
   * @returns null if user credentials are invalid, else User object
   */
  @Mutation(() => User, { nullable: true })
  async login(@Arg('data')
  {
    email,
    password
  }: LoginInput): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return null;
    }

    return user;
  }
}
