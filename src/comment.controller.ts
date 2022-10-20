import { Controller, Get, Patch, Post, Delete } from '@nestjs/common';

@Controller()
export class CommentController {
  @Get()
  getComment(): void {
    return;
  }

  @Delete()
  deleteComment(): void {
    return;
  }

  @Patch()
  modifyComment(): void {
    return;
  }

  @Post()
  uploadComment(): void {
    return;
  }
}
