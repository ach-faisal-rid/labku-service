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

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = Category::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        // Jika request dari API (JSON)
        if ($request->wantsJson() || $request->is('api/*')) {
            return response()->json([
                'success' => true,
                'data' => $category
            ]);
        }

        // Jika request dari Inertia (browser)
        return redirect()->back()->with('success', 'Category created successfully.');
    }

    public function edit(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        // Jika request dari API (JSON)
        if ($request->wantsJson() || $request->is('api/*')) {
            return response()->json([
                'success' => true,
                'data' => $category
            ]);
        }

        // Jika request dari Inertia (browser)
        return Inertia::render('laboratorium/category/Edit', [
            'category' => $category,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = Category::findOrFail($id);
        $category->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        if ($request->wantsJson() || $request->is('api/*')) {
            return response()->json([
                'success' => true,
                'data' => $category
            ]);
        }

        return redirect()->back()->with('success', 'Category updated successfully.');
    }

    public function destroy(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        // Jika request dari API (JSON)
        if ($request->wantsJson() || $request->is('api/*')) {
            return response()->json([
                'success' => true,
                'message' => 'Category deleted successfully.'
            ]);
        }

        // Jika request dari Inertia (browser)
        return redirect()->back()->with('success', 'Category deleted successfully.');
    }
}