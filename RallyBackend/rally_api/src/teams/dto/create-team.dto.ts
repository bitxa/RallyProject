import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  readonly car_number: number;

  @IsOptional()
  readonly driver_id: string;

  @IsOptional()
  readonly copilot_id: string;
}
