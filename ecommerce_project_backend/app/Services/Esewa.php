<?php

namespace App\Services;

use App\Contracts\PaymentGatewayInterface;
use App\Models\Order;
use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class Esewa implements PaymentGatewayInterface
{
    public $inquiry;
    public $amount;
    public $base_url;
    public $purchase_order_ids;
    public $purchase_order_names;

    public function __construct()
    {
        $this->base_url = env('APP_DEBUG') ? 'https://rc-epay.esewa.com.np/api/epay/' : 'https://epay.esewa.com.np/api/epay/';
    }

    public function pay(float $amount, $return_url, array $purchase_order_ids, string $purchase_order_names)
    {
        $this->purchase_order_ids = $purchase_order_ids;
        $this->purchase_order_names = $purchase_order_names;
        return $this->initiate($amount, $return_url);
    }

    public function initiate(float $amount, $return_url, ?array $arguments = null)
    {
        $this->amount = $amount;
        $process_url = $this->base_url . 'main/v2/form/';
        $tuid = now()->timestamp;
        $merchant_id = env('ESEWA_MERCHENT_ID');

        // Ensure total_amount is numeric and sanitized
        $sanitized_amount = number_format($amount, 2, '.', ''); // Format as "1000.00"

        $message = "total_amount=$sanitized_amount,transaction_uuid=$tuid,product_code=$merchant_id";
        $s = hash_hmac('sha256', $message, env('ESEWA_SECRET_KEY'), true);
        $signature = base64_encode($s);

        $data = [
            "amount" => $sanitized_amount,
            "failure_url" => env('FRONTEND_URL') . '/cart',
            "product_delivery_charge" => "0",
            "product_service_charge" => "0",
            "product_code" => "EPAYTEST",
            "signature" => $signature,
            "signed_field_names" => "total_amount,transaction_uuid,product_code",
            "success_url" => $return_url,
            "tax_amount" => "0",
            "total_amount" => $sanitized_amount,
            "transaction_uuid" => $tuid
        ];

        // Generate form from attributes
        $htmlForm = '<form method="POST" action="' . ($process_url) . '" id="esewa-form">';
        foreach ($data as $name => $value) {
            $htmlForm .= sprintf('<input name="%s" type="hidden" value="%s">', $name, $value);
        }
        $htmlForm .= '</form><script type="text/javascript">document.getElementById("esewa-form").submit();</script>';

        // Output the form
        echo $htmlForm;
    }

    public function isSuccess(array $inquiry, ?array $arguments = null): bool
    {
        return ($inquiry['status'] ?? null) == 'COMPLETE';
    }

    public function requestedAmount(array $inquiry, ?array $arguments = null): float
    {
        return $inquiry['total_amount'];
    }

    public function inquiry($transaction_id, ?array $arguments = null): array
    {
        $process_url = $this->base_url . 'transaction/status/';
        $total_amount = $arguments['total_amount'] ?? null;

        if (!is_null($total_amount)) {
            // Sanitize total_amount to remove commas and ensure it's numeric
            $sanitized_total_amount = str_replace(',', '', $total_amount);

            $payload = [
                'product_code' => env('ESEWA_MERCHENT_ID'),
                'transaction_uuid' => $transaction_id,
                'total_amount' => $sanitized_total_amount, // Use sanitized value
            ];

            // Make a GET request to Esewa's API
            $response = Http::get($process_url, $payload);

            // Decode the response body
            $responseData = json_decode($response->body(), true);

            // Log the response for debugging purposes
            // \Log::info('Esewa Inquiry Response:', $responseData);

            // Return the decoded response
            return $responseData;
        } else {
            throw new Exception('total_amount is required');
        }
    }

}
