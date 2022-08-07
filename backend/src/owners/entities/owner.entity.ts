import { ObjectType, Field } from '@nestjs/graphql';
import { Timestamps } from '../../common/entities/timestamps.entity';
import { Column, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Owner extends Timestamps{

  @Field()
  @Column()
  name: string;

  // @OneToMany(() => Pet, pet => pet.owner)
  // @Field(type => [Pet], {nullable: true})
  // pets?: Pet[];
}
