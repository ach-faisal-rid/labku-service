<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'customer_code',
        'name',
        'phone',
        'email',
        'address',
        'company',
        'tags',
        'membership_status',
    ];

    protected $casts = [
        'tags' => 'array',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($customer) {
            if (empty($customer->customer_code)) {
                $lastId = static::max('id') ?? 0;
                $customer->customer_code = 'CUST-' . str_pad($lastId + 1, 4, '0', STR_PAD_LEFT);
            }
        });
    }

    public function devices()
    {
        return $this->hasMany(Device::class);
    }
}
