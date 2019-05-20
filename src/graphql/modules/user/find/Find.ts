import { Resolver, Query, Arg } from 'type-graphql';
import { User } from '../../../entity/User';
import { getRepository, Repository } from 'typeorm';
import { isNullableType } from 'graphql';

@Resolver()
export class FindResolver {
  userRepository = new Repository();

  constructor() {
    this.userRepository = getRepository(User);
  }

  @Query(returns => User, { nullable: true })
  async findByEmail(@Arg('email', type => String) email: string) {
    return await this.userRepository.findOne({ email: email });
  }

  @Query(returns => [User], { nullable: true })
  async findUsers() {
    return await this.userRepository.find({});
  }

  @Query(returns => [User], { nullable: true })
  async findByName(@Arg('name', type => String) name: string) {
    return await this.userRepository.find({ name: name });
  }

  @Query(returns => [User], { nullable: true })
  async findByLastName(@Arg('lastName', type => String) lastName: string) {
    return await this.userRepository.find({ lastName: lastName });
  }
}
