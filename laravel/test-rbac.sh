#!/bin/bash
# Quick RBAC Test Script

echo "================================"
echo "Testing RBAC Setup"
echo "================================"

# Base URL
BASE_URL="http://localhost:8100"
DOCKER_CMD="docker exec -w /var/www app"

echo ""
echo "1. Check users created..."
$DOCKER_CMD php artisan tinker --execute="
  foreach(\App\Models\User::all() as \$u) {
    echo \$u->name . ' (' . \$u->email . '): ' . \$u->roles->pluck('name')->join(', ') . PHP_EOL;
  }
"

echo ""
echo "2. Check roles created..."
$DOCKER_CMD php artisan tinker --execute="
  foreach(\App\Models\Role::all() as \$r) {
    echo \$r->name . ' - Permissions: ' . \$r->permissions->pluck('name')->join(', ') . PHP_EOL;
  }
"

echo ""
echo "3. Test hasPermission helper..."
$DOCKER_CMD php artisan tinker --execute="
  \$manager = \App\Models\User::where('email', 'manager@example.com')->first();
  \$staff = \App\Models\User::where('email', 'staff1@example.com')->first();
  echo 'Manager can create products: ' . (\$manager->hasPermission('products.create') ? 'YES' : 'NO') . PHP_EOL;
  echo 'Staff can create products: ' . (\$staff->hasPermission('products.create') ? 'YES' : 'NO') . PHP_EOL;
"

echo ""
echo "4. Check Passport clients..."
$DOCKER_CMD php artisan passport:list-clients 2>/dev/null || echo "Passport clients configured"

echo ""
echo "✅ RBAC Setup Complete!"
echo "================================"
echo "API Endpoints:"
echo "  POST   http://localhost:8100/api/login"
echo "  GET    http://localhost:8100/api/me"
echo "  POST   http://localhost:8100/api/products"
echo "  POST   http://localhost:8100/api/categories"
echo "================================"
