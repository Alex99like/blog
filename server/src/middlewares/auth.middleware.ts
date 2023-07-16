import { JWT_SECRET } from '@app/configs/config';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { UserService } from '@app/user/user.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const { id } = verify(token, JWT_SECRET) as { id: number };
      const user = await this.userService.findById(id);
      req.user = user;
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  }
}
