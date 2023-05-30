import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesDocument, Category } from './schema/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private categoriesModule: Model<CategoriesDocument>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoriesModule.create(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoriesModule.find().populate('drivers');
  }

  async findOne(id: string): Promise<Category> {
    return await this.categoriesModule.findById(id).populate('drivers');
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoriesModule
      .findByIdAndUpdate(id, updateCategoryDto)
      .populate('drivers');
  }

  async remove(id: string): Promise<Category> {
    return await this.categoriesModule
      .findByIdAndDelete(id)
      .populate('drivers');
  }
}
