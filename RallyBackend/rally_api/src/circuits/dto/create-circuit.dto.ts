import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Category } from 'src/categories/schema/category.schema';
import { Sponsor } from 'src/sponsors/schema/sponsor.schema';

export class CreateCircuitDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  /*
   * @IsNotEmpty() replaced with with @IsEmpty()
   * A circuit can be created without any sponsors at the beginning.
   */
  @IsOptional()
  @IsEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Sponsor)
  readonly sponsor: Sponsor[];

  @IsNotEmpty()
  @IsNumber()
  readonly track_lenght: number;

  @IsNotEmpty()
  @IsString()
  readonly location: string;

  /*
   * @IsNotEmpty() replaced with with @IsEmpty()
   * A circuit can be created without any categories at the beginning.
   */
  @IsOptional()
  @IsEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Category)
  readonly categories: Category[];
}
