<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_number',
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
        return $this->belongsTo(User::class, 'user_id');
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
