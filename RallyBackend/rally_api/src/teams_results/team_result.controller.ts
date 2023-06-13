import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TeamResultService } from './team_result.service';
import { CreateTeamResultDto } from './dto/create-team_result.dto';
import { UpdateTeamResultDto } from './dto/update-team_result.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/auth/rol.enum';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@ApiTags('team_results')
@Controller('team_results')
export class TeamResultController {
  constructor(private readonly teamResultService: TeamResultService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() createTeamResultDto: CreateTeamResultDto) {
    return this.teamResultService.create(createTeamResultDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.teamResultService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.teamResultService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updateTeamResultDto: UpdateTeamResultDto,
  ) {
    return this.teamResultService.update(id, updateTeamResultDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.teamResultService.remove(id);
  }
}
