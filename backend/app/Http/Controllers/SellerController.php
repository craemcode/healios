<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SubOrder;
use App\Models\OrderItem;

class SellerController extends Controller
{
    public function stats(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'products' => $user->products()->count(),
            'sales' => 12540, // real sales when you implement orders
            'categories' => $user->products()->distinct('category')->count(),
            'monthly_volume' => 3200 // later dynamic
        ]);
    }

    public function products(Request $request)
    {
        $user = $request->user();

        $products = $user->products()->latest()->get();

        return response()->json([
            "products" => $products,
        ]);
    }

    public function orders()
    {
        $sellerId = auth()->id();

        $subOrders = SubOrder::with([
                'order.buyer',
            ])
            ->where('seller_id', $sellerId)
            ->latest()
            ->get();

        return response()->json([
            'orders' => $subOrders,
        ]);
    }

    public function orderItems($subOrderId)
    {
       $sellerId = auth()->id();

    $subOrder = SubOrder::where('id', $subOrderId)
        ->where('seller_id', $sellerId)
        ->firstOrFail();

    $items = OrderItem::with(['product'])
        ->where('order_id', $subOrder->order_id)
        ->whereHas('product', function ($query) use ($sellerId) {
            $query->where('seller_id', $sellerId);
        })
        ->get();

    return response()->json([
        'items' => $items
    ]);
    }
    
}
