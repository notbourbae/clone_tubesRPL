<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all()->map(function ($product) {
            $product->specs = [
                'bahan' => $product->specs_bahan ?? '',
                'lebar' => $product->specs_lebar ?? '',
                'blockout' => $product->specs_blockout ?? ''
            ];
            return $product;
        });

        return response()->json($products);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required|string|unique:products,id',
            'name' => 'required|string',
            'category' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'pricePerMeter' => 'required|integer',
            'features' => 'nullable|array',
            'specs' => 'nullable|array', // Flatten this structure into specs_bahan, etc.
        ]);

        $product = new Product();
        $product->id = $validatedData['id'];
        $product->name = $validatedData['name'];
        $product->category = $validatedData['category'];
        $product->description = $validatedData['description'] ?? null;
        $product->image = $validatedData['image'] ?? null;
        $product->pricePerMeter = $validatedData['pricePerMeter'];
        $product->features = $validatedData['features'] ?? [];
        
        if (isset($validatedData['specs'])) {
            $product->specs_bahan = $validatedData['specs']['bahan'] ?? null;
            $product->specs_lebar = $validatedData['specs']['lebar'] ?? null;
            $product->specs_blockout = $validatedData['specs']['blockout'] ?? null;
        }

        $product->save();

        $product->specs = [
            'bahan' => $product->specs_bahan ?? '',
            'lebar' => $product->specs_lebar ?? '',
            'blockout' => $product->specs_blockout ?? ''
        ];

        return response()->json([
            'message' => 'Product successfully added to SQL database',
            'product' => $product
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string',
            'category' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'pricePerMeter' => 'required|integer',
            'features' => 'nullable|array',
            'specs' => 'nullable|array',
        ]);

        $product->name = $validatedData['name'];
        $product->category = $validatedData['category'];
        $product->description = $validatedData['description'] ?? null;
        $product->image = $validatedData['image'] ?? null;
        $product->pricePerMeter = $validatedData['pricePerMeter'];
        $product->features = $validatedData['features'] ?? [];
        
        if (isset($validatedData['specs'])) {
            $product->specs_bahan = $validatedData['specs']['bahan'] ?? null;
            $product->specs_lebar = $validatedData['specs']['lebar'] ?? null;
            $product->specs_blockout = $validatedData['specs']['blockout'] ?? null;
        }

        $product->save();

        $product->specs = [
            'bahan' => $product->specs_bahan ?? '',
            'lebar' => $product->specs_lebar ?? '',
            'blockout' => $product->specs_blockout ?? ''
        ];

        return response()->json([
            'message' => 'Product successfully updated inside SQL database',
            'product' => $product
        ]);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ]);
    }
}
