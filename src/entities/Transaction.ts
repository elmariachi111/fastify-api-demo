import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Token } from "./Token";
import {Type} from 'class-transformer';
import { Field, ID, ObjectType } from "type-graphql";
import { Lazy } from "../helpers";

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

  @Field(type => Token)
  @ManyToOne(type => Token, token => token.transactions, { lazy: true })
  token: Lazy<Token> | undefined;
  
}