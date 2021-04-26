import { Static, Type } from '@sinclair/typebox';
import { plainToClass } from 'class-transformer';
import { FastifyInstance } from 'fastify';
import { Token } from '../entities/Token';
import { Transaction } from '../entities/Transaction';


const TransactionType = Type.Object({
  hash: Type.String(),
  dateTime: Type.String(),
  token: Type.String(),
  from: Type.String(),
  to: Type.String(),
  amount: Type.String(),
});

type STransactionType = Static<typeof TransactionType>;

interface IQuerystring {
  from?: string;
  to?: string;
  token?: string;
}

async function routes (fastify: FastifyInstance) {

  fastify.get<{
    Querystring: IQuerystring
  }>('/',{
    schema: {
      querystring: {
        type: "object",
        properties: {
          token: {type: "string"}
        }
      },
    }
  }, async (request, reply) => {
    const where: IQuerystring = {}
    if (request.query.token) where.token = request.query.token;

    const transactions = await fastify.orm.getRepository(Transaction).find({
      where
    })
    return transactions;
  })

  fastify.post<{ 
    Body: STransactionType, Response: STransactionType
  }>(
    '/', {
      schema: {
        body: TransactionType, 
        response: {
          200: TransactionType,
        }
      }
    }, async (request, reply) => {
      const {token} = request.body;
      const _token = await fastify.orm.getRepository(Token).findOne(token);
      if (!_token) {
        throw new Error(`token ${token} doesn't exist`)
      }

      const transaction = plainToClass(Transaction, request.body);
      transaction.token = _token;

      fastify.orm.getRepository(Transaction).save(transaction)
      return request.body
    }
  );

}

export default routes;