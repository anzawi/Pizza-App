<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static  create(array $product)
 */
class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'img_uri'
    ];

    /**
     * get modifiers for the product
     * One To Many
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function modifiers()
    {
        return $this->hasMany(Modifier::class);
    }
}
