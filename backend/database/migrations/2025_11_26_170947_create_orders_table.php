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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('order_number')->unique();

            //order status
            $table->enum('status', [
                'pending_payment',
                'processing',
                'partially_fulfilled',
                'fulfilled',
                'delivered',
                'cancelled',
            ])->default('pending_payment');

            // Totals. We store totals because the system is a snapshot.
            $table->decimal('subtotal', 10, 2);
            $table->decimal('vat', 10, 2)->default(0);
            $table->decimal('healios_fee', 10, 2)->default(0);
            $table->decimal('total', 10, 2);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
