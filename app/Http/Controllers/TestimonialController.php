<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index()
    {
        return response()->json(Testimonial::all());
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required|string|unique:testimonials,id',
            'name' => 'required|string',
            'role' => 'nullable|string',
            'rating' => 'required|integer',
            'comment' => 'required|string',
            'date' => 'nullable|string',
            'avatar' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        $testimonial = Testimonial::create($validatedData);

        return response()->json([
            'message' => 'Testimonial successfully saved in SQL database',
            'testimonial' => $testimonial
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $testimonial = Testimonial::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string',
            'role' => 'nullable|string',
            'rating' => 'required|integer',
            'comment' => 'required|string',
            'date' => 'nullable|string',
            'avatar' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        $testimonial->update($validatedData);

        return response()->json([
            'message' => 'Testimonial successfully updated in SQL database',
            'testimonial' => $testimonial
        ]);
    }

    public function destroy($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->delete();

        return response()->json([
            'message' => 'Testimonial successfully deleted from SQL database'
        ]);
    }
}
