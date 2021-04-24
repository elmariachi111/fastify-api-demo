import Fastify from 'fastify';
import SimpleRoutes from './routes/simple';
import TokenRoutes from './routes/token';
import FooPlugin from './connectors/FooPlugin';
import fastifySwagger from 'fastify-swagger';

const fastify = Fastify({
  logger: true
})

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

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()