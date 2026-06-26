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
        Schema::create('testimonials', function (Blueprint $table) {
            $table->string('id')->primary(); // Support custom string IDs like 't1', 'test_...'
            $table->string('name');
            $table->string('role')->default('Pelanggan Setia Gorden Yulie');
            $table->integer('rating')->default(5);
            $table->text('comment');
            $table->string('date')->nullable();
            $table->longText('avatar')->nullable(); // Use longText to store Base64 images safely
            $table->longText('image')->nullable();  // Use longText to store Base64 images safely
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
