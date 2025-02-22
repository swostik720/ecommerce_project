<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\EsewaController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\WishlistController;

// Public Routes (No Authentication Required)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/password/email', [AuthController::class, 'sendPasswordResetLink']);
Route::post('/password/reset', [AuthController::class, 'resetPassword']);

// Contact-us Routes
Route::post('/contact-us', [ContactUsController::class, 'store']);

// Routes to View Categories, Brands, and Products
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);
Route::get('/brands', [BrandController::class, 'index']);
Route::get('/brands/{brand}', [BrandController::class, 'show']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/details/{id}', [CartController::class, 'showPublic']);

// ----------------- Esewa Verification (Must be Outside auth:sanctum) -----------------
Route::match(['get', 'post'], '/esewa/verification', [EsewaController::class, 'verification'])->name('esewa.verification');

// Protected Routes (Only Authenticated Users)
Route::middleware('auth:sanctum')->group(function () {
    // User Profile
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // Routes for Categories, Brands, and Products (Admin Only)
    Route::middleware('admin')->group(function () {
        Route::post('/categories', [CategoryController::class, 'store']);
        Route::put('/categories/{category}', [CategoryController::class, 'update']);
        Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);
        Route::post('/brands', [BrandController::class, 'store']);
        Route::put('/brands/{brand}', [BrandController::class, 'update']);
        Route::delete('/brands/{brand}', [BrandController::class, 'destroy']);
        Route::post('/products', [ProductController::class, 'store']);
        Route::put('/products/{product}', [ProductController::class, 'update']);
        Route::delete('/products/{product}', [ProductController::class, 'destroy']);
        Route::get('/products/{product}', [ProductController::class, 'show']);

        // Admin: View All Orders
        Route::get('/orders', [OrderController::class, 'index']);
    });

    // Routes for Cart
    Route::post('/cart/add', [CartController::class, 'addToCart']);
    Route::delete('/cart/remove/{id}', [CartController::class, 'removeFromCart']);
    Route::get('/cart', [CartController::class, 'getCart']);
    Route::post('/cart/update', [CartController::class, 'updateCart']);

    // Routes for Wishlist
    Route::get('/wishlist', [WishlistController::class, 'index']);
    Route::post('/wishlist/add', [WishlistController::class, 'addToWishlist']);
    Route::delete('/wishlist/remove/{id}', [WishlistController::class, 'removeFromWishlist']);

    // Esewa Checkout
    Route::post('/esewa/checkout', [EsewaController::class, 'checkout']);

    // User: View Their Own Orders
    Route::get('/user/orders', [OrderController::class, 'userOrders']);
    
    Route::post('/orders', [OrderController::class, 'store']);

});
