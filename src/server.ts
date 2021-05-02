import {build} from './app'
import ormConfig from './config/ormconfig.json';

const fastify = build({
  orm: ormConfig,
  fastifyOpts: {
    logger: {
      level: 'info',
      prettyPrint: true
    }
  }
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