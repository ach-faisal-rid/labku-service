<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EquipmentPrice extends Model
{
    protected $fillable = [
        'equipment_id',
        'price',
        'currency',
        'price_type',
        'effective_date',
        'notes',
        'is_current',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'effective_date' => 'date',
        'is_current' => 'boolean',
    ];

    public function equipment()
    {
        return $this->belongsTo(Equipment::class);
    }
}
