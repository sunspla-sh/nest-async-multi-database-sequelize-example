import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cat } from './cat.model';

@Module({
  imports: [SequelizeModule.forFeature([Cat])],
  controllers: [],
  providers: [],
})
export class CatsModule {}
