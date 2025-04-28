<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
{
    $categories = [
        'Sun Glasses',
        'Eye Glasses',
        'Eye Lenses',
        'Sports Eyewear',
        'Computer Glasses',
        'Prescription Glasses',
    ];

    foreach ($categories as $category) {
        \App\Models\Category::firstOrCreate(['name' => $category]);
    }
}

}
