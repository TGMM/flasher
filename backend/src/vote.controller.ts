import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { query } from './db';
import { AuthRequest } from './middleware/auth';
import { Vote } from '../../db';

@Controller({
  path: 'votes',
})
export class VoteController {
  static checkVoteType = (voteType: string) => {
    const types = ['post', 'comment'];
    let error;
    if (!types.includes(voteType)) {
      error = 'Invalid vote type';
    }
    return { voteType, error };
  };

  static checkVoteValid = async (
    item_id: number,
    vote_value: string | number,
    vote_type: string,
  ) => {
    let status;
    let error;
    if (!/^\d+$/.test(item_id.toString())) {
      status = 400;
      error = `Invalid ${vote_type} id`;
    } else if (
      ![-1, 0, 1].includes(
        typeof vote_value == 'number' ? vote_value : parseInt(vote_value),
      )
    ) {
      status = 400;
      error = 'Invalid vote value';
    } else {
      const [item] = await query(`select * from ${vote_type}s where id = $1`, [
        item_id,
      ]);
      if (!item) {
        status = 404;
        error = `Could not find ${vote_type} with that id`;
      }
    }

    return { status, error };
  };

  @Get('/:voteType')
  async getVotes(@Req() req: Request, @Res() res: Response) {
    try {
      const { voteType, error } = VoteController.checkVoteType(
        req.params.voteType,
      );
      if (error) {
        return res.status(400).send({ error });
      }
      const selectPostVotes = `select * from ${voteType}_votes`;
      const rows = await query(selectPostVotes);
      res.send(rows);
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

  @Post('/:voteType')
  async submitVote(@Req() req: AuthRequest, @Res() res: Response) {
    try {
      const { voteType, error: voteTypeError } = VoteController.checkVoteType(
        req.params.voteType,
      );
      if (voteTypeError) {
        return res.status(400).send({ error: voteTypeError });
      }
      const { item_id, vote_value } = req.body;

      const { status, error } = await VoteController.checkVoteValid(
        item_id,
        vote_value,
        voteType,
      );
      if (error) {
        return res.status(status ?? 500).send({ error });
      }

      const insertItemVoteStatement = `
        insert into ${voteType}_votes
        values($1, $2, $3) returning *
      `;
      let item_vote;
      try {
        const [vote] = await query<Vote>(insertItemVoteStatement, [
          req.user.id,
          item_id,
          vote_value,
        ]);
        item_vote = vote;
      } catch (e) {
        const updateItemVoteStatement = `
          update ${voteType}_votes
          set vote_value = $1
          where user_id = $2 and ${voteType}_id = $3
          returning *
        `;

        const [vote] = await query<Vote>(updateItemVoteStatement, [
          vote_value,
          req.user.id,
          item_id,
        ]);
        item_vote = vote;
      }

      res.status(201).send(item_vote);
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }
}
