import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Timestamps } from "../../common/entities/timestamps.entity";
import { Column, Entity } from "typeorm";

@Entity()
@ObjectType()
export class Pet extends Timestamps {
  @Column()
  @Field()
  name: string;

  @Column({nullable: true})
  @Field({nullable: true})
  type?: string;

  @Column()
  @Field(() => Int)
  ownerId: number

  // @ManyToOne(() => Owner, owner => owner.pets)
  // @Field(type => Owner)
  // owner: Owner
}