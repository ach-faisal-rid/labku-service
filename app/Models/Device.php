<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    protected $fillable = [
        'customer_id',
        'type',
        'brand',
        'model',
        'complaint',
        'condition_note',
        'technician_note',
        'cancellation_agreement',
        'estimated_cost',
        'has_warranty',
        'warranty_cost',
        'warranty_note',
    ];

    protected $casts = [
        'cancellation_agreement' => 'boolean',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
