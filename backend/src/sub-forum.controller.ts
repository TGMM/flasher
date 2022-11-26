import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { query } from './db';
import { Subforum } from './db/db';
import { AuthRequest } from './middleware/auth';

@Controller({
  path: 'subforums',
})
export class SubForumController {
  @Get()
  async getForums(@Res() res: Response) {
    try {
      const selectSubforumsStatement = `select * from subforums`;
      const rows = await query<Subforum>(selectSubforumsStatement);
      res.send(rows);
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

  @Get('/:name')
  async getForum(@Req() req: Request, @Res() res: Response) {
    try {
      const { name } = req.params;
      const selectSubforumStatement = `select * from subforums where name = $1`;
      const [subforum] = await query<Subforum>(selectSubforumStatement, [name]);

      if (!subforum) {
        res
          .status(404)
          .send({ error: 'Could not find subforum with that name' });
      }

      res.send(subforum);
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

  @Post()
  async createForum(@Req() req: AuthRequest, @Res() res: Response) {
    try {
      const { name, description } = req.body;

      const nameRegex = new RegExp('^[a-z0-9]+$', 'i');

      if (!nameRegex.test(name)) {
        throw new Error(
          'Subforum name must consist only of alphanumeric characters, and must have length at least 1',
        );
      }

      const insertSubforumStatement = `
        insert into subforums(name, description)
        values($1, $2)
        returning *
      `;

      let subforum;
      try {
        [subforum] = await query<Subforum>(insertSubforumStatement, [
          name,
          description,
        ]);
      } catch (e) {
        res
          .status(409)
          .send({ error: 'A subforum with that name already exists' });
      }

      const insertModeratorStatement = `
        insert into moderators(user_id, subforum_id)
        values($1, $2)
      `;

      await query<Subforum>(insertModeratorStatement, [
        req.user.id,
        subforum?.id,
      ]);

      res.send(subforum);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }
}
