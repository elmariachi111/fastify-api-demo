import Fastify from 'fastify';
import SimpleRoutes from './routes/simple';
import TokenRoutes from './routes/token';
import FooPlugin from './connectors/FooPlugin';

const fastify = Fastify({
  logger: true
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