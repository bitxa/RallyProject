import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private usersModule: Model<UsersDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersModule.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.usersModule.findById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersModule.findByIdAndUpdate(id, updateUserDto);
  }
}
