<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModifierDetail extends Model
{
    use HasFactory;
    protected $fillable = ['values', 'key'];

    protected $casts = [
        'values' => 'array'
    ];

    /**
     * get modifier that owns modifier-details
     * One To Many (Inverse) / Belongs To
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function modifier()
    {
        return $this->belongsTo(Modifier::class);
    }
}
