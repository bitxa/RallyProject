//import { Type } from 'class-transformer';
import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCircuitDto {
  @IsNotEmpty()
  @IsString()
  readonly competition_id: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsNumber()
  readonly track_lenght: number;

  @IsNotEmpty()
  @IsString()
  readonly location: string;
  /*
   * @IsNotEmpty() replaced with with @IsEmpty()
   * A circuit can be created without any sponsors at the beginning.
  
  @IsOptional()
  @IsEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Sponsor)
  readonly sponsor: Sponsor[];
 */

  /*
   * @IsNotEmpty() replaced with with @IsEmpty()
   * A circuit can be created without any categories at the beginning.

  @IsOptional()
  @IsEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Category)
  readonly categories: Category[];
  */
}
