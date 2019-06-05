import 'reflect-metadata';

import { buildSchema } from 'type-graphql';

export async function RootSchema() {
  return await buildSchema({
    resolvers: [__dirname + '/**/*.resolver.ts']
  });
}
