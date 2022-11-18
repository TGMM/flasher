import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddlewareCreator } from './middleware/auth';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddlewareCreator())
      .forRoutes(
        { path: 'users', method: RequestMethod.PATCH },
        { path: 'users', method: RequestMethod.DELETE },
        'users/login',
        'users/logout',
        'users/logoutAll',
      );
  }
}
