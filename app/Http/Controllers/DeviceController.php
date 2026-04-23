<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Device;
use App\Models\Customer;

class DeviceController extends Controller
{
    public function index()
    {
        $customers = Customer::all();
        $devices = Device::with('customer')->get();
       
        return Inertia::render('service/device/Index', [
            'customers' => $customers,
            'devices' => $devices,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'type' => 'required|string|max:255',
            'brand' => 'nullable|string|max:255',
            'model' => 'nullable|string|max:255',
            'complaint' => 'nullable|string',
            'condition_note' => 'nullable|string',
            'technician_note' => 'nullable|string',
            'cancellation_agreement' => 'boolean',
            'estimated_cost' => 'nullable|numeric',
            'has_warranty' => 'boolean',
            'warranty_cost' => 'nullable|numeric',
            'warranty_note' => 'nullable|string',
        ]);

        Device::create($validated);

        return redirect()->back()->with('success', 'Device registered successfully.');
    }

    public function update(Request $request, $id)
    {
        $device = Device::findOrFail($id);
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'type' => 'required|string|max:255',
            'brand' => 'nullable|string|max:255',
            'model' => 'nullable|string|max:255',
            'complaint' => 'nullable|string',
            'condition_note' => 'nullable|string',
            'technician_note' => 'nullable|string',
            'cancellation_agreement' => 'boolean',
            'estimated_cost' => 'nullable|numeric',
            'has_warranty' => 'boolean',
            'warranty_cost' => 'nullable|numeric',
            'warranty_note' => 'nullable|string',
        ]);

        $device->update($validated);

        return redirect()->back()->with('success', 'Device updated successfully.');
    }

    public function destroy($id)
    {
        $device = Device::findOrFail($id);
        $device->delete();

        return redirect()->back()->with('success', 'Device deleted successfully.');
    }
}
