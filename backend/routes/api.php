<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SellerController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ReviewController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

//working test
Route::get('/ping', function () {
    return ['message' => 'This shit is working'];
});

//register users
Route::post("/register", [AuthController::class, "register"]);

Route::post("/login", [AuthController::class, "login"]);

//protected routes
Route::middleware('auth:sanctum')->group(function (){
    
    //products
    Route::post('/products',[ProductController::class, 'store']);
    Route::get('/products',[ProductController::class, 'index']);
    Route::get('/products/{id}',[ProductController::class, 'show']);
    Route::put('/products/{id}',[ProductController::class, 'update']);

    // Restock
    Route::post('/products/{id}/restock', [ProductController::class, 'restock']);
    // Get current product stock
    Route::get('/products/{id}/stock', [ProductController::class, 'stock']);
     // Get stock movement history
    Route::get('/products/{id}/stock-history', [ProductController::class, 'stockHistory']);

    //seller routes
    Route::get('/seller/stats',[SellerController::class, 'stats']);
    Route::get('/seller/products',[SellerController::class, 'products']);
    Route::get('/seller/orders', [SellerController::class, 'orders']);
    Route::get('/seller/orders/{subOrder}/items', [SellerController::class, 'orderItems']);
    Route::post('/seller/orders/{subOrder}/ship', [SellerController::class, 'ship']);

    //order management routes.
    // Buyer creates an order
    Route::post('/orders', [OrderController::class, 'store']);

    // Buyer views their orders
    Route::get('buyer/orders', [OrderController::class, 'index']);

    // Buyer views single order
    Route::get('buyer/orders/{id}', [OrderController::class, 'show']);

    //buyer marks order as delivered
    Route::post('/buyer/suborders/{subOrder}/deliver', [OrderController::class, 'confirmDelivery']);

    //buyer review route
     Route::post('/buyer/order-items/{orderItem}/review', [ReviewController::class, 'store']);




     
    //Payment Management routes
    Route::post('/payments/initiate', [PaymentController::class, 'initiate']);
    Route::post('/payments/confirm', [PaymentController::class, 'confirm']);


    //logout route
    Route::post('/logout',[AuthController::class, 'logout']);
});




