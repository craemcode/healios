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
        Schema::create('seller_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');

            $table->string('seller_order_number')->unique();
            
            //order status for sellers
            $table->enum('status', [
                'new',
                'processing',
                'shipped',
                'delivered',
                'cancelled'
            ])->default('new');

            $table->decimal('subtotal', 10, 2);
            $table->decimal('commission', 10, 2)->default(0);
            $table->decimal('seller_earnings', 10, 2);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seller_orders');
    }
};
