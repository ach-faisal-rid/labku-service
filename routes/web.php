<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use Inertia\Inertia;

Route::get('/', function () {
    return view('welcome');
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
    Route::get('/laboratorium/category', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
