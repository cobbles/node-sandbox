import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { Repository } from 'typeorm';
import { Owner } from '../../src/owners/entities/owner.entity';
import { owners } from '../../src/database/seeds/owners.seed';

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

  it('Query owners', async () => {
    const ownerRepository: Repository<Owner> = app.get('OwnerRepository')
    await ownerRepository.save(owners)

    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: 'mutation {updateOwner(updateOwnerInput: {id: 4, name: "Janie"}) { id name }}' })
      .expect(({ body }) => {
        expect(body.data.updateOwner).toEqual({
          id: 4,
          name: "Janie"
        });
      })
  });
});