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
  create(createCompetitionDto: CreateCompetitionDto): Promise<Competition> {
    return this.competitionsModule.create(createCompetitionDto);
  }

  findAll() {
    return this.competitionsModule.find().populate('circuits');
  }

  findOne(id: number) {
    return this.competitionsModule.findById(id).populate('circuits');
  }

  update(id: number, updateCompetitionDto: UpdateCompetitionDto) {
    return this.competitionsModule
      .findByIdAndUpdate(id, updateCompetitionDto)
      .populate('circuits');
  }

  remove(id: number) {
    return this.competitionsModule.findByIdAndDelete(id).populate('circuits');
  }
}
