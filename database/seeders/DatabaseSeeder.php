<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Project;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create default admin if not exists
        if (!User::where('email', 'admin@yuliegordenbatu.com')->exists()) {
            User::create([
                'name' => 'Yulie Gorden',
                'email' => 'admin@yuliegordenbatu.com',
                'password' => Hash::make('password'),
            ]);
        }

        // 2. See default testimonials if empty
        if (Testimonial::count() === 0) {
            Testimonial::create([
                'id' => 'r1',
                'name' => 'Nyonya Sisca',
                'role' => 'Pemilik Villa – Kusuma Pinus',
                'rating' => 5,
                'comment' => 'Sangat puas dengan hasil pengerjaan Gorden Yulie! Bahannya sangat tebal, pengerjaan jahitannya rapi sekali, dan timnya luar biasa sopan saat instalasi ke Batu. Rekomendasi bintang 5!',
                'date' => '10 Mei 2026',
                'avatar' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
                'image' => 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=600'
            ]);

            Testimonial::create([
                'id' => 'r2',
                'name' => 'Bapak Hartono',
                'role' => 'Pribadi – Perumahan Ijen, Malang',
                'rating' => 5,
                'comment' => 'Order gorden minimalis semi-blackout lari 12 meter untuk lantai dua rumah. Selesai tepat waktu. Harga jujur sesuai kalkulator estimasi dan diukur real gratis ke rumah. Sangat profesional.',
                'date' => '28 April 2026',
                'avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
                'image' => 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600'
            ]);

            Testimonial::create([
                'id' => 'r3',
                'name' => 'Ibu Ratna',
                'role' => 'Manager Operasional – Boutique Hotel',
                'rating' => 5,
                'comment' => 'Sudah langganan lebih dari 5 tahun dengan Gorden Yulie Batu untuk kebutuhan gorden hotel kami. Jahitan presisi, sangat fungsional memblokir cahaya, dan tidak gampang lusuh saat dicuci.',
                'date' => '15 Maret 2026',
                'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
                'image' => 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600'
            ]);
        }
    }
}
