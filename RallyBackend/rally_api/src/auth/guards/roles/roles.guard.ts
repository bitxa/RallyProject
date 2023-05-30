import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/constants';
import { Role } from 'src/auth/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles: Role[] = this._reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const hasRole = roles.some((role) => role === user.role);

    return user && user.role && hasRole;
  }
}
