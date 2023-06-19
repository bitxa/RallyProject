import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateSponsorDto {
  @IsNotEmpty()
  @IsString()
  readonly circuit_id: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  readonly logo: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  readonly website: string;

  @IsOptional()
  @IsString()
  readonly contact: string;
}
