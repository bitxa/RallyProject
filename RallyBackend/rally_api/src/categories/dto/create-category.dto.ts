//import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  //ValidateNested,
} from 'class-validator';
//import { Team } from 'src/teams/schema/team.schema';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  readonly circuit_id: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsEmpty()
  @IsOptional()
  @IsString()
  readonly description: string;

  @IsArray()
  @IsEmpty()
  @IsOptional()
  @IsString({ each: true })
  readonly participantTeamsIds: string[];
  /*
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Team)
  readonly teams: Team[];
  */
}
