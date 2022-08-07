import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

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

  it('Mutation createOwner', async () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: 'mutation { createOwner(createOwnerInput: {name: "Tom"}) { id name } }' })
      .expect(({ body }) => {
        expect(body.errors).toBeUndefined()
        expect(body.data.createOwner).toEqual({id: 1, name: "Tom"});
      })
  });
});