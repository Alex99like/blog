import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';

export const User = createParamDecorator(
  (data: keyof UserEntity, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<ExpressRequestInterface>();

    if (!request.user) {
      return null;
    }

    if (data) {
      return request.user[data];
    }

    return request.user;
  },
);
