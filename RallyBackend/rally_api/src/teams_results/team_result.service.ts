import { Injectable } from '@nestjs/common';
import { CreateTeamResultDto } from './dto/create-team_result.dto';
import { UpdateTeamResultDto } from './dto/update-team_result.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamResult, TeamResultDocument } from './schema/team_result.schema';

@Injectable()
export class TeamResultService {
  constructor(
    @InjectModel(TeamResult.name)
    private teamResultModule: Model<TeamResultDocument>,
  ) {}
  async create(createTeamResultDto: CreateTeamResultDto): Promise<TeamResult> {
    return await this.teamResultModule.create(createTeamResultDto);
  }

  async findAll(): Promise<TeamResult[]> {
    return await this.teamResultModule.find();
  }

  async findOne(id: string): Promise<TeamResult> {
    return await this.teamResultModule.findById(id);
  }

  async update(
    id: string,
    updateTeamResultDto: UpdateTeamResultDto,
  ): Promise<TeamResult> {
    return await this.teamResultModule.findByIdAndUpdate(
      id,
      updateTeamResultDto,
    );
  }

  async remove(id: string): Promise<TeamResult> {
    return await this.teamResultModule.findByIdAndDelete(id);
  }
}
