<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller {
    public function __construct() {
        $this->middleware('admin')->except(['index', 'show']);
    }

    public function index() {
        return response()->json(Category::all());
    }

    public function store(Request $request) {
        //$request->validate(['name' => 'required|unique:categories']);
        $category = Category::create($request->all());
        return response()->json($category, 201);
    }

    public function show(Category $category) {
        return response()->json($category);
    }

    public function update(Request $request, Category $category) {
        //$request->validate(['name' => 'required|unique:categories,name,' . $category->id]);
        $category->update($request->all());
        return response()->json($category);
    }

    public function destroy(Category $category) {
        $category->delete();
        return response()->json(['message' => 'Category deleted']);
    }
}

