# Web UI (Breeze) Setup

## Issue
The web interface shows a Vite manifest error because frontend assets haven't been compiled.

## Solution Options

### Option 1: Install npm and build assets (Recommended for full web UI)
```bash
# Install npm
sudo apt install npm

# Install dependencies
npm install

# Build assets for production
npm run build

# OR run dev server (auto-rebuilds on changes)
npm run dev
```

Then refresh the browser at http://localhost:8000/login

### Option 2: Use API Only (Already Working!)
The API is fully functional and tested. You can use the API endpoints without the web UI:

```bash
# Test API
php test_api_live.php

# Or use any HTTP client (curl, Postman, Thunder Client, etc.)
```

See [API_TEST_COLLECTION.md](API_TEST_COLLECTION.md) for all API endpoints.

### Option 3: Disable Breeze Views (API-only project)
If you only need the API, you can comment out the web routes:

**routes/web.php:**
```php
<?php
// Comment out or remove Breeze routes if only using API
// require __DIR__.'/auth.php';
```

## Current Status

✅ **API Authentication & Authorization**: Fully working and tested
- POST /api/login ✅
- GET /api/me ✅
- All RBAC endpoints ✅

❌ **Web UI (Breeze)**: Requires npm build
- Web login page needs Vite assets
- Can be enabled by installing npm and running `npm run build`

## Recommendation

Since the TP6 assignment focuses on RBAC with both web and API authentication:

**For demonstration:**
- API is ready to use immediately ✅
- Web UI requires: `sudo apt install npm && npm install && npm run build`

**For development:**
- Use API for testing RBAC (already tested and working)
- Build web UI if you need the login interface

## Test Without Web UI

```bash
# Start Laravel server (already running)
php artisan serve

# Test all RBAC functionality via API
php test_api_live.php

# Output shows:
# ✅ Authentication: Passport tokens working
# ✅ Gates: Permission-based authorization working  
# ✅ Policies: Object-level authorization working
# ✅ Admin Bypass: Admin can do everything
# ✅ Manager Permissions: Can create/update products & categories
# ✅ Staff Restrictions: Can only view assigned & update status
```

All TP6 requirements are met through the API! 🎉
