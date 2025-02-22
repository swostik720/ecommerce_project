<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    // Admin: Fetch All Orders
    public function index()
    {
        return Order::with('user')->get(); // Include user details for admin view
    }

    // User: Fetch Orders for the Authenticated User
    public function userOrders(Request $request)
    {
        return Order::where('user_id', $request->user()->id)->get();
    }

    public function store(Request $request)
    {
        try {
            // Validate input
            $validated = $request->validate([
                'transaction_code' => 'required|string',
                'total_amount' => 'required|numeric|min:0',
                // 'products' => 'nullable|array', // Optional products array
            ]);
            
            // Get the authenticated user ID or null for guest orders
            $userId = auth()->check() ? auth()->id() : null;

            if (!$userId) {
                Log::warning('No authenticated user while creating an order. Saving as guest order.');
            }

            // Create a new order record
            $order = Order::create([
                'user_id' => $userId,
                'transaction_code' => $validated['transaction_code'],
                'total_amount' => $validated['total_amount'],
                'status' => 'COMPLETE',
                // 'products' => json_encode($validated['products'] ?? []), // Save products as JSON
            ]);

            Log::info("Order created successfully: ID {$order->id}");
            return response()->json($order, 201); // Return the created order with HTTP 201 status
        } catch (\Exception $e) {
            Log::error('Order creation failed: ' . $e->getMessage());
            return response()->json(['error' => 'Order creation failed'], 500);
        }
    }
}
