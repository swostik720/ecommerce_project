<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wishlist;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{
    public function index()
    {
        $wishlist = Wishlist::where('user_id', Auth::id())->with('product')->get();
        return response()->json($wishlist);
    }

    public function addToWishlist(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $wishlistItem = Wishlist::where('user_id', Auth::id())
            ->where('product_id', $request->product_id)
            ->first();

        if ($wishlistItem) {
            return response()->json(['message' => 'Product already in wishlist'], 400);
        }

        Wishlist::create([
            'user_id' => Auth::id(),
            'product_id' => $request->product_id,
        ]);

        return response()->json(['message' => 'Added to wishlist']);
    }

    public function removeFromWishlist($id)
    {
        $wishlistItem = Wishlist::where('user_id', Auth::id())->where('id', $id)->first();

        if (!$wishlistItem) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        $wishlistItem->delete();
        return response()->json(['message' => 'Removed from wishlist']);
    }
}
