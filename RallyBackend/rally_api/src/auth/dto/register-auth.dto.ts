import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from '../rol.enum';

export class RegisterAuthDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(12)
  password: string;

  @IsEnum(Role)
  role: Role = Role.ADMIN;
}
