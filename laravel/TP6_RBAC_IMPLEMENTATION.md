# TP6 - Authentication & Authorization Implementation

## Overview
Complete RBAC (Role-Based Access Control) system for a Project Tracker with both web (session) and API (token) authentication.

## ✅ Implementation Status

### Part 0: Starter Setup
- ✅ Laravel Breeze installed
- ✅ Login/register functionality working

### Part 1: Database Design for RBAC
- ✅ Tables created:
  - `roles` (id, name)
  - `permissions` (id, name)
  - `permission_role` (role_id, permission_id)
  - `role_user` (user_id, role_id)
  - `categories.assigned_to` (for policy testing)
  - `categories.status` (pending/in-progress/completed)
  - `products.created_by` (for policy testing)

### Part 2: Seed Roles + Permissions
- ✅ Roles created: `admin`, `manager`, `staff`
- ✅ Permissions created:
  - `users.manage`
  - `products.create`, `products.update`, `products.delete`
  - `categories.create`, `categories.update`, `categories.delete`
- ✅ Sample users created:
  - admin@example.com (role: admin, has all permissions)
  - manager@example.com (role: manager, can manage products/categories)
  - staff1@example.com (role: staff, limited access)
  - staff2@example.com (role: staff, limited access)
- ✅ All passwords: `password`

### Part 3: Authorization with Gate
- ✅ Helper methods on User model:
  - `hasRole(string $role): bool`
  - `hasPermission(string $permission): bool`
- ✅ Gates defined in `AppServiceProvider::boot()`:
  - Admin bypass: `Gate::before()` - admin can do everything
  - `users.manage`
  - `products.create`, `products.update`, `products.delete`
  - `categories.create`, `categories.update`, `categories.delete`
- ✅ Used in controllers with `abort_unless(auth()->user()->can('permission'), 403)`

### Part 4: Policy (Object-Level Authorization)
- ✅ `CategoryPolicy` created with methods:
  - `view(User $user, Category $category)`: Staff can only view assigned categories
  - `updateStatus(User $user, Category $category)`: Only assigned staff can update status
- ✅ Used in controllers with `$this->authorize('view', $category)`

### Part 5: Passport for API Auth
- ✅ Laravel Passport installed and configured
- ✅ `HasApiTokens` trait added to User model
- ✅ API guard set to `passport` in config/auth.php
- ✅ API routes created:
  - `POST /api/login` - returns access token
  - `GET /api/me` - returns user with roles
  - `POST /api/products` - manager/admin only (Gate)
  - `PATCH /api/products/{id}` - manager/admin only (Gate)
  - `POST /api/categories` - manager/admin only (Gate)
  - `PATCH /api/categories/{id}` - manager/admin only (Gate)
  - `PATCH /api/categories/{id}/status` - assigned staff only (Policy)

## 🔑 Access Control Matrix

| Role    | Products Create | Products Update | Categories Create | Categories Update | View Assigned | Update Status |
|---------|----------------|-----------------|-------------------|-------------------|---------------|---------------|
| Admin   | ✅ Yes          | ✅ Yes           | ✅ Yes             | ✅ Yes             | ✅ All         | ✅ Yes         |
| Manager | ✅ Yes          | ✅ Yes           | ✅ Yes             | ✅ Yes             | ❌ Only own    | ❌ No          |
| Staff   | ❌ No           | ❌ No            | ❌ No              | ❌ No              | ✅ Assigned    | ✅ Assigned    |

## 📁 Key Files

### Models
- [app/Models/User.php](app/Models/User.php) - User model with RBAC helper methods
- [app/Models/Role.php](app/Models/Role.php) - Role model with permissions relationship
- [app/Models/Permission.php](app/Models/Permission.php) - Permission model
- [app/Models/Category.php](app/Models/Category.php) - Category model with assigned_to

### Controllers
- [app/Http/Controllers/CategoryController.php](app/Http/Controllers/CategoryController.php) - Category CRUD with authorization
- [app/Http/Controllers/ProductController.php](app/Http/Controllers/ProductController.php) - Product CRUD with authorization

### Policies
- [app/Policies/CategoryPolicy.php](app/Policies/CategoryPolicy.php) - Object-level authorization

### Providers
- [app/Providers/AppServiceProvider.php](app/Providers/AppServiceProvider.php) - Gate definitions

### Routes
- [routes/api.php](routes/api.php) - API routes with Passport authentication

### Database
- [database/seeders/RolePermissionSeeder.php](database/seeders/RolePermissionSeeder.php) - Seeds roles, permissions, users

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
composer install
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
php artisan key:generate
```

### 3. Database Setup
```bash
# Run migrations
php artisan migrate

# Seed roles, permissions, and users
php artisan db:seed --class=RolePermissionSeeder
```

### 4. Passport Keys (if not already generated)
```bash
php artisan passport:install
```

### 5. Start Development Servers
```bash
# Terminal 1: Laravel server
php artisan serve

# Terminal 2: Vite dev server (for Breeze UI)
npm run dev
```

## 🧪 Testing

### Run the automated API test script:
```bash
php test_rbac_api.php
```

### Manual API Testing

#### 1. Login to get token
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'
```

Response:
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### 2. Get current user info
```bash
curl -X GET http://localhost:8000/api/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 3. Create category (manager/admin only)
```bash
curl -X POST http://localhost:8000/api/categories \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"New Category","assigned_to":3}'
```

#### 4. Update category status (assigned staff only)
```bash
curl -X PATCH http://localhost:8000/api/categories/1/status \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status":"in-progress"}'
```

### Web Testing (Breeze)

1. Visit: http://localhost:8000
2. Login with any of the test users
3. Access is controlled by the same Gates/Policies

## 📝 Test Credentials

| Email                  | Password | Role    | Can Do                                        |
|------------------------|----------|---------|-----------------------------------------------|
| admin@example.com      | password | Admin   | Everything (admin bypass)                     |
| manager@example.com    | password | Manager | Create/update products & categories           |
| staff1@example.com     | password | Staff   | View assigned categories, update their status |
| staff2@example.com     | password | Staff   | View assigned categories, update their status |

## 🎯 RBAC Flow

### Gate-Based Authorization (Permission)
```
Request → Controller → Gate::allows('permission') → Check User Roles → Check Role Permissions → Allow/Deny
```

### Policy-Based Authorization (Object-Level)
```
Request → Controller → Policy::view($user, $model) → Custom Logic → Allow/Deny
```

### Admin Bypass
```
Gate::before(function ($user) {
    return $user->hasRole('admin') ? true : null;
});
```

## 📚 Code Examples

### Using Gates in Controllers
```php
// Check permission via Gate
abort_unless(auth()->user()->can('products.create'), 403);

// Create product
$product = Product::create($request->validated());
```

### Using Policies in Controllers
```php
// Find model
$category = Category::findOrFail($id);

// Check policy
$this->authorize('view', $category);

// Return category
return $category;
```

### User Helper Methods
```php
// Check if user has role
if ($user->hasRole('admin')) {
    // Admin logic
}

// Check if user has permission
if ($user->hasPermission('products.create')) {
    // Create product
}
```

## 🔍 Debugging

### Check user roles and permissions
```bash
php artisan tinker
>>> $user = User::find(1);
>>> $user->roles->pluck('name');
>>> $user->roles->first()->permissions->pluck('name');
```

### List all gates
```bash
php artisan route:list
```

### Check Passport tokens
```bash
php artisan tinker
>>> User::find(1)->tokens;
```

## 🎓 Learning Objectives Achieved

1. ✅ Understand RBAC concepts (Roles, Permissions)
2. ✅ Implement many-to-many relationships
3. ✅ Use Laravel Gates for permission-based authorization
4. ✅ Use Laravel Policies for object-level authorization
5. ✅ Configure dual authentication (Session + Token)
6. ✅ Implement API authentication with Passport
7. ✅ Apply authorization in both web and API contexts

## 🔗 Related Files

- `composer.json` - Laravel Passport dependency
- `config/auth.php` - Authentication guards configuration
- `routes/web.php` - Breeze web routes
- `routes/api.php` - API routes with Passport

## 📖 References

- [Laravel Authorization Docs](https://laravel.com/docs/11.x/authorization)
- [Laravel Passport Docs](https://laravel.com/docs/11.x/passport)
- [Laravel Breeze Docs](https://laravel.com/docs/11.x/starter-kits#breeze)
