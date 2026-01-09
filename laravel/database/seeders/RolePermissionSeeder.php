<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            'admin', 'manager', 'staff'
        ];

        $permissions = [
            'users.manage',
            'products.create', 'products.update', 'products.delete',
            'categories.create', 'categories.update', 'categories.delete',
        ];

        foreach ($roles as $r) {
            Role::firstOrCreate(['name' => $r]);
        }
        foreach ($permissions as $p) {
            Permission::firstOrCreate(['name' => $p]);
        }

        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            ['name' => 'Admin', 'password' => Hash::make('password')]
        );
        $manager = User::firstOrCreate(
            ['email' => 'manager@example.com'],
            ['name' => 'Manager', 'password' => Hash::make('password')]
        );
        $staff1 = User::firstOrCreate(
            ['email' => 'staff1@example.com'],
            ['name' => 'Staff One', 'password' => Hash::make('password')]
        );
        $staff2 = User::firstOrCreate(
            ['email' => 'staff2@example.com'],
            ['name' => 'Staff Two', 'password' => Hash::make('password')]
        );

        // Attach roles
        $adminRole = Role::where('name', 'admin')->first();
        $managerRole = Role::where('name', 'manager')->first();
        $staffRole = Role::where('name', 'staff')->first();

        $admin->roles()->syncWithoutDetaching([$adminRole->id]);
        $manager->roles()->syncWithoutDetaching([$managerRole->id]);
        $staff1->roles()->syncWithoutDetaching([$staffRole->id]);
        $staff2->roles()->syncWithoutDetaching([$staffRole->id]);

        // Grant permissions to roles
        $managerPerms = Permission::whereIn('name', [
            'products.create','products.update',
            'categories.create','categories.update'
        ])->pluck('id');
        $staffPerms = Permission::whereIn('name', [
        ])->pluck('id');
        $allPerms = Permission::pluck('id');

        $adminRole->permissions()->sync($allPerms);
        $managerRole->permissions()->sync($managerPerms);
        $staffRole->permissions()->sync($staffPerms);
    }
}
