import { Module } from '@nestjs/common';
import { CategoryCodeFirstResolver } from './resolvers/category.codefirst.resolver';
import { ProductCodeFirstResolver } from './resolvers/product.codefirst.resolver';
import { CategoryModule } from '../category/category.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [CategoryModule, ProductModule],
  providers: [CategoryCodeFirstResolver, ProductCodeFirstResolver],
})
export class GraphqlCodeFirstModule {}
