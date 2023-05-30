import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Driver } from 'src/drivers/schema/driver.schema';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly circuit: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Driver)
  readonly winning_drivers: Driver[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Driver)
  readonly drivers: Driver[];
}
