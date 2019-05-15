import 'reflect-metadata';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolverInterface,
  Arg,
  Int,
  FieldResolver
} from 'type-graphql';
import { User } from './user.schema';
import { createUserSample } from './user.sample';
import { UserInput } from './user.input';
import { plainToClass } from 'class-transformer';

function removeByEmail(userList: User[], email: String) {
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].email == email) {
      userList.splice(i, 1);
    }
  }
}

@Resolver(of => User) //Was ist of?
export class UserResolver {
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
      await removeByEmail(this.userList, email);
      return true;
    } catch {
      return false;
    }
  }
}
