import { Injectable, mixin, NestMiddleware, Type } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from '../../../db';
import { query } from '../db';
import * as dotenv from 'dotenv';

dotenv.config();

export interface AuthProps {
  user: User;
  token: string;
}

export interface AuthRequest extends Request, AuthProps {}
export interface OptionalAuthRequest extends Request, Partial<AuthProps> {}

export function AuthMiddlewareCreator(optional = false): Type<NestMiddleware> {
  @Injectable()
  class AuthMiddleware implements NestMiddleware {
    async use(req: AuthRequest, res: Response, next: NextFunction) {
      try {
        const authorizationHeader = req.get('Authorization');
        if (!authorizationHeader) {
          throw new Error();
        }

        const token = authorizationHeader.replace('Bearer ', '').trim();
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
        console.error(e);
        if (!optional) {
          return res.status(401).send({ error: `Please authenticate, ${e}` });
        }
      }
      next();
    }
  }

  return mixin(AuthMiddleware);
}
