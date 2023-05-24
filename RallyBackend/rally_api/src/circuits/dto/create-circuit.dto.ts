import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
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
  readonly sponsor: Sponsor[];

  @IsNotEmpty()
  @IsNumber()
  readonly lenght: number;

  @IsNotEmpty()
  @IsString()
  readonly location: string;

  @IsNotEmpty()
  @IsArray()
  readonly categories: Category[];
}
