<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\EloquentTestController;

// Eloquent Test APIs (Public - no authentication)
Route::controller(EloquentTestController::class)->prefix('eloquent')->group(function() {
    // Create endpoints
    Route::post('/create-authors', 'createAuthors');
    Route::post('/create-articles', 'createArticles');
    Route::post('/create-audiences', 'createAudiences');
    Route::post('/subscribe', 'subscribe');
    Route::post('/create-comments', 'createComments');
    
    // Get endpoints
    Route::get('/author-articles', 'authorArticles');
    Route::get('/article-audiences', 'articleAudiences');
    Route::get('/author-audiences', 'authorAudiences');
    Route::get('/audience-comments', 'audienceComments');
    Route::get('/all-comments', 'allComments');
});

// API Login - returns Passport token
Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    $user = $request->user();
    $token = $user->createToken('api-token')->accessToken;

    return response()->json(['token' => $token]);
});

// Protected API routes
Route::middleware('auth:api')->group(function () {
    // Get current user with roles
    Route::get('/me', function (Request $request) {
        return $request->user()->load('roles');
    });

    Route::controller(CategoryController::class)->prefix('categories')->group(function() {
        Route::get('/', 'getCategories');
        Route::post('/', 'createCategory');
        Route::get('/{categoryId}', 'getCategory');
        Route::patch('/{categoryId}', 'updateCategory');
        Route::delete('/{categoryId}', 'deleteCategory');
        // Status update - assigned staff only (policy)
        Route::patch('/{categoryId}/status', 'updateCategoryStatus');
    });

    Route::controller(ProductController::class)->prefix('products')->group(function() {
        Route::get('/', 'getProducts');
        Route::post('/', 'createProduct');
        Route::get('/{productId}', 'getProduct');
        Route::patch('/{productId}', 'updateProduct');
        Route::delete('/{productId}', 'deleteProduct');
    });

    Route::get('/categories/{categoryId}/products', [ProductController::class, 'getProductsByCategory']);
});
