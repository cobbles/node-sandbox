import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindOneOptions, UpdateResult } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { Owner } from './entities/owner.entity';
import { OwnersResolver } from './owners.resolver';
import { OwnersService } from './owners.service';

describe('OwnersResolver', () => {
  let resolver: OwnersResolver;
  const createdDate = new Date('2022-08-05T03:30:00.000Z');
  const owners: Owner[] = [
    {id: 1, name: 'Tom', createdDate},
    {id: 2, name: 'Claudia', createdDate}
  ];

  const mockRepository = {
    create: jest.fn((input: CreateOwnerInput): Owner => {
      return {id: 1, ...input, createdDate}
    }),
    save: jest.fn((owner: Owner): Owner => owner),
    find: jest.fn((): Owner[] => owners),
    findOneOrFail: jest.fn((options: FindOneOptions<Owner>): Owner => owners.find(owner => owner.id === options.where['id'])),
    update: jest.fn((): UpdateResult => {
      return{raw: '', affected: 1, generatedMaps: []}
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OwnersResolver,
        OwnersService,
        {
          provide: getRepositoryToken(Owner),
          useValue: mockRepository
        }
      ],
    })
    .compile();

    resolver = module.get<OwnersResolver>(OwnersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create an owner', () => {
    const createownerInput = {
      name: "Henry"
    };
    expect(resolver.createOwner(createownerInput))
      .toEqual({
        id: 1,
        name: "Henry",
        createdDate: createdDate
      })
  });

  it('should get all owners', () => {
    expect(resolver.owners())
      .toEqual(owners)
  });

  it('should get one owner', () => {
    expect(resolver.owner(2))
      .toEqual(owners.find(owner => owner.id === 2))
  });

});
