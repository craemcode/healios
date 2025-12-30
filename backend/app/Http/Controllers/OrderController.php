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
        'items.*.id' => 'required|exists:products,id',
        'items.*.qty' => 'required|integer|min:1',
    ]);

    $buyer = $request->user();
   
    DB::beginTransaction();

    try {

        // 1. Load products
        $products = Product::whereIn(
            'id',
            collect($request->items)->pluck('id')
        )->lockForUpdate()->get();

        // 2. Validate stock
        foreach ($request->items as $item) {
            $product = $products->firstWhere('id', $item['id']);

            if ($product->current_stock < $item['qty']) {
                throw new \Exception("Insufficient stock for {$product->name}");
            }
        }

        // 3. Create parent order (buyer order)
        $order = Order::create([
            'user_id' => $buyer->id,
            'order_number'=> rand(1,10000),
            'status' => 'pending_payment',
            'subtotal' => 0,
            'vat' => 0,
            'healios_fee' => 0,
            'total' => 0,
        ]);

        //generating the order number
        $year = now()->year;

        //TECHNICAL DEBT
        $orderNumber = sprintf(
            'HL-%s-%06d',
            $year,
            $order->id
        );

        $order->update([
            'order_number' => $orderNumber
        ]);


        // 4. Group items by seller
        $itemsBySeller = collect($request->items)->groupBy(function ($item) use ($products) {
            return $products->firstWhere('id', $item['id'])->user_id;
        });

        $subtotal = 0;
        

        foreach ($itemsBySeller as $sellerId => $items) {

            // 5. Create sub-order for seller
            $subOrder = SubOrder::create([
                'order_id' => $order->id,
                'seller_id' => $sellerId,
                'seller_order_number'=> rand(10000,100000),
                'status' => 'processing',
                'subtotal' => 0,
                'commission' => 0,
                'seller_earnings' =>0
            ]);

            
             $subOrderNumber = sprintf(
            'HLS-%s-%06d',
            $year,
            $subOrder->id
        );

        $subOrder->update([
            'seller_order_number' => $subOrderNumber
        ]);





            foreach ($items as $item) {
                $product = $products->firstWhere('id', $item['id']);

                $lineTotal = $product->price * $item['qty'];
                $commission = $lineTotal * 0.1;
                $seller_earnings = $lineTotal - $commission;

                OrderItem::create([
                    'order_id' => $order->id,
                    //'sub_order_id' => $subOrder->id,
                    'seller_id' => $sellerId,
                    'product_id' => $product->id,
                    'quantity' => $item['qty'],
                    'price' => $product->price,
                    'total' => $lineTotal,
                ]);

                // Deduct stock
                $product->decrement('stock', $item['qty']);

                $subtotal += $lineTotal;
                $subOrder->increment('commission', $commission);
                $subOrder->increment('seller_earnings',$seller_earnings);
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
        $orders = Order::where('user_id', auth()->id())
        ->latest()
        ->select('id', 'order_number', 'status', 'total', 'created_at')
        ->get();

        return response()->json([
            'orders' => $orders
        ]);
    }

    public function show($id)
    {
        // single order details
        $order = Order::with([
        'items.product',
        'subOrders.seller'
    ])
    ->where('user_id', auth()->id())
    ->findOrFail($id);

    return response()->json([
        'order' => $order
    ]);
    } 
}
