import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Transaction } from "./Transaction";

export enum ETokenType {
  ERC20 = "ERC20",
  ERC721 = "ERC721",
  ERC1155 = "ERC1155"
}

@Entity()
export class Token {
  
  @PrimaryColumn()
  address: string = "";

  @Column()
  name: string = "";
  
  @Column()
  symbol: string = "";

  @Column()
  type: ETokenType = ETokenType.ERC20;

  @Column()
  decimals?: number; 

  @OneToMany(type => Transaction, transaction => transaction.token)
  transactions: Transaction[] | undefined;
}

// const Token = Type.Object({
//   address: Type.String(),
//   name: Type.String(),
//   symbol: Type.String(),
//   type: Type.Enum(ETokenType),
//   decimals: Type.Optional(Type.Number({maximum: 18})),
// });