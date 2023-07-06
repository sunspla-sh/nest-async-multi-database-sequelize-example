import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cat } from './cat.model';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CATS_CONNECTION } from '../constants';
import { User } from '../users/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Cat, User], CATS_CONNECTION)],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
