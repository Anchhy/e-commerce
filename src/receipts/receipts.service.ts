import { NotFoundException, Injectable } from '@nestjs/common';
import { NotificationsService } from '../notifications/notifications.service';

type Receipt = {
  receiptId: string;
  issuedAt: Date;
  name: string;
  price: number;
};

type CreateReceiptDto = {
  issuedAt: string | number | Date;
  name: string;
  price: number;
};

type UpdateReceiptDto = {
  issuedAt?: string | number | Date;
  name?: string;
  price?: number;
};

@Injectable()
export class ReceiptsService {
  private readonly receipts: Receipt[] = [];
  private nextId = 1;

  constructor(private readonly notifications: NotificationsService) {}

  create(dto: CreateReceiptDto): Receipt {
    const receipt: Receipt = {
      receiptId: String(this.nextId++),
      issuedAt: new Date(dto.issuedAt),
      name: dto.name,
      price: dto.price,
    };

    this.receipts.push(receipt);
    this.notifications.notify('receipt_created', {
      receiptId: receipt.receiptId,
      price: receipt.price,
    });

    return receipt;
  }

  update(receiptId: string, dto: UpdateReceiptDto): Receipt {
    const receipt = this.receipts.find((item) => item.receiptId === receiptId);

    if (!receipt) {
      throw new NotFoundException(`Receipt ${receiptId} not found`);
    }

    if (dto.issuedAt !== undefined) {
      receipt.issuedAt = new Date(dto.issuedAt);
    }

    if (dto.name !== undefined) {
      receipt.name = dto.name;
    }

    if (dto.price !== undefined) {
      receipt.price = dto.price;
    }

    this.notifications.notify('receipt_updated', {
      receiptId: receipt.receiptId,
      price: receipt.price,
    });

    return receipt;
  }

  findAll(): Receipt[] {
    return this.receipts;
  }
}
