import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { RegisterResolver } from './modules/user/register/RegisterResolver';
import { FindResolver } from './modules/user/find/FindResolver';
import { LoginResolver } from './modules/user/login/LoginResolver';

export async function RootSchema() {
  return await buildSchema({
    resolvers: [RegisterResolver, FindResolver, LoginResolver],
    validate: {
      validationError: {
        target: false,
        value: true
      },
      dismissDefaultMessages: false
    }
  });
}
