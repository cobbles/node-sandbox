import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>) {}

  create(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput);

    return this.petsRepository.save(newPet);
  }

  findAll(): Promise<Pet[]> {
    return this.petsRepository.find();
  }

  findOne(id: number): Promise<Pet> {
    return this.petsRepository.findOneOrFail({where: {id}})
  }

  async update(updatePetInput: UpdatePetInput): Promise<Pet> {
    const currentPet = await this.findOne(updatePetInput.id)
    const updatedPet = this.petsRepository.merge(currentPet, updatePetInput)

    return this.petsRepository.save(updatedPet);
  }

  remove(id: number): Promise<Pet> {
    this.petsRepository.softDelete(id);

    return this.findOne(id)
  }

}