import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Token } from "./Token";
import {Type} from 'class-transformer';
import { Field, ID, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Transaction {
  
  @PrimaryColumn()
  @Field(() => ID)
  hash: string = "";

  @Type(() => Date)
  @Column({type: 'datetime'})
  dateTime: Date | undefined;

  @Column()
  @Field(() => String)
  from: string = "";

  @Column()
  @Field(() => String)
  to: string = "";

  @Column()
  @Field(() => String)
  amount: string = "";

  @Field(() => Token, {nullable: true})
  @ManyToOne(type => Token, token => token.transactions)
  token: Token | undefined;
  
}

// const Token = Type.Object({
//   address: Type.String(),
//   name: Type.String(),
//   symbol: Type.String(),
//   type: Type.Enum(ETokenType),
//   decimals: Type.Optional(Type.Number({maximum: 18})),
// });