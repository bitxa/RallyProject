import { SetMetadata } from '@nestjs/common';
import { Role } from '../rol.enum';
import { ROLES_KEY } from '../constants';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
