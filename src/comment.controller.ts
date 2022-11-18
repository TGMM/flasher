import {
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Req,
  Res,
  Put,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { query } from './db';
import { ForumPost, Subforum, Comment } from './db/db';
import { updateTableRow, userIsModerator } from './db/utils';
import { AuthRequest, OptionalAuthRequest } from './middleware/auth';

@Controller()
export class CommentController {
  static selectCommentStatement = `
    select c.id, c.author_id, c.post_id, c.parent_comment_id, sr.name subforum_name
    from comments c
    inner join posts p on c.post_id = p.id
    inner join subforums sr on p.subforum_id = sr.id
    where c.id = $1
  `;

  static selectAllCommentsStatement = `
    select
    c.id, c.body, c.post_id, c.parent_comment_id, c.created_at, c.updated_at,
    max(u.username) author_name,
    cast(coalesce(sum(cv.vote_value), 0) as int) votes,
    max(ucv.vote_value) has_voted
    from comments c
    left join users u on c.author_id = u.id
    left join comment_votes cv on c.id = cv.comment_id
    left join comment_votes ucv on ucv.comment_id = c.id and ucv.user_id = $1
    group by c.id
  `;

  @Get()
  async getComments(@Res() res: Response) {
    try {
      const selectCommentsStatement = `select * from comments`;
      const rows = await query(selectCommentsStatement);
      res.send(rows);
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

  @Get('/:post_id')
  async getComment(@Req() req: OptionalAuthRequest, @Res() res: Response) {
    try {
      const { post_id } = req.params;
      const selectPostStatement = `
        select
        p.id, p.type, p.title, p.body, p.created_at, p.updated_at,
        max(u.username) author_name,
        cast(coalesce(sum(pv.vote_value), 0) as int) votes,
        max(upv.vote_value) has_voted,
        max(sr.name) subforum_name
        from posts p
        left join users u on p.author_id = u.id
        inner join subforums sr on p.subforum_id = sr.id
        left join post_votes pv on p.id = pv.post_id
        left join post_votes upv on upv.post_id = p.id and upv.user_id = $1
        group by p.id
        having p.id = $2
      `;

      const selectCommentsStatement = `
        ${CommentController.selectAllCommentsStatement}
        having c.post_id = $2
        order by votes desc
      `;
      const user_id = req.user ? req.user.id : -1;
      const [post] = await query<ForumPost>(selectPostStatement, [
        user_id,
        post_id,
      ]);
      const comments = await query<Comment>(selectCommentsStatement, [
        user_id,
        post_id,
      ]);

      if (!post) {
        return res
          .status(404)
          .send({ error: 'Could not find post with that id' });
      }

      res.send({ post, comments });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

  @Post()
  async createComment(@Req() req: AuthRequest, @Res() res: Response) {
    try {
      const { body, post_id, parent_comment_id } = req.body;
      if (!body) {
        throw new Error('Must specify comment body');
      }
      if (!post_id) {
        throw new Error('Must specify post to comment on');
      }
      const insertCommentStatement = `
        insert into comments(body, author_id, post_id, parent_comment_id)
        values($1, $2, $3, $4)
        returning *
      `;
      const [{ id }] = await query<Comment>(insertCommentStatement, [
        body,
        req.user.id,
        post_id,
        parent_comment_id,
      ]);

      // Automatically upvote own comment
      const createVoteStatement = `insert into comment_votes values ($1, $2, $3)`;
      await query(createVoteStatement, [req.user.id, id, 1]);

      const selectInsertedCommentStatement = `
        ${CommentController.selectAllCommentsStatement}
        having c.id = $2
      `;

      const [comment] = await query<Comment>(selectInsertedCommentStatement, [
        req.user.id,
        id,
      ]);

      res.status(201).send(comment);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }

  @Put('/:id')
  async modifyComment(@Req() req: AuthRequest, @Res() res: Response) {
    try {
      const { id } = req.params;

      const [comment] = await query<Comment>(
        CommentController.selectCommentStatement,
        [id],
      );
      if (!comment) {
        return res
          .status(404)
          .send({ error: 'Could not find comment with that id' });
      }
      if (
        comment.author_id !== req.user.id &&
        (await userIsModerator(req.user.username, comment.subforum_name)) ===
          false
      ) {
        return res
          .status(403)
          .send({ error: 'You must the comment author to edit it' });
      }

      const updatedComment = await updateTableRow(
        'comments',
        Number(id),
        ['body'],
        req.body,
      );

      res.send(updatedComment);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }

  @Delete()
  async deleteComment(@Req() req: AuthRequest, @Res() res: Response) {
    try {
      const { id } = req.params;
      const [comment] = await query<Comment>(
        CommentController.selectCommentStatement,
        [id],
      );
      if (!comment) {
        return res
          .status(404)
          .send({ error: 'Could not find comment with that id' });
      }
      if (
        comment.author_id !== req.user.id &&
        (await userIsModerator(req.user.username, comment.subforum_name)) ===
          false
      ) {
        return res
          .status(403)
          .send({ error: 'You must be the comment author to delete it' });
      }

      // const deleteCommentStatement = `delete from comments where id = $1 returning *`
      // const { rows: [deletedComment] } = await query(deleteCommentStatement, [id])

      const setFieldsToNullStatement = `
        update comments
        set body = null,
            author_id = null
        where id = $1
        returning *
      `;

      const [deletedComment] = await query<Comment>(setFieldsToNullStatement, [
        id,
      ]);

      res.send(deletedComment);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }
}
