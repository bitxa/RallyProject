//import { Type } from 'class-transformer';
import {
  IsEmpty,
  //IsArray,
  //IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  //IsOptional,
  IsString,
  //ValidateNested,
} from 'class-validator';
//import { Category } from 'src/categories/schema/category.schema';
//import { Sponsor } from 'src/sponsors/schema/sponsor.schema';

export class CreateCircuitDto {
  @IsNotEmpty()
  @IsString()
  readonly competition_id: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsEmpty()
  @IsOptional()
  @IsString()
  readonly description: string;

  @IsEmpty()
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
