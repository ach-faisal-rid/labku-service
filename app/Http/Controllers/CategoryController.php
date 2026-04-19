<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::all();
        
        // Jika request dari API (JSON)
        if ($request->wantsJson() || $request->is('api/*')) {
            return response()->json([
                'success' => true,
                'data' => $categories
            ]);
        }
        
        // Jika request dari Inertia (browser)
        return Inertia::render('laboratorium/category/Index', [
            'categories' => $categories,
        ]);
    }
}