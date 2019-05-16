import { buildSchema } from 'type-graphql';
import { UserResolver } from './schemas/user/user.resolver';

export async function RootSchema() {
  return await buildSchema({
    resolvers: [UserResolver]
  });
}
