import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { config } from 'src/config/app.config';

const { JWT_ACCESS_SECRET } = config;

@Injectable()
export class AccessGrpcTokenGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const data = context.switchToRpc().getData();

      const [bearer, token] = data.accessToken?.split(' ') || [null, null];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException();
      }

      const user = this.jwtService.verify(token, {
        secret: JWT_ACCESS_SECRET,
      });

      delete data.accessToken;

      data.user = user;

      return true;
    } catch (err) {
      console.error(err);

      throw new UnauthorizedException();
    }
  }
}
