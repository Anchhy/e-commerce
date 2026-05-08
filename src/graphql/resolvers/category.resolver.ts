import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from '../../category/category.service';

@Resolver('Category') // <-- matches schema type name
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query('categories') // <-- matches schema query name
  categories() {
    return this.categoryService.findAll();
  }

  @Mutation('createCategory')
  createCategory(@Args('name') name: string) {
    return this.categoryService.create({ name });
  }
}
