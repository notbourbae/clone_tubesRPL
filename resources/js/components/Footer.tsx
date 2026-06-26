import GordenLogo from './GordenLogo';
import { Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleFooterLinkClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-forest-dark text-white border-t border-forest-light/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid with Beautiful Bento Grid rhythm */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-12">
          
          {/* Column 1: Logo & Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-5">
            <GordenLogo size={80} className="mb-2 shadow-lg border border-forest-light/10" />
            <p className="text-white/70 text-sm leading-relaxed max-w-xs font-light">
              Menyediakan berbagai pilihan gorden & aksesoris interior berkualitas tinggi untuk rumah, villa, hotel, dan kantor di Malang Raya sejak 1998.
            </p>
          </div>

          {/* Column 2: Link Cepat */}
          <div className="flex flex-col items-center md:items-start space-y-5">
            <h3 className="text-gold-accent font-semibold text-xs tracking-widest uppercase border-b border-gold-accent/20 pb-1.5 w-1/3 md:w-auto">
              LINK CEPAT
            </h3>
            <ul className="space-y-3 text-center md:text-left text-sm text-white/75 font-light">
              <li>
                <button 
                  onClick={() => handleFooterLinkClick('beranda')}
                  className="hover:text-gold-accent cursor-pointer transition-colors duration-200 flex items-center justify-center md:justify-start gap-1"
                >
                  <span>Beranda</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterLinkClick('tentang-kami')}
                  className="hover:text-gold-accent cursor-pointer transition-colors duration-200 flex items-center justify-center md:justify-start gap-1"
                >
                  <span>Tentang Kami</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterLinkClick('katalog')}
                  className="hover:text-gold-accent cursor-pointer transition-colors duration-200 flex items-center justify-center md:justify-start gap-1"
                >
                  <span>Katalog Produk</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterLinkClick('portofolio')}
                  className="hover:text-gold-accent cursor-pointer transition-colors duration-200 flex items-center justify-center md:justify-start gap-1"
                >
                  <span>Portofolio Galeri</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterLinkClick('hubungi-kami')}
                  className="hover:text-gold-accent cursor-pointer transition-colors duration-200 flex items-center justify-center md:justify-start gap-1"
                >
                  <span>Hubungi Kami</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Informasi Ketentuan */}
          <div className="flex flex-col items-center md:items-start space-y-5">
            <h3 className="text-gold-accent font-semibold text-xs tracking-widest uppercase border-b border-gold-accent/20 pb-1.5 w-1/3 md:w-auto">
              INFORMASI
            </h3>
            <ul className="space-y-3 text-center md:text-left text-sm text-white/75 font-light">
              <li>
                <button 
                  onClick={() => handleFooterLinkClick('hubungi-kami')} 
                  className="hover:text-gold-accent cursor-pointer transition-colors duration-200"
                >
                  Syarat & Ketentuan Layanan
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterLinkClick('hubungi-kami')} 
                  className="hover:text-gold-accent cursor-pointer transition-colors duration-200"
                >
                  FAQ Pengukuran Detail
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterLinkClick('hubungi-kami')} 
                  className="hover:text-gold-accent cursor-pointer transition-colors duration-200"
                >
                  Kebijakan Privasi
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Info Kontak */}
          <div className="flex flex-col items-center md:items-start space-y-5">
            <h3 className="text-gold-accent font-semibold text-xs tracking-widest uppercase border-b border-gold-accent/20 pb-1.5 w-1/3 md:w-auto">
              INFO KONTAK
            </h3>
            <ul className="space-y-3.5 text-center md:text-left text-sm text-white/75 font-light">
              <li className="flex flex-col md:flex-row items-center md:items-start gap-2.5">
                <Phone size={16} className="text-gold-accent flex-shrink-0 mt-0.5" />
                <a 
                  href="https://wa.me/6281233965303" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gold-accent transition-colors duration-200"
                >
                  WA: +62 812-3396-5303
                </a>
              </li>
              <li className="flex flex-col md:flex-row items-center md:items-start gap-2.5">
                <Mail size={16} className="text-gold-accent flex-shrink-0 mt-0.5" />
                <a 
                  href="mailto:yuliekorden39@gmail.com" 
                  className="hover:text-gold-accent transition-colors duration-200"
                >
                  yuliekorden39@gmail.com
                </a>
              </li>
              <li className="flex flex-col md:flex-row items-center md:items-start gap-2.5">
                <MapPin size={16} className="text-gold-accent flex-shrink-0 mt-0.5" />
                <span className="max-w-xs text-white/80">
                  Kota Batu, Malang, Jawa Timur, Indonesia
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider line */}
        <hr className="border-forest-light/20" />

        {/* Copyright */}
        <div className="pt-8 text-center text-xs text-white/50 tracking-wider font-light">
          Gorden Yulie Batu &copy; {currentYear}. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
