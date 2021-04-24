import {FastifyInstance} from 'fastify'

async function routes (fastify: FastifyInstance) {
  fastify.get('/', async (request, reply) => {
    return { hello: fastify.utility.message }
  })
}

export default routes;