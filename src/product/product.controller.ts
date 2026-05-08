import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import type { IProduct } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(): IProduct[] {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): IProduct | undefined {
    return this.productService.findOne(Number(id));
  }

  @Post()
  create(
    @Body() data: { name: string; price: number; categoryId: number },
  ): IProduct {
    return this.productService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: { name?: string; price?: number; categoryId?: number },
  ): IProduct | undefined {
    return this.productService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): { success: boolean } {
    const result = this.productService.delete(Number(id));
    return { success: result };
  }

  @Get('by-category/:categoryId')
  findByCategory(@Param('categoryId') categoryId: string): IProduct[] {
    return this.productService.findByCategory(Number(categoryId));
  }
}
