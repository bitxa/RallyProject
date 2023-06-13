import {
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  //ValidateNested,
} from 'class-validator';

export class CreateTeamResultDto {
  @IsNotEmpty()
  @IsString()
  readonly team_id: string;

  @IsNotEmpty()
  @IsString()
  readonly competition_id: string;

  @IsNotEmpty()
  @IsString()
  readonly circuit_id: string;

  @IsNotEmpty()
  @IsString()
  readonly category_id: string;

  @IsOptional()
  @IsEmpty()
  @IsArray()
  //@ValidateNested({ each: true })
  readonly circuit_times: Array<string>;

  @IsOptional()
  @IsEmpty()
  @IsNumber()
  readonly total_circuit_times: number;
}
