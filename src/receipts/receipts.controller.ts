import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';

@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Post()
  create(@Body() dto: any) {
    return this.receiptsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.receiptsService.update(id, dto);
  }

  @Get()
  findAll() {
    return this.receiptsService.findAll();
  }
}