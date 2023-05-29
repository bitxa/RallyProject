/* eslint-disable prettier/prettier */
import {
  IsArray,
  IsDate,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
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

  /*
   * @IsNotEmpty() replaced with with @IsEmpty()
   * A competition can be created without any circuit at the beginning.
   */
  @IsOptional()
  @IsEmpty()
  @IsArray()
  readonly circuits: Circuit[];
}
