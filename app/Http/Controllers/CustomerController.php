<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::with('devices')->get();
        $users = User::all();
       
        return Inertia::render('service/customer/Index', [
            'customers' => $customers,
            'users' => $users,
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string',
            'company' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
            'membership_status' => 'nullable|string|in:Bronze,Silver,Gold,Platinum',
        ]);

        Customer::create($validated);

        return redirect()->back()->with('success', 'Customer created successfully.');
    }

    public function update(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string',
            'company' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
            'membership_status' => 'nullable|string|in:Bronze,Silver,Gold,Platinum',
        ]);

        $customer->update($validated);

        return redirect()->back()->with('success', 'Customer updated successfully.');
    }

    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();

        return redirect()->back()->with('success', 'Customer deleted successfully.');
    }

    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:customers,id',
        ]);

        Customer::whereIn('id', $request->ids)->delete();

        return redirect()->back()->with('success', 'Selected customers deleted successfully.');
    }
}
