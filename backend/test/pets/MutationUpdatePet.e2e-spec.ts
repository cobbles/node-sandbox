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

  it('Query pets', async () => {
    const ownerRepository: Repository<Owner> = app.get('OwnerRepository')
    const petRepository: Repository<Pet> = app.get('PetRepository')
    await ownerRepository.save(owners)
    await petRepository.save(pets)

    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: 'mutation {updatePet(updateOwnerInput: {id: 4, name: "Dexter 2"}) { id name }}' })
      .expect(({ body }) => {
        expect(body.data.updatePet).toEqual({
          id: 4,
          name: "Dexter 2"
        });
      })
  });
});