<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Brand;
use App\Models\Category;

class BrandSeeder extends Seeder
{
    public function run(): void
    {
        $brands = [
            // Sun Glasses
            ['name' => 'Ray-Ban', 'category' => 'Sun Glasses', 'category_id' => 1],
            ['name' => 'Oakley', 'category' => 'Sun Glasses', 'category_id' => 1],
            ['name' => 'Maui Jim', 'category' => 'Sun Glasses', 'category_id' => 1],
            ['name' => 'Gucci', 'category' => 'Sun Glasses', 'category_id' => 1],
            ['name' => 'Prada', 'category' => 'Sun Glasses', 'category_id' => 1],

            // Eye Glasses
            ['name' => 'Ray-Ban', 'category' => 'Eye Glasses', 'category_id' => 2],
            ['name' => 'Warby Parker', 'category' => 'Eye Glasses', 'category_id' => 2],
            ['name' => 'Zenni Optical', 'category' => 'Eye Glasses', 'category_id' => 2],
            ['name' => 'Oliver Peoples', 'category' => 'Eye Glasses', 'category_id' => 2],
            ['name' => 'Tom Ford', 'category' => 'Eye Glasses', 'category_id' => 2],

            // Eye Lenses
            ['name' => 'Acuvue', 'category' => 'Eye Lenses', 'category_id' => 3],
            ['name' => 'Bausch + Lomb', 'category' => 'Eye Lenses', 'category_id' => 3],
            ['name' => 'CooperVision', 'category' => 'Eye Lenses', 'category_id' => 3],
            ['name' => 'Air Optix', 'category' => 'Eye Lenses', 'category_id' => 3],
            ['name' => 'Biofinity', 'category' => 'Eye Lenses', 'category_id' => 3],

            // Sports Eyewear
            ['name' => 'Nike Vision', 'category' => 'Sports Eyewear', 'category_id' => 4],
            ['name' => 'Adidas Eyewear', 'category' => 'Sports Eyewear', 'category_id' => 4],
            ['name' => 'Oakley', 'category' => 'Sports Eyewear', 'category_id' => 4],
            ['name' => 'Under Armour', 'category' => 'Sports Eyewear', 'category_id' => 4],
            ['name' => 'Rudy Project', 'category' => 'Sports Eyewear', 'category_id' => 4],

            // Computer Glasses
            ['name' => 'Lenskart Blu', 'category' => 'Computer Glasses', 'category_id' => 5],
            ['name' => 'Gunnar Optiks', 'category' => 'Computer Glasses', 'category_id' => 5],
            ['name' => 'Pixel Eyewear', 'category' => 'Computer Glasses', 'category_id' => 5],
            ['name' => 'EyeBuyDirect', 'category' => 'Computer Glasses', 'category_id' => 5],
            ['name' => 'Felix Gray', 'category' => 'Computer Glasses', 'category_id' => 5],

            // Prescription Glasses
            ['name' => 'Ray-Ban', 'category' => 'Prescription Glasses', 'category_id' => 6],
            ['name' => 'Warby Parker', 'category' => 'Prescription Glasses', 'category_id' => 6],
            ['name' => 'Oakley', 'category' => 'Prescription Glasses', 'category_id' => 6],
            ['name' => 'Prada', 'category' => 'Prescription Glasses', 'category_id' => 6],
            ['name' => 'Gucci', 'category' => 'Prescription Glasses', 'category_id' => 6],
        ];

        foreach ($brands as $entry) {
            // Check if the brand already exists with the same name and category_id
            $brand = Brand::where('name', $entry['name'])
                          ->where('category_id', $entry['category_id'])
                          ->first();

            // If the brand does not exist, create it
            if (!$brand) {
                Brand::create([
                    'name' => $entry['name'],
                    'category_id' => $entry['category_id'],
                ]);
            }
        }
    }
}
