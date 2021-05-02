import "reflect-metadata";
import Fastify, { FastifyInstance } from 'fastify';
import SimpleRoutes from './routes/simple';
import TokenRoutes from './routes/token';
import TransactionRoutes from './routes/transaction';
import FooPlugin from './plugins/FooPlugin';
import GraphqlPlugin from './plugins/GraphqlPlugin';
import fastifySwagger from 'fastify-swagger';
import fastifyTypeOrm from 'fastify-typeorm-plugin';
import { useContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';

export type FastifyApplicationOptions = {
  orm?: any;
  fastifyOpts?: any;
}
export const build = (opts: FastifyApplicationOptions = {}) => {
  const fastify = Fastify(opts.fastifyOpts)
  useContainer(Container)

  fastify.register(fastifyTypeOrm, opts.orm);
  
  fastify.register(fastifySwagger, {
    routePrefix: '/docs',
    exposeRoute: true,
    openapi: {
      info: {
        title: 'Test swagger',
        description: 'testing the fastify swagger api',
        version: '0.1.0'
      },
    },
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
  })
    
  fastify.register(GraphqlPlugin)

  fastify.register(FooPlugin, {
    mood: 'undecided'
  });

  fastify.register(SimpleRoutes);
  
  fastify.register(TokenRoutes, {
    prefix: "token"
  });
  
  fastify.register(TransactionRoutes, {
    prefix: "tx"
  })

  return fastify;
}


