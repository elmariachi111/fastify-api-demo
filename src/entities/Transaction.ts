import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Token } from "./Token";
import {Type} from 'class-transformer';

@Entity()
export class Transaction {
  
  @PrimaryColumn()
  hash: string = "";

  @Type(() => Date)
  @Column({type: 'datetime'})
  dateTime: Date | undefined;

  @ManyToOne(type => Token, token => token.transactions)
  token: Token | undefined;

  @Column()
  from: string = "";

  @Column()
  to: string = "";

  @Column()
  amount: string = "";
  
}

// const Token = Type.Object({
//   address: Type.String(),
//   name: Type.String(),
//   symbol: Type.String(),
//   type: Type.Enum(ETokenType),
//   decimals: Type.Optional(Type.Number({maximum: 18})),
// });