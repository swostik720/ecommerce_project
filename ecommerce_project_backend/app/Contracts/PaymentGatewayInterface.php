<?php

namespace App\Contracts;

interface PaymentGatewayInterface
{
    public function pay(float $amount, $return_url, array $purchase_order_ids, string $purchase_order_names);
    public function initiate(float $amount, $return_url, ?array $arguments = null);
    public function inquiry($transaction_id, ?array $arguments = null) : array;
    public function isSuccess(array $inquiry, ?array $arguments = null) : bool;
    public function requestedAmount(array $inquiry, ?array $arguments = null) : float;
}
