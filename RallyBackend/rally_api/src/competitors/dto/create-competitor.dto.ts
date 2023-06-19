import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCompetitorDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  readonly age: number;

  @IsOptional()
  @IsString()
  readonly identification: string;

  @IsOptional()
  @IsString()
  readonly blood_type: string;

  @IsOptional()
  @IsString()
  readonly emergency_contact: string;

  @IsNotEmpty()
  @IsString()
  readonly province: string;

  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @IsNotEmpty()
  @IsString()
  readonly role: string;
}
