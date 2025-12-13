<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'buyer_id',
        'status',
        'subtotal',
        'vat',
        'healios_fee',
        'total',
    ];

    /* =========================
       Relationships
    ========================== */

    // Buyer who placed the order
    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    // Seller-specific sub-orders
    public function subOrders()
    {
        return $this->hasMany(SubOrder::class);
    }

    // All items across all sellers
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
