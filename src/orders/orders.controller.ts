import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() orderDto: any) {
    return this.ordersService.createOrder(orderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
}