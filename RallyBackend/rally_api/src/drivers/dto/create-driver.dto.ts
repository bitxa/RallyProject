import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Category } from 'src/categories/schema/category.schema';

export class CreateDriverDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly age: number;

  @IsNotEmpty()
  @IsString()
  readonly identification: string;

  @IsNotEmpty()
  @IsString()
  readonly blood_type: string;

  @IsNotEmpty()
  @IsString()
  readonly emergency_contact: string;

  @IsNotEmpty()
  @IsString()
  readonly province: string;

  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Category)
  readonly current_category: Category;
}
