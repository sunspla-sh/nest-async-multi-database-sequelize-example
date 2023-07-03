import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { USERS_CONNECTION, CATS_CONNECTION } from './constants';
import { EnvVariables, validateEnvVariables } from './env.validate';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnvVariables,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      name: USERS_CONNECTION,
      useFactory: (configService: ConfigService<EnvVariables>) => ({
        dialect: configService.get('USER_DATABASE_DIALECT'),
        name: USERS_CONNECTION,
        host: configService.get('USER_DATABASE_HOST'),
        port: configService.get('USER_DATABASE_PORT'),
        username: configService.get('USER_DATABASE_USERNAME'),
        password: configService.get('USER_DATABASE_PASSWORD'),
        database: configService.get('USER_DATABASE_DBNAME'),
        synchronize: true,
        autoLoadModels: true,
      }),
      inject: [ConfigService],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      name: CATS_CONNECTION,
      useFactory: (configService: ConfigService<EnvVariables>) => ({
        dialect: configService.get('CAT_DATABASE_DIALECT'),
        name: CATS_CONNECTION,
        database: configService.get('CAT_DATABASE_DBNAME'),
        synchronize: true,
        autoLoadModels: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
