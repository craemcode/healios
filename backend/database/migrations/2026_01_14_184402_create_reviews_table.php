<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_item_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->foreignId('product_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->foreignId('buyer_id')
                  ->constrained('users')
                  ->cascadeOnDelete();

            $table->foreignId('seller_id')
                  ->constrained('users')
                  ->cascadeOnDelete();

            // Review content
            $table->unsignedTinyInteger('rating'); // 1–5
            $table->text('comment')->nullable();

            // Moderation (future-proofing)
            $table->enum('status', ['pending', 'approved', 'rejected'])
                  ->default('approved');

            $table->timestamps();

            // Prevent duplicate reviews per item
            $table->unique('order_item_id');
       
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
