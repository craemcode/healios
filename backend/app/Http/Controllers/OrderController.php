<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Order;
use App\Models\SubOrder;
use App\Models\OrderItem;
use App\Models\Product;

class OrderController extends Controller
{
   public function store(Request $request)
    {
        $request->validate([
        'items' => 'required|array|min:1',
        'items.*.product_id' => 'required|exists:products,id',
        'items.*.quantity' => 'required|integer|min:1',
    ]);

    $buyer = $request->user();

    DB::beginTransaction();

    try {

        // 1. Load products
        $products = Product::whereIn(
            'id',
            collect($request->items)->pluck('product_id')
        )->lockForUpdate()->get();

        // 2. Validate stock
        foreach ($request->items as $item) {
            $product = $products->firstWhere('id', $item['product_id']);

            if ($product->current_stock < $item['quantity']) {
                throw new \Exception("Insufficient stock for {$product->name}");
            }
        }

        // 3. Create parent order (buyer order)
        $order = Order::create([
            'buyer_id' => $buyer->id,
            'status' => 'pending',
            'subtotal' => 0,
            'vat' => 0,
            'healios_fee' => 0,
            'total' => 0,
        ]);

        // 4. Group items by seller
        $itemsBySeller = collect($request->items)->groupBy(function ($item) use ($products) {
            return $products->firstWhere('id', $item['product_id'])->user_id;
        });

        $subtotal = 0;

        foreach ($itemsBySeller as $sellerId => $items) {

            // 5. Create sub-order for seller
            $subOrder = SubOrder::create([
                'order_id' => $order->id,
                'seller_id' => $sellerId,
                'status' => 'pending',
                'subtotal' => 0,
            ]);

            foreach ($items as $item) {
                $product = $products->firstWhere('id', $item['product_id']);

                $lineTotal = $product->price * $item['quantity'];

                OrderItem::create([
                    'order_id' => $order->id,
                    'sub_order_id' => $subOrder->id,
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->price,
                    'line_total' => $lineTotal,
                ]);

                // Deduct stock
                $product->decrement('current_stock', $item['quantity']);

                $subtotal += $lineTotal;
                $subOrder->increment('subtotal', $lineTotal);
            }
        }

        // 6. Calculate totals
        $vat = $subtotal * 0.10;
        $healiosFee = $subtotal * 0.005;
        $total = $subtotal + $vat + $healiosFee;

        $order->update([
            'subtotal' => $subtotal,
            'vat' => $vat,
            'healios_fee' => $healiosFee,
            'total' => $total,
        ]);

        DB::commit();

        return response()->json([
            'message' => 'Order placed successfully',
            'order_id' => $order->id
        ], 201);

    } catch (\Exception $e) {
        DB::rollBack();

        return response()->json([
            'message' => $e->getMessage()
        ], 400);
    }
    }

    public function index()
    {
        // buyer orders list
    }

    public function show($id)
    {
        // single order details
    } 
}
