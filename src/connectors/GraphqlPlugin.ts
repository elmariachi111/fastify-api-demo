
import { ApolloServer } from 'apollo-server-fastify';
import { FastifyPluginAsync } from "fastify";
import fastifyPlugin from 'fastify-plugin';
import { buildSchema } from 'type-graphql';
import { TokenResolver } from '../resolvers';

export interface GraphqlPluginOptions {
 
}

// declare module 'fastify' {
//   //@ts-ignore
//   interface FastifyInstance {
//      utility: {
//       message: string
//     }
//   }
// }

const graphqlPlugin: FastifyPluginAsync<GraphqlPluginOptions> = async (fastify, options: GraphqlPluginOptions) => {
  const resolvers = [TokenResolver] as const

  //https://github.com/MichalLytek/type-graphql/issues/460
  //vs https://typegraphql.com/docs/dependency-injection.html & https://www.npmjs.com/package/typedi
  const MyContainer = {
    get(ResolverClass: typeof TokenResolver) {
      return new ResolverClass(fastify.orm)
    }
  }
  const schema = await buildSchema({
    resolvers,
    container: MyContainer
  })
  const apollo = new ApolloServer({
    schema,
    playground: true,
    introspection: true,
  });
  fastify.register(apollo.createHandler())
}

const GraphqlPlugin = fastifyPlugin(graphqlPlugin)
export default GraphqlPlugin