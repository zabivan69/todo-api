import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function LoginSwaggerDocs() {
  return applyDecorators(
    ApiResponse({
      status: 201,
      schema: {
        example: 'Bearer ...',
      },
    }),
    ApiResponse({
      status: 401,
      schema: {
        example: {
          message: 'Wrong email or password',
        },
      },
    }),
    ApiResponse({
      status: 400,
      schema: {
        example: {
          statusCode: 400,
          message: [
            'password must be a string',
            'password should not be empty',
          ],
          error: 'Bad Request',
        },
      },
    }),
    ApiResponse({
      status: 400,
      schema: {
        example: {
          statusCode: 400,
          message: ['email must be a string', 'email should not be empty'],
          error: 'Bad Request',
        },
      },
    }),
  );
}

export function RegistrationSwaggerDocs() {
  return applyDecorators(
    ApiResponse({
      status: 201,
      schema: {
        example: 'Bearer ...',
      },
    }),
    ApiResponse({
      status: 400,
      schema: {
        example: {
          statusCode: 400,
          message: 'User with this email already exists',
          error: 'Bad Request',
        },
      },
    }),
    ApiResponse({
      status: 400,
      schema: {
        example: {
          statusCode: 400,
          message: ['email must be a string', 'email should not be empty'],
          error: 'Bad Request',
        },
      },
    }),
    ApiResponse({
      status: 400,
      schema: {
        example: {
          statusCode: 400,
          message: [
            'password is not strong enough',
            'password should not be empty',
          ],
          error: 'Bad Request',
        },
      },
    }),
  );
}

export function RefreshSwaggerDocs() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      schema: {
        example: 'Bearer ...',
      },
    }),
    ApiResponse({
      status: 403,
      schema: {
        example: {
          statusCode: 403,
          message: 'Forbidden',
        },
      },
    }),
  );
}
export function SignOutSwaggerDocs() {
  return applyDecorators(
    ApiResponse({
      status: 201,
      schema: {
        example: {
          success: true,
        },
      },
    }),
    ApiResponse({
      status: 403,
      schema: {
        example: {
          statusCode: 403,
          message: 'Forbidden',
        },
      },
    }),
  );
}
