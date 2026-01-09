<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class CategoryController extends Controller
{
    use AuthorizesRequests;
    public function getCategories()
    {
        return Category::all();
    }

    public function createCategory(Request $request)
    {
        abort_unless(auth()->user()->can('categories.create'), 403);

        $validated = $request->validate([
            'name' => 'required|string',
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        return Category::create($validated);
    }

    public function getCategory($categoryId)
    {
        $category = Category::findOrFail($categoryId);
        $this->authorize('view', $category);
        return $category;
    }

    public function updateCategory(Request $request, $categoryId)
    {
        abort_unless(auth()->user()->can('categories.update'), 403);

        $category = Category::findOrFail($categoryId);
        $validated = $request->validate([
            'name' => 'sometimes|string',
            'assigned_to' => 'sometimes|nullable|exists:users,id',
        ]);

        $category->update($validated);
        return $category;
    }

    public function deleteCategory($categoryId)
    {
        abort_unless(auth()->user()->can('categories.delete'), 403);

        $category = Category::findOrFail($categoryId);
        $category->delete();
        return ['message' => 'Category deleted'];
    }

    public function updateCategoryStatus(Request $request, $categoryId)
    {
        $category = Category::findOrFail($categoryId);
        
        // Use policy: only assigned staff can update status
        $this->authorize('updateStatus', $category);

        $validated = $request->validate([
            'status' => 'required|string|in:pending,in-progress,completed',
        ]);

        $category->update($validated);
        return $category;
    }
}
