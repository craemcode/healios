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
            'description' => 'required|string| max:2000',
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
            'description'=>$request->description,
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
        $products = Product::with('seller')->latest()->get()->map(function ($product) {
            $product->photo_url = $product->photo_url;
            return $product;
        });


        return response()->json([
            'products' => $products
        ]);
    }

    public function show($id)
    {
        $product = Product::with('seller')->findOrFail($id);

        $product->photo_url = asset('storage/' . $product->image_path);

        return response()->json([
            'product' => $product
        ]);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        // Make sure only the owner (seller) can update
        if ($product->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // VALIDATION
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'category' => 'sometimes|required|in:clinical,electronics,sanitation',
            'price' => 'sometimes|required|numeric|min:0',
            'description' => 'sometimes|nullable|string',
            'image' => 'sometimes|file|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // UPDATE BASIC FIELDS
        $product->update($request->only(['name', 'category', 'price', 'description']));

        // HANDLE PHOTO UPLOAD IF NEW ONE PROVIDED
        if ($request->hasFile('image')) {

            // delete old image (optional)
            if ($product->image_path && Storage::disk('public')->exists($product->image_path)) {
                Storage::disk('public')->delete($product->image_path);
            }

            // store new image
            $path = $request->file('image')->store('products', 'public');
            $product->image_path = $path;
            $product->save();
        }

        return response()->json([
            'message' => 'Product updated successfully!',
            'product' => $product
        ], 200);
    }




}
