import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RefreshGrpcTokenGuard } from 'src/common/guards/refreshToken.grpc.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto/login.user.dto';

@Controller()
export class AuthGrpcController {
  constructor(private authService: AuthService) {}

  @GrpcMethod('AuthService', 'login')
  async login(data: LoginUserDto) {
    const { accessToken, refreshToken } = await this.authService.login(data);

    return { accessToken, refreshToken };
  }

  @GrpcMethod('AuthService', 'registration')
  async registration(data: CreateUserDto) {
    const { accessToken, refreshToken } = await this.authService.registration(
      data,
    );

    return { accessToken, refreshToken };
  }

  @UseGuards(RefreshGrpcTokenGuard)
  @GrpcMethod('AuthService', 'refreshTokens')
  async refreshTokens(data: any) {
    const { accessToken, refreshToken } = await this.authService.refreshTokens(
      data.user,
    );

    return { accessToken, refreshToken };
  }

  @UseGuards(RefreshGrpcTokenGuard)
  @GrpcMethod('AuthService', 'signOut')
  async signOut() {
    return { success: true };
  }
}
