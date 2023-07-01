import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path'
import { ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

// dotenv.config({
//   path: path.resolve(
//     (process.env.NODE_ENV === 'production' ? '.production.env'
//       : (process.env.NODE_ENV === 'stage' ? '.stage.env' : '.development.env'))
//   )
// });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 전역 Pipe 등록.
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  await app.listen(3000);
}
bootstrap();
