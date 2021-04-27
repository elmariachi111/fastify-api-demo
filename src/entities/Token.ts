import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Transaction } from "./Transaction";
import { ObjectType, Field, ID, FieldResolver } from "type-graphql";
import { Lazy } from "../helpers";

export enum ETokenType {
  ERC20 = "ERC20",
  ERC721 = "ERC721",
  ERC1155 = "ERC1155"
}

@Entity()
@ObjectType()
export class Token {
  
  @PrimaryColumn()
  @Field(() => ID)
  address: string = "";

  @Column()
  @Field(() => String)
  name: string = "";
  
  @Column()
  @Field(() => String)
  symbol: string = "";

  @Column()
  @Field(() => String)
  type: ETokenType = ETokenType.ERC20;

  @Column()
  @Field(() => String)
  decimals?: number; 

  @Field(type => [Transaction])
  @OneToMany(type => Transaction, transaction => transaction.token, {lazy: true})
  transactions: Lazy<Transaction[]> | undefined;
}

// const Token = Type.Object({
//   address: Type.String(),
//   name: Type.String(),
//   symbol: Type.String(),
//   type: Type.Enum(ETokenType),
//   decimals: Type.Optional(Type.Number({maximum: 18})),
// });