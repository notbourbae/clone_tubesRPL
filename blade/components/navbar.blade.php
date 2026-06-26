<nav x-data="{ open: false }" class="sticky top-0 z-50 bg-[#e7ebf1]/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
            <!-- Brand Logo Left -->
            <div class="flex items-center">
                <a href="/" class="flex items-center gap-3">
                    @include('components.logo')
                    <div class="hidden sm:block">
                        <span class="block text-xs font-black uppercase tracking-wider text-gray-800">Gorden Yulie</span>
                        <span class="block text-[10px] text-gray-400 font-medium">Batu, Jawa Timur</span>
                    </div>
                </a>
            </div>

            <!-- Center Navigation Links -->
            <div class="hidden md:flex items-center space-x-8">
                <a href="#beranda" class="text-sm font-semibold text-gray-700 hover:text-[#c3a05c] transition-colors">Beranda</a>
                <a href="#tentang-kami" class="text-sm font-semibold text-gray-700 hover:text-[#c3a05c] transition-colors">Tentang Kami</a>
                
                <!-- Katalog active with gold line under like in the mockup screen -->
                <div class="relative py-2">
                    <a href="#katalog" class="text-sm font-bold text-gray-900 border-b-2 border-slate-700 pb-1">Katalog</a>
                </div>
                
                <a href="#portofolio" class="text-sm font-semibold text-gray-700 hover:text-[#c3a05c] transition-colors">Portofolio</a>
                <a href="#testimoni" class="text-sm font-semibold text-gray-700 hover:text-[#c3a05c] transition-colors">Testimoni</a>
            </div>

            <!-- Right Action button -->
            <div class="hidden md:block">
                <a href="https://wa.me/6281233965303" target="_blank" 
                   class="bg-white hover:bg-gray-50 text-gray-900 font-bold px-6 py-2.5 rounded-full border border-gray-200 text-xs tracking-wider uppercase shadow-sm transition-all duration-200">
                    Hubungi Kami
                </a>
            </div>

            <!-- Mobile menu button -->
            <div class="md:hidden flex items-center">
                <button @click="open = !open" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#c3a05c] hover:bg-gray-100 focus:outline-none transition-colors">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path :class="{'hidden': open, 'inline-flex': !open }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        <path :class="{'hidden': !open, 'inline-flex': open }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Menu -->
    <div x-show="open" x-transition class="md:hidden bg-white border-b border-gray-100">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#beranda" class="block px-3 py-2.5 rounded-md text-base font-semibold text-gray-700 hover:bg-amber-50 hover:text-[#c3a05c]">Beranda</a>
            <a href="#tentang-kami" class="block px-3 py-2.5 rounded-md text-base font-semibold text-gray-700 hover:bg-amber-50 hover:text-[#c3a05c]">Tentang Kami</a>
            <a href="#katalog" class="block px-3 py-2.5 rounded-md text-base font-bold text-gray-900 bg-amber-50/50 border-l-4 border-amber-500">Katalog</a>
            <a href="#portofolio" class="block px-3 py-2.5 rounded-md text-base font-semibold text-gray-700 hover:bg-amber-50 hover:text-[#c3a05c]">Portofolio</a>
            <a href="#testimoni" class="block px-3 py-2.5 rounded-md text-base font-semibold text-gray-700 hover:bg-amber-50 hover:text-[#c3a05c]">Testimoni</a>
            <a href="https://wa.me/6281233965303" target="_blank" class="block text-center mt-4 mx-3 bg-[#c3a05c] hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-xl text-xs tracking-wider uppercase transition-all duration-200">
                Hubungi Kami via WA
            </a>
        </div>
    </div>
</nav>
