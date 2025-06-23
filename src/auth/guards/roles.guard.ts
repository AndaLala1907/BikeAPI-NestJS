import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Request } from 'express';

interface JwtPayload {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
}
interface RequestWithUser extends Request {
  user: JwtPayload;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndMerge<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    console.log('Required Roles:', requiredRoles);
    console.log('User from JWT:', user);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    if (!user || !user.role) {
      console.log('User or role not found in JWT!');
      return false;
    }

    return requiredRoles.includes(user.role);
  }
}
