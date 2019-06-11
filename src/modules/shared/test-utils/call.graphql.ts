import { graphql, GraphQLSchema } from 'graphql';
import { RootSchema } from '../../users/graphQL/rootSchema.graphql';

interface Options {
  source: string;
}

let schema: GraphQLSchema;

export const call = async ({ source }: Options) => {
  if (!schema) {
    schema = await RootSchema();
  }
  return graphql({
    schema,
    source
  });
};
