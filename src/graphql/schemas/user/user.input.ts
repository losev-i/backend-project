import { User } from './user.schema';
import { InputType, Field } from 'type-graphql';

@InputType()
export class UserInput implements Partial<User> {
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  @Field()
  email: string;

  @Field()
  password: string;
}
