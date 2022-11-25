import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(4000);
}

dotenv.config();
if (!process.env.JWT_SECRET) {
  console.error('Invalid JWT secret');
  process.exit();
}

bootstrap();
