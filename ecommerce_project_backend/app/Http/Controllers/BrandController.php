<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller {
    public function __construct() {
        $this->middleware('admin')->except(['index', 'show']);
    }

    public function index() {
        return response()->json(Brand::with('category')->get());
    }

    public function store(Request $request) {
        //$request->validate(['name' => 'required|unique:brands', 'category_id' => 'required|exists:categories,id']);
        $brand = Brand::create($request->all());
        return response()->json($brand, 201);
    }

    public function show(Brand $brand) {
        return response()->json($brand);
    }

    public function update(Request $request, Brand $brand) {
        //$request->validate(['name' => 'required|unique:brands,name,' . $brand->id, 'category_id' => 'exists:categories,id']);
        $brand->update($request->all());
        return response()->json($brand);
    }

    public function destroy(Brand $brand) {
        $brand->delete();
        return response()->json(['message' => 'Brand deleted']);
    }
}

