import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { ETokenType, Token } from '../entities/Token';


const TokenType = Type.Object({
  address: Type.String(),
  name: Type.String(),
  symbol: Type.String(),
  type: Type.Enum(ETokenType),
  decimals: Type.Optional(Type.Number({maximum: 18})),
});

type STokenType = Static<typeof TokenType>;

async function routes (fastify: FastifyInstance) {
  
  fastify.get('/', async (request, reply) => {
    const tokens = fastify.orm.getRepository(Token).find()
    return tokens;
  })

  fastify.get<{
    Params: {address: string}
  }>('/:address', {
    schema: {
      params: {
        address: {
          Type: String
        }
      }
    }
  },
  async (request, reply) => {
    const {address} = request.params;
    return fastify.orm.getRepository(Token).findOne(address)
  });

  fastify.post<{ 
    Body: STokenType, Response: STokenType
  }>(
    '/', {
      schema: {
        body: TokenType, 
        response: {
          200: TokenType,
        }
      }
    }, async (request, reply) => {
      fastify.orm.getRepository(Token).save(request.body)
      return request.body
    }
  );

}

export default routes;