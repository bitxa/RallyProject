import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateSponsorDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  readonly logo: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  readonly website: string;

  @IsOptional()
  @IsString()
  readonly contact: string;
}
