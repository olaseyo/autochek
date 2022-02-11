import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpService } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { AxiosResponse } from 'axios';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    jest.setTimeout(20000);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello Autochek');
  });

  it('Should get user stories without parameters', async () => {
    return await request(app.getHttpServer())
      .get('/user_stories')
      .expect(200);
  });

  it('Should get user stories with parameters', async () => {
    return await request(app.getHttpServer())
      .get('/user_stories/700/10')
      .expect(200);
  });

  it('Should get 404 error', async () => {
    return await request(app.getHttpServer())
      .get('/user_storie/700/10')
      .expect(404);
  });

  it('Should get topwordstitle without parameters', async () => {
    return await request(app.getHttpServer())
      .get('/top_words_title')
      .expect(200);
  });

  it('Should get topwordstitle with parameters', async () => {
    return await request(app.getHttpServer())
      .get('/top_words_title/25/10')
      .expect(200);
  });

  it('Should get topwordstitle with invalid endpoint', async () => {
    return await request(app.getHttpServer())
      .get('/top_words_title25/10')
      .expect(404);
  });


  it('Should get top_words_title_week without parameters', async () => {
    return await request(app.getHttpServer())
      .get('/top_words_title_week')
      .expect(200);
  });

  it('Should get top_words_title_week with parameters', async () => {
    return await request(app.getHttpServer())
      .get('/top_words_title_week/1/10')
      .expect(200);
  });

  it('Should get top_words_title_week with invalid endpoint', async () => {
    return await request(app.getHttpServer())
      .get('/top_words_title_wee/25/10')
      .expect(404);
  });
});
