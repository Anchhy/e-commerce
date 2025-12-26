<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    // GET /api/products - Get all products
    public function getProducts()
    {
        // GET /api/products
        return ['message' => 'Getting list of products'];
    }

    // POST /api/products - Create a new product
    public function createProduct(Request $request)
    {
        // POST /api/products
        return ['message' => 'Creating 1 new product'];
    }

    // GET /api/products/{productId} - Get a specific product
    public function getProduct($productId)
    {
        // GET /api/products/{productId}
        return ['message' => 'Getting 1 product base on given productId'];
    }

    // PATCH /api/products/{productId} - Update a product
    public function updateProduct(Request $request, $productId)
    {
        // PATCH /api/products/{productId}
        return ['message' => 'Updating 1 product base on given productId'];
    }

    // DELETE /api/products/{productId} - Delete a product
    public function deleteProduct($productId)
    {
        // DELETE /api/products/{productId}
        return ['message' => 'Deleting 1 product base on given productId'];
    }

    // GET /api/categories/{categoryId}/products - Get products by category
    public function getProductsByCategory($categoryId)
    {
        // GET /api/categories/{categoryId}/products
        return ['message' => 'Getting list of products base on given categoryId'];
    }
}
