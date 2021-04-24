import {FastifyInstance} from 'fastify'
import { Static, Type } from '@sinclair/typebox'

enum ETokenType {
  ERC20 = "ERC20",
  ERC721 = "ERC721",
  ERC1155 = "ERC1155"
}

const Token = Type.Object({
  address: Type.String(),
  name: Type.String(),
  symbol: Type.String(),
  type: Type.Enum(ETokenType),
  decimals: Type.Optional(Type.Number({maximum: 18})),
});

type TokenType = Static<typeof Token>;

const tokens: Record<string, TokenType> = {};

async function routes (fastify: FastifyInstance) {
  
  fastify.get('/', {
    schema: {
      response: {
        200: Type.Array(Token)
      }
    }
  }, async (request, reply) => {
    return Object.values(tokens);
  })

  fastify.get<{
    Params: {symbol: string}
  }>('/:symbol', {
    schema: {
      params: {
        symbol: {
          Type: String
        }
      }
    }
  },
  async (request, reply) => {
    const {symbol} = request.params;
    return tokens[symbol];
  });

  fastify.post<{ 
    Body: TokenType, Response: TokenType
  }>(
    '/', {
      schema: {
        body: Token, response: {
          200: Token,
        }
      }
    }, async (request, reply) => {
      tokens[request.body.address] = request.body
      return request.body
    }
  );

}

export default routes;