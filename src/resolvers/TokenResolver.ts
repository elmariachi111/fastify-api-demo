import { Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { EntityManager } from "typeorm";
import { InjectManager } from "typeorm-typedi-extensions";
import { Token } from '../entities/Token';

@Resolver(of => Token)
@Service()
export class TokenResolver {

  constructor(@InjectManager() private orm: EntityManager) {}

  @Query(() => [Token])
  async tokens(): Promise<Token[]> {
    return await this.orm.getRepository(Token).find();
  }
}