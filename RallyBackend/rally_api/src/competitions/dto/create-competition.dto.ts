import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateCompetitionDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsDateString()
  readonly start_date: Date;

  @IsNotEmpty()
  @IsDateString()
  readonly end_date: Date;

  @IsNotEmpty()
  @IsString()
  readonly province: string;
}
