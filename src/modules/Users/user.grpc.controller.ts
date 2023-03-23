import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AccessGrpcTokenGuard } from 'src/common/guards/accessToken.grpc.guard';
import { UserService } from './user.service';

@Controller()
export class UserGrpcController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessGrpcTokenGuard)
  @GrpcMethod('UserService', 'getUserInfo')
  async getUserInfo(data: any) {
    return await this.userService.getUserInfo(data.user.id);
  }
}
