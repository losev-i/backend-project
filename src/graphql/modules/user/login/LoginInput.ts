import 'reflect-metadata';
import { InputType, Field } from 'type-graphql';
import { InvalidEmail } from './InvalidEmail';

/**
 * InputType Class, defines input types
 */
@InputType()
export class LoginInput {
<<<<<<< HEAD
	@Field()
	@InvalidEmail({ message: 'email not found' })
	email!: string;
=======
  @Field()
  @InvalidEmail({ message: 'Email not found.' })
  email!: string;
>>>>>>> origin/JS-5796

	@Field()
	password!: string;
}
