<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\OrderItem;
use App\Models\Review;

class ReviewController extends Controller
{
    //
    public function store(Request $request, $orderItemId)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:2000',
        ]);

        $buyerId = auth()->id();

        // Load order item with required relationships
        $orderItem = OrderItem::with([
            'order',
            'product',
            'subOrder'
        ])->findOrFail($orderItemId);

        // 1. Ensure item belongs to buyer
        abort_if(
            $orderItem->order->user_id !== $buyerId,
            403,
            'Unauthorized'
        );

        // 2. Ensure item has been delivered
        abort_if(
            $orderItem->subOrder->status !== 'delivered',
            403,
            'Item not delivered yet'
        );

        // 3. Ensure not already reviewed
        abort_if(
            Review::where('order_item_id', $orderItemId)->exists(),
            409,
            'Item already reviewed'
        );

        // 4. Create review
        $review = Review::create([
            'order_item_id' => $orderItem->id,
            'product_id'    => $orderItem->product_id,
            'buyer_id'      => $buyerId,
            'seller_id'     => $orderItem->subOrder->seller_id,
            'rating'        => $request->rating,
            'comment'       => $request->comment,
        ]);

        return response()->json([
            'message' => 'Review submitted successfully',
            'review'  => $review
        ], 201);
    }






}
