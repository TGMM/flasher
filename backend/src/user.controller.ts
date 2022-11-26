import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Res,
  Param,
  Body,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { query } from './db';
import { User } from './db/db';
import _ from 'lodash';
import { updateTableRow } from './db/utils';
import { AuthRequest, OptionalAuthRequest } from './middleware/auth';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

dotenv.config();

@Controller({
  path: 'users',
})
export class UserController {
  static getPublicUser = (user: User): Omit<User, 'password' | 'tokens'> => {
    const publicUser = _.omit(user, ['password', 'tokens']);
    return publicUser;
  };

  static addToken = async (userid: string) => {
    const token = jwt.sign({ id: userid }, process.env.JWT_SECRET!);

    const updateUserTokensStatement = `
    update users
    set tokens = tokens || $1
    where id = $2
    returning *
  `;

    const [user] = await query<User>(updateUserTokensStatement, [
      [token],
      userid,
    ]);

    return { user, token };
  };

  @Get()
  async getUsers(@Res() res: Response) {
    try {
      const selectUsersStatement = 'select * from users';

      const rows = await query<User>(selectUsersStatement);
      res.send(rows.map((user) => UserController.getPublicUser(user)));
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

  @Get('/:id')
  async getUser(@Res() res: Response, @Param('id') id: any) {
    try {
      const selectUserStatement = `select * from users where id = $1`;

      const [user] = await query<User>(selectUserStatement, [id]);

      if (!user) {
        return res
          .status(404)
          .send({ error: 'Could not find user with that id' });
      }
      res.send(UserController.getPublicUser(user));
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

  @Post()
  async createUser(@Body() body: any, @Res() res: Response) {
    try {
      const { username, password } = body;
      if (!username) {
        throw new Error('Username is required');
      }
      if (!password) {
        throw new Error('Password is required');
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertUserStatement = `
      insert into users(username, password)
      values($1, $2)
      returning *
    `;
      let rows;
      try {
        rows = await query<any>(insertUserStatement, [
          username,
          hashedPassword,
        ]);
      } catch (e) {
        res.status(409).send({ error: 'Username is already taken' });
        return;
      }

      if (!rows) {
        res.status(409).send({ error: 'Username is already taken' });
        return;
      }

      const { user, token } = await UserController.addToken(rows[0].id);

      res.status(201).send({
        user: UserController.getPublicUser(user),
        token,
      });
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }

  @Patch()
  async editUser(@Req() req: AuthRequest, @Res() res: Response) {
    try {
      const allowedUpdates = ['username', 'password'];
      if (req.body.username !== undefined) {
        const rows = await query(`select * from users where username = $1`, [
          req.body.username,
        ]);
        if (rows.length > 0) {
          return res.status(409).send({ error: 'Username is already taken' });
        }
      }
      if (req.body.password !== undefined) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      const user = await updateTableRow<User>(
        'users',
        req.user.id,
        allowedUpdates,
        req.body,
      );

      res.send(UserController.getPublicUser(user));
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }

  @Delete()
  async deleteUser(@Req() req: AuthRequest, @Res() res: Response) {
    try {
      const deleteUserStatement = `delete from users where id = $1 returning *`;

      const [user] = await query<User>(deleteUserStatement, [req.user.id]);

      if (!user) {
        return res
          .status(404)
          .send({ error: 'Could not find user with that id' });
      }
      res.send(UserController.getPublicUser(user));
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }

  // #region Login

  @Post('/login')
  async login(@Req() req: Request, @Res() res: Response) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        throw new Error('Username and password are required');
      }

      const selectUserStatement = `select * from users where username = $1`;

      const rows = await query<User>(selectUserStatement, [username]);
      const failedLoginError = { error: 'Username or password was incorrect' };

      if (!rows[0]) {
        return res.status(401).send(failedLoginError);
      }

      const isMatch = await bcrypt.compare(password, rows[0].password);
      if (!isMatch) {
        return res.status(401).send(failedLoginError);
      }

      const { user, token } = await UserController.addToken(
        rows[0].id.toString(),
      );

      res.send({
        user: UserController.getPublicUser(user),
        token,
      });
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }

  @Post('logout')
  async logout(@Req() req: OptionalAuthRequest, @Res() res: Response) {
    const tokens = req.user?.tokens?.filter((token) => token !== req.token);
    const setUserTokensStatement = `
      update users
      set tokens = $1
      where id = $2
    `;
    const [user] = await query<User>(setUserTokensStatement, [
      tokens,
      req.user?.id,
    ]);

    delete req.user;
    delete req.token;
    res.send(user);
  }

  @Post('logoutAll')
  async logoutAll(@Req() req: OptionalAuthRequest, @Res() res: Response) {
    const clearUserTokensStatement = `
    update users
    set tokens = '{}'
    where id = $1
  `;
    const [user] = await query(clearUserTokensStatement, [req.user?.id]);
    delete req.user;
    delete req.token;
    res.send(user);
  }

  // #endregion Login
}
