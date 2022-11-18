import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(4000);
}

if (!process.env.JWT_SECRET) {
  console.error('Invalid JWT secret');
  process.exit();
}

bootstrap();
