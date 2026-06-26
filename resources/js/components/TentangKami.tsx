import { Award, ShieldCheck, Banknote, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

// Hotlinked/generated image paths
const heroBg = '/assets/images/curtains_hero_bg_1782007616516.jpg';
const contentImg = '/assets/images/curtains_minimal_interior_1782007633904.jpg';

interface TentangKamiProps {
  setActiveTab: (tab: string) => void;
}

export default function TentangKami({ setActiveTab }: TentangKamiProps) {
  return (
    <div id="tentang-kami-page" className="bg-white min-h-screen">
      
      {/* 1. HERO SECTION */}
      <div 
        id="about-hero"
        className="relative h-[380px] md:h-[450px] bg-cover bg-center flex items-center pt-20"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(29, 44, 34, 0.6), rgba(29, 44, 34, 0.45)), url(${heroBg})` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight">
              Tentang Kami
            </h1>
            
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-white/80 font-medium">
              <button 
                onClick={() => { setActiveTab('beranda'); window.scrollTo(0,0); }}
                className="hover:text-gold-accent hover:underline cursor-pointer transition-colors"
              >
                Beranda
              </button>
              <span className="text-white/60">&gt;</span>
              <span className="text-gold-accent font-semibold">Tentang Kami</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2. INTRODUCTION BLOCK */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left: Beautiful image with rounded corners */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 h-[320px] md:h-[380px] rounded-2xl overflow-hidden shadow-xl"
            id="about-intro-image-container"
          >
            <img 
              src={contentImg} 
              alt="Gorden Yulie Batu Interior" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
              id="about-intro-image"
            />
          </motion.div>

          {/* Right: Intro text block */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-7 space-y-6"
            id="about-intro-text-container"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 border-b border-gray-100 pb-4">
              Gorden Yulie Batu
            </h2>
            <p className="text-gray-600 text-base leading-relaxed md:text-lg">
              {"Gorden Yulie Batu adalah usaha penjualan dan pemasangan gorden yang telah berdiri sejak tahun 1998. Kami menyediakan berbagai kebutuhan interior seperti gorden, vitrase, roller blind, wallpaper, kitchen set, dan furniture dengan kualitas terbaik, harga terjangkau, serta pelayanan yang terpercaya untuk wilayah Malang Raya dan sekitarnya."}
            </p>
          </motion.div>

        </div>

        {/* 3. FOUR LONG COPY PARAGRAPHS */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8 text-gray-600 text-sm md:text-base leading-relaxed max-w-4xl mx-auto border-t border-gray-100 pt-12"
          id="detailed-history-paragraphs"
        >
          <p>
            {"Gorden Yulie Batu merupakan usaha yang bergerak di bidang penjualan dan pemasangan gorden yang telah melayani pelanggan sejak tahun 1998. Dengan pengalaman lebih dari dua dekade, kami berkomitmen untuk menghadirkan produk berkualitas, pelayanan terbaik, serta harga yang terjangkau bagi setiap pelanggan."}
          </p>
          
          <p>
            {"Kami menyediakan berbagai kebutuhan interior, mulai dari gorden, vitrase, roller blind (vertical maupun horizontal), taplak meja, wallpaper dinding, hingga berbagai furniture dan kitchen set yang dapat disesuaikan dengan kebutuhan ruangan Anda. Setiap produk dipilih dengan memperhatikan kualitas, fungsi, dan estetika untuk menciptakan ruangan yang nyaman dan elegan."}
          </p>

          <p>
            {"Untuk area layanan, Gorden Yulie Batu melayani wilayah Kota Batu, Malang, dan sekitarnya. Kami juga melayani pemasangan di area Malang Raya dan berbagai wilayah di Jawa Timur. Bagi pelanggan di luar Kota Malang, kami tetap menerima pesanan dengan ketentuan minimum pembelian tertentu. Selain itu, kami juga menyediakan layanan pengiriman produk ke berbagai daerah sesuai kebutuhan pelanggan."}
          </p>

          <p>
            {"Kepercayaan pelanggan adalah prioritas utama kami. Oleh karena itu, kami selalu berusaha memberikan pelayanan terbaik mulai dari konsultasi, pemilihan produk, hingga proses pemasangan. Dengan pengalaman, kualitas produk yang terjamin, serta harga yang kompetitif, Gorden Yulie Batu siap menjadi solusi kebutuhan gorden dan interior untuk rumah, kantor, hotel, villa, maupun berbagai jenis bangunan lainnya."}
          </p>
        </motion.div>
      </div>

      {/* 4. ADVANTAGES SECTION */}
      <div className="bg-luxury-cream py-16 md:py-24 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="space-y-3 mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-forest-light">
              KEUNGGULAN LAYANAN KAMI
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Mengapa Memilih Gorden Yulie?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="advantages-grid">
            
            {/* Card 1: Produk Berkualitas */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center text-center space-y-5 hover:shadow-lg transition-shadow duration-300 group"
              id="advantage-card-1"
            >
              {/* Custom Seal Icon */}
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 shadow-inner group-hover:bg-gold-accent/10 transition-colors">
                <Award className="w-8 h-8 text-forest-medium group-hover:text-gold-accent transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Produk Berkualitas
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {"Kami menyediakan berbagai pilihan gorden dengan bahan berkualitas, desain modern, dan daya tahan yang baik untuk berbagai kebutuhan ruangan."}
              </p>
            </motion.div>

            {/* Card 2: Pengerjaan Profesional */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center text-center space-y-5 hover:shadow-lg transition-shadow duration-300 group"
              id="advantage-card-2"
            >
              {/* Custom Seal Icon */}
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 shadow-inner group-hover:bg-gold-accent/10 transition-colors">
                <ShieldCheck className="w-8 h-8 text-forest-medium group-hover:text-gold-accent transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Pengerjaan Profesional
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {"Didukung oleh tenaga berpengalaman dalam pemasangan dan penataan gorden sehingga hasil lebih rapi, presisi, dan sesuai kebutuhan."}
              </p>
            </motion.div>

            {/* Card 3: Harga Terjangkau */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center text-center space-y-5 hover:shadow-lg transition-shadow duration-300 group"
              id="advantage-card-3"
            >
              {/* Custom Seal Icon */}
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 shadow-inner group-hover:bg-gold-accent/10 transition-colors">
                <Banknote className="w-8 h-8 text-forest-medium group-hover:text-gold-accent transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Harga Terjangkau
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {"Memberikan kualitas terbaik dengan harga yang kompetitif serta berbagai pilihan produk yang dapat disesuaikan dengan anggaran pelanggan."}
              </p>
            </motion.div>

          </div>
        </div>
      </div>

      {/* 5. CTA INSPIRATIONAL BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-cover bg-center rounded-3xl overflow-hidden shadow-xl"
          style={{ backgroundImage: `linear-gradient(to right, rgba(29, 44, 34, 0.85), rgba(44, 62, 49, 0.65)), url(${heroBg})` }}
          id="cta-inspired-banner"
        >
          <div className="px-8 py-12 md:py-16 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-serif">
                Temukan Gorden Impian Anda
              </h2>
              <p className="text-white/80 max-w-lg text-sm md:text-base font-light">
                Konsultasikan langsung kebutuhan jendela rumah atau bisnis Anda secara gratis dengan tim ahli kami.
              </p>
            </div>
            
            <button
              onClick={() => { setActiveTab('hubungi-kami'); window.scrollTo(0,0); }}
              className="flex items-center gap-2.5 bg-white text-forest-dark hover:bg-gold-accent hover:text-white px-8 py-3.5 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 group cursor-pointer"
              id="cta-consult-button"
            >
              <span>Konsultasi</span>
              <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
