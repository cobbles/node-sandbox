import { Field, ObjectType } from "@nestjs/graphql";
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";
import { Pk } from "./pk.entity";

@ObjectType()
export abstract class Timestamps extends Pk{
  @Field()
  @CreateDateColumn()
  createdDate: Date

  @Field({ nullable: true})
  @UpdateDateColumn({ nullable: true})
  updatedDate?: Date

  @Field({ nullable: true})
  @DeleteDateColumn({ nullable: true})
  deletedDate?: Date
}