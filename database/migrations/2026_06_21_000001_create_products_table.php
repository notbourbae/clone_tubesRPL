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
        Schema::create('products', function (Blueprint $table) {
            $table->string('id')->primary(); // Support Custom ID strings like 'g1', 'v1', 'prod_...'
            $table->string('name');
            $table->string('category');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->integer('pricePerMeter')->default(0);
            $table->text('features')->nullable(); // Saved as JSON string or comma-separated
            $table->string('specs_bahan')->nullable();
            $table->string('specs_lebar')->nullable();
            $table->string('specs_blockout')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
