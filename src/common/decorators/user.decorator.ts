import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const UserBody = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    let request = ctx.switchToHttp().getRequest();

    if (!request) {
      const context = GqlExecutionContext.create(ctx);

      request = context.getContext().req;
    }

    return request.user;
  },
);
