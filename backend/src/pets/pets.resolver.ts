import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Pet } from './entities/pet.entity';
import { PetsService } from './pets.service';

@Resolver(() => Pet)
export class PetsResolver {
  constructor(private readonly petsService: PetsService) {}

  @Mutation(() => Pet)
  createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet> {
    return this.petsService.create(createPetInput);
  }

  @Query(() => [Pet])
  pets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @Query(() => Pet)
  pet(@Args('id', {type: () => Int}) id: number): Promise<Pet> {
    return this.petsService.findOne(id);
  }

  @Mutation(() => Pet)
  updatePet(@Args('updateOwnerInput') updateOwnerInput: UpdatePetInput):Promise<Pet> {
    return this.petsService.update(updateOwnerInput);
  }

  @Mutation(() => Pet)
  removePet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petsService.remove(id);
  }

}
