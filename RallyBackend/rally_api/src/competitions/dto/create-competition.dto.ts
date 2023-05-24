import { IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Circuit } from 'src/circuits/schema/circuit.schema';

export class CreateCompetitionDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsDate()
  readonly start_date: Date;

  @IsNotEmpty()
  @IsDate()
  readonly end_date: Date;

  @IsNotEmpty()
  @IsString()
  readonly province: string;

  @IsNotEmpty()
  @IsArray()
  readonly circuits: Circuit[];
}
