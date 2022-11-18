import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from 'src/db/db';
import { query } from '../db';

export interface AuthRequest extends Request {
  user: User;
  token: string;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private optional = false) {}

  async use(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const authorizationHeader = req.get('Authorization');
      if (!authorizationHeader) {
        throw new Error();
      }

      const token = authorizationHeader.replace('Bearer ', '');
      const jwtPayload = jwt.verify(token, process.env.JWT_SECRET!);
      const id = (jwtPayload as jwt.JwtPayload).id;

      const [user] = await query<User>('select * from users where id = $1', [
        id,
      ]);
      if (!user.tokens?.includes(token)) {
        throw new Error();
      }

      req.user = user;
      req.token = token;
    } catch (e) {
      if (!this.optional) {
        return res.status(401).send({ error: 'Please authenticate' });
      }
    }
    next();
  }
}
