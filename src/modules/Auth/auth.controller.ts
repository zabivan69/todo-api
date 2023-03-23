import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response as Res } from 'express';
import {
  LoginSwaggerDocs,
  RefreshSwaggerDocs,
  RegistrationSwaggerDocs,
  SignOutSwaggerDocs,
} from 'src/common/decorators/auth.swagger.decorators';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { IExtendedRequestWithUser } from 'src/common/types/interfaces';
import { config } from 'src/config/app.config';
import { getRefreshExpiresIn } from 'src/helpers/auth';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto/login.user.dto';

const {
  DOMAIN,
  REFRESH_TOKEN_EXPIRES_DAYS_IN_MILLISECONDS,
  IS_SECURE_COOKIES,
} = config;

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @LoginSwaggerDocs()
  @Post('login')
  async login(
    @Body() userDto: LoginUserDto,
    @Response({ passthrough: true }) res: Res,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(userDto);

    res
      .cookie('refreshToken', refreshToken, {
        secure: IS_SECURE_COOKIES,
        httpOnly: true,
        maxAge: REFRESH_TOKEN_EXPIRES_DAYS_IN_MILLISECONDS,
        expires: getRefreshExpiresIn(),
        sameSite: 'none',
        domain: DOMAIN,
      })
      .send({ accessToken })
      .end();
  }

  @RegistrationSwaggerDocs()
  @Post('registration')
  async registration(
    @Body() userDto: CreateUserDto,
    @Response({ passthrough: true }) res: Res,
  ) {
    const { accessToken, refreshToken } = await this.authService.registration(
      userDto,
    );

    res
      .cookie('refreshToken', refreshToken, {
        secure: IS_SECURE_COOKIES,
        httpOnly: true,
        maxAge: REFRESH_TOKEN_EXPIRES_DAYS_IN_MILLISECONDS,
        expires: getRefreshExpiresIn(),
        sameSite: 'none',
        domain: DOMAIN,
      })
      .send({ accessToken })
      .end();
  }

  @RefreshSwaggerDocs()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(
    @Req() req: IExtendedRequestWithUser,
    @Response() res: Res,
  ) {
    const { accessToken, refreshToken } = await this.authService.refreshTokens(
      req.user,
    );

    res
      .cookie('refreshToken', refreshToken, {
        secure: IS_SECURE_COOKIES,
        httpOnly: true,
        maxAge: REFRESH_TOKEN_EXPIRES_DAYS_IN_MILLISECONDS,
        expires: getRefreshExpiresIn(),
        sameSite: 'none',
        domain: DOMAIN,
      })
      .send({ accessToken })
      .end();
  }

  @SignOutSwaggerDocs()
  @UseGuards(RefreshTokenGuard)
  @Post('sign-out')
  async signOut(@Response() res: Res) {
    res.clearCookie('refreshToken').send({ success: true }).end();
  }
}
