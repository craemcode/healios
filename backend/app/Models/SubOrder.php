<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubOrder extends Model
{
    use HasFactory;

    protected $table = 'seller_orders';

    protected $fillable = [
        'order_id',
        'seller_id',
        'seller_order_number',
        'status',
        'subtotal',
        'commission',
        'seller_earnings'
    ];

    /* =========================
       Relationships
    ========================== */

    // Parent buyer order
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // Seller receiving this order
    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    // Items belonging to this seller
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
