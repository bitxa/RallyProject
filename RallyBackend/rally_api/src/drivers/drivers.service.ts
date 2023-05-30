import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver, DriverDocument } from './schema/driver.schema';

@Injectable()
export class DriversService {
  constructor(
    @InjectModel(Driver.name)
    private driversModule: Model<DriverDocument>,
  ) {}
  async create(createDriverDto: CreateDriverDto): Promise<Driver> {
    return await this.driversModule.create(createDriverDto);
  }

  async findAll(): Promise<Driver[]> {
    return await this.driversModule.find().populate('categories');
  }

  async findOne(id: number): Promise<Driver> {
    return await this.driversModule.findById(id).populate('categories');
  }

  async update(id: number, updateDriverDto: UpdateDriverDto): Promise<Driver> {
    return await this.driversModule
      .findByIdAndUpdate(id, updateDriverDto)
      .populate('categories');
  }

  async remove(id: number): Promise<Driver> {
    return await this.driversModule
      .findByIdAndDelete(id)
      .populate('categories');
  }
}
