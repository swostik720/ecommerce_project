<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'transaction_code',
        'total_amount',
        'status',
        //'products'
    ];

    // protected $casts = [
    //     'products' => 'array',
    // ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
