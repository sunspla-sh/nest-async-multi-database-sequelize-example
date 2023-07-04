import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { instanceToPlain } from 'class-transformer';
import { CATS_CONNECTION } from '../constants';
import { Cat } from './cat.model';
import { CreateCatDto } from './create-cat.dto';
import { CreateCatArrayDto } from './create-cat-array.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat, CATS_CONNECTION) private catModel: typeof Cat,
    private sequelize: Sequelize,
  ) {}

  findAll(): Promise<Cat[]> {
    return this.catModel.findAll();
  }

  findOne(id: number): Promise<Cat> {
    return this.catModel.findOne({
      where: {
        id,
      },
    });
  }

  create(createCatDto: CreateCatDto): Promise<Cat> {
    return this.catModel.create(instanceToPlain(createCatDto));
  }

  async createMany(createCatArrayDto: CreateCatArrayDto): Promise<void> {
    const catArray = createCatArrayDto.action;
    await this.sequelize.transaction(async (transaction) => {
      for (let i = 0; i < catArray.length; i++) {
        await this.catModel.create(instanceToPlain(catArray[i]), {
          transaction,
        });
      }
    });
  }

  async remove(id: number): Promise<void> {
    const cat = await this.findOne(id);
    if (cat !== null) {
      await cat.destroy();
    }
  }
}
