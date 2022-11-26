import { Controller, Delete, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { query } from './db';
import { AuthRequest } from './middleware/auth';
import type { ParsedQs } from 'qs';
import { Moderator } from '../../db';
import { selectModeratorsStatement, userIsModerator } from './db/utils';

@Controller({
  path: 'moderators',
})
export class ModeratorController {
  @Get()
  async getModerators(@Req() req: Request, @Res() res: Response) {
    try {
      const { username, subforum } = req.query;
      let whereClause = '';
      let whereClauseParams: (string | ParsedQs)[] = [];
      if (username && subforum) {
        whereClause = 'where u.username = $1 and sr.name = $2';
        Array.isArray(username)
          ? whereClauseParams.push(...username)
          : whereClauseParams.push(username);
        Array.isArray(subforum)
          ? whereClauseParams.push(...subforum)
          : whereClauseParams.push(subforum);
      } else if (username) {
        whereClause = 'where u.username = $1';
        whereClauseParams = Array.isArray(username)
          ? [...username]
          : [username];
      } else if (subforum) {
        whereClause = 'where sr.name = $1';
        whereClauseParams = Array.isArray(subforum)
          ? [...subforum]
          : [subforum];
      }

      const getModeratorsStatement = `${selectModeratorsStatement} ${whereClause}`;

      const rows = await query<Moderator>(
        getModeratorsStatement,
        whereClauseParams,
      );
      res.send(rows);
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

  @Post()
  async registerModerator(@Req() req: AuthRequest, @Res() res: Response) {
    try {
      const { username, subforum } = req.body;
      if (!username) {
        throw new Error('Must specify user');
      }
      if (!subforum) {
        throw new Error('Must specify subforum');
      }

      if ((await userIsModerator(req.user.username, subforum)) === false) {
        return res.status(403).send({
          error: `You do not have permissions to add a moderator in the subforum ${subforum}`,
        });
      }

      const insertModeratorStatement = `
        insert into moderators(user_id, subforum_id)
        values(
          (select id from users where username = $1),
          (select id from subforums where name = $2)
        ) returning *
      `;

      const [insertedModerator] = await query<Moderator>(
        insertModeratorStatement,
        [username, subforum],
      );

      res.status(201).send(insertedModerator);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }

  @Delete()
  async unregisterModerator(@Req() req: AuthRequest, @Res() res: Response) {
    try {
      const { username, subforum } = req.body;
      if (!username) {
        throw new Error('Must specify user');
      }
      if (!subforum) {
        throw new Error('Must specify subforum');
      }

      if ((await userIsModerator(req.user.username, subforum)) === false) {
        return res.status(403).send({
          error: `You do not have permissions to delete a moderator in the subforum '${subforum}'`,
        });
      }

      const deleteModeratorStatement = `
        delete from moderators
        where user_id = (select id from users where username = $1)
        and subforum_id = (select id from subforums where name = $2)
        returning *
      `;

      const [deletedModerator] = await query<Moderator>(
        deleteModeratorStatement,
        [username, subforum],
      );

      if (!deletedModerator) {
        return res.status(404).send({ error: 'Could not find that moderator' });
      }

      res.send(deletedModerator);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }
}
