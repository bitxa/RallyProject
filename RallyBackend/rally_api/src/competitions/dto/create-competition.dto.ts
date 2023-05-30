/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsDateString,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
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
  @IsDateString()
  readonly start_date: Date;

  @IsNotEmpty()
  @IsDateString()
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
  @ValidateNested({ each: true })
  @Type(() => Circuit)
  readonly circuits: Circuit[];
}
