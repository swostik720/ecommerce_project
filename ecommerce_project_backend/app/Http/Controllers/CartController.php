<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function showPublic($id)
    {
        $product = Product::findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $product,
        ]);
    }

    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $userId = Auth::id();
        $cartItem = Cart::where('user_id', $userId)
            ->where('product_id', $request->product_id)
            ->first();

        if ($cartItem) {
            // If the item exists, increment the quantity
            $cartItem->quantity += $request->quantity;
            $cartItem->save();

            return response()->json(['message' => 'Product quantity updated in cart', 'cart' => $cartItem]);
        }

        // If the item doesn't exist, create a new cart item
        $cartItem = Cart::create([
            'user_id' => $userId,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
        ]);

        return response()->json(['message' => 'Product added to cart', 'cart' => $cartItem]);
    }

    // ✅ Remove a product from the cart
    public function removeFromCart($id)
    {
        $userId = Auth::id();
        $cartItem = Cart::where('user_id', $userId)->where('product_id', $id)->first();

        if (!$cartItem) {
            return response()->json(['message' => 'Product not found in cart'], 404);
        }

        $cartItem->delete();
        return response()->json(['message' => 'Product removed from cart']);
    }

    // ✅ Get the user's cart with product details (Including Slug)
    public function getCart()
    {
        $userId = Auth::id();
        $cartItems = Cart::where('user_id', $userId)->with('product')->get();

        $formattedCart = $cartItems->map(function ($item) {
            return [
                'id' => $item->id,
                'quantity' => $item->quantity,
                'product' => [
                    'id' => $item->product->id,
                    'name' => $item->product->name,
                    'price' => $item->product->price,
                    'slug' => $item->product->slug, // ✅ Ensure slug is included
                    'image' => $item->product->image,
                ],
            ];
        });

        return response()->json($formattedCart);
    }

    public function updateCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $userId = Auth::id();
        $cartItem = Cart::where('user_id', $userId)
            ->where('product_id', $request->product_id)
            ->first();

        if ($cartItem) {
            $cartItem->quantity = $request->quantity;
            $cartItem->save();
        }

        return response()->json(['message' => 'Cart updated', 'cart' => $cartItem]);
    }
}
