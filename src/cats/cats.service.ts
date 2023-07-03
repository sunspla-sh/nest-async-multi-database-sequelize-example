import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CATS_CONNECTION } from '../constants';
import { Cat } from './cat.model';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat, CATS_CONNECTION) private catModel: typeof Cat,
  ) {}

  findAll(): Promise<Cat[]> {
    return this.catModel.findAll();
  }

}
