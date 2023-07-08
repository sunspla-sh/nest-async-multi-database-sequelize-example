import { TestingModule, Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { UsersService } from './users.service';
import { User } from './user.model';
import { USERS_CONNECTION } from '../constants';

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
  });

  describe('findOne', () => {
    it('should be a method', () => {
      expect(usersService.findOne).toEqual(expect.any(Function));
    });
  });

  describe('create', () => {
    it('should be a method', () => {
      expect(usersService.create).toEqual(expect.any(Function));
    });
  });

  describe('remove', () => {
    it('should be a method', () => {
      expect(usersService.remove).toEqual(expect.any(Function));
    });
  });
});
