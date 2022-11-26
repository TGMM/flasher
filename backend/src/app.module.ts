import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentController } from './comment.controller';
import { ForumPostContoller } from './forum-post.controller';
import { AuthMiddlewareCreator } from './middleware/auth';
import { ModeratorController } from './moderator.controller';
import { SubForumController } from './sub-forum.controller';
import { UserController } from './user.controller';
import { VoteController } from './vote.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    CommentController,
    ForumPostContoller,
    SubForumController,
    ModeratorController,
    VoteController,
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddlewareCreator())
      .forRoutes(
        { path: 'users', method: RequestMethod.PATCH },
        { path: 'users', method: RequestMethod.DELETE },
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
        'users/logout',
        'users/logoutAll',
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
