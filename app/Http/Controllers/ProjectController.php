<?php

namespace App\Http::Controllers;

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        return response()->json(Project::all());
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required|string|unique:projects,id',
            'title' => 'required|string',
            'category' => 'required|string',
            'location' => 'required|string',
            'year' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        $project = Project::create($validatedData);

        return response()->json([
            'message' => 'Project successfully added to portfolio SQL database',
            'project' => $project
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $validatedData = $request->validate([
            'title' => 'required|string',
            'category' => 'required|string',
            'location' => 'required|string',
            'year' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        $project->update($validatedData);

        return response()->json([
            'message' => 'Project successfully updated in portfolio SQL database',
            'project' => $project
        ]);
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();

        return response()->json([
            'message' => 'Project deleted successfully'
        ]);
    }
}
