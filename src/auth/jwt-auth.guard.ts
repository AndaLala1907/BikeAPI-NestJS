import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = unknown>(
    err: unknown,
    user: TUser | null,
    info: unknown,
    context: ExecutionContext,
  ): TUser {
    console.log('JwtAuthGuard enabled:', {
      err,
      user,
      info,
      contextType: context.getType(),
    });

    if (err) {
      if (err instanceof Error) {
        throw err;
      } else {
        throw new UnauthorizedException('Unknown error occurred.');
      }
    }

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
