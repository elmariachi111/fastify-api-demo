import { Resolver, Query } from "type-graphql";
import { Repository, Connection } from "typeorm";
import { Token } from '../entities/Token';

@Resolver()
export class TokenResolver {

  constructor(private orm: Connection) {}

  @Query(() => [Token])
  async tokens(): Promise<Token[]> {
    return await this.orm.getRepository(Token).find();
  }
}