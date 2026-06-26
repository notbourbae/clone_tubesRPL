import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Eye, X } from 'lucide-react';
import { Product } from '../types';
import { getStoredProducts } from '../utils/storage';
import { getApiUrl } from '../utils/api';

const CATEGORY_ITEMS = [
  { id: 'semua', label: 'Semua' },
  { id: 'gorden', label: 'Gorden' },
  { id: 'vitrase', label: 'Vitrase' },
  { id: 'roller_blind', label: 'Roller Blind' },
  { id: 'wallpaper', label: 'Wallpaper' },
  { id: 'kitchen_set', label: 'Kitchen Set' }
];

export default function Katalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(() => getStoredProducts());

  useEffect(() => {
    fetch(getApiUrl('/api/products'))
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
          localStorage.setItem('yulie_products', JSON.stringify(data));
        }
      })
      .catch(err => console.error('Gagal memuat produk dari database SQL:', err));
  }, []);

  // Filter products based on selected category in sidebar
  const filteredProducts = selectedCategory === 'semua'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleBookNow = (product: Product) => {
    const message = `Halo Gorden Yulie, saya tertarik dengan produk katalog: *${product.name}* (IDR ${product.pricePerMeter.toLocaleString('id-ID')}). Mohon informasi pemesanan dan ukuran lebih lanjut. Terima kasih!`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/6281233965303?text=${encoded}`, '_blank');
  };

  const handleConsultGeneral = () => {
    const message = `Halo Gorden Yulie Batu, saya ingin berkonsultasi mengenai kebutuhan gorden dan interior untuk rumah saya. Mohon info lebih lanjut!`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/6281233965303?text=${encoded}`, '_blank');
  };

  return (
    <div id="katalog-tab-root" className="bg-white min-h-screen text-gray-800">
      
      {/* 1. Hero Page Header */}
      <div 
        id="katalog-hero-banner" 
        className="relative h-[250px] sm:h-[300px] bg-cover bg-center flex flex-col justify-center items-center text-center px-4"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('/assets/images/curtains_hero_bg_1782007616516.jpg')` 
        }}
      >
        <div className="max-w-4xl mx-auto space-y-2">
          <h1 className="text-white text-4xl sm:text-5xl font-bold tracking-tight">
            Catalog
          </h1>
          <nav className="text-white/80 text-xs sm:text-sm font-medium tracking-wide">
            <span>Home</span>
            <span className="mx-2 font-mono">&raquo;</span>
            <span className="text-white">Catalog</span>
          </nav>
        </div>
      </div>

      {/* 2. Main Content Layout (Sidebar + Grid) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20" id="katalog-main-container">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Left Sidebar Menu */}
          <aside className="col-span-12 md:col-span-3 lg:col-span-2.5 space-y-4" id="katalog-sidebar-navigation">
            <h2 className="text-xs font-bold text-gray-900 tracking-widest uppercase mb-4 pl-2 border-l-2 border-gray-900">
              Kategori
            </h2>
            <div className="flex flex-col border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-100 bg-white">
              {CATEGORY_ITEMS.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className={`w-full text-left py-3.5 px-4 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? 'bg-gray-50 text-neutral-900 border-l-2 border-amber-500 font-bold' 
                        : 'text-neutral-500 hover:text-neutral-900 hover:bg-gray-50'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Right Product Grid */}
          <section className="col-span-12 md:col-span-9 lg:col-span-9.5" id="katalog-grid-section">
            <div className="min-h-[400px]">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                >
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group bg-white rounded-[24px] border border-gray-100 hover:border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden p-4 flex flex-col justify-between transition-all duration-300"
                      id={`product-card-${product.id}`}
                    >
                      {/* Product Content Column */}
                      <div className="flex flex-col">
                        
                        {/* Image Frame with comfortable padding in card */}
                        <div 
                          className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 mb-4 cursor-pointer"
                          onClick={() => setSelectedProduct(product)}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                            <span className="text-white bg-black/50 text-[10px] px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-bold">
                              <Eye size={12} /> Detail Produk
                            </span>
                          </div>
                        </div>

                        {/* Text Body */}
                        <div className="px-1 mb-4">
                          <h3 
                            className="text-sm font-bold text-gray-900 tracking-tight mb-2 line-clamp-1 group-hover:text-amber-600 transition-colors cursor-pointer"
                            onClick={() => setSelectedProduct(product)}
                          >
                            {product.name}
                          </h3>
                          <p className="text-[11px] text-gray-400 font-light leading-relaxed line-clamp-3">
                            {product.description}
                          </p>
                        </div>

                      </div>

                      {/* Footer Cost & Booking Action */}
                      <div className="px-1 pt-3 border-t border-gray-50 flex items-center justify-between">
                        <div>
                          <p className="text-[9px] uppercase tracking-wider text-gray-400 font-extrabold">Price</p>
                          <p className="text-xs sm:text-sm font-black text-gray-900">
                            IDR {product.pricePerMeter.toLocaleString('id-ID')}
                          </p>
                        </div>
                        <button
                          onClick={() => handleBookNow(product)}
                          className="px-4 py-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-700 hover:text-white border border-neutral-300 hover:border-amber-500 hover:bg-amber-500 rounded-lg transition-all duration-200 bg-white cursor-pointer"
                        >
                          Book now
                        </button>
                      </div>

                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {filteredProducts.length === 0 && (
                <div className="text-center py-20 text-gray-400 font-medium text-sm">
                  Belum ada produk di kategori ini.
                </div>
              )}

            </div>
          </section>

        </div>

      </div>

      {/* 3. Call-to-Action Banner Section with blurred curtains background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div 
          className="relative rounded-3xl overflow-hidden bg-cover bg-center border border-white/10"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200')` 
          }}
          id="cta-berat-gorden"
        >
          {/* Glass-morphic / Frosted Translucent Overlay */}
          <div className="backdrop-blur-[2px] w-full px-8 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
            <div>
              <h2 className="text-white text-2xl md:text-3xl font-bold tracking-tight mb-2 text-center md:text-left">
                Temukan Gorden Impian Anda
              </h2>
              <p className="text-white/85 text-xs md:text-sm font-light text-center md:text-left max-w-xl">
                Konsultasikan ukuran jendela Anda dan dapatkan taksiran harga khusus berkualitas tinggi langsung dari kami.
              </p>
            </div>
            
            <button
              onClick={handleConsultGeneral}
              className="bg-[#29302c] text-white hover:bg-neutral-900 px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 hover:scale-102 flex items-center gap-2 cursor-pointer border border-[#444f47]"
            >
              <ShoppingBag size={14} />
              <span>Konsultasi</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. MODAL DRAWER FOR DETAILED SPECS */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col"
              id="katalog-detail-modal"
            >
              {/* Product Header Photo */}
              <div className="h-48 md:h-56 overflow-hidden relative bg-gray-50">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Product Detail Content */}
              <div className="p-6 md:p-8 space-y-6">
                
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#93c47d] bg-[#ebf5fb] px-3 py-1 rounded-full">
                    {selectedProduct.category.toUpperCase()}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 pt-2">{selectedProduct.name}</h3>
                  <div className="text-xl font-extrabold text-[#c3a05c]">
                    IDR {selectedProduct.pricePerMeter.toLocaleString('id-ID')}
                  </div>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed font-light">{selectedProduct.description}</p>

                {/* Technical specs block */}
                <div className="grid grid-cols-3 gap-4 border-t border-b border-gray-100 py-4 text-[11px]">
                  <div>
                    <span className="text-gray-400 block mb-1">Bahan</span>
                    <span className="font-bold text-gray-800">{selectedProduct.specs.bahan}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-1">Peneduh</span>
                    <span className="font-bold text-gray-800">{selectedProduct.specs.blockout}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-1">Lebar Kain</span>
                    <span className="font-bold text-gray-800">{selectedProduct.specs.lebar}</span>
                  </div>
                </div>

                {/* Bullet Features list */}
                {selectedProduct.features && selectedProduct.features.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-gray-400 block">Fitur Utama</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {selectedProduct.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-600 font-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal actions */}
                <div className="flex gap-4 pt-2">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => {
                      handleBookNow(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-xl text-xs font-bold transition-all shadow cursor-pointer border border-amber-600"
                  >
                    <ShoppingBag size={14} />
                    <span>Pesan Sekarang</span>
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
