<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin')->except(['index']);
    }

    public function index(Request $request)
    {
        return response()->json(Product::with('brand')->get());
    }


    public function store(Request $request)
    {
        // $request->validate([
        //     'name' => 'required',
        //     'price' => 'required|numeric',
        //     'brand_id' => 'required|exists:brands,id',
        //     'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        // ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
        } else {
            $imagePath = null;
        }

        $slug = Str::slug($request->name);

        $product = Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description,
            'brand_id' => $request->brand_id,
            'image' => $imagePath,
            'slug' => $slug,
        ]);

        return response()->json($product, 201);
    }

    public function show(Product $product)
    {

        return response()->json($product);
    }

    public function update(Request $request, Product $product)
    {
        //$request->validate(['name' => 'required', 'price' => 'numeric', 'brand_id' => 'exists:brands,id', 'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048']);
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $product->image = $imagePath;
        }

        $slug = Str::slug($request->name); // ✅ Generate updated slug

        $product->update($request->except(['_method', 'image']) + [
            'image' => $product->image,
            'slug' => $slug // ✅ Save updated slug
        ]);
        return response()->json(['message' => 'Product updated successfully', 'product' => $product]);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Product deleted']);
    }

}
