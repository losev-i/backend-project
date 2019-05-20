import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { RegisterResolver } from './modules/user/Register';
import { FindResolver } from './modules/user/find/Find';

export async function RootSchema() {
  return await buildSchema({
    resolvers: [RegisterResolver, FindResolver]
  });
}
