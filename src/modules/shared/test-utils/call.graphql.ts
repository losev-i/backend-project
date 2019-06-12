import { graphql, GraphQLSchema } from 'graphql';
import { RootSchema } from '../../users/graphQL/rootSchema.graphql';
import Maybe from 'graphql/tsutils/Maybe';

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
}

let schema: GraphQLSchema;

export const call = async ({ source, variableValues }: Options) => {
  if (!schema) {
    schema = await RootSchema();
  }

  return graphql({
    schema,
    source,
    variableValues
  });
};
