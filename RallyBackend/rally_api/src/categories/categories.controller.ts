import {
  Controller,
  //Get,
  //Post,
  Body,
  //Patch,
  Param,
  //Delete,
  //UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';

/*
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/rol.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
*/

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  findAll() {
    return this.categoriesService.findAll();
  }

  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
