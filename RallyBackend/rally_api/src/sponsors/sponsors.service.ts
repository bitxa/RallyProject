import { Injectable } from '@nestjs/common';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sponsor, SponsorDocument } from './schema/sponsor.schema';

@Injectable()
export class SponsorsService {
  constructor(
    @InjectModel(Sponsor.name)
    private sponsorsModule: Model<SponsorDocument>,
  ) {}
  async create(createSponsorDto: CreateSponsorDto): Promise<Sponsor> {
    return await this.sponsorsModule.create(createSponsorDto);
  }

  async findAll(): Promise<Sponsor[]> {
    return await this.sponsorsModule.find();
  }

  async findOne(id: number): Promise<Sponsor> {
    return await this.sponsorsModule.findById(id);
  }

  async update(
    id: number,
    updateSponsorDto: UpdateSponsorDto,
  ): Promise<Sponsor> {
    return await this.sponsorsModule.findByIdAndUpdate(id, updateSponsorDto);
  }

  async remove(id: number): Promise<Sponsor> {
    return await this.sponsorsModule.findByIdAndDelete(id);
  }
}
