# RBAC API Testing Guide

## Quick Start

### 1. Get Access Token

```bash
curl -X POST http://localhost:8100/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password"
  }'
```

**Response:**
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### 2. Use Token for Protected Routes

Store the token in a variable:
```bash
TOKEN="paste_token_here"
```

### 3. Get Current User with Roles

```bash
curl -X GET http://localhost:8100/api/me \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**
```json
{
  "id": 1,
  "name": "Admin",
  "email": "admin@example.com",
  "roles": [
    {
      "id": 1,
      "name": "admin"
    }
  ]
}
```

---

## Test Users

| Email | Password | Role | Permissions |
|-------|----------|------|-------------|
| admin@example.com | password | admin | ALL |
| manager@example.com | password | manager | products.*, categories.* |
| staff1@example.com | password | staff | (none via Gate) |
| staff2@example.com | password | staff | (none via Gate) |

---

## Authorization Testing

### Admin User (Full Access)

```bash
TOKEN=$(curl -s -X POST http://localhost:8100/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}' | grep -o '"token":"[^"]*' | cut -d'"' -f4)

# Create product (should succeed)
curl -X POST http://localhost:8100/api/products \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop (Admin)",
    "category_id": 1,
    "pricing": 999.99
  }'
```

### Manager User (Conditional Access)

```bash
TOKEN=$(curl -s -X POST http://localhost:8100/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"manager@example.com","password":"password"}' | grep -o '"token":"[^"]*' | cut -d'"' -f4)

# Create product (should succeed - manager has permission)
curl -X POST http://localhost:8100/api/products \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mouse (Manager)",
    "category_id": 1,
    "pricing": 29.99
  }'

# Create category (should succeed)
curl -X POST http://localhost:8100/api/categories \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Electronics"}'
```

### Staff User (No Permission)

```bash
TOKEN=$(curl -s -X POST http://localhost:8100/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"staff1@example.com","password":"password"}' | grep -o '"token":"[^"]*' | cut -d'"' -f4)

# Try to create product (should fail with 403)
curl -X POST http://localhost:8100/api/products \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Should Fail",
    "category_id": 1,
    "pricing": 10.00
  }'
# Response: 403 Forbidden
```

---

## Product Endpoints

### GET All Products
```bash
curl -X GET http://localhost:8100/api/products \
  -H "Authorization: Bearer $TOKEN"
```

### POST Create Product (Requires `products.create`)
```bash
curl -X POST http://localhost:8100/api/products \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product Name",
    "category_id": 1,
    "pricing": 99.99,
    "description": "Product description",
    "images": null
  }'
```

### GET Specific Product
```bash
curl -X GET http://localhost:8100/api/products/1 \
  -H "Authorization: Bearer $TOKEN"
```

### PATCH Update Product (Requires `products.update`)
```bash
curl -X PATCH http://localhost:8100/api/products/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "pricing": 89.99
  }'
```

### DELETE Product (Requires `products.delete`)
```bash
curl -X DELETE http://localhost:8100/api/products/1 \
  -H "Authorization: Bearer $TOKEN"
```

---

## Category Endpoints

### GET All Categories
```bash
curl -X GET http://localhost:8100/api/categories \
  -H "Authorization: Bearer $TOKEN"
```

### POST Create Category (Requires `categories.create`)
```bash
curl -X POST http://localhost:8100/api/categories \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Category",
    "assigned_to": null
  }'
```

### GET Specific Category (Subject to Policy)
```bash
curl -X GET http://localhost:8100/api/categories/1 \
  -H "Authorization: Bearer $TOKEN"
```

**Policy Rules:**
- Admin: Can view all
- Manager: Can view categories in their products
- Staff: Can view only assigned categories

### PATCH Update Category (Requires `categories.update`)
```bash
curl -X PATCH http://localhost:8100/api/categories/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Category",
    "assigned_to": 3
  }'
```

### DELETE Category (Requires `categories.delete`)
```bash
curl -X DELETE http://localhost:8100/api/categories/1 \
  -H "Authorization: Bearer $TOKEN"
```

---

## Error Responses

### 403 Forbidden (No Permission)
```json
{
  "message": "This action is unauthorized."
}
```

### 401 Unauthorized (No Token)
```json
{
  "message": "Unauthenticated."
}
```

### 422 Validation Error
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "name": ["The name field is required."]
  }
}
```

### 404 Not Found
```json
{
  "message": "No query results for model [App\\Models\\Product]."
}
```

---

## Architecture

### RBAC Flow

1. **User Login** → `POST /api/login` → Get Passport Token
2. **Request with Token** → Add `Authorization: Bearer $TOKEN` header
3. **Gate Check** → AppServiceProvider defines abilities
   - Admin has `Gate::before()` override (always pass)
   - Manager/Staff get permission checks via `hasPermission()`
4. **Policy Check** (Object-level) → CategoryPolicy enforces row-level access
5. **Response** → 200 (success) or 403 (forbidden)

### Models & Relations

```
User (1-many via pivot) --- Role-User --- Role (many-many) Permission
  |                                                            |
  hasRole()                                          hasPermission()
  hasPermission()                                         
```

### Database Schema

- `roles` → `id`, `name` (admin, manager, staff)
- `permissions` → `id`, `name` (products.*, categories.*)
- `permission_role` → `permission_id`, `role_id` (pivot)
- `role_user` → `user_id`, `role_id` (pivot)
- `products` → `created_by` (foreign key to users)
- `categories` → `assigned_to` (foreign key to users)

---

## Debugging

### Check Roles for User
```bash
docker exec -w /var/www app php artisan tinker --execute="
  \$user = \App\Models\User::where('email', 'admin@example.com')->first();
  echo \$user->roles->pluck('name')->join(', ');
"
```

### Check Permissions for Role
```bash
docker exec -w /var/www app php artisan tinker --execute="
  \$role = \App\Models\Role::where('name', 'manager')->first();
  echo \$role->permissions->pluck('name')->join(', ');
"
```

### Verify hasPermission()
```bash
docker exec -w /var/www app php artisan tinker --execute="
  \$user = \App\Models\User::where('email', 'manager@example.com')->first();
  echo 'Has products.create: ' . (\$user->hasPermission('products.create') ? 'YES' : 'NO');
"
```

---

## Troubleshooting

### 401 Unauthorized on all API calls
- Ensure token is included in `Authorization: Bearer $TOKEN` header
- Token may be expired (Passport tokens last 1 year by default)
- Verify user exists in database: `php artisan tinker --execute="\App\Models\User::pluck('email');"`

### 403 Forbidden on allowed operations
- Check user's roles: `SELECT * FROM role_user WHERE user_id = ?;`
- Check role's permissions: `SELECT * FROM permission_role WHERE role_id = ?;`
- Verify Gate definition in `AppServiceProvider.php`

### Data not found (404)
- Ensure you're using correct IDs from database
- Try: `docker exec -w /var/www app php artisan tinker --execute="\App\Models\Product::pluck('id', 'name');"`

### CORS errors
- API routes are in `/api` prefix and should work
- Check your client's origin headers if using frontend

---

Enjoy! 🚀
