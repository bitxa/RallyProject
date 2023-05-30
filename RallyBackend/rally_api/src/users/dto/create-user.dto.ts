import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/auth/rol.enum';

export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  readonly role: Role = Role.User;
}
