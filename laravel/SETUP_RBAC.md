# TP6 - Authentication & Authorization RBAC Lab

This Laravel project implements a complete **Role-Based Access Control (RBAC)** system with web and API authentication.

## Setup & Installation

### Part 0: Prerequisites  
Ensure Laravel Breeze is installed for session-based auth:

```bash
composer require laravel/breeze --dev
php artisan breeze:install
php artisan migrate
npm install && npm run dev
```

### Part 1: Install Passport for API Token Auth

Inside your app container:

```bash
composer require laravel/passport
php artisan migrate
php artisan passport:install
```

### Part 2: Run Migrations & Seeders

```bash
# Run all migrations (RBAC tables will be created)
php artisan migrate

# Seed roles, permissions, and test users
php artisan db:seed
```

This creates:
- **3 Roles**: admin, manager, staff
- **7 Permissions**: users.manage, products.create/update/delete, categories.create/update/delete
- **4 Test Users**:
  - `admin@example.com` / `password`
  - `manager@example.com` / `password`
  - `staff1@example.com` / `password`
  - `staff2@example.com` / `password`

---

## Project Structure

### RBAC Implementation

#### Migrations
- `database/migrations/2026_01_09_000100_create_roles_table.php` – Roles table
- `database/migrations/2026_01_09_000101_create_permissions_table.php` – Permissions table
- `database/migrations/2026_01_09_000102_create_permission_role_table.php` – Role↔Permission pivot
- `database/migrations/2026_01_09_000103_create_role_user_table.php` – User↔Role pivot
- `database/migrations/2026_01_09_000200_add_rbac_columns_for_policy.php` – Adds `created_by` to products, `assigned_to` to categories

#### Models
- [app/Models/Role.php](app/Models/Role.php) – HasMany permissions & users
- [app/Models/Permission.php](app/Models/Permission.php) – BelongsToMany roles
- [app/Models/User.php](app/Models/User.php) – HasApiTokens + RBAC helper methods:
  - `hasRole(string $role): bool`
  - `hasPermission(string $permission): bool`

#### Authorization
- [app/Providers/AppServiceProvider.php](app/Providers/AppServiceProvider.php) – Gate definitions with admin override
- [app/Providers/AuthServiceProvider.php](app/Providers/AuthServiceProvider.php) – Policy registration (CategoryPolicy)
- [app/Policies/CategoryPolicy.php](app/Policies/CategoryPolicy.php) – Object-level authorization rules

#### Controllers
- [app/Http/Controllers/ProductController.php](app/Http/Controllers/ProductController.php) – Gate checks for create/update/delete
- [app/Http/Controllers/CategoryController.php](app/Http/Controllers/CategoryController.php) – Policy enforcement via `$this->authorize()`

#### Seeders
- [database/seeders/RolePermissionSeeder.php](database/seeders/RolePermissionSeeder.php) – Inserts roles, permissions, users
- [database/seeders/DatabaseSeeder.php](database/seeders/DatabaseSeeder.php) – Calls RolePermissionSeeder

#### Routes
- [routes/api.php](routes/api.php) – API routes with Passport auth
  - `POST /api/login` – Get access token
  - `GET /api/me` – Current user + roles (auth:api)
  - All category/product endpoints require `auth:api`

#### Config
- [config/auth.php](config/auth.php) – Updated to use passport driver for api guard

---

## Usage Examples

### Web Authentication (Breeze Session)

```bash
# Login at /login (uses session)
curl -X POST http://localhost:8000/login \
  -d "email=admin@example.com&password=password"
```

### API Authentication (Passport Token)

#### 1. Login & Get Token

```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password"
  }'

# Response:
# {"token": "eyJ0eXAiOiJKV1QiLCJhbGc..."}
```

#### 2. Use Token to Access Protected Routes

```bash
TOKEN="<paste_token_here>"

# Get current user with roles
curl -X GET http://localhost:8000/api/me \
  -H "Authorization: Bearer $TOKEN"

# Response: User with roles and permissions
# {"id": 1, "name": "Admin", "email": "admin@example.com", "roles": [...]}

# Create a product (manager/admin only)
curl -X POST http://localhost:8000/api/products \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "category_id": 1,
    "pricing": 999.99,
    "description": "High-end laptop"
  }'

# Update a category (requires policy check if staff)
curl -X PATCH http://localhost:8000/api/categories/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Electronics"}'
```

---

## Authorization Rules

### Roles & Permissions

| Role | Permissions |
|------|-------------|
| **admin** | ALL (Gate::before returns true) |
| **manager** | products.create, products.update, categories.create, categories.update |
| **staff** | (None via Gate; only view assigned tasks via Policy) |

### Gates (Action-level)
- `users.manage` – Admin only
- `products.create/update/delete` – Manager/Admin
- `categories.create/update/delete` – Manager/Admin

### Policies (Object-level, CategoryPolicy)
- **view**: Manager sees categories in their products; Staff sees assigned categories only
- **updateStatus**: Staff can update only assigned categories

---

## Testing

### Quick Test Endpoints

```bash
# Login as manager
TOKEN=$(curl -s -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"manager@example.com","password":"password"}' | jq -r '.token')

# Try to create product (should succeed)
curl -X POST http://localhost:8000/api/products \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","category_id":1,"pricing":50.0}'

# Login as staff
TOKEN=$(curl -s -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"staff1@example.com","password":"password"}' | jq -r '.token')

# Try to create product (should fail 403)
curl -X POST http://localhost:8000/api/products \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","category_id":1,"pricing":50.0}'
```

---

## Key Files Modified

- ✅ [app/Models/User.php](app/Models/User.php) – HasApiTokens + RBAC methods
- ✅ [app/Providers/AppServiceProvider.php](app/Providers/AppServiceProvider.php) – Gate definitions
- ✅ [config/auth.php](config/auth.php) – Passport API guard
- ✅ [routes/api.php](routes/api.php) – API login + protected routes
- ✅ [app/Http/Controllers/ProductController.php](app/Http/Controllers/ProductController.php) – Authorization checks
- ✅ [app/Http/Controllers/CategoryController.php](app/Http/Controllers/CategoryController.php) – Policy enforcement
- ✅ [app/Policies/CategoryPolicy.php](app/Policies/CategoryPolicy.php) – Object-level rules
- ✅ [database/seeders/RolePermissionSeeder.php](database/seeders/RolePermissionSeeder.php) – Repeatable seed data

---

## Troubleshooting

**Issue**: `Call to undefined method createToken()`
- **Fix**: Ensure `User` model has `use HasApiTokens;`

**Issue**: 403 Forbidden on API routes
- **Fix**: Check token is valid: `GET /api/me` with token
- **Fix**: Verify user has required role/permission in database

**Issue**: Migrations fail
- **Fix**: Run `php artisan migrate:fresh --seed` to reset and reseed

---

Enjoy building with RBAC! 🚀
