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
    private competitionsModule: Model<TeamDocument>,
  ) {}

  async create(createCompetitionDto: CreateTeamDto): Promise<Team> {
    console.log(createCompetitionDto);
    return await this.competitionsModule.create(createCompetitionDto);
  }

  async findAll(): Promise<Team[]> {
    return await this.competitionsModule.find().populate('circuits');
  }

  async findOne(id: string): Promise<Team> {
    return await this.competitionsModule.findById(id).populate('circuits');
  }

  async update(id: string, updateCompetitionDto: UpdateTeamDto): Promise<Team> {
    return await this.competitionsModule
      .findByIdAndUpdate(id, updateCompetitionDto)
      .populate('circuits');
  }

  async remove(id: string): Promise<Team> {
    return await this.competitionsModule
      .findByIdAndDelete(id)
      .populate('circuits');
  }
}
