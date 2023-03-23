import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUserIdAndEmail } from 'src/common/types/interfaces';
import { config } from 'src/config/app.config';
import { User } from 'src/entities/user.entity';
import { UserService } from '../Users/user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto/login.user.dto';

const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  ACCESS_TOKEN_EXPIRES_HOURS,
  REFRESH_TOKEN_EXPIRES_DAYS,
} = config;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);

    return await this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    await this.userService.assertEmailNotExists(userDto.email);

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return await this.generateToken(user);
  }

  private async generateToken(user: User | IUserIdAndEmail) {
    const payload = { email: user.email, id: user.id };

    const [accessToken, refreshToken] = (
      await Promise.all([
        this.jwtService.signAsync(payload, {
          secret: JWT_ACCESS_SECRET,
          expiresIn: ACCESS_TOKEN_EXPIRES_HOURS + 'h',
        }),
        this.jwtService.signAsync(payload, {
          secret: JWT_REFRESH_SECRET,
          expiresIn: REFRESH_TOKEN_EXPIRES_DAYS + 'd',
        }),
      ])
    ).map((token) => 'Bearer ' + token);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.assertEmailExists(userDto.email);

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Wrong email or password',
    });
  }

  async refreshTokens(userInfo: IUserIdAndEmail) {
    return await this.generateToken(userInfo);
  }
}
