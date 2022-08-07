import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { Repository } from 'typeorm';
import { Owner } from '../../src/owners/entities/owner.entity';
import { owners } from '../../src/database/seeds/owners.seed';
import { Pet } from '../../src/pets/entities/pet.entity';
import { pets } from '../../src/database/seeds/pets.seed';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Mutation removePet', async () => {
    const ownerRepository: Repository<Owner> = app.get('OwnerRepository')
    const petRepository: Repository<Pet> = app.get('PetRepository')
    await ownerRepository.save(owners)
    await petRepository.save(pets)

    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: 'mutation {removePet(id: 3) { id name deletedDate}}' })
      .expect(({ body }) => {
        expect(body.errors).toBeUndefined()
        expect(body.data.removePet.id).toEqual(3)
        expect(body.data.removePet.name).toEqual("Sam")
        expect(body.data.removePet.deletedDate).toBeDefined()
      })
  });
});