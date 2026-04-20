<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EquipmentImage extends Model
{
    protected $fillable = [
        'equipment_id',
        'image_path',
        'image_name',
        'is_primary',
        'sort_order',
    ];

    public function equipment()
    {
        return $this->belongsTo(Equipment::class);
    }
}
