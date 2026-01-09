#!/bin/bash

# TP6 RBAC API Testing Script (using wget)
# Tests all RBAC functionality

BASE_URL="http://127.0.0.1:8000/api"

echo "=== TP6: RBAC API Testing ==="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${YELLOW}--- Step 1: Authentication (Passport Tokens) ---${NC}"

# Admin login
echo -e "${BLUE}Testing: Admin Login${NC}"
ADMIN_RESPONSE=$(wget -q -O- --post-data='{"email":"admin@example.com","password":"password"}' \
  --header='Content-Type: application/json' \
  $BASE_URL/login)
echo "$ADMIN_RESPONSE" | head -5
ADMIN_TOKEN=$(echo "$ADMIN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo ""

# Manager login
echo -e "${BLUE}Testing: Manager Login${NC}"
MANAGER_RESPONSE=$(wget -q -O- --post-data='{"email":"manager@example.com","password":"password"}' \
  --header='Content-Type: application/json' \
  $BASE_URL/login)
echo "$MANAGER_RESPONSE" | head -5
MANAGER_TOKEN=$(echo "$MANAGER_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo ""

# Staff login
echo -e "${BLUE}Testing: Staff Login${NC}"
STAFF_RESPONSE=$(wget -q -O- --post-data='{"email":"staff1@example.com","password":"password"}' \
  --header='Content-Type: application/json' \
  $BASE_URL/login)
echo "$STAFF_RESPONSE" | head -5
STAFF_TOKEN=$(echo "$STAFF_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo ""

echo -e "${YELLOW}--- Step 2: Get User Info with Roles ---${NC}"

echo -e "${BLUE}Testing: Admin /me${NC}"
wget -q -O- --header="Authorization: Bearer $ADMIN_TOKEN" $BASE_URL/me | head -10
echo ""

echo -e "${YELLOW}--- Step 3: Product Management (Gate: products.create) ---${NC}"

echo -e "${BLUE}Testing: Admin creates product (should succeed)${NC}"
wget -q -O- --post-data='{"name":"Test Product","pricing":99.99,"category_id":1}' \
  --header="Authorization: Bearer $ADMIN_TOKEN" \
  --header='Content-Type: application/json' \
  $BASE_URL/products
echo ""

echo -e "${BLUE}Testing: Staff creates product (should fail - 403)${NC}"
wget -q -O- --post-data='{"name":"Test Product","pricing":99.99,"category_id":1}' \
  --header="Authorization: Bearer $STAFF_TOKEN" \
  --header='Content-Type: application/json' \
  $BASE_URL/products 2>&1 | grep -i "403\|forbidden\|unauthorized" || echo "Response received"
echo ""

echo -e "${YELLOW}--- Step 4: Category Management ---${NC}"

echo -e "${BLUE}Testing: Manager creates category (should succeed)${NC}"
CATEGORY_RESPONSE=$(wget -q -O- --post-data='{"name":"Test Category","assigned_to":3}' \
  --header="Authorization: Bearer $MANAGER_TOKEN" \
  --header='Content-Type: application/json' \
  $BASE_URL/categories)
echo "$CATEGORY_RESPONSE"
CATEGORY_ID=$(echo "$CATEGORY_RESPONSE" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
echo ""

echo -e "${BLUE}Testing: Staff creates category (should fail - 403)${NC}"
wget -q -O- --post-data='{"name":"Staff Category"}' \
  --header="Authorization: Bearer $STAFF_TOKEN" \
  --header='Content-Type: application/json' \
  $BASE_URL/categories 2>&1 | grep -i "403\|forbidden" || echo "Response received"
echo ""

if [ -n "$CATEGORY_ID" ]; then
  echo -e "${YELLOW}--- Step 5: Policy Test - Update Category Status ---${NC}"
  
  echo -e "${BLUE}Testing: Assigned staff updates status (should succeed)${NC}"
  wget -q -O- --method=PATCH \
    --body-data='{"status":"in-progress"}' \
    --header="Authorization: Bearer $STAFF_TOKEN" \
    --header='Content-Type: application/json' \
    $BASE_URL/categories/$CATEGORY_ID/status
  echo ""
  
  echo -e "${BLUE}Testing: Manager updates status (should fail - 403)${NC}"
  wget -q -O- --method=PATCH \
    --body-data='{"status":"completed"}' \
    --header="Authorization: Bearer $MANAGER_TOKEN" \
    --header='Content-Type: application/json' \
    $BASE_URL/categories/$CATEGORY_ID/status 2>&1 | grep -i "403\|forbidden" || echo "Response received"
  echo ""
fi

echo -e "${GREEN}=== Test Complete ===${NC}"
echo ""
echo "Test Credentials:"
echo "  Admin:   admin@example.com / password"
echo "  Manager: manager@example.com / password"
echo "  Staff:   staff1@example.com / password"
echo ""
