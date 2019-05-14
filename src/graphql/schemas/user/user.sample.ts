import { plainToClass } from 'class-transformer';
import { User } from './user.schema';

export function createUserSample() {
  return plainToClass(User, [
    {
      firstName: 'Testy',
      lastName: 'Test',
      password: 'geheim',
      email: 'mail@provider.tld'
    },
    {
      firstName: 'Testy2',
      lastName: 'Test2',
      password: 'geheim',
      email: 'mail2@provider.tld'
    }
  ]);
}
