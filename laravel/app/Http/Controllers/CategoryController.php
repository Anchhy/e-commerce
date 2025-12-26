<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // GET /api/categories - Get all categories
    public function getCategories()
    {
        // GET /api/categories
        return ['message' => 'Getting list of categories'];
    }

    // POST /api/categories - Create a new category
    public function createCategory(Request $request)
    {
        // POST /api/categories
        return ['message' => 'Creating 1 new category'];
    }

    // GET /api/categories/{categoryId} - Get a specific category
    public function getCategory($categoryId)
    {
        // GET /api/categories/{categoryId}
        return ['message' => 'Getting 1 category base on given categoryId'];
    }

    // PATCH /api/categories/{categoryId} - Update a category
    public function updateCategory(Request $request, $categoryId)
    {
        // PATCH /api/categories/{categoryId}
        return ['message' => 'Updating 1 category base on given categoryId'];
    }

    // DELETE /api/categories/{categoryId} - Delete a category
    public function deleteCategory($categoryId)
    {
        // DELETE /api/categories/{categoryId}
        return ['message' => 'Deleting 1 category base on given categoryId'];
    }
}
