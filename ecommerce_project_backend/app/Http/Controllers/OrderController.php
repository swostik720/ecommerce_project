<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        Log::info('Starting order creation process.');

        try {
            $validated = $request->validate([
                'transaction_code' => 'required|string',
                'total_amount' => 'required|numeric|min:0',
                'products' => 'required|array',
                'products.*.id' => 'required|exists:products,id',
                'products.*.quantity' => 'required|integer|min:1',
                'products.*.price' => 'required|numeric|min:0',
            ]);
            Log::info('Request validated successfully.', $validated);

            $userId = auth()->id();
            Log::info('Authenticated user ID:', ['user_id' => $userId]);

            $order = Order::create([
                'user_id' => $userId,
                'status' => 'processing',
            ]);
            Log::info('Order created.', ['order_id' => $order->id]);

            foreach ($validated['products'] as $product) {
                $orderItem = OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product['id'],
                    'quantity' => $product['quantity'],
                    'price' => $product['price'],
                ]);
                Log::info('Order item created.', ['order_item_id' => $orderItem->id]);
            }

            $payment = Payment::create([
                'order_id' => $order->id,
                'transaction_uuid' => $validated['transaction_code'],
                'amount' => $validated['total_amount'],
                'tax_amount' => 0,
                'total_amount' => $validated['total_amount'],
                'status' => 'COMPLETE',
            ]);
            Log::info('Payment created.', ['payment_id' => $payment->id]);

            // Generate receipt_url for the newly created order
            $encodedData = base64_encode(json_encode([
                'transaction_code' => $payment->transaction_uuid,
                'status' => $payment->status,
                'total_amount' => $payment->total_amount,
                'transaction_uuid' => $payment->transaction_uuid,
            ]));
            $receiptUrl = env('FRONTEND_URL') . '/receipt?data=' . urlencode($encodedData);

            // Attach receipt_url to the order
            $order->update(['receipt_url' => $receiptUrl]);

            Log::info('Order creation process completed successfully.');

            return response()->json([
                'message' => 'Order created successfully',
                'order' => $order->load('items.product', 'payment')
            ], 201);
        } catch (\Exception $e) {
            Log::error('Order creation failed.', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Order creation failed'], 500);
        }
    }

    public function index()
    {
        Log::info('Fetching all orders.');
        $orders = Order::with('items.product', 'payment', 'user')->get();

        // Generate receipt_url for each order
        $orders = $orders->map(function ($order) {
            if ($order->payment && $order->payment->transaction_uuid) {
                $encodedData = base64_encode(json_encode([
                    'transaction_code' => $order->payment->transaction_uuid,
                    'status' => $order->payment->status,
                    'total_amount' => $order->payment->total_amount,
                    'transaction_uuid' => $order->payment->transaction_uuid,
                ]));
                $order->receipt_url = env('FRONTEND_URL') . '/receipt?data=' . urlencode($encodedData);
            }
            return $order;
        });

        Log::info('All orders fetched successfully.', ['count' => $orders->count()]);
        return response()->json($orders);
    }

    public function userOrders()
    {
        $userId = auth()->id();
        Log::info('Fetching orders for user.', ['user_id' => $userId]);
        $orders = Order::where('user_id', $userId)->with('items.product', 'payment')->get();

        // Generate receipt_url for each user order
        $orders = $orders->map(function ($order) {
            if ($order->payment && $order->payment->transaction_uuid) {
                $encodedData = base64_encode(json_encode([
                    'transaction_code' => $order->payment->transaction_uuid,
                    'status' => $order->payment->status,
                    'total_amount' => $order->payment->total_amount,
                    'transaction_uuid' => $order->payment->transaction_uuid,
                ]));
                $order->receipt_url = env('FRONTEND_URL') . '/receipt?data=' . urlencode($encodedData);
            }
            return $order;
        });

        Log::info('User orders fetched successfully.', ['count' => $orders->count()]);
        return response()->json($orders);
    }

    public function updateStatus(Request $request, $orderId)
    {
        Log::info('Starting order status update.', ['order_id' => $orderId]);

        $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
        ]);

        $order = Order::findOrFail($orderId);
        $order->status = $request->status;
        $order->save();

        Log::info('Order status updated successfully.', [
            'order_id' => $order->id,
            'new_status' => $order->status
        ]);

        return response()->json(['message' => 'Order status updated successfully']);
    }

    public function show($orderId)
    {
        // Load the 'user' relationship along with 'items.product' and 'payment'
        $order = Order::with('items.product', 'payment', 'user')->findOrFail($orderId);

        // Generate receipt_url for the specific order
        if ($order->payment && $order->payment->transaction_uuid) {
            $encodedData = base64_encode(json_encode([
                'transaction_code' => $order->payment->transaction_uuid,
                'status' => $order->payment->status,
                'total_amount' => $order->payment->total_amount,
                'transaction_uuid' => $order->payment->transaction_uuid,
            ]));
            $order->receipt_url = env('FRONTEND_URL') . '/receipt?data=' . urlencode($encodedData);
        }

        // Log the response to check if product and user info is correct
        Log::info('Order fetched:', ['order' => $order]);

        return response()->json($order);
    }

    /**
     * Fetch receipt details for a specific order.
     */
    public function showReceipt(Request $request)
    {
        $orderId = $request->query('orderId');
        Log::info('Fetching receipt details for order.', ['order_id' => $orderId]);

        $order = Order::with('payment')->find($orderId);

        if (!$order || !$order->payment) {
            Log::error('Order not found or payment details missing.', ['order_id' => $orderId]);
            return response()->json(['error' => 'Order not found'], 404);
        }

        // Generate receipt_url dynamically
        $encodedData = base64_encode(json_encode([
            'transaction_code' => $order->payment->transaction_uuid,
            'status' => $order->payment->status,
            'total_amount' => $order->payment->total_amount,
            'transaction_uuid' => $order->payment->transaction_uuid,
        ]));

        $receiptUrl = env('FRONTEND_URL') . '/receipt?data=' . urlencode($encodedData);

        Log::info('Receipt URL generated successfully.', ['receipt_url' => $receiptUrl]);

        return response()->json(['receipt_url' => $receiptUrl]);
    }
}
