import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function GetUserInfoSwaggerDocs() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      schema: {
        example: {
          id: 'some uuid',
          email: 'email@email.com',
          firstName: 'firstName',
          lastName: 'lastName',
          createdAt: '2023-03-15T08:53:45.507Z',
          updatedAt: '2023-03-15T08:53:45.507Z',
          password: 'some password hash',
        },
      },
    }),
    ApiResponse({
      status: 401,
      schema: {
        example: {
          statusCode: 401,
          message: 'Unauthorized',
        },
      },
    }),
  );
}
