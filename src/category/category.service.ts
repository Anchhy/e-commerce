import { Injectable } from '@nestjs/common';

export interface ICategory {
  id: number;
  name: string;
}

@Injectable()
export class CategoryService {
  private categories: ICategory[] = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Books' },
    { id: 3, name: 'Clothing' },
  ];

  private nextId = 4;

  findAll(): ICategory[] {
    return this.categories;
  }

  findOne(id: number): ICategory | undefined {
    return this.categories.find((c) => c.id === id);
  }

  create(data: { name: string }): ICategory {
    const newCategory: ICategory = {
      id: this.nextId++,
      name: data.name,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(id: number, data: { name: string }): ICategory | undefined {
    const category = this.findOne(id);
    if (category) {
      category.name = data.name;
    }
    return category;
  }

  delete(id: number): boolean {
    const index = this.categories.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.categories.splice(index, 1);
      return true;
    }
    return false;
  }
}
