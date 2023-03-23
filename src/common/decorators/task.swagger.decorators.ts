import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function CreateTaskSwaggerDocs() {
  return applyDecorators(
    ApiResponse({
      status: 400,
      schema: {
        example: {
          statusCode: 400,
          message: ['title must be a string', 'title should not be empty'],
          error: 'Bad Request',
        },
      },
    }),
    ApiResponse({
      status: 201,
      schema: {
        example: {
          title: 'Some task...',
          userId: 'uuid',
          id: 'uuid',
          createdAt: '2023-03-15T08:53:45.507Z',
          updatedAt: '2023-03-15T08:53:45.507Z',
          isDone: false,
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

export function GetUserTasksSwaggerDocs() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      schema: {
        example: {
          tasks: [
            {
              title: 'Some task...',
              userId: 'uuid',
              id: 'uuid',
              createdAt: '2023-03-15T08:53:45.507Z',
              updatedAt: '2023-03-15T08:53:45.507Z',
              isDone: false,
            },
            {
              title: 'Some task...',
              userId: 'uuid',
              id: 'uuid',
              createdAt: '2023-03-15T08:53:45.507Z',
              updatedAt: '2023-03-15T08:53:45.507Z',
              isDone: false,
            },
          ],
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

export function UpdateTaskSwaggerDocs() {
  return applyDecorators(
    ApiResponse({
      status: 401,
      schema: {
        example: {
          statusCode: 401,
          message: 'Unauthorized',
        },
      },
    }),
    ApiResponse({
      status: 200,
      schema: {
        example: {
          success: true,
        },
      },
    }),
  );
}
export function DeleteTaskSwaggerDocs() {
  return applyDecorators(
    ApiResponse({
      status: 401,
      schema: {
        example: {
          success: true,
        },
      },
    }),
  );
}
