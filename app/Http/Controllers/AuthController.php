<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Authenticate Admin Login
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $credentials['email'])->first();

        // If user doesn't exist yet, we check for our preset fallback admin credentials 
        // to assist smooth first-time experiences, and then seed/register them.
        if (!$user && $credentials['email'] === 'admin@yuliegordenbatu.com' && $credentials['password'] === 'password') {
            $user = User::create([
                'name' => 'Yulie Gorden Admin',
                'email' => 'admin@yuliegordenbatu.com',
                'password' => Hash::make('password'),
            ]);
        }

        if ($user && Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'success' => true,
                'message' => 'Login successful',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ]
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Email atau Password yang Anda masukkan salah.'
        ], 401);
    }
}
