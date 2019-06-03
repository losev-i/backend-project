import koa from 'koa';
import mount from 'koa-mount';

<<<<<<< HEAD
export async function app() {
  const app = new koa();

  app.use(
    mount(
      '/graphql',
      graphqlHTTP({
        schema: await RootSchema(),
        graphiql: process.env.NODE_ENV !== 'production',
        formatError: (error: GraphQLError) => {
          return { ...error, ServerError: error.originalError };
        }
      })
    )
  );

  return app;
}
=======
import routes from './routes';

export const app = new koa();

app.use(mount('/', routes));

export default app;
>>>>>>> IN-1207
