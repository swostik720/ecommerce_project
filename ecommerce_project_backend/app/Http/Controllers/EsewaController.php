<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Services\Esewa;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class EsewaController extends Controller
{
    public function checkout(Request $request)
    {
        $productsInput = $request->input('products');

        if (!is_array($productsInput) || empty($productsInput)) {
            return response()->json(['error' => 'Invalid product selection.'], 400);
        }

        // Extract slugs and map them to quantities
        $productSlugs = array_column($productsInput, 'slug');
        $productQuantities = array_column($productsInput, 'quantity', 'slug');

        // Fetch products from database
        $products = Product::whereIn('slug', $productSlugs)->get();

        if ($products->isEmpty()) {
            return response()->json(['error' => 'No valid products found.'], 404);
        }

        // Calculate total amount considering quantities
        $totalAmount = 0;
        foreach ($products as $product) {
            $quantity = $productQuantities[$product->slug] ?? 1;
            $totalAmount += $product->price * $quantity;
        }

        // Prepare product details for eSewa
        $productIds = $products->pluck('id')->toArray();
        $productNames = $products->pluck('name')->toArray();

        $esewaFormHtml = (new Esewa)->pay(
            $totalAmount,
            route('esewa.verification'),
            $productIds,
            implode(', ', $productNames)
        );

        return response($esewaFormHtml); // Directly return the HTML form
    }

    public function verification(Request $request)
    {
        // Determine the source of the 'data' parameter
        $data = null;
        if ($request->method() === 'GET') {
            $data = $request->query('data'); // Extract from query string for GET
        } elseif ($request->method() === 'POST') {
            $data = $request->input('data'); // Extract from POST body
        }

        // Validate that 'data' exists
        if (!$data) {
            return response()->json(['error' => 'Missing data parameter'], 400);
        }

        // Decode the base64-encoded data
        $decodedString = base64_decode($data);
        if (!$decodedString) {
            return response()->json(['error' => 'Invalid data format'], 400);
        }

        // Decode JSON data
        $decodedData = json_decode($decodedString, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return response()->json(['error' => 'Invalid JSON data'], 400);
        }

        // Extract required fields
        $transaction_code = $decodedData['transaction_code'] ?? null;
        $status = $decodedData['status'] ?? null;
        $total_amount = $decodedData['total_amount'] ?? null;
        $transaction_uuid = $decodedData['transaction_uuid'] ?? null;

        // Validate required fields
        if (is_null($transaction_code) || is_null($status) || is_null($total_amount) || is_null($transaction_uuid)) {
            return response()->json(['error' => 'Missing required payment fields'], 400);
        }

        // Initialize Esewa service and perform inquiry
        $esewa = new Esewa();
        try {
            $inquiry = $esewa->inquiry($transaction_uuid, [
                'transaction_code' => $transaction_code,
                'status' => $status,
                'total_amount' => $total_amount,
                'transaction_uuid' => $transaction_uuid,
            ]);

            // Check if the payment is successful
            if ($esewa->isSuccess($inquiry)) {
                $redirectUrl = env('FRONTEND_URL') . '/receipt?data=' . urlencode($data);
                return redirect($redirectUrl);
            } else {
                // Redirect to an error page or show a failure message
                return redirect(env('FRONTEND_URL') . '/cart?payment_status=failed');
            }
        } catch (\Exception $e) {
            // \Log::error('Esewa Verification Error:', ['message' => $e->getMessage()]);
            return redirect(env('FRONTEND_URL') . '/cart?payment_status=error');
        }
    }
}
