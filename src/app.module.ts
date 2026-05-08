import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { NotificationsModule } from './notifications/notifications.module';
import { OrdersModule } from './orders/orders.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { GraphqlModule } from './graphql/graphql.module';
import { GraphqlCodeFirstModule } from './graphql/code-first.module';

const useCodeFirst = process.env.GRAPHQL_STYLE === 'code-first';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,

      // ✅ Switch with GRAPHQL_STYLE=schema-first | code-first
      ...(useCodeFirst
        ? { autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql') }
        : { typePaths: [join(process.cwd(), 'src/graphql/schema/*.graphql')] }),

      playground: true,
    }),
    CoreModule,
    NotificationsModule,
    OrdersModule,
    ReceiptsModule,
    CategoryModule,
    ProductModule,
    ...(useCodeFirst ? [GraphqlCodeFirstModule] : [GraphqlModule]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
