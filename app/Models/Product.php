<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * Disable auto-incrementing for custom string IDs ('g1', etc.)
     */
    public $incrementing = false;

    /**
     * The key type of primary key.
     */
    protected $keyType = 'string';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'name',
        'category',
        'description',
        'image',
        'pricePerMeter',
        'features',
        'specs_bahan',
        'specs_lebar',
        'specs_blockout',
    ];

    /**
     * Cast attributes to native types.
     */
    protected $casts = [
        'features' => 'array',
        'pricePerMeter' => 'integer',
    ];
}
