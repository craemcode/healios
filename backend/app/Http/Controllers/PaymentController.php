<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
     public function initiate(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id'
        ]);

        $order = Order::where('id', $request->order_id)
                      ->where('user_id', auth()->id())
                      ->firstOrFail();

        if ($order->status !== 'pending_payment') {
            return response()->json([
                'message' => 'Order is not eligible for payment'
            ], 400);
        }

        // In real life: redirect to payment gateway
        return response()->json([
            'message' => 'Payment initiated',
            'order_id' => $order->id
        ]);
    }

    public function confirm(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id'
        ]);

        DB::transaction(function () use ($request) {
            $order = Order::findOrFail($request->order_id);

            $order->update([
                'status' => 'processing'
            ]);
        });

        return response()->json([
            'message' => 'Payment successful',
            'order_id' => $request->order_id
        ]);
    }
}
