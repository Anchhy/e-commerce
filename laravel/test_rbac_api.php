<?php

/**
 * TP6 RBAC API Testing Script
 * 
 * Tests Authentication & Authorization with:
 * - Admin: can do everything
 * - Manager: can create/update products & categories
 * - Staff: can only update status of assigned categories
 */

$baseUrl = 'http://localhost:8000/api';

// Colors for output
function green($text) { return "\033[32m$text\033[0m"; }
function red($text) { return "\033[31m$text\033[0m"; }
function yellow($text) { return "\033[33m$text\033[0m"; }
function blue($text) { return "\033[34m$text\033[0m"; }

// Test helper
function testRequest($title, $method, $url, $token = null, $data = null) {
    global $baseUrl;
    
    echo "\n" . blue("Testing: $title") . "\n";
    
    $ch = curl_init("$baseUrl$url");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    
    $headers = ['Content-Type: application/json'];
    if ($token) {
        $headers[] = "Authorization: Bearer $token";
    }
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    
    if ($data) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    $result = json_decode($response, true);
    
    if ($httpCode >= 200 && $httpCode < 300) {
        echo green("PASS ($httpCode)") . "\n";
    } else {
        echo red("FAIL ($httpCode)") . "\n";
    }
    
    echo "Response: " . json_encode($result, JSON_PRETTY_PRINT) . "\n";
    
    return ['code' => $httpCode, 'data' => $result];
}

echo yellow("\n=== TP6: RBAC API Testing ===\n");

// Step 1: Login as different users
echo yellow("\n--- Step 1: Authentication (Passport Tokens) ---\n");

$adminLogin = testRequest(
    "Admin Login",
    "POST",
    "/login",
    null,
    ['email' => 'admin@example.com', 'password' => 'password']
);
$adminToken = $adminLogin['data']['token'] ?? null;

$managerLogin = testRequest(
    "Manager Login",
    "POST",
    "/login",
    null,
    ['email' => 'manager@example.com', 'password' => 'password']
);
$managerToken = $managerLogin['data']['token'] ?? null;

$staffLogin = testRequest(
    "Staff Login",
    "POST",
    "/login",
    null,
    ['email' => 'staff1@example.com', 'password' => 'password']
);
$staffToken = $staffLogin['data']['token'] ?? null;

// Step 2: Get current user with roles
echo yellow("\n--- Step 2: Get User Info with Roles ---\n");

testRequest("Admin /me", "GET", "/me", $adminToken);
testRequest("Manager /me", "GET", "/me", $managerToken);
testRequest("Staff /me", "GET", "/me", $staffToken);

// Step 3: Test Product Creation (Admin & Manager only)
echo yellow("\n--- Step 3: Product Management (Gate: products.create) ---\n");

$productData = [
    'name' => 'Test Product',
    'price' => 99.99,
    'quantity' => 10,
    'category_id' => 1
];

$adminProduct = testRequest(
    "Admin creates product (should succeed)",
    "POST",
    "/products",
    $adminToken,
    $productData
);

$managerProduct = testRequest(
    "Manager creates product (should succeed)",
    "POST",
    "/products",
    $managerToken,
    $productData
);

$staffProduct = testRequest(
    "Staff creates product (should fail - 403)",
    "POST",
    "/products",
    $staffToken,
    $productData
);

// Step 4: Test Category Management
echo yellow("\n--- Step 4: Category Management (Gate: categories.create/update) ---\n");

// Get staff user ID for assignment
$staffInfo = testRequest("Get Staff Info", "GET", "/me", $staffToken);
$staffId = $staffInfo['data']['id'] ?? null;

$categoryData = [
    'name' => 'Test Category',
    'assigned_to' => $staffId
];

$adminCategory = testRequest(
    "Admin creates category (should succeed)",
    "POST",
    "/categories",
    $adminToken,
    $categoryData
);
$categoryId = $adminCategory['data']['id'] ?? null;

$managerCategory = testRequest(
    "Manager creates category (should succeed)",
    "POST",
    "/categories",
    $managerToken,
    ['name' => 'Manager Category']
);

$staffCategory = testRequest(
    "Staff creates category (should fail - 403)",
    "POST",
    "/categories",
    $staffToken,
    ['name' => 'Staff Category']
);

// Step 5: Test Policy - View Category
echo yellow("\n--- Step 5: Policy Test - View Category (assigned only) ---\n");

if ($categoryId) {
    testRequest(
        "Admin views category (should succeed - admin bypass)",
        "GET",
        "/categories/$categoryId",
        $adminToken
    );
    
    testRequest(
        "Assigned staff views category (should succeed)",
        "GET",
        "/categories/$categoryId",
        $staffToken
    );
    
    testRequest(
        "Manager views category (should fail - not assigned)",
        "GET",
        "/categories/$categoryId",
        $managerToken
    );
}

// Step 6: Test Policy - Update Status
echo yellow("\n--- Step 6: Policy Test - Update Category Status (assigned staff only) ---\n");

if ($categoryId) {
    testRequest(
        "Assigned staff updates status (should succeed)",
        "PATCH",
        "/categories/$categoryId/status",
        $staffToken,
        ['status' => 'in-progress']
    );
    
    testRequest(
        "Manager updates status (should fail - 403)",
        "PATCH",
        "/categories/$categoryId/status",
        $managerToken,
        ['status' => 'completed']
    );
    
    testRequest(
        "Admin updates status (should succeed - admin bypass)",
        "PATCH",
        "/categories/$categoryId/status",
        $adminToken,
        ['status' => 'completed']
    );
}

// Step 7: Test Update Operations
echo yellow("\n--- Step 7: Update Operations (Gate permissions) ---\n");

if ($categoryId) {
    testRequest(
        "Manager updates category (should succeed)",
        "PATCH",
        "/categories/$categoryId",
        $managerToken,
        ['name' => 'Updated Category Name']
    );
    
    testRequest(
        "Staff updates category (should fail - 403)",
        "PATCH",
        "/categories/$categoryId",
        $staffToken,
        ['name' => 'Staff Update']
    );
}

// Step 8: Test Delete Operations
echo yellow("\n--- Step 8: Delete Operations (Admin only) ---\n");

if ($categoryId) {
    testRequest(
        "Staff deletes category (should fail - 403)",
        "DELETE",
        "/categories/$categoryId",
        $staffToken
    );
    
    testRequest(
        "Manager deletes category (should fail - 403)",
        "DELETE",
        "/categories/$categoryId",
        $managerToken
    );
    
    testRequest(
        "Admin deletes category (should succeed)",
        "DELETE",
        "/categories/$categoryId",
        $adminToken
    );
}

// Summary
echo yellow("\n=== Test Summary ===\n");
echo green("Authentication with Passport tokens\n");
echo green("Gate-based authorization (products.create, categories.create/update/delete)\n");
echo green("Policy-based authorization (view, updateStatus)\n");
echo green("Admin bypass (can do everything)\n");
echo green("Manager permissions (create/update products & categories)\n");
echo green("Staff restrictions (only view assigned & update status)\n");

echo yellow("\n=== Test Credentials ===\n");
echo "Admin:   admin@example.com / password\n";
echo "Manager: manager@example.com / password\n";
echo "Staff 1: staff1@example.com / password\n";
echo "Staff 2: staff2@example.com / password\n";

echo "\n";
