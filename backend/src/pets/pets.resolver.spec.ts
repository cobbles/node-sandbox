import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './entities/pet.entity';
import { PetsResolver } from './pets.resolver';
import { PetsService } from './pets.service';

describe('PetsResolver', () => {
  let resolver: PetsResolver;
  const createdDate = new Date('2022-08-05T03:30:00.000Z');
  const mockRepository = {
    create: jest.fn((input: CreatePetInput): Pet => {
      return {id: 1, ownerId: 1, ...input, createdDate}
    }),
    save: jest.fn((owner: Pet): Pet => owner)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetsResolver,
        PetsService,
        {
          provide: getRepositoryToken(Pet),
          useValue: mockRepository
        }
      ],
    })
    .compile();

    resolver = module.get<PetsResolver>(PetsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a pet', () => {
    const ownerInput = {
      name: "Wanda",
      ownerId: 1
    };
    expect(resolver.createPet(ownerInput))
      .toEqual({
        id: 1,
        name: "Wanda",
        ownerId: 1,
        createdDate
      })
  });
});
