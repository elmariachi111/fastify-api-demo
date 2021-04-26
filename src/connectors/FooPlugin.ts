import { FastifyPluginAsync } from "fastify"
import fastifyPlugin from 'fastify-plugin'

export interface FooPluginOptions {
  mood: 'happy' | 'sad' | 'undecided'
}

declare module 'fastify' {
  //@ts-ignore
  interface FastifyInstance {
     utility: {
      message: string
    }
  }
}

const fooPlugin: FastifyPluginAsync<FooPluginOptions> = async (fastify, options: FooPluginOptions) => {
  fastify.decorate('utility', {
      message: options.mood
    }
  )
}

const FooPlugin = fastifyPlugin(fooPlugin)
export default FooPlugin