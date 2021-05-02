
import { ApolloServer } from 'apollo-server-fastify';
import { FastifyPluginAsync } from "fastify";
import fastifyPlugin from 'fastify-plugin';
import { buildSchema } from 'type-graphql';
import { TokenResolver, TransactionResolver } from '../resolvers';
import { Container } from 'typeorm-typedi-extensions';

export interface GraphqlPluginOptions {
 
}

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