<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // Sun Glasses
            [
                'name' => 'Ray-Ban Aviator Classic',
                'brand' => 'Ray-Ban',
                'price' => 159.99,
                'description' => 'The Ray-Ban Aviator Classic is a timeless piece that has been a symbol of style for decades. These iconic sunglasses are made with high-quality materials, offering both durability and comfort. The aviator design, originally created for military pilots, has transcended into mainstream fashion, making it a go-to choice for anyone who wants to look effortlessly cool. With 100% UV protection, these sunglasses not only make a fashion statement but also protect your eyes from harmful rays.',
                'image' => 'products/rayban-aviator.avif',
                'category_id' => 1,
            ],
            [
                'name' => 'Oakley Holbrook',
                'brand' => 'Oakley',
                'price' => 120.00,
                'description' => 'The Oakley Holbrook sunglasses are designed for individuals who appreciate both functionality and style. Featuring a lightweight O-Matter frame and high-definition optics, these sunglasses offer clarity and contrast, making them ideal for outdoor activities, sports, or casual daily use. With 100% UV protection, the Oakley Holbrook is perfect for anyone seeking a balance of performance and fashion.',
                'image' => 'products/oakley-holbrook.jpg',
                'category_id' => 1,
            ],
            [
                'name' => 'Maui Jim Peahi',
                'brand' => 'Maui Jim',
                'price' => 220.00,
                'description' => 'Maui Jim Peahi sunglasses are built for the adventure seeker. Whether you’re a surfer, hiker, or cyclist, these polarized sunglasses provide the clarity and protection you need. The advanced PolarizedPlus2 lens technology reduces glare and enhances color and contrast, offering a clearer and sharper view of your surroundings.',
                'image' => 'products/mauijim-peahi.webp',
                'category_id' => 1,
            ],
            [
                'name' => 'Gucci GG0061S',
                'brand' => 'Gucci',
                'price' => 380.00,
                'description' => 'The Gucci GG0061S sunglasses are an exquisite addition to any wardrobe. Known for their luxury and impeccable craftsmanship, these sunglasses are made from high-quality acetate and feature the signature Gucci logo on the temples. With large, rounded frames, they offer a bold look that’s both fashionable and functional.',
                'image' => 'products/gucci-gg0061s.jpg',
                'category_id' => 1,
            ],
            [
                'name' => 'Prada PR 17IS',
                'brand' => 'Prada',
                'price' => 320.00,
                'description' => 'The Prada PR 17IS sunglasses are designed for those who want to make a statement. With an oversized frame, they offer a high-fashion look that’s perfect for anyone who wants to stand out. Made from a combination of acetate and metal, these sunglasses feature UV protection and are ideal for any fashion-forward individual.',
                'image' => 'products/prada-pr17is.jpg',
                'category_id' => 1,
            ],

            // Eye Glasses
            [
                'name' => 'Ray-Ban Round Metal Eyeglasses',
                'brand' => 'Ray-Ban',
                'price' => 145.00,
                'description' => 'The Ray-Ban Round Metal Eyeglasses are a perfect blend of retro style and modern sophistication. Featuring a round metal frame, these eyeglasses are designed to provide comfort and durability while offering a fashionable look. Whether for work or play, these glasses are a versatile choice.',
                'image' => 'products/rayban-round.avif',
                'category_id' => 2,
            ],
            [
                'name' => 'Warby Parker Durand',
                'brand' => 'Warby Parker',
                'price' => 125.00,
                'description' => 'Warby Parker’s Durand eyeglasses offer a modern twist on a classic round design. Made with lightweight materials, these glasses provide comfort and durability for all-day wear. They are available in several colors and with custom prescription lenses, making them perfect for daily use.',
                'image' => 'products/warby-durand.jpg',
                'category_id' => 2,
            ],
            [
                'name' => 'Zenni Rectangle Glasses',
                'brand' => 'Zenni Optical',
                'price' => 45.50,
                'description' => 'Zenni Optical offers affordable eyeglasses, and the Zenni Rectangle Glasses are no exception. Featuring a sleek rectangular design, these glasses are perfect for daily wear, providing both style and comfort. Available in multiple colors and with custom prescription lenses, they combine value with high-quality design.',
                'image' => 'products/zenni-rectangle.jpg',
                'category_id' => 2,
            ],
            [
                'name' => 'Oliver Peoples Gregory',
                'brand' => 'Oliver Peoples',
                'price' => 315.00,
                'description' => 'Oliver Peoples Gregory eyeglasses are perfect for those who want understated luxury. These thin, metal-framed glasses provide a minimalist, professional look. They are lightweight and comfortable for all-day wear and come in a variety of colors and finishes.',
                'image' => 'products/oliver-gregory.jpg',
                'category_id' => 2,
            ],
            [
                'name' => 'Tom Ford FT5294',
                'brand' => 'Tom Ford',
                'price' => 350.00,
                'description' => 'Tom Ford FT5294 eyeglasses offer a sophisticated and stylish design, perfect for anyone looking to make a statement. The high-quality acetate frame is lightweight yet durable, providing comfort while maintaining a high-end look. These eyeglasses are ideal for professional settings or special occasions.',
                'image' => 'products/tom-ford-ft5294.jpg',
                'category_id' => 2,
            ],

            // Eye Lenses
            [
                'name' => 'Acuvue Oasys',
                'brand' => 'Acuvue',
                'price' => 39.99,
                'description' => 'Acuvue Oasys contact lenses are designed for comfort, clarity, and hydration. The lenses are ideal for individuals who spend long hours in front of screens or have dry eyes. With moisture retention technology, these lenses provide long-lasting comfort and 100% UV protection.',
                'image' => 'products/acuvue-oasys.jpg',
                'category_id' => 3,
            ],
            [
                'name' => 'Bausch + Lomb ULTRA',
                'brand' => 'Bausch + Lomb',
                'price' => 59.99,
                'description' => 'Bausch + Lomb ULTRA contact lenses are designed for long-lasting comfort. The unique moistureSeal technology ensures your eyes stay hydrated throughout the day, making them ideal for extended wear. These lenses also offer high-definition optics for crisp, clear vision.',
                'image' => 'products/bausch-ultra.png',
                'category_id' => 3,
            ],
            [
                'name' => 'CooperVision Biofinity',
                'brand' => 'CooperVision',
                'price' => 65.99,
                'description' => 'CooperVision Biofinity lenses are made with Aquaform technology, ensuring moisture retention for extended wear. These lenses provide all-day comfort and are perfect for individuals with dry eyes or those who wear lenses for long periods of time.',
                'image' => 'products/cooper-biofinity.jpg',
                'category_id' => 3,
            ],
            [
                'name' => 'Air Optix Night & Day Aqua',
                'brand' => 'Air Optix',
                'price' => 55.99,
                'description' => 'Air Optix Night & Day Aqua contact lenses are designed for continuous wear, providing comfort and clarity even overnight. The lenses feature high oxygen permeability, ensuring that your eyes remain healthy and hydrated for up to 30 days of continuous use.',
                'image' => 'products/air-optix.jpg',
                'category_id' => 3,
            ],
            [
                'name' => 'Biofinity Toric',
                'brand' => 'Biofinity',
                'price' => 75.99,
                'description' => 'Biofinity Toric lenses are perfect for individuals with astigmatism. Made from high-quality silicone hydrogel, these lenses offer comfort, clarity, and hydration all day long. They are designed to provide stable vision, even in changing environments.',
                'image' => 'products/biofinity-toric.jpg',
                'category_id' => 3,
            ],

            // Sports Eyewear
            [
                'name' => 'Nike Vision Pivotal',
                'brand' => 'Nike Vision',
                'price' => 120.00,
                'description' => 'Nike Vision Pivotal eyewear is designed for athletes who demand both style and performance. The lightweight and durable frame ensures comfort during high-intensity activities, while the specialized lenses provide enhanced contrast and clarity.',
                'image' => 'products/nike-pivotal.webp',
                'category_id' => 4,
            ],
            [
                'name' => 'Adidas Sport Eyewear',
                'brand' => 'Adidas Eyewear',
                'price' => 150.00,
                'description' => 'Adidas Sport Eyewear is engineered for performance, combining innovative technology with superior comfort. These glasses are perfect for running, cycling, or any sport that requires high-impact protection and clarity of vision.',
                'image' => 'products/adidas-sport.jpg',
                'category_id' => 4,
            ],
            [
                'name' => 'Oakley Radar EV Path',
                'brand' => 'Oakley',
                'price' => 210.00,
                'description' => 'Oakley Radar EV Path eyewear is designed for high-performance athletes. Featuring a lightweight, durable frame and enhanced peripheral vision, these sunglasses provide comfort and clarity during intense outdoor sports like cycling or running.',
                'image' => 'products/oakley-radar.jpg',
                'category_id' => 4,
            ],
            [
                'name' => 'Under Armour UA Spotlight',
                'brand' => 'Under Armour',
                'price' => 180.00,
                'description' => 'Under Armour UA Spotlight eyewear is designed for athletes who require high-performance eyewear that delivers superior comfort and clarity. The lens technology improves vision in low-light conditions, ensuring enhanced performance.',
                'image' => 'products/under-armour.jpg',
                'category_id' => 4,
            ],
            [
                'name' => 'Rudy Project Tralyx',
                'brand' => 'Rudy Project',
                'price' => 220.00,
                'description' => 'Rudy Project Tralyx eyewear combines innovative design with top-tier optical performance. With interchangeable lenses, these glasses are perfect for cycling, running, or any outdoor sport.',
                'image' => 'products/rudy-tralyx.jpg',
                'category_id' => 4,
            ],

            // Computer Glasses
            [
                'name' => 'Lenskart Blu Cut Glasses',
                'brand' => 'Lenskart Blu',
                'price' => 99.00,
                'description' => 'Lenskart Blu Cut glasses are designed to reduce blue light exposure from screens, which helps to alleviate digital eye strain. The lenses offer clear vision while protecting your eyes from harmful blue light.',
                'image' => 'products/lenskart-blu.jpg',
                'category_id' => 5,
            ],
            [
                'name' => 'Gunnar Optiks Computer Glasses',
                'brand' => 'Gunnar Optiks',
                'price' => 149.00,
                'description' => 'Gunnar Optiks is known for their specialized computer glasses designed to reduce eye strain from digital screens. The lenses feature amber tint to enhance contrast and minimize blue light exposure, providing relief for people who spend long hours on computers or mobile devices.',
                'image' => 'products/gunnar-optiks.jpg',
                'category_id' => 5,
            ],
            [
                'name' => 'Pixel Eyewear Blue Light Glasses',
                'brand' => 'Pixel Eyewear',
                'price' => 85.00,
                'description' => 'Pixel Eyewear offers blue light blocking glasses to protect your eyes from digital strain. These stylish glasses are made with lightweight frames and come with lenses that block harmful blue light, making them perfect for anyone who uses screens for long hours.',
                'image' => 'products/pixel-eyewear.jpg',
                'category_id' => 5,
            ],
            [
                'name' => 'EyeBuyDirect Blue Light Glasses',
                'brand' => 'EyeBuyDirect',
                'price' => 55.00,
                'description' => 'EyeBuyDirect offers a range of blue light glasses designed to protect your eyes from strain caused by digital devices. These glasses feature anti-reflective lenses and stylish frames, providing comfort and eye protection throughout the day.',
                'image' => 'products/eyebuydirect.jpg',
                'category_id' => 5,
            ],
            [
                'name' => 'Felix Gray Blue Light Glasses',
                'brand' => 'Felix Gray',
                'price' => 115.00,
                'description' => 'Felix Gray glasses are specifically designed to reduce the impact of blue light on your eyes. These glasses feature high-quality lenses with a special coating that helps alleviate digital eye strain while also providing a stylish look for any occasion.',
                'image' => 'products/felix-gray.jpg',
                'category_id' => 5,
            ],

            // Prescription Glasses
            [
                'name' => 'Ray-Ban Prescription Glasses',
                'brand' => 'Ray-Ban',
                'price' => 145.00,
                'description' => 'Ray-Ban prescription glasses offer the perfect combination of classic style and functional prescription eyewear. These frames are available in various styles and colors, allowing you to customize your glasses to your unique taste and prescription needs.',
                'image' => 'products/rayban-prescription.jpg',
                'category_id' => 6,
            ],
            [
                'name' => 'Warby Parker Prescription Glasses',
                'brand' => 'Warby Parker',
                'price' => 125.00,
                'description' => 'Warby Parker offers a wide range of stylish prescription glasses. Their frames are lightweight, durable, and available in a variety of shapes and colors, ensuring a perfect fit for your style and vision needs.',
                'image' => 'products/warby-prescription.jpg',
                'category_id' => 6,
            ],
            [
                'name' => 'Oakley Prescription Glasses',
                'brand' => 'Oakley',
                'price' => 170.00,
                'description' => 'Oakley prescription glasses combine high-performance design with stylish frames. These glasses are engineered for comfort, durability, and functionality, providing both prescription correction and the cutting-edge style Oakley is known for.',
                'image' => 'products/oakley-prescription.jpg',
                'category_id' => 6,
            ],
            [
                'name' => 'Prada Prescription Glasses',
                'brand' => 'Prada',
                'price' => 320.00,
                'description' => 'Prada prescription glasses are for those who want to make a luxury statement. These frames are crafted with premium materials and designed with high-end fashion in mind, offering both excellent vision correction and sophisticated style.',
                'image' => 'products/prada-prescription.jpg',
                'category_id' => 6,
            ],
            [
                'name' => 'Gucci Prescription Glasses',
                'brand' => 'Gucci',
                'price' => 420.00,
                'description' => 'Gucci prescription glasses are crafted from the finest materials, offering both luxury and functionality. The iconic Gucci design and attention to detail ensure these glasses stand out while providing superior comfort and vision correction.',
                'image' => 'products/gucci-prescription.jpg',
                'category_id' => 6,
            ],
        ];

        // Initialize the brand_id counter (starting at 1 or any value you prefer)
        $brand_id = 1;

        foreach ($products as $data) {
            // Fetch the category based on the category_id
            $category = Category::where('id', $data['category_id'])->first();

            // Check if the category exists
            if ($category) {
                // Create the product and link it to the category
                Product::firstOrCreate(
                    ['name' => $data['name']], // Unique attributes to check if the product exists
                    [
                        'brand_id' => $brand_id,  // Use the incremented brand_id
                        'price' => $data['price'],
                        'description' => $data['description'],
                        'image' => $data['image'],
                        'slug' => Str::slug($data['name']),
                    ]
                );

                // Increment the brand_id for the next product
                $brand_id++;
            }
        }
    }
}
