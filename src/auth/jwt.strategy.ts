import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: string;
  role: string;
  email?: string;
  iat?: number;
  exp?: number;
}
// startegy for validating JWT tokens in protected routes
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // extract token from Authorization header(Bearer<token>)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() as () => string,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }
  // validate the decoded JWT payload
  // -must include user ID
  // can include role, email, iat, exp
  validate(payload: JwtPayload): JwtPayload {
    if (!payload.sub) {
      throw new UnauthorizedException('Invalid token payload');
    }
    console.log('VALIDATE payload JWT:', payload);
    return payload;
  }
}
