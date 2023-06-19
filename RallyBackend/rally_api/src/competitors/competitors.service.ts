import { Injectable } from '@nestjs/common';
import { CreateCompetitorDto } from './dto/create-competitor.dto';
import { UpdateCompetitorDto } from './dto/update-competitor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Competitor, CompetitorDocument } from './schema/competitor.schema';

@Injectable()
export class CompetitorsService {
  constructor(
    @InjectModel(Competitor.name)
    private driversModule: Model<CompetitorDocument>,
  ) {}

  async create(createDriverDto: CreateCompetitorDto): Promise<Competitor> {
    return await this.driversModule.create(createDriverDto);
  }

  async findAll(): Promise<Competitor[]> {
    return await this.driversModule.find();
  }

  async findOne(id: string): Promise<Competitor> {
    return await this.driversModule.findById(id);
  }

  async update(
    id: string,
    updateDriverDto: UpdateCompetitorDto,
  ): Promise<Competitor> {
    return await this.driversModule.findByIdAndUpdate(id, updateDriverDto);
  }

  async remove(id: string): Promise<Competitor> {
    return await this.driversModule.findByIdAndDelete(id);
  }
}
