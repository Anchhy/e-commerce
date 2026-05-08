import { Injectable } from '@nestjs/common';

export interface IProduct {
  id: number;
  name: string;
  price: number;
  categoryId: number;
}

@Injectable()
export class ProductService {
  private products: IProduct[] = [
    { id: 1, name: 'Laptop', price: 999.99, categoryId: 1 },
    { id: 2, name: 'TypeScript Book', price: 39.99, categoryId: 2 },
    { id: 3, name: 'T-Shirt', price: 19.99, categoryId: 3 },
    { id: 4, name: 'Mouse', price: 29.99, categoryId: 1 },
  ];

  private nextId = 5;

  findAll(): IProduct[] {
    return this.products;
  }

  findOne(id: number): IProduct | undefined {
    return this.products.find((p) => p.id === id);
  }

  create(data: { name: string; price: number; categoryId: number }): IProduct {
    const newProduct: IProduct = {
      id: this.nextId++,
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(
    id: number,
    data: { name?: string; price?: number; categoryId?: number },
  ): IProduct | undefined {
    const product = this.findOne(id);
    if (product) {
      Object.assign(product, data);
    }
    return product;
  }

  delete(id: number): boolean {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return true;
    }
    return false;
  }

  findByCategory(categoryId: number): IProduct[] {
    return this.products.filter((p) => p.categoryId === categoryId);
  }
}
