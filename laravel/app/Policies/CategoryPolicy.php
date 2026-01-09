<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Category;

class CategoryPolicy
{
    public function view(User $user, Category $category): bool
    {
        // Staff can only view categories assigned to them
        if ($user->hasRole('staff')) {
            return $category->assigned_to === $user->id;
        }
        
        // Manager and admin can view all (admin bypass handled by Gate::before)
        return true;
    }

    public function updateStatus(User $user, Category $category): bool
    {
        return $user->hasRole('staff') && $category->assigned_to === $user->id;
    }
}
