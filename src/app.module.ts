import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { USERS_CONNECTION, CATS_CONNECTION } from './constants';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // ConfigModule
    SequelizeModule.forRootAsync({
      name: USERS_CONNECTION,
      useFactory: () => ({
        dialect: 'mysql',
        name: USERS_CONNECTION,
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'test',
        database: 'nest_multi_sequelize',
        synchronize: true,
        autoLoadModels: true,
      }),
    }),
    SequelizeModule.forRootAsync({
      name: CATS_CONNECTION,
      useFactory: () => ({
        dialect: 'sqlite',
        name: CATS_CONNECTION,
        host: 'localhost',
        database: './dev.db',
        synchronize: true,
        autoLoadModels: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
