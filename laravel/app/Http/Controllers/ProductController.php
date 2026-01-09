<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function getProducts()
    {
        return Product::all();
    }

    public function createProduct(Request $request)
    {
        abort_unless(auth()->user()->can('products.create'), 403);

        $validated = $request->validate([
            'name' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'pricing' => 'required|numeric',
            'description' => 'nullable|string',
            'images' => 'nullable|json',
        ]);

        $validated['created_by'] = auth()->id();
        return Product::create($validated);
    }

    public function getProduct($productId)
    {
        return Product::findOrFail($productId);
    }

    public function updateProduct(Request $request, $productId)
    {
        abort_unless(auth()->user()->can('products.update'), 403);

        $product = Product::findOrFail($productId);
        $validated = $request->validate([
            'name' => 'sometimes|string',
            'category_id' => 'sometimes|exists:categories,id',
            'pricing' => 'sometimes|numeric',
            'description' => 'sometimes|nullable|string',
            'images' => 'sometimes|nullable|json',
        ]);

        $product->update($validated);
        return $product;
    }

    public function deleteProduct($productId)
    {
        abort_unless(auth()->user()->can('products.delete'), 403);

        $product = Product::findOrFail($productId);
        $product->delete();
        return ['message' => 'Product deleted'];
    }

    public function getProductsByCategory($categoryId)
    {
        return Product::where('category_id', $categoryId)->get();
    }
}
