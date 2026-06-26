import { useState, useEffect } from 'react';
import { Project } from '../types';
import { MapPin, Calendar, Compass, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getStoredProjects } from '../utils/storage';

interface PortofolioProps {
  setActiveTab?: (tab: string) => void;
}

export default function Portofolio({ setActiveTab }: PortofolioProps) {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProj, setSelectedProj] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(() => getStoredProjects());

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProjects(data);
          localStorage.setItem('yulie_projects', JSON.stringify(data));
        }
      })
      .catch(err => console.error('Gagal memuat proyek dari database SQL:', err));
  }, []);

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <div id="portofolio-page" className="bg-gray-50 min-h-screen">
      
      {/* 1. HERO HEADER SECTION */}
      <div 
        id="portofolio-hero"
        className="relative h-[320px] md:h-[380px] bg-cover bg-center flex items-center pt-16"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(29, 44, 34, 0.65), rgba(29, 44, 34, 0.5)), url('/assets/images/curtains_hero_bg_1782007616516.jpg')` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight">
              Portofolio Kami
            </h1>
            
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-white/80 font-medium">
              <button 
                onClick={() => { if (setActiveTab) { setActiveTab('beranda'); window.scrollTo(0,0); } }}
                className="hover:text-gold-accent hover:underline cursor-pointer transition-colors"
              >
                Beranda
              </button>
              <span className="text-white/60">&gt;</span>
              <span className="text-gold-accent font-semibold">Portofolio</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        
        {/* Header Section Details */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-forest-light">
            GALERI HASIL PENGERJAAN
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            Karya Realisasi Pemasangan Terbaik
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base">
            Melihat lebih dekat jajaran proyek instalasi tirai, wallpaper, dan gorden eksklusif kami di wilayah Malang Raya dan sekitarnya.
          </p>
        </div>

        {/* Categories Tab */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12" id="portfolio-tabs">
          {[
            { id: 'all', label: 'Semua Proyek' },
            { id: 'villa', label: 'Villa Mewah' },
            { id: 'residensial', label: 'Residensial / Rumah' },
            { id: 'komersial', label: 'Komersial / Kantor / Hotel' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-medium tracking-wide transition-all shadow-sm cursor-pointer ${
                filter === tab.id
                  ? 'bg-forest-medium text-white shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="portfolio-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 group transition-all duration-300 cursor-pointer flex flex-col justify-between"
                onClick={() => setSelectedProj(project)}
              >
                <div>
                  {/* Aspect Ratio Container for image */}
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur text-forest-dark font-bold text-xs px-4 py-2.5 rounded-full flex items-center gap-1.5 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <Eye size={14} />
                        <span>Lihat Studi Kasus</span>
                      </div>
                    </div>
                    {/* Floating Info */}
                    <span className="absolute top-4 left-4 bg-forest-dark/95 text-white font-bold text-[10px] tracking-wider uppercase px-3.5 py-1 rounded-full border border-white/10 shadow">
                      {project.category}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 space-y-3.5">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-forest-light transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      
                      <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <MapPin size={13} className="text-gold-accent" />
                        <span>{project.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Card footer */}
                <div className="px-6 py-4 border-t border-gray-50 bg-gray-50/70 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={13} className="text-gray-400" />
                    <span>Selesai: {project.year}</span>
                  </div>
                  <span className="text-gold-accent font-semibold group-hover:underline">
                    Lihat Selengkapnya
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* CASE STUDY LIGHTBOX POPUP */}
      <AnimatePresence>
        {selectedProj && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col"
            >
              <div className="h-56 md:h-72 overflow-hidden relative">
                <img 
                  src={selectedProj.image} 
                  alt={selectedProj.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setSelectedProj(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold tracking-widest text-gold-accent flex items-center gap-1">
                    <Compass size={13} /> PROJECT STUDY CASE ({selectedProj.category.toUpperCase()})
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                    {selectedProj.title}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-b border-gray-100 py-4 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gold-accent" />
                    <div>
                      <span className="block text-gray-400">Lokasi Proyek:</span>
                      <span className="font-bold text-gray-800">{selectedProj.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gold-accent" />
                    <div>
                      <span className="block text-gray-400">Tahun Dituntaskan:</span>
                      <span className="font-bold text-gray-800">Tahun {selectedProj.year}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-bold text-gray-400">Deskripsi Pengerjaan:</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{selectedProj.description}</p>
                </div>

                <div className="flex gap-3 justify-end pt-2">
                  <button
                    onClick={() => setSelectedProj(null)}
                    className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium text-xs transition-colors cursor-pointer"
                  >
                    Tutup
                  </button>
                  <a
                    href={`https://wa.me/6281233965303?text=Halo%20Gorden%20Yulie%2C%20saya%20tertarik%20dengan%20hasil%20proyek%20*${encodeURIComponent(selectedProj.title)}*%20di%20${encodeURIComponent(selectedProj.location)}.%20Bisa%20berikan%20penawaran%20serupa%3F`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-forest-medium text-white hover:bg-gold-accent px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow cursor-pointer"
                  >
                    <span>Minta Penawaran Serupa</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
