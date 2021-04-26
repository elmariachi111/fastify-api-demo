import "reflect-metadata";
import Fastify from 'fastify';
import SimpleRoutes from './routes/simple';
import TokenRoutes from './routes/token';
import TransactionRoutes from './routes/transaction';
import FooPlugin from './connectors/FooPlugin';
import GraphqlPlugin from './connectors/GraphqlPlugin';
import fastifySwagger from 'fastify-swagger';
import fastifyTypeOrm from 'fastify-typeorm-plugin';
import ormConfig from '../ormconfig.json'

const fastify = Fastify({
  logger: true
})

fastify.register(fastifyTypeOrm, ormConfig);

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

fastify.register(GraphqlPlugin)

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()