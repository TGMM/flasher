import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller()
export class ForumPostContoller {
  @Get()
  getForumPost(): void {
    return;
  }

  @Patch()
  editForumPost(): void {
    return;
  }

  @Post()
  createForumPost(): void {
    return;
  }

  @Delete()
  deleteForumPost(): void {
    return;
  }
}
