<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Category;
use App\Models\Equipment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use App\Models\EquipmentLink;
use App\Models\EquipmentPrice;
use Illuminate\Validation\ValidationException;

class EquipmentController extends Controller
{
    public function index()
    {
        $equipments = Equipment::with(['category', 'images', 'links', 'prices'])->get();
        $categories = Category::all();

        return Inertia::render('laboratorium/equipment/Index', [
            'equipments' => $equipments,
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'category_id' => 'required|exists:categories,id',
                'code' => 'required|string|max:255|unique:equipment,code',
                'type' => 'required|string|max:255',
                'status' => 'required|string|max:255',
                'images.*' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
                'links' => 'nullable|array',
                'links.*.title' => 'nullable|string|max:255',
                'links.*.url' => 'required|string|max:255',
                'links.*.type' => 'nullable|string|max:255',
                'prices' => 'nullable|array',
                'prices.*.price' => 'required|numeric|min:0',
                'prices.*.currency' => 'nullable|string|max:3',
                'prices.*.price_type' => 'nullable|string|in:purchase,rental,maintenance,subscription',
                'prices.*.effective_date' => 'nullable|date',
                'prices.*.is_current' => 'nullable|boolean',
            ]);

            DB::transaction(function () use ($request, $validated) {
                $equipment = Equipment::create($validated);

                if ($request->hasFile('images')) {
                    foreach ($request->file('images') as $index => $file) {
                        $path = $file->store('equipment_images', 'public');
                        $equipment->images()->create([
                            'image_path' => $path,
                            'image_name' => $file->getClientOriginalName(),
                            'is_primary' => $index === 0,
                            'sort_order' => $index,
                        ]);
                    }
                }

                if ($request->has('links')) {
                    $linksData = [];
                    foreach ($request->input('links') as $index => $link) {
                        if (!empty($link['url'])) {
                            $linksData[] = [
                                'equipment_id' => $equipment->id,
                                'title' => $link['title'] ?? null,
                                'url' => $link['url'],
                                'type' => $link['type'] ?? 'documentation',
                                'sort_order' => $index,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ];
                        }
                    }
                    if (!empty($linksData)) {
                        EquipmentLink::insert($linksData);
                    }
                }

                if ($request->has('prices')) {
                    $pricesData = [];
                    foreach ($request->input('prices') as $price) {
                        $pricesData[] = [
                            'equipment_id' => $equipment->id,
                            'price' => $price['price'],
                            'currency' => $price['currency'] ?? 'IDR',
                            'price_type' => $price['price_type'] ?? 'purchase',
                            'effective_date' => $price['effective_date'] ?? null,
                            'is_current' => $price['is_current'] ?? true,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                    if (!empty($pricesData)) {
                        EquipmentPrice::insert($pricesData);
                    }
                }
            });

            return redirect()->back()->with('success', 'Equipment created successfully.');
        } catch (ValidationException $e) {
            return redirect()->back()->withErrors($e->errors())->withInput();
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'category_id' => 'required|exists:categories,id',
                'code' => 'required|string|max:255|unique:equipment,code,' . $id,
                'type' => 'required|string|max:255',
                'status' => 'required|string|max:255',
                'images.*' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
                'links' => 'nullable|array',
                'links.*.title' => 'nullable|string|max:255',
                'links.*.url' => 'required|string|max:255',
                'links.*.type' => 'nullable|string|max:255',
                'prices' => 'nullable|array',
                'prices.*.price' => 'required|numeric|min:0',
                'prices.*.currency' => 'nullable|string|max:3',
                'prices.*.price_type' => 'nullable|string|in:purchase,rental,maintenance,subscription',
                'prices.*.effective_date' => 'nullable|date',
                'prices.*.is_current' => 'nullable|boolean',
            ]);

            DB::transaction(function () use ($request, $validated, $id) {
                $equipment = Equipment::findOrFail($id);
                $equipment->update($validated);

                // Handle image replacement
                if ($request->hasFile('images') && count($request->file('images')) > 0) {
                    if ($request->input('replace_images', true)) {
                        foreach ($equipment->images as $img) {
                            if (Storage::disk('public')->exists($img->image_path)) {
                                Storage::disk('public')->delete($img->image_path);
                            }
                            $img->delete();
                        }
                    }

                    foreach ($request->file('images') as $index => $file) {
                        if ($file !== null) {
                            $path = $file->store('equipment_images', 'public');
                            $equipment->images()->create([
                                'image_path' => $path,
                                'image_name' => $file->getClientOriginalName(),
                                'is_primary' => $index === 0 && $request->input('replace_images', true),
                                'sort_order' => $index,
                            ]);
                        }
                    }
                }

                if ($request->has('links')) {
                    $equipment->links()->delete();
                    $linksData = [];
                    foreach ($request->input('links') as $index => $link) {
                        if (!empty($link['url'])) {
                            $linksData[] = [
                                'equipment_id' => $equipment->id,
                                'title' => $link['title'] ?? null,
                                'url' => $link['url'],
                                'type' => $link['type'] ?? 'documentation',
                                'sort_order' => $index,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ];
                        }
                    }
                    if (!empty($linksData)) {
                        EquipmentLink::insert($linksData);
                    }
                }

                if ($request->has('prices')) {
                    $equipment->prices()->delete();
                    $pricesData = [];
                    foreach ($request->input('prices') as $price) {
                        $pricesData[] = [
                            'equipment_id' => $equipment->id,
                            'price' => $price['price'],
                            'currency' => $price['currency'] ?? 'IDR',
                            'price_type' => $price['price_type'] ?? 'purchase',
                            'effective_date' => $price['effective_date'] ?? null,
                            'is_current' => $price['is_current'] ?? true,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                    if (!empty($pricesData)) {
                        EquipmentPrice::insert($pricesData);
                    }
                }
            });

            return redirect()->back()->with('success', 'Equipment updated successfully.');
        } catch (ValidationException $e) {
            return redirect()->back()->withErrors($e->errors())->withInput();
        }
    }

    public function destroy($id)
    {
        $equipment = Equipment::findOrFail($id);
        foreach ($equipment->images as $img) {
            if (Storage::disk('public')->exists($img->image_path)) {
                Storage::disk('public')->delete($img->image_path);
            }
        }
        $equipment->delete();
        return redirect()->back()->with('success', 'Equipment deleted successfully.');
    }

    public function bulkStore(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.name' => 'required|string|max:255',
            'items.*.code' => 'required|string|max:255|unique:equipment,code',
            'items.*.category_id' => 'required|exists:categories,id',
            'items.*.type' => 'required|string|max:255',
            'items.*.status' => 'required|string|max:255',
        ]);

        DB::transaction(function () use ($request) {
            foreach ($request->input('items') as $item) {
                Equipment::create($item);
            }
        });

        return redirect()->back()->with('success', count($request->items) . ' items imported successfully.');
    }
}