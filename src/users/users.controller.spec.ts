import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: DeepMocked<UsersService>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
    })
      .useMocker(createMock)
      .compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService, DeepMocked<UsersService>>(
      UsersService,
    );
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should be an instance of UsersController', () => {
    expect(usersController).toBeInstanceOf(UsersController);
  });

  describe('findAll', () => {
    it('should be a method', () => {
      expect(usersController.findAll).toEqual(expect.any(Function));
    });
    it('should invoke the findAll method of an instance of UsersService', () => {
      usersController.findAll();
      expect(usersService.findAll).toHaveBeenCalled();
    });
    it('should return the result of invoking the findAll method of an instance of UsersService', () => {
      expect(usersService.findAll).toHaveReturnedWith(
        usersController.findAll(),
      );
    });
  });
  describe('findOne', () => {
    it('should be a method', () => {
      expect(usersController.findOne).toEqual(expect.any(Function));
    });
    it('should invoke the findOne method of an instance of UsersService with a number argument', () => {
      const fakeId = 1;
      usersController.findOne(fakeId);
      expect(usersService.findOne).toHaveBeenCalledWith(fakeId);
    });
    it('should return the result of invoking the findOne method of an instance of UsersService with a number argument', () => {
      const fakeId = 1;
      expect(usersService.findOne).toHaveReturnedWith(
        usersController.findOne(fakeId),
      );
    });
  });
  describe('create', () => {
    it('should be a method', () => {
      expect(usersController.create).toEqual(expect.any(Function));
    });
    it('should invoke the create method of an instance of UsersService with a CreateUserDto argument', () => {
      const fakeCreateUserDto = new CreateUserDto();
      usersController.create(fakeCreateUserDto);
      expect(usersService.create).toHaveBeenCalledWith(fakeCreateUserDto);
    });
    it('should return the result of invoking the create method of an instance of UsersService with a createUserDto argument', () => {
      const fakeCreateUserDto = new CreateUserDto();
      expect(usersService.create).toHaveReturnedWith(
        usersController.create(fakeCreateUserDto),
      );
    });
  });
  describe('remove', () => {
    it('should be a method', () => {
      expect(usersController.remove).toEqual(expect.any(Function));
    });
    it('should invoke the remove method of an instance of UsersService with a number argument', () => {
      const fakeId = 1;
      usersController.remove(fakeId);
      expect(usersService.remove).toHaveBeenCalledWith(fakeId);
    });
    it('should return the result of invoking the create method of an instance of UsersService with a number argument', () => {
      const fakeId = 1;
      expect(usersService.remove).toHaveReturnedWith(
        usersController.remove(fakeId),
      );
    });
  });
});
