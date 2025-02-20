<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'price', 'description', 'brand_id', 'image', 'slug'];

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function carts()
    {
        return $this->hasMany(Cart::class);
    }
}
