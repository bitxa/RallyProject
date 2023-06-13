//import { Type } from 'class-transformer';
import {
  IsEmpty,
  IsNotEmpty,
  //IsNumber,
  IsOptional,
  IsString,
  //ValidateNested,
} from 'class-validator';
//import { Category } from 'src/categories/schema/category.schema';

export class CreateCompetitorDto {
  @IsNotEmpty()
  @IsString()
  readonly team_id: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsEmpty()
  @IsOptional()
  @IsString()
  readonly age: number;

  @IsEmpty()
  @IsOptional()
  @IsString()
  readonly identification: string;

  @IsEmpty()
  @IsOptional()
  @IsString()
  readonly blood_type: string;

  @IsEmpty()
  @IsOptional()
  @IsString()
  readonly emergency_contact: string;

  @IsNotEmpty()
  @IsString()
  readonly province: string;

  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @IsNotEmpty()
  @IsString()
  readonly role: string;
  /*
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Category)
  readonly current_category: Category;
  */
}
