import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OwnersService } from './owners.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { UpdateResult } from 'typeorm';

@Resolver(() => Owner)
export class OwnersResolver {
  constructor(private readonly ownersService: OwnersService) {}

  @Mutation(() => Owner)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput): Promise<Owner> {
    return this.ownersService.create(createOwnerInput);
  }

  @Query(() => [Owner])
  owners(): Promise<Owner[]> {
    return this.ownersService.findAll();
  }

  @Query(() => Owner)
  owner(@Args('id', { type: () => Int }) id: number): Promise<Owner> {
    return this.ownersService.findOne(id);
  }

  @Mutation(() => Owner)
  updateOwner(@Args('updateOwnerInput') updateOwnerInput: UpdateOwnerInput):Promise<Owner> {
    return this.ownersService.update(updateOwnerInput);
  }

  @Mutation(() => Owner)
  removeOwner(@Args('id', { type: () => Int }) id: number): Promise<Owner> {
    return this.ownersService.remove(id);
  }
}
