/* eslint-disable prettier/prettier */
//import { Type } from 'class-transformer';
import {
  IsEmpty,
  //IsArray,
  //IsEmpty,
  IsNotEmpty,
  IsOptional,
  //IsOptional,
  IsString,
  //ValidateNested,
} from 'class-validator';

import { Competitor } from 'src/competitors/schema/competitor.schema';
//import { TeamResult } from 'src/teams_results/schema/team_result.schema';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly car_number: string;

  @IsEmpty()
  @IsOptional()
  readonly driver: Competitor;

  @IsEmpty()
  @IsOptional()
  readonly copilot: Competitor;

  /*
  @IsEmpty()
  readonly current_category: string;
  @IsOptional()
  @IsEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeamResult)
  readonly all_results: TeamResult[];
  */
}
