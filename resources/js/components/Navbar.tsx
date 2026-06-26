import { useState, useEffect } from 'react';
import GordenLogo from './GordenLogo';
import { Menu, X, PhoneCall } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to add slight dark background overlay when sticky
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'tentang-kami', label: 'Tentang Kami' },
    { id: 'katalog', label: 'Katalog' },
    { id: 'portofolio', label: 'Portofolio' },
    { id: 'testimoni', label: 'Testimoni' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-forest-dark/95 backdrop-blur-md shadow-md py-2 border-b border-forest-light/25' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo - Circular */}
          <div 
            className="flex-shrink-0 cursor-pointer transform hover:scale-105 transition-transform"
            onClick={() => handleNavClick('beranda')}
          >
            <GordenLogo size={scrolled ? 50 : 64} />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer py-2 ${
                    isActive 
                      ? 'text-white font-semibold' 
                      : 'text-white/85 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/3 right-1/3 h-[2px] bg-gold-accent rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Call to Action Button - Right Side */}
          <div className="hidden md:block">
            <button
              onClick={() => handleNavClick('hubungi-kami')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium tracking-wide shadow transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                activeTab === 'hubungi-kami'
                  ? 'bg-gold-accent hover:bg-gold-hover text-white'
                  : 'bg-white text-forest-dark hover:bg-gray-100'
              }`}
            >
              Hubungi Kami
            </button>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/90 hover:text-white hover:bg-forest-light/30 focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 md:hidden z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 bottom-0 right-0 w-4/5 max-w-sm bg-forest-dark border-l border-forest-light/40 p-6 z-50 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <GordenLogo size={56} />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full bg-forest-light/30 text-white hover:bg-forest-light/50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col space-y-4">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`py-3 px-4 rounded-lg text-left font-medium transition-all ${
                  isActive 
                    ? 'bg-gold-accent text-white shadow' 
                    : 'text-white/80 hover:bg-forest-light/20 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          
          <hr className="border-forest-light/30 my-4" />
          
          <button
            onClick={() => handleNavClick('hubungi-kami')}
            className="w-full flex items-center justify-center gap-2 bg-white text-forest-dark hover:bg-gray-100 py-3 rounded-lg font-semibold tracking-wide transition-all duration-200"
          >
            <PhoneCall size={18} />
            Hubungi Kami
          </button>
        </div>
      </div>
    </nav>
  );
}
