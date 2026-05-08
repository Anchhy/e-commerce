import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductService } from '../../product/product.service';
import { CategoryService } from '../../category/category.service';

type ProductParent = {
  categoryId: number;
};

@Resolver('Product')
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  @Query('products')
  products() {
    return this.productService.findAll();
  }

  @Query('product')
  product(@Args('id') id: string) {
    // GraphQL ID comes as string; convert if needed
    return this.productService.findOne(Number(id));
  }

  @Mutation('createProduct')
  createProduct(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('categoryId') categoryId: string,
  ) {
    return this.productService.create({
      name,
      price,
      categoryId: Number(categoryId),
    });
  }

  // ✅ relation: Product.category
  @ResolveField('category')
  category(@Parent() product: ProductParent) {
    return this.categoryService.findOne(product.categoryId);
  }
}
