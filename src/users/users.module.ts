import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { USERS_CONNECTION } from '../constants';
import { User } from './user.model';
import { Cat } from '../cats/cat.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Cat], USERS_CONNECTION)],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
