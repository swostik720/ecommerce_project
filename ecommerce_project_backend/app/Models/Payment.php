<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = ['order_id', 'transaction_uuid', 'amount', 'tax_amount', 'total_amount', 'status'];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
