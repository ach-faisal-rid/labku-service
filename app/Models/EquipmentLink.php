<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EquipmentLink extends Model
{
    protected $fillable = [
        'equipment_id',
        'title',
        'url',
        'type',
        'sort_order',
    ];

    public function equipment()
    {
        return $this->belongsTo(Equipment::class);
    }
}
