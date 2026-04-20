<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    protected $table = 'equipment';
    protected $fillable = [
        'code',
        'name',
        'category_id',
        'type',
        'status',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(EquipmentImage::class);
    }

    public function links()
    {
        return $this->hasMany(EquipmentLink::class);
    }

    public function prices()
    {
        return $this->hasMany(EquipmentPrice::class);
    }
}
