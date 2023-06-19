import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team, TeamDocument } from './schema/team.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name)
    private teamsModule: Model<TeamDocument>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    console.log(createTeamDto);
    return await this.teamsModule.create(createTeamDto);
  }

  async findAll(): Promise<Team[]> {
    return await this.teamsModule.find();
  }

  async findOne(id: string): Promise<Team> {
    return await this.teamsModule.findById(id);
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    console.log(updateTeamDto);
    return await this.teamsModule.findByIdAndUpdate(id, updateTeamDto);
  }

  async remove(id: string): Promise<Team> {
    return await this.teamsModule.findByIdAndDelete(id);
  }
}
