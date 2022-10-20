import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller()
export class ForumController {
  @Get()
  getForum(): void {
    return;
  }

  @Post()
  createForum(): void {
    return;
  }

  @Delete()
  deleteForum(): void {
    return;
  }
}
