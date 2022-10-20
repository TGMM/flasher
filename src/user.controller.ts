import { Controller, Get, Patch, Post, Delete } from '@nestjs/common';

@Controller()
export class UserController {
  @Get()
  getUser(): void {
    return;
  }

  @Patch()
  editUser(): void {
    return;
  }

  @Post()
  createUser(): void {
    return;
  }

  @Delete()
  deleteUser(): void {
    return;
  }
}
