import 'reflect-metadata';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolverInterface,
  Arg,
  FieldResolver
} from 'type-graphql';
import { User } from './user.schema';
import { createUserSample } from './user.sample';
import { UserInput } from './user.input';
import { plainToClass } from 'class-transformer';
import * as _ from 'lodash';

@Resolver(of => User) //Was ist of?
export class UserResolver implements ResolverInterface<User> {
  private readonly userList: User[] = createUserSample();

  @Query(returns => User)
  async user(@Arg('email') email: string) {
    return await this.userList.find(user => user.email === email);
  }

  @Query(returns => [User], {
    description: 'Get all the Users from the userList'
  })
  async users(): Promise<User[]> {
    return await this.userList;
  }

  @Mutation(returns => User)
  async addUser(@Arg('user') userInput: UserInput): Promise<User> {
    const user = plainToClass(User, {
      email: userInput.email,
      password: userInput.password
    });
    await this.userList.push(user);
    return user;
  }

  @Mutation(returns => Boolean)
  async removeUser(@Arg('email') email: string) {
    try {
      // await this.userList.removeByEmail  ---- Die Methode removeByEmail muss noch implementiert werden.
      return true;
    } catch {
      return false;
    }
  }
}
