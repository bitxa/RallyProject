import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CircuitsService } from './circuits.service';
import { CreateCircuitDto } from './dto/create-circuit.dto';
import { UpdateCircuitDto } from './dto/update-circuit.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('circuits')
@Controller('circuits')
export class CircuitsController {
  constructor(private readonly circuitsService: CircuitsService) {}

  @Post()
  create(@Body() createCircuitDto: CreateCircuitDto) {
    return this.circuitsService.create(createCircuitDto);
  }

  @Get()
  findAll() {
    return this.circuitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.circuitsService.findOne(id);
  }

  @Get('competition/:competition_id')
  findByCompetitionId(@Param('competition_id') competitionId: string) {
    return this.circuitsService.findByCompetitionId(competitionId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCircuitDto: UpdateCircuitDto) {
    return this.circuitsService.update(id, updateCircuitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.circuitsService.remove(id);
  }
}
