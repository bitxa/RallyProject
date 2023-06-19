import { Injectable } from '@nestjs/common';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { UpdateCompetitionDto } from './dto/update-competition.dto';
import { Competition, CompetitionsDocument } from './schema/competition.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CompetitionsService {
  constructor(
    @InjectModel(Competition.name)
    private competitionsModule: Model<CompetitionsDocument>,
  ) {}

  async create(
    createCompetitionDto: CreateCompetitionDto,
  ): Promise<Competition> {
    console.log(createCompetitionDto);
    return await this.competitionsModule.create(createCompetitionDto);
  }

  async findAll(): Promise<Competition[]> {
    return await this.competitionsModule.find();
  }

  async findOne(id: string): Promise<Competition> {
    return await this.competitionsModule.findById(id);
  }

  async update(
    id: string,
    updateCompetitionDto: UpdateCompetitionDto,
  ): Promise<Competition> {
    return await this.competitionsModule.findByIdAndUpdate(
      id,
      updateCompetitionDto,
    );
  }

  async remove(id: string): Promise<Competition> {
    return await this.competitionsModule.findByIdAndDelete(id);
  }
}
