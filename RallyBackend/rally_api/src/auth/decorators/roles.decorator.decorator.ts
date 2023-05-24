import { SetMetadata } from '@nestjs/common';
import { Role } from '../rol.enum';

export const Roles = (...roles: Role[]) =>
  SetMetadata('roles.decorator', roles);
