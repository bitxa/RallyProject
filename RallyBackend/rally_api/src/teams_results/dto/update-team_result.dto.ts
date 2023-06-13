import { PartialType } from '@nestjs/swagger';
import { CreateTeamResultDto } from './create-team_result.dto';

export class UpdateTeamResultDto extends PartialType(CreateTeamResultDto) {}
