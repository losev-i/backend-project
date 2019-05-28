import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { RegisterResolver } from './modules/user/register/RegisterResolver';
import { FindResolver } from './modules/user/find/FindResolver';
import { LoginResolver } from './modules/user/login/LoginResolver';
import { userAuthChecker } from './modules/user/auth/auth.helpers';
import { AuthorizationResolver } from './modules/user/auth/AuthorizationResolver';

export async function RootSchema() {
  return await buildSchema({
    resolvers: [
      RegisterResolver,
      FindResolver,
      LoginResolver,
      AuthorizationResolver
    ],
    authChecker: userAuthChecker,
    validate: {
      validationError: {
        target: false,
        value: true
      },
      dismissDefaultMessages: false
    }
  });
}
