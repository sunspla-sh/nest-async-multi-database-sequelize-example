import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { USERS_CONNECTION } from '../constants';
import { User } from './user.model';
import { Cat } from '../cats/cat.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Cat], USERS_CONNECTION)],
})
export class UserModule {}
