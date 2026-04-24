import { Injectable } from '@nestjs/common';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class OrdersService {
  private readonly orders: any[] = [];
  private nextId = 1;

  constructor(private readonly notifications: NotificationsService) {}

  createOrder(orderDto: any) {
    const order = {
      orderId: String(this.nextId++),
      ...orderDto,
      createdAt: new Date().toISOString(),
    };

    this.orders.push(order);
    this.notifications.notify('order_created', { order });

    return { status: 'Order accepted', order };
  }

  findAll() {
    return this.orders;
  }
}