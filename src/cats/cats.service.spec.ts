import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { CatsService } from './cats.service';
import { Cat } from './cat.model';

describe('CatsService', () => {
  let catsService: CatsService;
  let catModel: DeepMocked<typeof Cat>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getModelToken(Cat),
          useValue: createMock<typeof Cat>(),
        },
      ],
    }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
    catModel = moduleRef.get<typeof Cat, DeepMocked<typeof Cat>>(
      getModelToken(Cat),
    );
  });

  it('should be defined', () => {
    expect(catsService).toBeDefined();
  });

  it('should be an instance of CatsService', () => {
    expect(catsService).toBeInstanceOf(CatsService);
  });

  describe('findAll', () => {
    it('should be a method', () => {
      expect(catsService.findAll).toEqual(expect.any(Function));
    });
    it('should invoke static findAll method of cat model', () => {
      catsService.findAll();
      expect(catModel.findAll).toHaveBeenCalled();
    });
    it('should return the result of invoking the static findAll method of cat model', () => {
      expect(catModel.findAll).toHaveReturnedWith(catsService.findAll());
    });
  });

  describe('findOne', () => {
    it('should be a method', () => {
      expect(catsService.findOne).toEqual(expect.any(Function));
    });
  });

  describe('create', () => {
    it('should be a method', () => {
      expect(catsService.create).toEqual(expect.any(Function));
    });
  });

  describe('remove', () => {
    it('should be a method', () => {
      expect(catsService.remove).toEqual(expect.any(Function));
    });
  });
});
