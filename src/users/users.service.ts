import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { instanceToPlain } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.model';
import { USERS_CONNECTION } from '../constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User, USERS_CONNECTION) private userModel: typeof User,
  ) {}

  findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(id: number): Promise<User> {
    const findOptions: FindOptions = {
      where: {
        id,
      },
    };
    return this.userModel.findOne(findOptions);
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(instanceToPlain(createUserDto));
  }

  async remove(id: number): Promise<void> {
    const foundUser = await this.findOne(id);
    if (foundUser) {
      foundUser.destroy();
    }
  }
}
