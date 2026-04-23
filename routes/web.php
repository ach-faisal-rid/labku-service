<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EquipmentController;
use App\http\Controllers\CustomerController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\SettingController;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('Landing', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/app', function () {
    return Inertia::render('Home');
})->name('app');

Route::middleware('auth')->group(function () {
    
    // dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // settings
    Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [SettingController::class, 'update'])->name('settings.update');

    // laboratorium category
    Route::get('/laboratorium/category', [CategoryController::class, 'index'])->name('categories.index');
    Route::post('/laboratorium/category', [CategoryController::class, 'store'])->name('categories.store');
    Route::get('/laboratorium/category/{id}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::put('/laboratorium/category/{id}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/laboratorium/category/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');
    
    // laboratorium equipment
    Route::get('/laboratorium/equipment', [EquipmentController::class, 'index'])->name('equipments.index');
    Route::post('/laboratorium/equipment', [EquipmentController::class, 'store'])->name('equipments.store');
    Route::get('/laboratorium/equipment/{id}/edit', [EquipmentController::class, 'edit'])->name('equipments.edit');
    Route::put('/laboratorium/equipment/{id}', [EquipmentController::class, 'update'])->name('equipments.update');
    Route::delete('/laboratorium/equipment/{id}', [EquipmentController::class, 'destroy'])->name('equipments.destroy');
    Route::post('/laboratorium/equipment/bulk', [EquipmentController::class, 'bulkStore'])->name('equipments.bulk');

    // service device
    Route::get('/services/device', [DeviceController::class, 'index'])->name('devices.index');
    Route::post('/services/device', [DeviceController::class, 'store'])->name('devices.store');
    Route::put('/services/device/{id}', [DeviceController::class, 'update'])->name('devices.update');
    Route::delete('/services/device/{id}', [DeviceController::class, 'destroy'])->name('devices.destroy');

    // service customer
    Route::get('/services/customer', [CustomerController::class, 'index'])->name('customers.index');
    Route::post('/services/customer', [CustomerController::class, 'store'])->name('customers.store');
    Route::put('/services/customer/{id}', [CustomerController::class, 'update'])->name('customers.update');
    Route::delete('/services/customer/{id}', [CustomerController::class, 'destroy'])->name('customers.destroy');
    Route::post('/services/customer/bulk-delete', [CustomerController::class, 'bulkDestroy'])->name('customers.bulk-destroy');
    
    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
