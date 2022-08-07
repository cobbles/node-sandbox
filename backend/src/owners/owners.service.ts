import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(@InjectRepository(Owner) private ownersRepository: Repository<Owner>) {}

  create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const newOwner = this.ownersRepository.create(createOwnerInput);

    return this.ownersRepository.save(newOwner);
  }

  findAll(): Promise<Owner[]> {
    return this.ownersRepository.find();
  }

  findOne(id: number): Promise<Owner> {
    return this.ownersRepository.findOneOrFail({where: {id}})
  }

  async update(updateOwnerInput: UpdateOwnerInput): Promise<Owner> {
    const currentOwner = await this.findOne(updateOwnerInput.id)
    const updatedOwner = this.ownersRepository.merge(currentOwner, updateOwnerInput)

    return this.ownersRepository.save(updatedOwner);
  }

  async remove(id: number): Promise<Owner> {
    this.ownersRepository.softDelete(id);

    return this.findOne(id)
  }
}
