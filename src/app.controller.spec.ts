import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;
  let service: AppService;
  const isJSON = (str: string) => {
    try {
      const json = JSON.parse(str);
      if (Object.prototype.toString.call(json).slice(8, -1) !== 'Object') {
        return false
      }
    } catch (e) {
      return false
    }
    return true
  }
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            constructor: jest.fn(),
            getHome: jest.fn()
          }
        }
      ],
    }).compile();

    service = app.get<AppService>(AppService);
    appController = app.get<AppController>(AppController);
  });
  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getHome', async () => {

    await expect(appController.getHome()).resolves.not.toThrow();
  })

  /*it('Should call getTopWordsInStoriesTitle with parameters', async () => {
    const result = await appController.getTopWordsInStoriesTitle(25, 10);
    expect(result).toBe(true);
  })*/
});