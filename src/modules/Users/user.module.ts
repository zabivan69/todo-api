import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UserController } from './user.controller';
import { UserGrpcController } from './user.grpc.controller';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController, UserGrpcController],
  providers: [UserService, JwtService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
