
import { ApolloServer } from 'apollo-server-fastify';
import { FastifyPluginAsync } from "fastify";
import fastifyPlugin from 'fastify-plugin';
import { buildSchema } from 'type-graphql';
import { TokenResolver } from '../resolvers';
import { Container } from 'typeorm-typedi-extensions';
import { TransactionResolver } from '../resolvers/TransactionResolver';

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
  const resolvers = [TokenResolver, TransactionResolver] as const

  const schema = await buildSchema({
    resolvers,
    container: Container
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