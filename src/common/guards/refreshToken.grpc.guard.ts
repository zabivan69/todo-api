import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { config } from 'src/config/app.config';

const { JWT_REFRESH_SECRET } = config;

@Injectable()
export class RefreshGrpcTokenGuard extends AuthGuard('jwt-refresh') {
  constructor(private jwtService: JwtService) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const data = context.switchToRpc().getData();

      const [bearer, token] = data.refreshToken?.split(' ') || [null, null];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException();
      }

      const user = this.jwtService.verify(token, {
        secret: JWT_REFRESH_SECRET,
      });

      delete data.refreshToken;

      data.user = user;

      return true;
    } catch (err) {
      console.error(err);

      throw new UnauthorizedException();
    }
  }
}
