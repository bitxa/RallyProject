import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
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

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Sponsor)
  readonly sponsor: Sponsor[];

  @IsNotEmpty()
  @IsNumber()
  readonly lenght: number;

  @IsNotEmpty()
  @IsString()
  readonly location: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Category)
  readonly categories: Category[];
}
