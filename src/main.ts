import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from './env.validate';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService<EnvVariables> = app.get(ConfigService);
  const port = configService.get('APPLICATION_PORT');
  await app.listen(port);
}
bootstrap();
