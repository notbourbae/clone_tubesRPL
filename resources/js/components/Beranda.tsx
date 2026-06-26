import { useState } from 'react';
import { ArrowRight, Sparkles, Home, Paintbrush, Sun, Info } from 'lucide-react';
import { motion } from 'motion/react';

// Hotlinked/generated image paths
const heroBg = '/assets/images/curtains_hero_bg_1782007616516.jpg';
const contentImg = '/assets/images/curtains_minimal_interior_1782007633904.jpg';

interface BerandaProps {
  setActiveTab: (tab: string) => void;
}

export default function Beranda({ setActiveTab }: BerandaProps) {
  // Before-After Slider State
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isSliding, setIsSliding] = useState(false);

  // Recommendation Wizard State
  const [roomType, setRoomType] = useState('living');
  const [stylePreference, setStylePreference] = useState('modern');
  const [lightNeed, setLightNeed] = useState('blackout');

  const handleSliderMove = (clientX: number, containerRect: DOMRect) => {
    const x = clientX - containerRect.left;
    const percentage = Math.max(0, Math.min(100, (x / containerRect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const container = document.getElementById('before-after-container');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    handleSliderMove(e.touches[0].clientX, rect);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSliding && e.buttons !== 1) return;
    const container = document.getElementById('before-after-container');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    handleSliderMove(e.clientX, rect);
  };

  // Get recommended product based on choices
  const getRecommendation = () => {
    if (lightNeed === 'blackout') {
      return {
        title: 'Gorden Blackout Premium Velvet',
        desc: 'Sangat cocok untuk menghalangi 100% sinar matahari luar. Ideal untuk tidur nyenyak atau kenyamanan ruang teater keluarga.',
        materials: 'Blended Heavy Polyester Velvet (U.S. Certified)',
        estimatedPrice: 'Mulai dari Rp 180.000 / meter',
        tips: 'Pasang gorden hingga menyentuh langit-langit (ceiling mount) untuk memberikan aksentuasi tinggi ruangan yang megah.'
      };
    } else if (stylePreference === 'classic') {
      return {
        title: 'Gorden Klasik Jacquard Royal',
        desc: 'Menampilkan bordir timbul dengan motif damask yang mewah. Sangat pantas untuk ruang tamu formal bergaya klasik Eropa.',
        materials: 'Jacquard High Density Linen & Silk Blend',
        estimatedPrice: 'Mulai dari Rp 220.000 / meter',
        tips: 'Sandingkan dengan Vitrase polos bergelombang tebal serta rumbai penahan (tassels) bernuansa bronze untuk mengunci estetika klasik.'
      };
    } else if (roomType === 'office') {
      return {
        title: 'Vertical / Roller Blind Sunscreen',
        desc: 'Memberikan fungsionalitas ultra-praktis dengan mengontrol silau matahari tanpa menggelapkan ruangan kerja sepenuhnya.',
        materials: 'Fiberglass & PVC Sunscreen UV-Filter',
        estimatedPrice: 'Mulai dari Rp 145.000 / m²',
        tips: 'Gunakan sistem motorized/remote-control untuk menaikkan atau menurunkan roller blind secara otomatis dan presisi.'
      };
    } else {
      return {
        title: 'Gorden Minimalis Semi-Blackout Linen',
        desc: 'Tekstur alami serat linen yang memberikan kesan bersahabat, rileks, namun tetap rapi dan modis.',
        materials: 'Natural Linen & Premium Cotton Twill Blend',
        estimatedPrice: 'Mulai dari Rp 125.000 / meter',
        tips: 'Gunakan model ring / eyelet berwarna hitam matte dengan tiang gorden berwarna senada untuk menciptakan kontras garis minimalis.'
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <div id="beranda-page" className="min-h-screen bg-gray-50">
      
      {/* 1. MAJESTIC HERO SECTION */}
      <header 
        id="home-hero"
        className="relative h-[100vh] bg-cover bg-center flex items-center justify-center text-white pt-16"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(29, 44, 34, 0.7), rgba(29, 44, 34, 0.5)), url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-forest-dark/30 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 z-10 pb-28 md:pb-36 animate-fade-in">
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold-accent/20 border border-gold-accent/30 text-gold-accent text-xs tracking-widest font-semibold uppercase mb-4">
              Premium Interior Specialist Since 1998
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-serif tracking-tight leading-tight"
          >
            Sempurnakan Ruangan Anda dengan <span className="text-gold-accent">Gorden Premium</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Menyediakan produk gorden, aksesoris interior, dan jasa pemasangan profesional dengan standar keindahan tertinggi. Dipercaya sejak lebih dari 25 tahun di Malang Raya.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
          >
            <button
              onClick={() => { setActiveTab('katalog'); window.scrollTo(0,0); }}
              className="w-full sm:w-auto px-8 py-4 bg-gold-accent hover:bg-gold-hover text-white rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Telusuri Katalog</span>
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => { setActiveTab('hubungi-kami'); window.scrollTo(0,0); }}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/40 hover:border-white text-white rounded-full font-semibold backdrop-blur-sm transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              Konsultasi Sekarang
            </button>
          </motion.div>
        </div>

        {/* Floating features footer card over the hero border */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-4xl bg-white/95 backdrop-blur rounded-2xl shadow-xl px-4 py-5 border border-gray-100 hidden md:grid grid-cols-3 gap-4 text-center text-gray-800">
          <div className="border-r border-gray-200">
            <div className="text-gold-accent font-bold text-lg">25+ Tahun</div>
            <div className="text-gray-500 text-xs mt-0.5">Pengalaman Sejak 1998</div>
          </div>
          <div className="border-r border-gray-200">
            <div className="text-gold-accent font-bold text-lg">Hingga 100%</div>
            <div className="text-gray-500 text-xs mt-0.5">Penetrasi Bahan Blackout</div>
          </div>
          <div>
            <div className="text-gold-accent font-bold text-lg">Gratis</div>
            <div className="text-gray-500 text-xs mt-0.5">Konsultasi & Pengukuran Area</div>
          </div>
        </div>
      </header>

      {/* 2. CORE CATEGORIES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24" id="categories-section">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-forest-light">
            KATALOG UTAMA
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Pilihan Solusi Interior Terbaik
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base">
            Sesuaikan kebutuhan penutup jendela Anda dengan jajaran lini produk premium yang kami tawarkan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Category Card 1 */}
          <div 
            onClick={() => { setActiveTab('katalog'); window.scrollTo(0,0); }}
            className="group bg-white rounded-2xl overflow-hidden shadow border border-gray-100 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="h-56 overflow-hidden relative">
              <img 
                src="https://picsum.photos/seed/luxurycurtains/600/400" 
                alt="Gorden Minimalist" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white font-bold text-lg">Gorden Minimalis</div>
            </div>
            <div className="p-4 space-y-2">
              <p className="text-gray-500 text-xs leading-relaxed">
                Desain polos modern dengan rona warna netral rapi dan minimalis untuk rumah kekinian.
              </p>
              <div className="text-gold-accent text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>Lihat Koleksi</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>

          {/* Category Card 2 */}
          <div 
            onClick={() => { setActiveTab('katalog'); window.scrollTo(0,0); }}
            className="group bg-white rounded-2xl overflow-hidden shadow border border-gray-100 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="h-56 overflow-hidden relative">
              <img 
                src="https://picsum.photos/seed/classiccurtains/600/400" 
                alt="Gorden Classic" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white font-bold text-lg">Gorden Klasik</div>
            </div>
            <div className="p-4 space-y-2">
              <p className="text-gray-500 text-xs leading-relaxed">
                Motif bernuansa klasik Eropa yang anggun dengan drapery mewah memberikan kesan megah.
              </p>
              <div className="text-gold-accent text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>Lihat Koleksi</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>

          {/* Category Card 3 */}
          <div 
            onClick={() => { setActiveTab('katalog'); window.scrollTo(0,0); }}
            className="group bg-white rounded-2xl overflow-hidden shadow border border-gray-100 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="h-56 overflow-hidden relative">
              <img 
                src="https://picsum.photos/seed/rollerblind/600/400" 
                alt="Roller Blind Office" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white font-bold text-lg">Roller & Vertical Blind</div>
            </div>
            <div className="p-4 space-y-2">
              <p className="text-gray-500 text-xs leading-relaxed">
                Mekanisme roll putar praktis dan anti ribet. Pilihan tepat untuk kantor, cafe, dan dapur.
              </p>
              <div className="text-gold-accent text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>Lihat Koleksi</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>

          {/* Category Card 4 */}
          <div 
            onClick={() => { setActiveTab('katalog'); window.scrollTo(0,0); }}
            className="group bg-white rounded-2xl overflow-hidden shadow border border-gray-100 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="h-56 overflow-hidden relative">
              <img 
                src={contentImg} 
                alt="Vitrase Net Sheer" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white font-bold text-lg">Vitrase Sheer</div>
            </div>
            <div className="p-4 space-y-2">
              <p className="text-gray-500 text-xs leading-relaxed">
                Gorden tipis berserat halus yang meredam intensitas silau matahari luar dengan lembut.
              </p>
              <div className="text-gold-accent text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>Lihat Koleksi</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE BEFORE/AFTER SLIDER */}
      <section className="bg-forest-dark py-20 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Visual description */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-2">
                <span className="text-gold-accent text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <Sparkles size={14} /> Visualisasi Ruangan
                </span>
                <h2 className="text-3xl font-bold font-serif leading-tight">
                  Rasakan Efek Transformasinya
                </h2>
              </div>
              <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">
                Geser pemisah horizontal di samping untuk memvisualisasikan bagaimana penambahan gorden tebal premium dapat melipatgandakan nilai estetika, kemewahan, dan kenyamanan privasi hunian Anda seketika.
              </p>
              <div className="space-y-3 pt-2 text-sm text-white/90">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-800/40 text-red-100 flex items-center justify-center text-xs font-bold">✖</span>
                  <span><strong>Tanpa Gorden</strong>: Silau, panas berlebih, hampa, minim privasi.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-gold-accent/40 text-gold-accent flex items-center justify-center text-xs font-bold">✔</span>
                  <span><strong>Dengan Gorden Yulie</strong>: Teduh, berkelas, elegan, bertekstur hangat.</span>
                </div>
              </div>
            </div>

            {/* Slider Widget */}
            <div className="lg:col-span-8 flex justify-center">
              <div 
                id="before-after-container"
                className="relative w-full max-w-2xl h-[360px] sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl select-none cursor-ew-resize border border-forest-light/40"
                onTouchMove={handleTouchMove}
                onMouseMove={handleMouseMove}
                onMouseDown={() => setIsSliding(true)}
                onMouseUp={() => setIsSliding(false)}
                onMouseLeave={() => setIsSliding(false)}
              >
                {/* BEFORE IMAGE (Bare Wall / Minimal Filter) */}
                <div className="absolute inset-0">
                  <img 
                    src="https://picsum.photos/seed/barewindow/1200/900?blur=1" 
                    alt="Sebelum Gorden" 
                    className="w-full h-full object-cover filter brightness-75 contrast-110"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-4 left-4 bg-black/60 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-white/10">
                    Sebelum (Bare Window)
                  </span>
                </div>

                {/* AFTER IMAGE (Beautifully fitted luxurious curtains) - Clipped by width */}
                <div 
                  className="absolute inset-y-0 left-0 right-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div className="absolute w-[672px] sm:w-[672px] md:w-[672px] lg:w-[672px] xl:w-[672px] h-full" style={{ width: '100vw', maxWidth: '672px' }}>
                    <img 
                      src={heroBg} 
                      alt="Setelah Gorden Yulie" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-4 right-4 bg-gold-accent px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow text-forest-dark border border-white/20 whitespace-nowrap">
                      Sesudah (Gorden Yulie)
                    </span>
                  </div>
                </div>

                {/* SLIDER HANDLE BAR */}
                <div 
                  className="absolute inset-y-0 w-1.5 bg-gold-accent flex items-center justify-center transform -translate-x-1/2 cursor-ew-resize"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-10 h-10 rounded-full bg-white text-forest-dark border-2 border-gold-accent shadow-lg flex items-center justify-center font-bold text-xs">
                    ↔
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. SMART RECOMMENDATION WIZARD */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="recommendation-wizard">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 space-y-8">
          
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-gold-accent uppercase">
              <Sparkles className="w-4 h-4 text-gold-accent animate-pulse" /> Rekomendasi Pintar
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Temukan Gorden yang Sesuai untuk Anda
            </h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Pilih spesifikasi ruangan Anda di bawah untuk mendapatkan rekomendasi penataan yang tepat dan fungsional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            
            {/* Step 1: Room Type */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <Home size={14} className="text-forest-light" /> 1. Jenis Ruangan:
              </label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => setRoomType('living')}
                  className={`py-3 px-4 rounded-xl text-left text-sm font-medium transition-all cursor-pointer ${
                    roomType === 'living' 
                      ? 'bg-forest-medium text-white shadow font-semibold' 
                      : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  Ruang Tamu / Keluarga
                </button>
                <button
                  onClick={() => setRoomType('bed')}
                  className={`py-3 px-4 rounded-xl text-left text-sm font-medium transition-all cursor-pointer ${
                    roomType === 'bed' 
                      ? 'bg-forest-medium text-white shadow font-semibold' 
                      : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  Kamar Tidur Utama
                </button>
                <button
                  onClick={() => setRoomType('office')}
                  className={`py-3 px-4 rounded-xl text-left text-sm font-medium transition-all cursor-pointer ${
                    roomType === 'office' 
                      ? 'bg-forest-medium text-white shadow font-semibold' 
                      : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  Workspace / Kantor
                </button>
              </div>
            </div>

            {/* Step 2: Interior Style */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <Paintbrush size={14} className="text-forest-light" /> 2. Tema Desain:
              </label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => setStylePreference('modern')}
                  className={`py-3 px-4 rounded-xl text-left text-sm font-medium transition-all cursor-pointer ${
                    stylePreference === 'modern' 
                      ? 'bg-forest-medium text-white shadow font-semibold' 
                      : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  Modern Minimalis
                </button>
                <button
                  onClick={() => setStylePreference('classic')}
                  className={`py-3 px-4 rounded-xl text-left text-sm font-medium transition-all cursor-pointer ${
                    stylePreference === 'classic' 
                      ? 'bg-forest-medium text-white shadow font-semibold' 
                      : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  Klasik Tradisional
                </button>
                <button
                  onClick={() => setStylePreference('luxury')}
                  className={`py-3 px-4 rounded-xl text-left text-sm font-medium transition-all cursor-pointer ${
                    stylePreference === 'luxury' 
                      ? 'bg-forest-medium text-white shadow font-semibold' 
                      : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  Mewah / Luxurious
                </button>
              </div>
            </div>

            {/* Step 3: Daylight Control */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <Sun size={14} className="text-forest-light" /> 3. Pembiasan Cahaya:
              </label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => setLightNeed('blackout')}
                  className={`py-3 px-4 rounded-xl text-left text-sm font-medium transition-all cursor-pointer ${
                    lightNeed === 'blackout' 
                      ? 'bg-forest-medium text-white shadow font-semibold' 
                      : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  Blok Total (Blackout 100%)
                </button>
                <button
                  onClick={() => setLightNeed('semi')}
                  className={`py-3 px-4 rounded-xl text-left text-sm font-medium transition-all cursor-pointer ${
                    lightNeed === 'semi' 
                      ? 'bg-forest-medium text-white shadow font-semibold' 
                      : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  Redup Sebagian (Semi 75%)
                </button>
                <button
                  onClick={() => setLightNeed('transparent')}
                  className={`py-3 px-4 rounded-xl text-left text-sm font-medium transition-all cursor-pointer ${
                    lightNeed === 'transparent' 
                      ? 'bg-forest-medium text-white shadow font-semibold' 
                      : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  Cahaya Masuk Lembut (Sheer)
                </button>
              </div>
            </div>

          </div>

          {/* Recommendation Output Display */}
          <motion.div 
            key={roomType + stylePreference + lightNeed}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-luxury-cream border border-gold-accent/20 rounded-2xl p-6 md:p-8 space-y-4"
          >
            <div className="flex items-center gap-2 text-gold-accent font-bold text-sm">
              <Sparkles size={16} /> 
              <span>REKOMENDASI MODEL GORDEN ANDA</span>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-gray-900">{recommendation.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{recommendation.desc}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div className="bg-white p-3 rounded-xl border border-gray-100">
                <span className="text-gray-400 block pb-1">Bahan Rekomendasi:</span>
                <span className="font-semibold text-gray-800">{recommendation.materials}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-100">
                <span className="text-gray-400 block pb-1">Estimasi Kisaran Harga:</span>
                <span className="font-semibold text-forest-medium">{recommendation.estimatedPrice}</span>
              </div>
            </div>

            <div className="flex gap-2.5 bg-white/70 p-3.5 rounded-xl border border-gray-100 text-xs text-gray-600 leading-relaxed">
              <Info size={16} className="text-gold-accent flex-shrink-0 mt-0.5" />
              <span><strong>Tips Desainer:</strong> {recommendation.tips}</span>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => { setActiveTab('hubungi-kami'); window.scrollTo(0,0); }}
                className="text-sm font-bold text-forest-medium hover:text-gold-accent flex items-center gap-1 hover:gap-2 transition-all cursor-pointer"
              >
                <span>Konsultasikan Model Ini</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
}
