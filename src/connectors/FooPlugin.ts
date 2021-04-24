import { FastifyInstance, FastifyPluginAsync } from "fastify"
import fastifyPlugin from 'fastify-plugin'

declare module 'fastify' {
  interface FastifyInstance {
    utility: {
      message: string
    }
  }
}

export interface FooPluginOptions {
  mood: 'happy' | 'sad' | 'undecided'
}

const fooPlugin: FastifyPluginAsync<FooPluginOptions> = async (fastify: FastifyInstance, options: FooPluginOptions) => {
  fastify.decorate('utility', {
      message: options.mood
    }
  )
}

const FooPlugin = fastifyPlugin(fooPlugin)
export default FooPlugin