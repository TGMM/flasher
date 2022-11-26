import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const ENV_VARIABLES = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    PG_HOST: process.env.PG_HOST,
    PG_PORT: process.env.PG_PORT,
    PG_DBNAME: process.env.PG_DBNAME,
    PG_USER: process.env.PG_USER,
    PG_PASSWORD: process.env.PG_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
  };

  Object.entries(ENV_VARIABLES).forEach((entry) => {
    const [key, val] = entry;
    if (key == 'DATABASE_URL') {
      if (ENV_VARIABLES.NODE_ENV === 'production' && !val) {
        console.error(`Invalid ENV_VARIABLE ${key}`);
        process.exit();
      }

      return;
    }
    if (!val) {
      console.error(`Invalid ENV_VARIABLE ${key}`);
      process.exit();
    }
  });

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(4000);
}

bootstrap();
