import { PartialType } from '@nestjs/swagger';
import { CreateCompetitorDto } from './create-competitor.dto';

export class UpdateCompetitorDto extends PartialType(CreateCompetitorDto) {}
