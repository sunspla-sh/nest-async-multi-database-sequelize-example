import { TestingModule, Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { UsersService } from './users.service';
import { User } from './user.model';
import { USERS_CONNECTION } from '../constants';
import { FindOptions } from 'sequelize';
import { CreateUserDto } from './create-user.dto';
import { instanceToPlain } from 'class-transformer';

describe('UsersService', () => {
  let usersService: UsersService;
  let userModel: DeepMocked<typeof User>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User, USERS_CONNECTION),
          useValue: createMock<typeof User>(),
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    userModel = moduleRef.get<typeof User, DeepMocked<typeof User>>(
      getModelToken(User, USERS_CONNECTION),
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should be an instance of UsersService', () => {
    expect(usersService).toBeInstanceOf(UsersService);
  });

  describe('findAll', () => {
    it('should be a method', () => {
      expect(usersService.findAll).toEqual(expect.any(Function));
    });
    it('should invoke findAll method of userModel', () => {
      usersService.findAll();
      expect(userModel.findAll).toHaveBeenCalled();
    });
    it('should return the result of invoking the findAll method of user model', () => {
      expect(userModel.findAll).toHaveReturnedWith(usersService.findAll());
    });
  });

  describe('findOne', () => {
    it('should be a method', () => {
      expect(usersService.findOne).toEqual(expect.any(Function));
    });
    it('should invoke findOne method of user model with a FindOptions argument', () => {
      const fakeId = 1;
      const fakeFindOptions: FindOptions = {
        where: {
          id: fakeId,
        },
      };
      usersService.findOne(fakeId);
      expect(userModel.findOne).toHaveBeenCalledWith(fakeFindOptions);
    });
    it('should return the result of invoking the findOne method of user model', () => {
      const fakeId = 1;
      expect(userModel.findOne).toHaveReturnedWith(
        usersService.findOne(fakeId),
      );
    });
  });

  describe('create', () => {
    it('should be a method', () => {
      expect(usersService.create).toEqual(expect.any(Function));
    });
    it('should invoke the create method of user model with a CreateUserDto argument', () => {
      const fakeCreateUserDto = new CreateUserDto();
      const plainFakeCreateUserDto = instanceToPlain(fakeCreateUserDto);
      usersService.create(fakeCreateUserDto);
      expect(userModel.create).toHaveBeenCalledWith(plainFakeCreateUserDto);
    });
    it('should return the result of invoking the create method of user model with a CreateUserDto argument', () => {
      const fakeCreateUserDto = new CreateUserDto();
      expect(userModel.create).toHaveReturnedWith(
        usersService.create(fakeCreateUserDto),
      );
    });
  });

  describe('remove', () => {
    it('should be a method', () => {
      expect(usersService.remove).toEqual(expect.any(Function));
    });
    it('should invoke the findOne method of an instance of UsersService with a number argument', () => {
      const fakeId = 1;
      const findOneSpy = jest.spyOn(usersService, 'findOne');
      usersService.findOne(fakeId);
      expect(findOneSpy).toHaveBeenCalledWith(fakeId);
    });
    it('should invoke the destroy method of an instance of user model if user exists', async () => {
      const fakeId = 1;
      const fakeUser = {
        id: fakeId,
        firstName: 'fake',
        lastName: 'user',
        destroy: jest.fn().mockResolvedValue(true),
      };
      userModel.findOne.mockResolvedValue(fakeUser as unknown as User);
      await usersService.remove(fakeId);
      expect(fakeUser.destroy).toHaveBeenCalled();
    });
    it('should not invoke the destroy method of an instance of user model if user exists', async () => {
      const fakeId = 1;
      const fakeUser = {
        id: fakeId,
        firstName: 'fake',
        lastName: 'user',
        destroy: jest.fn().mockResolvedValue(true),
      };
      userModel.findOne.mockResolvedValue(null);
      await usersService.remove(fakeId);
      expect(fakeUser.destroy).not.toHaveBeenCalled();
    });
  });
});
