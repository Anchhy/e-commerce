# GraphQL Practice — NestJS (Schema-first + Code-first)

## Summary
This project added GraphQL to the existing E-Commerce demo (Category + Product) in two styles:
- Schema-first: `.graphql` schema + resolvers
- Code-first: Nest GraphQL types/inputs + resolvers (auto-generated schema)

Both approaches include Query, Mutation, and a relation field `Product.category`.

## Setup & Packages
Installed / used:
- `@nestjs/graphql`, `graphql`, `@nestjs/apollo`, `@apollo/server`, `@as-integrations/express5`

AppModule is configurable to run either style using the `GRAPHQL_STYLE` environment variable.

## How to run
Schema-first (default):
```bash
# default (PORT=3000)
npm run start:dev
```
Code-first (auto schema generation):
```bash
# runs on PORT 3001 here to avoid conflicts
GRAPHQL_STYLE=code-first PORT=3001 npm run start:dev
```

Open Playground (Schema-first): http://localhost:3000/graphql
Open Playground (Code-first): http://localhost:3001/graphql

## Important files
- Schema file (schema-first): `src/graphql/schema/shop.graphql`
- Schema (generated, code-first): `src/graphql/schema.gql`

- Schema-first resolvers:
  - `src/graphql/resolvers/category.resolver.ts`
  - `src/graphql/resolvers/product.resolver.ts`

- Code-first types / inputs:
  - `src/graphql/types/category.type.ts`
  - `src/graphql/types/product.type.ts`
  - `src/graphql/inputs/create-product.input.ts`

- Code-first resolvers:
  - `src/graphql/resolvers/category.codefirst.resolver.ts`
  - `src/graphql/resolvers/product.codefirst.resolver.ts`

- GraphQL wiring / switch:
  - `src/app.module.ts`
  - `src/graphql/graphql.module.ts` (schema-first)
  - `src/graphql/code-first.module.ts` (code-first)

- Domain REST services (existing, exported for resolvers):
  - `src/category/*` (module/controller/service)
  - `src/product/*` (module/controller/service)

## Example GraphQL operations
Query products with category:

```graphql
query {
  products {
    id
    name
    price
    category { id name }
  }
}
```

Create category (mutation):

```graphql
mutation {
  createCategory(name: "Gadgets") { id name }
}
```

Create product (schema-first signature):
```graphql
mutation {
  createProduct(name: "New Mouse", price: 25.5, categoryId: 1) {
    id
    name
  }
}
```

Create product (code-first uses `input`):
```graphql
mutation {
  createProduct(input: { name: "New Mouse", price: 25.5, categoryId: 1 }) {
    id
    name
  }
}
```

## Notes & fixes applied
- Added simple in-memory `CategoryService` and `ProductService` and REST controllers for quick testing.
- Resolvers resolve `Product.category` by calling `CategoryService.findOne(categoryId)`.
- Fixed TypeScript decorator metadata issues by using `import type` in controllers and adding small type guards.
- Installed `@as-integrations/express5` to satisfy GraphQL integration.

## Deliverables / Commits
Suggested commit messages that were used or should be used:
- "schema-first working"
- "code-first working"

## Next steps (optional)
- Add `productsByCategory(categoryId: ID!)` query (schema-first + code-first).
- Add `class-validator` decorators to inputs and enable Nest `ValidationPipe`.
- Replace in-memory services with a persistent DB (TypeORM / Prisma).

---
Report generated automatically in the repo. If you want, I can add the `productsByCategory` query and validation now.
