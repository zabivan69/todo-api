import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AccessTokenStrategy } from '../../common/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from '../../common/strategies/refresh-token.strategy';
import { UserModule } from '../Users/user.module';
import { AuthController } from './auth.controller';
import { AuthGrpcController } from './auth.grpc.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    JwtService,
    AuthResolver,
  ],
  controllers: [AuthController, AuthGrpcController],
  imports: [
    UserModule,
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(__dirname, 'auth.proto'),
        },
      },
    ]),
  ],
})
export class AuthModule {}
