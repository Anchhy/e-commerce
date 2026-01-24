# API Testing Collection

A collection of API requests for testing the RBAC implementation.

## Setup

1. Start the server: `php artisan serve`
2. Base URL: `http://localhost:8000/api`

## Variables

After logging in, save your token and use it in subsequent requests:

```
{{BASE_URL}} = http://localhost:8000/api
{{ADMIN_TOKEN}} = eyJ0eXAiOiJKV1QiLCJhbGc...
{{MANAGER_TOKEN}} = eyJ0eXAiOiJKV1QiLCJhbGc...
{{STAFF_TOKEN}} = eyJ0eXAiOiJKV1QiLCJhbGc...
```

## Authentication

### 1. Login as Admin
**POST** `/login`

**Body:**
```json
{
  "email": "admin@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

### 2. Login as Manager
**POST** `/login`

**Body:**
```json
{
  "email": "manager@example.com",
  "password": "password"
}
```

---

### 3. Login as Staff
**POST** `/login`

**Body:**
```json
{
  "email": "staff1@example.com",
  "password": "password"
}
```

---

## User Info

### 4. Get Current User (Admin)
**GET** `/me`

**Headers:**
```
Authorization: Bearer {{ADMIN_TOKEN}}
```

**Expected Response:**
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

### 5. Get Current User (Manager)
**GET** `/me`

**Headers:**
```
Authorization: Bearer {{MANAGER_TOKEN}}
```

---

### 6. Get Current User (Staff)
**GET** `/me`

**Headers:**
```
Authorization: Bearer {{STAFF_TOKEN}}
```

---

## Products

### 7. List Products (Any authenticated user)
**GET** `/products`

**Headers:**
```
Authorization: Bearer {{ADMIN_TOKEN}}
```

---

### 8. Create Product (Admin) - Should Succeed
**POST** `/products`

**Headers:**
```
Authorization: Bearer {{ADMIN_TOKEN}}
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Gaming Laptop",
  "pricing": 1299.99,
  "category_id": 1,
  "description": "High-performance gaming laptop"
}
```

**Expected Response:** `200 OK` with product data

---

### 9. Create Product (Manager) - Should Succeed
**POST** `/products`

**Headers:**
```
Authorization: Bearer {{MANAGER_TOKEN}}
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Wireless Mouse",
  "pricing": 29.99,
  "category_id": 1,
  "description": "Ergonomic wireless mouse"
}
```

**Expected Response:** `200 OK` with product data

---

### 10. Create Product (Staff) ❌ Should Fail (403)
**POST** `/products`

**Headers:**
```
Authorization: Bearer {{STAFF_TOKEN}}
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Keyboard",
  "pricing": 79.99,
  "category_id": 1
}
```

**Expected Response:** `403 Forbidden`

---

### 11. Update Product (Manager) - Should Succeed
**PATCH** `/products/1`

**Headers:**
```
Authorization: Bearer {{MANAGER_TOKEN}}
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Updated Product Name",
  "pricing": 1499.99
}
```

---

### 12. Delete Product (Staff) ❌ Should Fail (403)
**DELETE** `/products/1`

**Headers:**
```
Authorization: Bearer {{STAFF_TOKEN}}
```

**Expected Response:** `403 Forbidden`

---

### 13. Delete Product (Admin) - Should Succeed
**DELETE** `/products/1`

**Headers:**
```
Authorization: Bearer {{ADMIN_TOKEN}}
```

---

## Categories

### 14. List Categories
**GET** `/categories`

**Headers:**
```
Authorization: Bearer {{ADMIN_TOKEN}}
```

---

### 15. Create Category (Admin, assign to Staff 1) - Should Succeed
**POST** `/categories`

**Headers:**
```
Authorization: Bearer {{ADMIN_TOKEN}}
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Electronics",
  "assigned_to": 3
}
```

**Note:** User ID 3 is typically staff1@example.com. Check with `/api/me` using staff token.

**Expected Response:** `200 OK` with category data including ID

---

### 16. Create Category (Manager) - Should Succeed
**POST** `/categories`

**Headers:**
```
Authorization: Bearer {{MANAGER_TOKEN}}
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Accessories"
}
```

---

### 17. Create Category (Staff) ❌ Should Fail (403)
**POST** `/categories`

**Headers:**
```
Authorization: Bearer {{STAFF_TOKEN}}
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Staff Category"
}
```

**Expected Response:** `403 Forbidden`

---

## Category Policies

### 18. View Category (Assigned Staff) - Should Succeed
**GET** `/categories/1`

**Headers:**
```
Authorization: Bearer {{STAFF_TOKEN}}
```

**Note:** Assuming category 1 is assigned to staff user (assigned_to = 3)

**Expected Response:** `200 OK` with category data

---

### 19. View Category (Non-assigned Manager) ❌ Should Fail (403)
**GET** `/categories/1`

**Headers:**
```
Authorization: Bearer {{MANAGER_TOKEN}}
```

**Note:** Manager can only view categories they created (created_by check in policy)

**Expected Response:** `403 Forbidden` (unless manager created the category)

---

### 20. View Category (Admin) - Should Succeed (Bypass)
**GET** `/categories/1`

**Headers:**
```
Authorization: Bearer {{ADMIN_TOKEN}}
```

**Expected Response:** `200 OK` (admin bypasses all policies)

---

### 21. Update Category Status (Assigned Staff) - Should Succeed
**PATCH** `/categories/1/status`

**Headers:**
```
Authorization: Bearer {{STAFF_TOKEN}}
Content-Type: application/json
```

**Body:**
```json
{
  "status": "in-progress"
}
```

**Status values:** `pending`, `in-progress`, `completed`

**Expected Response:** `200 OK` with updated category

---

### 22. Update Category Status (Manager) ❌ Should Fail (403)
**PATCH** `/categories/1/status`

**Headers:**
```
Authorization: Bearer {{MANAGER_TOKEN}}
Content-Type: application/json
```

**Body:**
```json
{
  "status": "completed"
}
```

**Expected Response:** `403 Forbidden` (only assigned staff can update status)

---

### 23. Update Category Status (Admin) - Should Succeed (Bypass)
**PATCH** `/categories/1/status`

**Headers:**
```
Authorization: Bearer {{ADMIN_TOKEN}}
Content-Type: application/json
```

**Body:**
```json
{
  "status": "completed"
}
```

**Expected Response:** `200 OK` (admin bypasses policy)

---

### 24. Update Category (Manager) - Should Succeed
**PATCH** `/categories/2`

**Headers:**
```
Authorization: Bearer {{MANAGER_TOKEN}}
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Updated Category Name"
}
```

---

### 25. Update Category (Staff) ❌ Should Fail (403)
**PATCH** `/categories/1`

**Headers:**
```
Authorization: Bearer {{STAFF_TOKEN}}
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Staff Update"
}
```

**Expected Response:** `403 Forbidden`

---

### 26. Delete Category (Manager) ❌ Should Fail (403)
**DELETE** `/categories/2`

**Headers:**
```
Authorization: Bearer {{MANAGER_TOKEN}}
```

**Expected Response:** `403 Forbidden`

---

### 27. Delete Category (Admin) - Should Succeed
**DELETE** `/categories/2`

**Headers:**
```
Authorization: Bearer {{ADMIN_TOKEN}}
```

---

## Test Flow

### Complete Test Sequence

1. Login as Admin, Manager, Staff (requests 1-3)
2. Get user info for all three (requests 4-6)
3. Test product creation with all roles (requests 8-10)
4. Create categories assigned to staff (request 15)
5. Test category view with different roles (requests 18-20)
6. Test status update with different roles (requests 21-23)
7. Test category updates (requests 24-25)
8. Test deletions (requests 26-27)

## Expected Results Summary

| Request | Role    | Action                 | Expected Result |
|---------|---------|------------------------|-----------------|
| 8       | Admin   | Create Product         | 200 OK          |
| 9       | Manager | Create Product         | 200 OK          |
| 10      | Staff   | Create Product         | 403             |
| 15      | Admin   | Create Category        | 200 OK          |
| 16      | Manager | Create Category        | 200 OK          |
| 17      | Staff   | Create Category        | 403             |
| 18      | Staff   | View Assigned Category | 200 OK          |
| 19      | Manager | View Others Category   | 403             |
| 20      | Admin   | View Any Category      | 200 OK          |
| 21      | Staff   | Update Status          | 200 OK          |
| 22      | Manager | Update Status          | 403             |
| 23      | Admin   | Update Status          | 200 OK          |
| 25      | Staff   | Update Category        | 403             |
| 26      | Manager | Delete Category        | 403             |
| 27      | Admin   | Delete Category        | 200 OK          |

## Notes

- Replace `{{ADMIN_TOKEN}}`, `{{MANAGER_TOKEN}}`, `{{STAFF_TOKEN}}` with actual tokens from login responses
- Adjust category IDs based on what's created in your database
- Staff user ID is typically 3 (staff1@example.com), verify with GET /me
- All timestamps are automatically handled by Laravel
- Invalid status values will return validation error
