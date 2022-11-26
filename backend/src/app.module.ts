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
        { path: 'posts', method: RequestMethod.POST },
        { path: 'posts/:id', method: RequestMethod.PATCH },
        { path: 'posts', method: RequestMethod.DELETE },
        { path: 'subforums', method: RequestMethod.POST },
        { path: 'comments', method: RequestMethod.POST },
        { path: 'comments/:id', method: RequestMethod.PUT },
        { path: 'comments', method: RequestMethod.DELETE },
        { path: 'votes/:voteType', method: RequestMethod.POST },
        { path: 'moderators', method: RequestMethod.POST },
        { path: 'moderators', method: RequestMethod.DELETE },
      );
    consumer
      .apply(AuthMiddlewareCreator(true))
      .forRoutes(
        { path: 'posts', method: RequestMethod.GET },
        { path: 'posts/:id', method: RequestMethod.GET },
        { path: 'posts/:post_id', method: RequestMethod.GET },
      );
  }
}
