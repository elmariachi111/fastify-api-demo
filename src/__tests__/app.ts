import { FastifyInstance } from 'fastify';
import { build } from '../app';
import ormConfig from '../config/ormconfig.tests.json';

export const app = (): FastifyInstance => {
  return build({
    fastifyOpts: {
      logger: false
    },
    orm: ormConfig
  }) as unknown as FastifyInstance
}