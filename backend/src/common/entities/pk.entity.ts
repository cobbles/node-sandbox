import { Field, Int, ObjectType } from "@nestjs/graphql";
import { PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
export abstract class Pk {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;
}