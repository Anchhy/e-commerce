import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import type { ICategory } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll(): ICategory[] {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): ICategory | undefined {
    return this.categoryService.findOne(Number(id));
  }

  @Post()
  create(@Body() data: { name: string }): ICategory {
    return this.categoryService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: { name: string },
  ): ICategory | undefined {
    return this.categoryService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): { success: boolean } {
    const result = this.categoryService.delete(Number(id));
    return { success: result };
  }
}
