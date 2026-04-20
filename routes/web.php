<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EquipmentController;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/app', function () {
    return Inertia::render('Home');
})->name('app');

Route::get('/settings', function () {
    return Inertia::render('Settings/App');
})->middleware(['auth'])->name('settings.app');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    
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
    
    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
