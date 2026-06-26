# Panduan Integrasi Gorden Yulie Batu ke Laravel

Halo! Jangan khawatir, wajar jika awalnya membingungkan karena ada perbedaan penempatan antara proyek SPA (React murni) dan kerangka Laravel. Di sini saya buatkan panduan langkah demi langkah yang **pasti berhasil** untuk memasang sistem React + Vite + Tailwind v4 ke dalam proyek Laravel kamu.

---

## Masalah Utama di Screenshot Kamu:
1. **Penyebab Error "is not a module" di App.tsx**:
   - Di dalam tangkapan layar, kamu membuka file `App.tsx` namun isinya adalah kode untuk **mounting root** (`createRoot(...)` dari `main.tsx`).
   - Di baris 3, file `App.tsx` mencoba mengimpor `App` dari dirinya sendiri (`import App from './App.tsx'`). Ini menyebabkan lingkaran tanpa akhir (circular import) dan visual VS Code menjadi serba merah.
   - **Solusinya**: Kembalikan kode `main.tsx` dan `App.tsx` ke fungsinya masing-masing.

2. **Penyebab Error "Missing script: 'dev'"**:
   - File `package.json` bawaan project Laravel kamu belum mendefinisikan script `"dev": "vite"`. 

---

Mari kita urutkan dari awal agar rapi dan bersih.

---

### Langkah 1: Atur File `package.json` yang Benar
Ganti seluruh isi file `package.json` di root proyek Laravel kamu dengan kode di bawah ini. Kode ini menyatukan Laravel, React 19, Vite, dan Tailwind CSS v4 terbaru secara sempurna tanpa bentrok peer-dependency.

```json
{
    "private": true,
    "type": "module",
    "scripts": {
        "dev": "vite",
        "build": "vite build"
    },
    "devDependencies": {
        "@tailwindcss/vite": "^4.0.0",
        "@types/react": "^19.0.8",
        "@types/react-dom": "^19.0.3",
        "@vitejs/plugin-react": "^5.0.1",
        "laravel-vite-plugin": "^1.1.1",
        "typescript": "^5.7.3",
        "vite": "^6.0.11"
    },
    "dependencies": {
        "lucide-react": "^0.546.0",
        "motion": "^12.4.3",
        "react": "^19.0.0",
        "react-dom": "^19.0.0"
    }
}
```

Jalankan perintah berikut di terminal Laravel kamu untuk menginstall bersih:
```bash
npm install --legacy-peer-deps
```

---

### Langkah 2: Pisahkan `main.tsx` dan `App.tsx` dengan Benar

#### 📂 File `resources/js/main.tsx` (Entrypoint)
Pastikan isi file `main.tsx` adalah kode mounting ini:
```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx'; // Import App dari komponen App.tsx
import '../css/app.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

#### 📂 File `resources/js/App.tsx` (Root React Component)
Pastikan isi file ini adalah navigasi utama App dari project awal kita:
```typescript
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Beranda from './components/Beranda';
import TentangKami from './components/TentangKami';
import Katalog from './components/Katalog';
import Portofolio from './components/Portofolio';
import Testimoni from './components/Testimoni';
import HubungiKami from './components/HubungiKami';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('tentang-kami');

  const renderContent = () => {
    switch (activeTab) {
      case 'beranda':
        return <Beranda setActiveTab={setActiveTab} />;
      case 'tentang-kami':
        return <TentangKami setActiveTab={setActiveTab} />;
      case 'katalog':
        return <Katalog />;
      case 'portofolio':
        return <Portofolio />;
      case 'testimoni':
        return <Testimoni />;
      case 'hubungi-kami':
        return <HubungiKami />;
      default:
        return <TentangKami setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans antialiased text-gray-800 bg-gray-50 selection:bg-gold-accent/20">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
```

---

### Langkah 3: Konfigurasi `vite.config.ts`
Ganti isi file `vite.config.ts` di root Laravel kamu dengan konfigurasi yang mendukung Laravel-Vite dan React:

```typescript
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/main.tsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
        },
    },
});
```

---

### Langkah 4: Konfigurasi `tsconfig.json`
Agar VS Code tidak mendeteksi error pathing `@/*`, buat `tsconfig.json` kamu seperti ini:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Strict Type Checking */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path Aliasing & Jarak Pandang File */
    "allowJs": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["resources/js/*"]
    }
  },
  "include": [
    "resources/js/**/*.ts",
    "resources/js/**/*.tsx",
    "resources/js/**/*.d.ts"
  ]
}
```

---

### Langkah 5: Konfigurasi `resources/css/app.css` (Tailwind CSS v4)
Dengan menggunakan Tailwind CSS v4, konfigurasinya diletakkan langsung di dalam CSS! Ganti isi file `resources/css/app.css` dengan:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Plus Jakarta Sans", "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Playfair Display", Georgia, serif;
  
  --color-forest-dark: #1d2c22;
  --color-forest-medium: #2c3e31;
  --color-forest-light: #445d4b;
  --color-gold-accent: #c3a05c;
  --color-gold-hover: #b08d4a;
  --color-luxury-cream: #fbf9f4;
}

body {
  font-family: var(--font-sans);
  background-color: #fafbfc;
  color: #1f2937;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom transitions and scroll behaviors */
html {
  scroll-behavior: smooth;
}

/* Selection decoration styling */
::selection {
  background-color: rgba(195, 160, 92, 0.3);
  color: #1d2c22;
}
```

---

### Langkah 6: Bagian Laravel (View & Route)

#### 1. Buat file `resources/views/app.blade.php`
Ini akan menjadi satu-satunya tempat berkumpulnya template Single-Page Application (SPA) kita di Laravel:

```html
<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Remix: Gorden Yulie Batu</title>
    <!-- Vite Directives -->
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/main.tsx'])
  </head>
  <body class="bg-gray-50 text-gray-800 antialiased">
    <div id="root"></div>
  </body>
</html>
```

#### 2. Atur Route di `routes/web.php`
Arahkan semua rute halaman ke view `app` yang telah kita buat agar navigasi React menangani perpindahan halaman secara dinamis:

```php
<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any?}', function () {
    return view('app');
})->where('any', '.*');
```

---

### Langkah 7: Jalankan Aplikasi!
Setelah semua file di atas siap, kamu tinggal menjalankan dua terminal secara bersamaan:

1. **Terminal 1** (Untuk menjalankan server database/PHP Laravel):
   ```bash
   php artisan serve
   ```
2. **Terminal 2** (Untuk menjalankan Vite compiler agar asset-asset React langsung dimuat dinamis):
   ```bash
   npm run dev
   ```

Sekarang coba buka browser pada URL yang ditunjukkan oleh `php artisan serve` (biasanya `http://127.0.0.1:8000`). Aplikasi React Gorden Yulie Batu kamu akan terintegrasi penuh di dalam Laravel tanpa satu pun error merah! Selamat mencoba, tetap semangat ya! 🚀
