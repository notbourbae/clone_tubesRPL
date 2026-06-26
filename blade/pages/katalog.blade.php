@extends('layouts.app')

@section('title', 'Katalog - Gorden Yulie Batu')

@section('content')
<!-- Alpine.js dynamic shop catalog state -->
<div x-data="{ 
    selectedCategory: 'semua',
    selectedProduct: null,
    products: [
        {
            id: 'g1',
            name: 'Gorden Abu-Abu Elegan',
            category: 'gorden',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=600',
            price: 310000,
            bahan: 'Premium Heavy Polyester',
            blockout: '90%',
            lebar: '280 cm',
            features: ['Polyester Velvet Premium', 'Peredam Panas & Cahaya', 'Tekstur jatuh mewah']
        },
        {
            id: 'g2',
            name: 'Gorden Beludu Halus',
            category: 'gorden',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=600',
            price: 460000,
            bahan: 'Velvet Cotton Soft Blend',
            blockout: '100%',
            lebar: '280 cm',
            features: ['Beludru Italia Super Soft', '100% Blackout Efektif', 'Serat anti debu']
        },
        {
            id: 'g3',
            name: 'Gorden Minimalis Corak Atas',
            category: 'gorden',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600',
            price: 620000,
            bahan: 'Linen Silky Textured',
            blockout: '75%',
            lebar: '280 cm',
            features: ['Embroidery Pattern Header', 'Semi-sheer linen base', 'Aura minimalis modern']
        },
        {
            id: 'g4',
            name: 'Gorden Motif Bunga Elegan',
            category: 'gorden',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600',
            price: 620000,
            bahan: 'Jacquard Royal Silk',
            blockout: '85%',
            lebar: '280 cm',
            features: ['Bermotif floral klasik jacquard', 'Benang emas mewah rajutan', 'Tahan sinar matahari langsung']
        },
        {
            id: 'g5',
            name: 'Gorden Abu-Abu Klasik',
            category: 'gorden',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=600',
            price: 310000,
            bahan: 'Polyester High Density',
            blockout: '80%',
            lebar: '280 cm',
            features: ['Standard classy layout', 'High density fiber structure', 'Mudah dibersihkan']
        },
        {
            id: 'g6',
            name: 'Gorden Abu-Abu Klasik',
            category: 'gorden',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=600',
            price: 310000,
            bahan: 'Polyester High Grade',
            blockout: '80%',
            lebar: '280 cm',
            features: ['Double-sided weaving', 'Peredam bising eksternal', 'Grip rail kokoh']
        },
        {
            id: 'g7',
            name: 'Gorden Motif Bunga Elegan',
            category: 'gorden',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600',
            price: 620000,
            bahan: 'Jacquard Royal Satin',
            blockout: '85%',
            lebar: '280 cm',
            features: ['Satin floral damask', 'Benang eksklusif kemilau', 'Eksklusif tahan kusut']
        },
        {
            id: 'g8',
            name: 'Gorden Abu-Abu Klasik',
            category: 'gorden',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=600',
            price: 310000,
            bahan: 'Polyester Cotton Mix',
            blockout: '80%',
            lebar: '280 cm',
            features: ['Linen double standard', 'Cozy gray palette', 'High blockout rate']
        },
        {
            id: 'g9',
            name: 'Gorden Abu-Abu Klasik',
            category: 'gorden',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=600',
            price: 310000,
            bahan: 'Polyester Cotton Mix',
            blockout: '80%',
            lebar: '280 cm',
            features: ['Linen double standard', 'Cozy gray palette', 'High blockout rate']
        },
        {
            id: 'v1',
            name: 'Vitrase Sheer Soft White',
            category: 'vitrase',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600',
            price: 180000,
            bahan: 'Spun Polyester Soft Sheer',
            blockout: 'Tembus Cahaya',
            lebar: '300 cm',
            features: ['Light softening', 'Ultra lightweight sheer']
        },
        {
            id: 'r1',
            name: 'Roller Blind Minimalis Modern',
            category: 'roller_blind',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: 'https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&q=80&w=600',
            price: 290000,
            bahan: 'PVC 70% & Fiberglass 30%',
            blockout: '85% Sunscreen',
            lebar: 'Kustom',
            features: ['Mekanisme gulung ringkas', 'Tahan air & percikan minyak']
        }
    ],
    get filteredProducts() {
        if (this.selectedCategory === 'semua') {
            return this.products;
        }
        return this.products.filter(p => p.category === this.selectedCategory);
    },
    formatRupiah(value) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value).replace('Rp', 'IDR');
    },
    bookNow(product) {
        const text = `Halo Gorden Yulie, saya tertarik dengan produk katalog: *${product.name}* (${this.formatRupiah(product.price)}). Mohon informasi pemesanan dan ukuran lebih lanjut. Terima kasih!`;
        window.open('https://wa.me/6281233965303?text=' + encodeURIComponent(text), '_blank');
    },
    consultGeneral() {
        const text = 'Halo Gorden Yulie Batu, saya ingin berkonsultasi mengenai kebutuhan gorden dan interior untuk rumah saya. Mohon info lebih lanjut!';
        window.open('https://wa.me/6281233965303?text=' + encodeURIComponent(text), '_blank');
    }
}" class="bg-white min-h-screen">

    <!-- 1. Hero Page Header Banner -->
    <div 
        class="relative h-[250px] sm:h-[300px] bg-cover bg-center flex flex-col justify-center items-center text-center px-4"
        style="background-image: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=1200')"
    >
        <div class="max-w-4xl mx-auto space-y-2">
            <h1 class="text-white text-4xl sm:text-5xl font-bold tracking-tight">
                Catalog
            </h1>
            <nav class="text-white/80 text-xs sm:text-sm font-medium tracking-wide">
                <span>Home</span>
                <span class="mx-2 font-mono">&raquo;</span>
                <span class="text-white">Catalog</span>
            </nav>
        </div>
    </div>

    <!-- 2. Main content area (Sidebar Kategori + Grid Catalog) -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            
            <!-- Left Sidebar Navigation Menu -->
            <aside class="col-span-12 md:col-span-3 lg:col-span-2.5 space-y-4">
                <h2 class="text-xs font-bold text-gray-900 tracking-widest uppercase mb-4 pl-2 border-l-2 border-gray-900">
                    Kategori
                </h2>
                <div class="flex flex-col border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-100 bg-white">
                    <template x-for="cat in [
                        { id: 'semua', label: 'Semua' },
                        { id: 'gorden', label: 'Gorden' },
                        { id: 'vitrase', label: 'Vitrase' },
                        { id: 'roller_blind', label: 'Roller Blind' },
                        { id: 'wallpaper', label: 'Wallpaper' },
                        { id: 'kitchen_set', label: 'Kitchen Set' }
                    ]">
                        <button
                            @click="selectedCategory = cat.id"
                            class="w-full text-left py-3.5 px-4 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer"
                            :class="selectedCategory === cat.id ? 'bg-gray-50 text-neutral-900 border-l-2 border-amber-500 font-bold' : 'text-neutral-500 hover:text-neutral-900 hover:bg-gray-50'"
                            x-text="cat.label"
                        ></button>
                    </template>
                </div>
            </aside>

            <!-- Right Product Grid Section -->
            <section class="col-span-12 md:col-span-9 lg:col-span-9.5">
                <div class="min-h-[400px]">
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        
                        <!-- Product Card Element compiled via Alpine Template Loop -->
                        <template x-for="product in filteredProducts" :key="product.id">
                            <div class="group bg-white rounded-[24px] border border-gray-100 hover:border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden p-4 flex flex-col justify-between transition-all duration-300">
                                
                                <div class="flex flex-col">
                                    <!-- Inner card Image Container -->
                                    <div 
                                        @click="selectedProduct = product"
                                        class="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 mb-4 cursor-pointer"
                                    >
                                        <img
                                            :src="product.image"
                                            :alt="product.name"
                                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                                        />
                                        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                            <span class="text-white bg-black/50 text-[10px] px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-bold">
                                                Detail Produk
                                            </span>
                                        </div>
                                    </div>

                                    <!-- Text Metadata -->
                                    <div class="px-1 mb-4">
                                        <h3 
                                            @click="selectedProduct = product"
                                            class="text-sm font-bold text-gray-900 tracking-tight mb-2 line-clamp-1 group-hover:text-amber-500 transition-colors cursor-pointer"
                                            x-text="product.name"
                                        ></h3>
                                        <p class="text-[11px] text-gray-400 font-light leading-relaxed line-clamp-3" x-text="product.description"></p>
                                    </div>
                                </div>

                                <!-- Cost & Call Action -->
                                <div class="px-1 pt-3 border-t border-gray-50 flex items-center justify-between">
                                    <div>
                                        <p class="text-[9px] uppercase tracking-wider text-gray-400 font-extrabold text-[#c3a05c]">Price</p>
                                        <p class="text-xs sm:text-sm font-black text-gray-900" x-text="formatRupiah(product.price)"></p>
                                    </div>
                                    <button
                                        @click="bookNow(product)"
                                        class="px-4 py-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-700 hover:text-white border border-neutral-300 hover:border-amber-500 hover:bg-amber-500 rounded-lg transition-all duration-200 bg-white cursor-pointer"
                                    >
                                        Book now
                                    </button>
                                </div>

                            </div>
                        </template>

                    </div>

                    <!-- Empty state -->
                    <div x-show="filteredProducts.length === 0" class="text-center py-20 text-gray-400 font-medium text-sm">
                        Belum ada produk di kategori ini.
                    </div>
                </div>
            </section>

        </div>
    </div>

    <!-- 3. Clean Interactive call-to-action bar -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div 
            class="relative rounded-3xl overflow-hidden bg-cover bg-center border border-white/10"
            style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200')"
        >
            <div class="backdrop-blur-[2px] w-full px-8 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
                <div>
                    <h2 class="text-white text-2xl md:text-3xl font-bold tracking-tight mb-2 text-center md:text-left font-serif">
                        Temukan Gorden Impian Anda
                    </h2>
                    <p class="text-white/85 text-xs md:text-sm font-light text-center md:text-left max-w-xl">
                        Konsultasikan ukuran jendela Anda dan dapatkan taksiran harga khusus berkualitas tinggi langsung dari kami.
                    </p>
                </div>
                
                <button
                    @click="consultGeneral()"
                    class="bg-[#29302c] text-white hover:bg-neutral-900 px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 hover:scale-102 flex items-center gap-2 cursor-pointer border border-[#444f47]"
                >
                    <span>Konsultasi</span>
                </button>
            </div>
        </div>
    </div>

    <!-- 4. Interactive Details Modal Drawer -->
    <div 
        x-show="selectedProduct !== null" 
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
        style="display: none;"
    >
        <div 
            @click.away="selectedProduct = null"
            class="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col"
        >
            <!-- Product Header Photo -->
            <div class="h-48 md:h-56 overflow-hidden relative bg-gray-50">
                <img 
                    :src="selectedProduct?.image" 
                    :alt="selectedProduct?.name" 
                    class="w-full h-full object-cover"
                />
                <button
                    @click="selectedProduct = null"
                    class="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors cursor-pointer"
                >
                    X
                </button>
            </div>

            <!-- Product Detail Content -->
            <div class="p-6 md:p-8 space-y-6">
                
                <div class="space-y-1">
                    <span class="text-[10px] uppercase font-black tracking-widest text-[#93c47d] bg-[#ebf5fb] px-3 py-1 rounded-full" x-text="selectedProduct?.category.toUpperCase()"></span>
                    <h3 class="text-xl md:text-2xl font-bold text-gray-900 pt-2" x-text="selectedProduct?.name"></h3>
                    <div class="text-xl font-extrabold text-[#c3a05c]" x-text="selectedProduct ? formatRupiah(selectedProduct.price) : ''"></div>
                </div>

                <p class="text-xs text-gray-500 leading-relaxed font-light" x-text="selectedProduct?.description"></p>

                <!-- Technical specs block -->
                <div class="grid grid-cols-3 gap-4 border-t border-b border-gray-100 py-4 text-[11px]">
                    <div>
                        <span class="text-gray-400 block mb-1">Bahan</span>
                        <span class="font-bold text-gray-800" x-text="selectedProduct?.bahan"></span>
                    </div>
                    <div>
                        <span class="text-gray-400 block mb-1">Peneduh</span>
                        <span class="font-bold text-gray-800" x-text="selectedProduct?.blockout"></span>
                    </div>
                    <div>
                        <span class="text-gray-400 block mb-1">Lebar Kain</span>
                        <span class="font-bold text-gray-800" x-text="selectedProduct?.lebar"></span>
                    </div>
                </div>

                <!-- Modal actions -->
                <div class="flex gap-4 pt-2">
                    <button
                        @click="selectedProduct = null"
                        class="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-xs transition-colors cursor-pointer"
                    >
                        Batal
                    </button>
                    <button
                        @click="bookNow(selectedProduct); selectedProduct = null"
                        class="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-xl text-xs font-bold transition-all shadow cursor-pointer border border-amber-600"
                    >
                        <span>Pesan Sekarang</span>
                    </button>
                </div>

            </div>
        </div>
    </div>

</div>
@endsection
