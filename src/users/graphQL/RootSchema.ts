import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import FindResolver from './find/FindResolver';

export async function RootSchema() {
  return await buildSchema({
    resolvers: [FindResolver]
  });
}
