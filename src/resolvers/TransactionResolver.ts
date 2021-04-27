import { Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { EntityManager } from "typeorm";
import { InjectManager } from "typeorm-typedi-extensions";
import { Transaction } from "../entities/Transaction";

@Resolver(of => Transaction)
@Service()
export class TransactionResolver {

  constructor(@InjectManager() private orm: EntityManager) {}

  @Query(() => [Transaction])
  async transactions(): Promise<Transaction[]> {
    return await this.orm.getRepository(Transaction).find();
  }
}