import { Inject, UseGuards } from '@nestjs/common';
import { Args, CONTEXT, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { config } from 'src/config/app.config';
import { getRefreshExpiresIn } from 'src/helpers/auth';
import { AuthService } from './auth.service';
// eslint-disable-next-line
import { CreateUserDto } from './dto/create.user.dto';
// eslint-disable-next-line
import { LoginUserDto } from './dto/login.user.dto';
import { LoggedUserOutput } from './outputs/login.output';
import { SignOutOutput } from './outputs/sign-out.output';

const { DOMAIN, REFRESH_TOKEN_EXPIRES_DAYS_IN_MILLISECONDS } = config;

@Resolver('Auth')
export class AuthResolver {
  constructor(
    @Inject(CONTEXT) private readonly context: any,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => LoggedUserOutput)
  async registration(@Args('registration') CreateUserDto: CreateUserDto) {
    const { accessToken, refreshToken } = await this.authService.registration(
      CreateUserDto,
    );
    const res = this.context.req.res;

    res.cookie('refreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: REFRESH_TOKEN_EXPIRES_DAYS_IN_MILLISECONDS,
      expires: getRefreshExpiresIn(),
      sameSite: 'none',
      domain: DOMAIN,
    });

    return { accessToken };
  }

  @Query(() => LoggedUserOutput)
  async login(@Args('login') LoginUserDto: LoginUserDto) {
    const { accessToken, refreshToken } = await this.authService.login(
      LoginUserDto,
    );
    const res = this.context.req.res;

    res.cookie('refreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: REFRESH_TOKEN_EXPIRES_DAYS_IN_MILLISECONDS,
      expires: getRefreshExpiresIn(),
      sameSite: 'none',
      domain: DOMAIN,
    });

    return { accessToken };
  }

  @UseGuards(RefreshTokenGuard)
  @Query(() => LoggedUserOutput)
  async refreshTokens() {
    const { req } = this.context;
    const { res } = req;

    const { accessToken, refreshToken } = await this.authService.refreshTokens(
      req.user,
    );

    res.cookie('refreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: REFRESH_TOKEN_EXPIRES_DAYS_IN_MILLISECONDS,
      expires: getRefreshExpiresIn(),
      sameSite: 'none',
      domain: DOMAIN,
    });

    return { accessToken };
  }

  @UseGuards(RefreshTokenGuard)
  @Query(() => SignOutOutput)
  async signOut() {
    const res = this.context.req.res;

    res.clearCookie('refreshToken');

    return { success: true };
  }
}
