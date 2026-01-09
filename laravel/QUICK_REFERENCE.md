# TP6 Quick Reference Guide

## 🚀 Getting Started

### Run the verification script
```bash
php verify_rbac.php
```

### Start the application
```bash
# Terminal 1: Laravel server
php artisan serve

# Terminal 2: Frontend (if using Breeze UI)
npm run dev
```

## 🔑 Test Credentials

| Email                  | Password | Role    |
|------------------------|----------|---------|
| admin@example.com      | password | Admin   |
| manager@example.com    | password | Manager |
| staff1@example.com     | password | Staff   |
| staff2@example.com     | password | Staff   |

## 📋 Access Matrix

| Action                      | Admin | Manager | Staff |
|-----------------------------|-------|---------|-------|
| Everything                  | ✅     | ❌       | ❌     |
| Manage users                | ✅     | ❌       | ❌     |
| Create/update products      | ✅     | ✅       | ❌     |
| Delete products             | ✅     | ❌       | ❌     |
| Create/update categories    | ✅     | ✅       | ❌     |
| Delete categories           | ✅     | ❌       | ❌     |
| View assigned categories    | ✅     | ✅*      | ✅*    |
| Update category status      | ✅     | ❌       | ✅*    |

*Only for assigned/owned resources

## 🌐 API Endpoints

### Authentication
```bash
# Login (get token)
POST /api/login
{
  "email": "admin@example.com",
  "password": "password"
}

# Get current user with roles
GET /api/me
Authorization: Bearer {token}
```

### Products (Manager/Admin only)
```bash
# List all products
GET /api/products
Authorization: Bearer {token}

# Create product
POST /api/products
Authorization: Bearer {token}
{
  "name": "Product Name",
  "pricing": 99.99,
  "category_id": 1,
  "description": "Optional"
}

# Update product
PATCH /api/products/{id}
Authorization: Bearer {token}
{
  "name": "Updated Name"
}

# Delete product (Admin only)
DELETE /api/products/{id}
Authorization: Bearer {token}
```

### Categories (Manager/Admin can manage, Staff can view assigned)
```bash
# List all categories
GET /api/categories
Authorization: Bearer {token}

# Create category
POST /api/categories
Authorization: Bearer {token}
{
  "name": "Category Name",
  "assigned_to": 3
}

# View category (Policy: assigned only)
GET /api/categories/{id}
Authorization: Bearer {token}

# Update category (Manager/Admin only)
PATCH /api/categories/{id}
Authorization: Bearer {token}
{
  "name": "Updated Name"
}

# Update status (Policy: assigned staff only)
PATCH /api/categories/{id}/status
Authorization: Bearer {token}
{
  "status": "in-progress"
}
# Status values: pending, in-progress, completed

# Delete category (Admin only)
DELETE /api/categories/{id}
Authorization: Bearer {token}
```

## 💻 Code Examples

### Check permissions in controllers
```php
// Using Gates
abort_unless(auth()->user()->can('products.create'), 403);

// Using Policies
$this->authorize('view', $category);
```

### Check in Blade templates
```blade
@can('products.create')
    <button>Create Product</button>
@endcan

@can('view', $category)
    <p>{{ $category->name }}</p>
@endcan
```

### Helper methods
```php
// Check role
if ($user->hasRole('admin')) {
    // ...
}

// Check permission
if ($user->hasPermission('products.create')) {
    // ...
}
```

## 🔧 Database Commands

### Reset and reseed
```bash
php artisan migrate:fresh
php artisan db:seed --class=RolePermissionSeeder
```

### Access tinker
```bash
php artisan tinker
>>> $user = User::find(1);
>>> $user->roles;
>>> $user->hasRole('admin');
>>> $user->hasPermission('products.create');
```

## 🧪 Testing

### Verify setup
```bash
php verify_rbac.php
```

### Test API with curl (if installed)
```bash
# Login
TOKEN=$(curl -s -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}' \
  | grep -o '"token":"[^"]*' | cut -d'"' -f4)

# Get user info
curl -X GET http://localhost:8000/api/me \
  -H "Authorization: Bearer $TOKEN"

# Create product
curl -X POST http://localhost:8000/api/products \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","pricing":99.99,"category_id":1}'
```

## 📚 Key Files

- **Models**: [app/Models/User.php](app/Models/User.php), [Role.php](app/Models/Role.php), [Permission.php](app/Models/Permission.php)
- **Policies**: [app/Policies/CategoryPolicy.php](app/Policies/CategoryPolicy.php)
- **Gates**: [app/Providers/AppServiceProvider.php](app/Providers/AppServiceProvider.php)
- **Controllers**: [app/Http/Controllers/](app/Http/Controllers/)
- **API Routes**: [routes/api.php](routes/api.php)
- **Seeder**: [database/seeders/RolePermissionSeeder.php](database/seeders/RolePermissionSeeder.php)

## 🎯 Key Concepts

### Gates (Permission-based)
- Global permissions checked via `Gate::allows()`
- Defined in AppServiceProvider
- Used with `can()` or `abort_unless()`

### Policies (Object-level)
- Resource-specific authorization
- Check ownership or assignment
- Used with `$this->authorize()`

### Admin Bypass
```php
Gate::before(function ($user, $ability) {
    return $user->hasRole('admin') ? true : null;
});
```

## 🚨 Common Issues

### 403 Forbidden
- Check user has correct role
- Verify role has required permission
- For policies, check resource ownership/assignment

### Token invalid
- Token might be expired
- Re-login to get new token

### Migration errors
- Run `php artisan migrate:fresh`
- Then `php artisan db:seed --class=RolePermissionSeeder`

## 📖 Documentation

See [TP6_RBAC_IMPLEMENTATION.md](TP6_RBAC_IMPLEMENTATION.md) for full documentation.
