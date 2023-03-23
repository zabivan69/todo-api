import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { AppModule } from './app.module';
import { config } from './config/app.config';
import { swaggerConfig } from './config/swagger.config';

const { PORT, GRPC_APP_URL } = config;

async function start() {
  const logger = new Logger('SERVER');

  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: ['auth', 'task', 'user'],
      protoPath: [
        join('src/modules/Auth/auth.proto'),
        join('src/modules/Users/user.proto'),
        join('src/modules/Tasks/task.proto'),
      ],
      url: GRPC_APP_URL,
    },
  });

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, document);

  await app.startAllMicroservices();

  await app.listen(PORT, () => {
    logger.log(`Todo api successfully started on port ${PORT}`);
    logger.log(`GRPC microservice started on ${GRPC_APP_URL}`);
  });
}
start();
