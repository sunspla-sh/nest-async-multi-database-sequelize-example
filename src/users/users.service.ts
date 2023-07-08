import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
  findAll() {
    return;
  }

  findOne(id: number) {
    return;
  }

  create(createUserDto: CreateUserDto) {
    return;
  }

  async remove(id: number) {
    return;
  }
}
