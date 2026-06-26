<footer class="bg-[#2a302c] text-neutral-300 pt-16 pb-8 border-t border-neutral-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
            
            <!-- Left Info Column -->
            <div class="col-span-12 md:col-span-5 space-y-6">
                <div class="flex items-center gap-3">
                    @include('components.logo')
                    <div>
                        <span class="block text-sm font-black uppercase tracking-widest text-[#fff]">Gorden Yulie</span>
                        <span class="block text-[11px] text-[#c3a05c] font-semibold tracking-wide">Interior Solution Specialist</span>
                    </div>
                </div>
                <p class="text-xs text-[#9ea9a2] font-light leading-relaxed max-w-sm">
                    Menyediakan berbagai pilihan gorden berkualitas untuk rumah, kantor, hotel, dan kebutuhan interior lainnya.
                </p>
            </div>

            <!-- Column 2: Link Cepat -->
            <div class="col-span-12 sm:col-span-4 md:col-span-2.5 space-y-4">
                <h3 class="text-xs font-bold text-white tracking-widest uppercase pb-2 border-b border-emerald-900">
                    LINK CEPAT
                </h3>
                <ul class="space-y-2 text-xs font-medium">
                    <li><a href="#beranda" class="hover:text-amber-500 transition-colors">Beranda</a></li>
                    <li><a href="#tentang-kami" class="hover:text-amber-500 transition-colors">Tentang Kami</a></li>
                    <li><a href="#katalog" class="hover:text-white text-amber-500 font-bold transition-colors">Katalog</a></li>
                    <li><a href="#portofolio" class="hover:text-amber-500 transition-colors">Portofolio</a></li>
                    <li><a href="#hubungi-kami" class="hover:text-amber-500 transition-colors">Hubungi Kami</a></li>
                </ul>
            </div>

            <!-- Column 3: Informasi -->
            <div class="col-span-12 sm:col-span-4 md:col-span-2.5 space-y-4">
                <h3 class="text-xs font-bold text-white tracking-widest uppercase pb-2 border-b border-emerald-900">
                    INFORMASI
                </h3>
                <ul class="space-y-2 text-xs font-medium">
                    <li><a href="#" class="hover:text-amber-500 transition-colors">Syarat & Ketentuan</a></li>
                    <li><a href="#" class="hover:text-amber-500 transition-colors">FAQ</a></li>
                    <li><a href="#" class="hover:text-amber-500 transition-colors">Privacy Policy</a></li>
                </ul>
            </div>

            <!-- Column 4: Info Kontak -->
            <div class="col-span-12 sm:col-span-4 md:col-span-2 space-y-4">
                <h3 class="text-xs font-bold text-white tracking-widest uppercase pb-2 border-b border-emerald-900">
                    INFO KONTAK
                </h3>
                <ul class="space-y-3 text-xs">
                    <li class="flex items-start gap-2.5">
                        <svg class="h-4 w-4 text-[#c3a05c] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <div>
                            <span class="block text-gray-400 text-[10px] uppercase font-bold">WhatsApp</span>
                            <a href="https://wa.me/6281233965303" class="hover:text-white font-mono">+62 812-3396-5303</a>
                        </div>
                    </li>
                    <li class="flex items-start gap-2.5">
                        <svg class="h-4 w-4 text-[#c3a05c] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <div>
                            <span class="block text-gray-400 text-[10px] uppercase font-bold">Email</span>
                            <a href="mailto:yuliekorden39@gmail.com" class="hover:text-white font-mono break-all text-[11px]">yuliekorden39@gmail.com</a>
                        </div>
                    </li>
                </ul>
            </div>

        </div>

        <!-- Copyright divider -->
        <div class="pt-8 mt-8 border-t border-neutral-800 text-center text-[10px] text-gray-500 tracking-wide">
            <p>Gorden Yulie Batu &copy; {{ date('Y') }}. All rights reserved.</p>
        </div>
    </div>
</footer>
