import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken, getConnectionToken } from '@nestjs/sequelize';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Sequelize } from 'sequelize-typescript';
import { FindOptions, Transaction } from 'sequelize';
import { instanceToPlain } from 'class-transformer';
import { CatsService } from './cats.service';
import { Cat } from './cat.model';
import { CreateCatDto } from './create-cat.dto';
import { CreateCatArrayDto } from './create-cat-array.dto';
import { CATS_CONNECTION } from '../constants';

describe('CatsService', () => {
  let catsService: CatsService;
  let catModel: DeepMocked<typeof Cat>;
  let sequelize: Sequelize;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getModelToken(Cat, CATS_CONNECTION),
          useValue: createMock<typeof Cat>(),
        },
        {
          provide: getConnectionToken(CATS_CONNECTION),
          useValue: createMock<Sequelize>(),
        },
      ],
    }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
    catModel = moduleRef.get<typeof Cat, DeepMocked<typeof Cat>>(
      getModelToken(Cat, CATS_CONNECTION),
    );
    sequelize = moduleRef.get<Sequelize>(getConnectionToken(CATS_CONNECTION));
  });

  afterEach(() => {
    jest.resetAllMocks();
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
    it('should invoke static findOne method of cat model with a FindOptions argument', () => {
      const fakeId = 1;
      const fakeFindOptions: FindOptions = {
        where: {
          id: fakeId,
        },
      };
      catsService.findOne(fakeId);
      expect(catModel.findOne).toHaveBeenCalledWith(fakeFindOptions);
    });
    it('should return the result of invoking the static findOne method of cat model', () => {
      const fakeId = 1;
      expect(catModel.findOne).toHaveReturnedWith(catsService.findOne(fakeId));
    });
  });

  describe('create', () => {
    it('should be a method', () => {
      expect(catsService.create).toEqual(expect.any(Function));
    });
    it("should invoke static create method of cat model with an object who's values have been mapped from an instance of CreateCatDto argument", () => {
      const fakeCreateCatDto = new CreateCatDto();
      fakeCreateCatDto.name = 'fluffy';
      fakeCreateCatDto.age = 1;
      fakeCreateCatDto.userId = 1;

      catsService.create(fakeCreateCatDto);
      expect(catModel.create).toHaveBeenCalledWith(
        instanceToPlain(fakeCreateCatDto),
      );
    });
    it('should return the result of invoking the static create method of cat model', () => {
      const fakeCreateCatDto = new CreateCatDto();
      fakeCreateCatDto.name = 'fluffy';
      fakeCreateCatDto.age = 1;
      fakeCreateCatDto.userId = 1;

      expect(catModel.create).toHaveReturnedWith(
        catsService.create(fakeCreateCatDto),
      );
    });
  });

  describe('createMany', () => {
    it('should be a method', () => {
      expect(catsService.createMany).toEqual(expect.any(Function));
    });

    it('should invoke transaction method of an instance of sequelize with a callback function argument', () => {
      const fakeCreateCatDtoOne = new CreateCatDto();
      fakeCreateCatDtoOne.name = 'fluffy';
      fakeCreateCatDtoOne.age = 1;
      fakeCreateCatDtoOne.userId = 1;
      const fakeCreateCatDtoTwo = new CreateCatDto();
      fakeCreateCatDtoTwo.name = 'snuffles';
      fakeCreateCatDtoTwo.age = 2;
      fakeCreateCatDtoTwo.userId = 1;

      const fakeCreateCatArrayDto = new CreateCatArrayDto();
      fakeCreateCatArrayDto.action = [fakeCreateCatDtoOne, fakeCreateCatDtoTwo];

      catsService.createMany(fakeCreateCatArrayDto);
      expect(sequelize.transaction).toHaveBeenCalledWith(expect.any(Function));
    });
    it('should invoke static create method of cat model for n times, where n is the length of the action array in the CreateCatArrayDto that was passed in to the createMany method as an argument', async () => {
      const fakeCreateCatDtoOne = new CreateCatDto();
      fakeCreateCatDtoOne.name = 'fluffy';
      fakeCreateCatDtoOne.age = 1;
      fakeCreateCatDtoOne.userId = 1;
      const fakeCreateCatDtoTwo = new CreateCatDto();
      fakeCreateCatDtoTwo.name = 'snuffles';
      fakeCreateCatDtoTwo.age = 2;
      fakeCreateCatDtoTwo.userId = 1;

      const fakeCreateCatArrayDto = new CreateCatArrayDto();
      fakeCreateCatArrayDto.action = [fakeCreateCatDtoOne, fakeCreateCatDtoTwo];

      /**
       * here we had to declare a type matching the overload we wanted to use for sequelize.transaction
       */
      type AutoCallback = (
        autoCallback: (t: Transaction) => PromiseLike<void>,
      ) => Promise<void>;

      /**
       * here we had to typecast sequelize.transaction to match the overload that we wanted to test and additionally
       * provide a fake implementation that properly invoked the expected callback function
       */
      (sequelize.transaction as unknown as AutoCallback) = jest.fn(
        async (cb) => {
          cb({} as Transaction);
        },
      );

      await catsService.createMany(fakeCreateCatArrayDto);
      expect(catModel.create).toHaveBeenCalledTimes(
        fakeCreateCatArrayDto.action.length,
      );
    });
  });

  describe('remove', () => {
    it('should be a method', () => {
      expect(catsService.remove).toEqual(expect.any(Function));
    });
    it('should invoke the findOne method of an instance of Cats service with a number argument', () => {
      const fakeId = 1;
      const findOneSpy = jest.spyOn(catsService, 'findOne');
      catsService.remove(fakeId);
      expect(findOneSpy).toHaveBeenCalledWith(fakeId);
    });
    it('should invoke destroy method of an instance of Cat if cat exists', async () => {
      const fakeId = 1;
      const fakeCat = {
        id: 1,
        name: 'bob',
        age: 1,
        destroy: jest.fn().mockResolvedValue(true),
      };
      catModel.findOne.mockResolvedValue(fakeCat as unknown as Cat);
      await catsService.remove(fakeId);
      expect(fakeCat.destroy).toHaveBeenCalled();
    });
    it('should not invoke destroy method of an instance of Cat if cat does not exist', async () => {
      const fakeId = 1;
      const fakeCat = {
        id: 1,
        name: 'bob',
        age: 1,
        destroy: jest.fn().mockResolvedValue(true),
      };
      catModel.findOne.mockResolvedValue(null);
      await catsService.remove(fakeId);
      expect(fakeCat.destroy).not.toHaveBeenCalled();
    });
  });
});
