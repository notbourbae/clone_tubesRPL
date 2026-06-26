import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Beranda from './components/Beranda';
import TentangKami from './components/TentangKami';
import Katalog from './components/Katalog';
import Portofolio from './components/Portofolio';
import Testimoni from './components/Testimoni';
import HubungiKami from './components/HubungiKami';
import AdminDashboard from './components/AdminDashboard';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return window.location.pathname === '/admin' || window.location.hash === '#/admin' || window.location.pathname.startsWith('/admin');
  });

  const validTabs = ['beranda', 'tentang-kami', 'katalog', 'portofolio', 'testimoni', 'hubungi-kami'];

  const [activeTab, setActiveTab] = useState<string>(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    return validTabs.includes(hash) ? hash : 'beranda';
  });

  // Keep track of route changes or hash changes dynamically
  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdmin(window.location.pathname === '/admin' || window.location.hash === '#/admin' || window.location.pathname.startsWith('/admin'));
      
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Update hash when activeTab changes
  useEffect(() => {
    if (!isAdmin) {
      window.location.hash = activeTab;
    }
  }, [activeTab, isAdmin]);

  // Set browser page titles dynamically
  useEffect(() => {
    if (isAdmin) {
      document.title = 'Panel Admin | Gorden Yulie Batu';
      return;
    }

    let titleSuffix = 'Gorden Yulie Batu';
    let titlePrefix = '';

    switch (activeTab) {
      case 'beranda':
        titlePrefix = 'Beranda';
        break;
      case 'tentang-kami':
        titlePrefix = 'Tentang Kami';
        break;
      case 'katalog':
        titlePrefix = 'Katalog';
        break;
      case 'portofolio':
        titlePrefix = 'Portofolio';
        break;
      case 'testimoni':
        titlePrefix = 'Testimoni';
        break;
      case 'hubungi-kami':
        titlePrefix = 'Hubungi Kami';
        break;
    }

    document.title = titlePrefix ? `${titlePrefix} | ${titleSuffix}` : titleSuffix;
  }, [activeTab, isAdmin]);

  if (isAdmin) {
    return <AdminDashboard />;
  }

  // Render active component based on selected state tab
  const renderContent = () => {
    switch (activeTab) {
      case 'beranda':
        return <Beranda setActiveTab={setActiveTab} />;
      case 'tentang-kami':
        return <TentangKami setActiveTab={setActiveTab} />;
      case 'katalog':
        return <Katalog />;
      case 'portofolio':
        return <Portofolio setActiveTab={setActiveTab} />;
      case 'testimoni':
        return <Testimoni setActiveTab={setActiveTab} />;
      case 'hubungi-kami':
        return <HubungiKami setActiveTab={setActiveTab} />;
      default:
        return <Beranda setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans antialiased text-gray-800 bg-gray-50 selection:bg-gold-accent/20">
      
      {/* Universal Floating Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Body with Transition Animations */}
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

      {/* Universal Dark Footer */}
      <Footer setActiveTab={setActiveTab} />
      
    </div>
  );
}
