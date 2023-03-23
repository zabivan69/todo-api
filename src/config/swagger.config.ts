import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Todo API')
  .setDescription('')
  .setVersion('1.0')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    description: 'Add in your Bearer auth token here:',
  })
  .addTag('Auth', 'JWT Authentication')
  .addTag('Users', 'User Module')
  .addTag('Tasks', 'Tasks Module')
  .setTermsOfService('TOS')
  .build();
