<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use App\Models\User;


class ProductController extends Controller
{
     public function store(Request $request)
    {
        // Validate input
        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|in:clinical,electronics,sanitation',
            'price' => 'required|numeric|min:0',

            // File must be an image
            'image' => 'required|file|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Save image
        $path = $request->file('image')->store('products', 'public');

        // Create product
        $product = Product::create([
            'user_id' => $request->user()->id,   // seller who is logged in
            'name' => $request->name,
            'category' => $request->category,
            'price' => $request->price,
            'image_path' => $path,
        ]);

        return response()->json([
            'message' => 'Product added successfully',
            'product' => $product
        ], 201);
    }
    public function index()
{
    $products = Product::with('seller')->latest()->get()->map(function ($product){
        $product->photo_url = $product->photo_url;
        return $product;
    });
    

    return response()->json([
        'products' => $products
    ]);
}

}
