import { useState, useEffect } from 'react';
import { Review } from '../types';
import { Star, Quote, PenTool, CheckCircle, User, Sparkles, Camera, Upload, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Bu Shinta Rosalia',
    role: 'Pemilik Villa – Kusuma Pinus',
    rating: 5,
    comment: 'Sangat puas dengan hasil pengerjaan Gorden Yulie! Bahannya sangat tebal, pengerjaan jahitannya rapi sekali, dan timnya luar biasa sopan saat instalasi ke Batu. Rekomendasi bintang 5!',
    date: '10 Mei 2026',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'r2',
    name: 'Pak Rudy Hermawan',
    role: 'Pribadi – Perumahan Ijen, Malang',
    rating: 5,
    comment: 'Order gorden minimalis semi-blackout lari 12 meter untuk lantai dua rumah. Selesai tepat waktu. Harga jujur sesuai kalkulator estimasi dan diukur real gratis ke rumah. Sangat profesional.',
    date: '28 April 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'r3',
    name: 'Bu Dian Sasmita',
    role: 'Manager Operasional – Boutique Hotel',
    rating: 5,
    comment: 'Sudah langganan lebih dari 5 tahun dengan Gorden Yulie Batu untuk kebutuhan gorden hotel kami. Jahitan presisi, sangat fungsional memblokir cahaya, dan tidak gampang lusuh saat dicuci.',
    date: '15 Maret 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600'
  }
];

interface TestimoniProps {
  setActiveTab?: (tab: string) => void;
}

export default function Testimoni({ setActiveTab }: TestimoniProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [avatar, setAvatar] = useState('');
  const [image, setImage] = useState('');
  const [avatarDragActive, setAvatarDragActive] = useState(false);
  const [imageDragActive, setImageDragActive] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'image') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          if (type === 'avatar') {
            setAvatar(reader.result);
          } else {
            setImage(reader.result);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent, type: 'avatar' | 'image', active: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    if (type === 'avatar') {
      setAvatarDragActive(active);
    } else {
      setImageDragActive(active);
    }
  };

  const handleDrop = (e: React.DragEvent, type: 'avatar' | 'image') => {
    e.preventDefault();
    e.stopPropagation();
    if (type === 'avatar') {
      setAvatarDragActive(false);
    } else {
      setImageDragActive(false);
    }

    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File gambar terlalu besar (maksimal 5MB).');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          if (type === 'avatar') {
            setAvatar(reader.result);
          } else {
            setImage(reader.result);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Load reviews from localStorage on creation
  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setReviews(data);
          localStorage.setItem('gorden_yulie_reviews', JSON.stringify(data));
        }
      })
      .catch((err) => {
        console.warn('Gagal memuat testimoni dari API database, menggunakan fallback lokal:', err);
        const saved = localStorage.getItem('gorden_yulie_reviews');
        if (saved) {
          try {
            setReviews(JSON.parse(saved));
          } catch (e) {
            setReviews(INITIAL_REVIEWS);
          }
        } else {
          setReviews(INITIAL_REVIEWS);
          localStorage.setItem('gorden_yulie_reviews', JSON.stringify(INITIAL_REVIEWS));
        }
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateStr = today.toLocaleDateString('id-ID', options);

    const newReview: Review = {
      id: `test_${Date.now()}`,
      name: name.trim(),
      role: role.trim() || 'Pelanggan Setia Gorden Yulie',
      rating,
      comment: comment.trim(),
      date: dateStr,
      avatar: avatar || undefined,
      image: image || undefined
    };

    fetch('/api/testimonials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(newReview)
    })
      .then(res => {
        if (!res.ok) throw new Error('API returned non-ok status');
        return res.json();
      })
      .then(() => {
        const updated = [newReview, ...reviews];
        setReviews(updated);
        localStorage.setItem('gorden_yulie_reviews', JSON.stringify(updated));
      })
      .catch(err => {
        console.warn('Gagal mensinkronisasikan review baru ke database, menyimpan secara lokal:', err);
        const updated = [newReview, ...reviews];
        setReviews(updated);
        localStorage.setItem('gorden_yulie_reviews', JSON.stringify(updated));
      })
      .finally(() => {
        // Reset Form
        setName('');
        setRole('');
        setRating(5);
        setComment('');
        setAvatar('');
        setImage('');
        setIsSubmitted(true);
        setFormOpen(false);

        // Hide success message after 4s
        setTimeout(() => {
          setIsSubmitted(false);
        }, 4000);
      });
  };

  // Compute average rating
  const avgRating = reviews.length > 0 
    ? Number((reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1))
    : 5.0;

  return (
    <div id="testimoni-page" className="bg-gray-50 min-h-screen">
      
      {/* 1. HERO HEADER SECTION */}
      <div 
        id="testimoni-hero"
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
              Testimoni Pelanggan
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
              <span className="text-gold-accent font-semibold">Testimoni</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        
        {/* Header Block */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-forest-light">
            TESTIMONI DAN ULASAN
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            Apa Kata Klien Kami?
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base">
            Ulasan jujur langsung dari pelanggan kami di area Malang Raya dan sekitarnya. Prioritas kami adalah kepuasan Anda.
          </p>
        </div>

        {/* Rating Overview and Action Row */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 mb-12" id="reviews-summary-card">
          <div className="flex items-center gap-4 text-center md:text-left flex-col sm:flex-row">
            <div className="text-4xl md:text-5xl font-extrabold text-forest-medium">
              {avgRating} <span className="text-sm text-gray-400 font-normal">/ 5.0</span>
            </div>
            <div>
              <div className="flex justify-center sm:justify-start text-yellow-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-xs md:text-sm text-gray-500 font-medium">
                Berdasarkan {reviews.length} ulasan pelanggan yang terverifikasi
              </p>
            </div>
          </div>

          <button
            onClick={() => setFormOpen(!formOpen)}
            className="flex items-center gap-2 bg-gold-accent hover:bg-gold-hover text-white px-6 py-3 rounded-full font-bold text-xs md:text-sm tracking-wide shadow-md transition-colors cursor-pointer"
          >
            <PenTool size={16} />
            <span>Tulis Ulasan Anda</span>
          </button>
        </div>

        {/* Live Feedback Success Alert */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold mb-8 max-w-3xl mx-auto"
            >
              <CheckCircle size={20} className="text-emerald-600 flex-shrink-0" />
              <span>Terima kasih! Ulasan Anda telah diterbitkan secara lokal dan berhasil tersimpan di sistem.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Review Writing Form */}
        <AnimatePresence>
          {formOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12 max-w-xl mx-auto"
            >
              <form 
                onSubmit={handleSubmit}
                className="bg-white border border-gold-accent/20 rounded-3xl p-6 md:p-8 shadow-lg space-y-4"
              >
                <div className="text-sm font-bold text-forest-medium flex items-center gap-1.5 border-b border-gray-100 pb-2 mb-2">
                  <Sparkles size={16} className="text-gold-accent" />
                  <span>KIRIM ULASAN PELANGGAN</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-700">Nama Lengkap</label>
                    <input 
                      type="text" 
                      required 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Contoh: Bu Arianti"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold-accent"
                    />
                  </div>
                  
                  {/* Role Input */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-700">Jenis Layanan / Perusahaan (Opsional)</label>
                    <input 
                      type="text" 
                      value={role} 
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Contoh: Pemilik Kafe Batu"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold-accent"
                    />
                  </div>
                </div>

                {/* Rating Input */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-700">Berikan Bintang Anda:</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none transition-transform active:scale-95 cursor-pointer"
                      >
                        <Star 
                          size={24} 
                          fill={star <= rating ? "#fbbf24" : "none"} 
                          className={star <= rating ? "text-yellow-400" : "text-gray-300"}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment Input */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700">Pesan Ulasan Lengkap</label>
                  <textarea 
                    required 
                    rows={4}
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tulis kepuasan Anda mengenai produk, jahitan, atau keramahan tim pasang gorden..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold-accent resize-none"
                  />
                </div>

                {/* Image Upload Row (Avatar & Installation) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* 1. Avatar (Profile Photo) */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-700">Foto Profil Anda (Opsional)</label>
                    <div 
                      onDragOver={(e) => handleDrag(e, 'avatar', true)}
                      onDragLeave={(e) => handleDrag(e, 'avatar', false)}
                      onDrop={(e) => handleDrop(e, 'avatar')}
                      className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-3 text-center transition-all min-h-[120px] cursor-pointer ${
                        avatarDragActive ? 'border-amber-500 bg-amber-50/20' : 'border-gray-200 bg-gray-50 hover:bg-gray-100/50'
                      }`}
                    >
                      {avatar ? (
                        <div className="flex flex-col items-center space-y-2">
                          <img src={avatar} alt="Foto Profil Preview" className="w-12 h-12 rounded-full object-cover border border-gray-250 shadow-sm" referrerPolicy="no-referrer" />
                          <button 
                            type="button" 
                            onClick={() => setAvatar('')}
                            className="bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 transition-colors hover:shadow-sm"
                          >
                            <Trash2 size={10} /> Hapus
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full text-gray-400">
                          <Camera size={18} className="text-gray-400 mb-1" />
                          <span className="text-[10px] font-bold text-gray-600">Klik / Seret Foto</span>
                          <span className="text-[8px] text-gray-400 mt-0.5">Maks 5MB</span>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'avatar')}
                            className="hidden" 
                          />
                        </label>
                      )}
                    </div>
                    {/* URL alternative */}
                    {!avatar && (
                      <input 
                        type="url" 
                        placeholder="Atau tempel link URL foto..." 
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-[10px] focus:outline-none focus:border-gold-accent mt-1"
                      />
                    )}
                  </div>

                  {/* 2. Curtain Image (Installation photo) */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-700">Foto Gorden Terpasang (Opsional)</label>
                    <div 
                      onDragOver={(e) => handleDrag(e, 'image', true)}
                      onDragLeave={(e) => handleDrag(e, 'image', false)}
                      onDrop={(e) => handleDrop(e, 'image')}
                      className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-3 text-center transition-all min-h-[120px] cursor-pointer ${
                        imageDragActive ? 'border-amber-500 bg-amber-50/20' : 'border-gray-200 bg-gray-50 hover:bg-gray-100/50'
                      }`}
                    >
                      {image ? (
                        <div className="flex flex-col items-center space-y-2 w-full">
                          <img src={image} alt="Foto Gorden Preview" className="h-12 w-24 rounded object-cover border border-gray-250 shadow-sm" referrerPolicy="no-referrer" />
                          <button 
                            type="button" 
                            onClick={() => setImage('')}
                            className="bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 transition-colors hover:shadow-sm"
                          >
                            <Trash2 size={10} /> Hapus
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full text-gray-400">
                          <Upload size={18} className="text-gray-400 mb-1" />
                          <span className="text-[10px] font-bold text-gray-600">Klik / Seret Gorden</span>
                          <span className="text-[8px] text-gray-400 mt-0.5">Maks 5MB</span>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'image')}
                            className="hidden" 
                          />
                        </label>
                      )}
                    </div>
                    {/* URL alternative */}
                    {!image && (
                      <input 
                        type="url" 
                        placeholder="Atau tempel link URL gorden..." 
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-[10px] focus:outline-none focus:border-gold-accent mt-1"
                      />
                    )}
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-2 justify-end pt-2 border-t border-gray-100 mt-3">
                  <button
                    type="button"
                    onClick={() => setFormOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-forest-medium hover:bg-forest-light text-white text-xs font-bold tracking-wide shadow"
                  >
                    Kirim Ulasan Resmi
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="testimonials-grid">
          {reviews.map((rev) => (
            <motion.div
              layout
              key={rev.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all duration-300 relative group"
            >
              {/* Decorative Quote Icon top-right */}
              <Quote className="absolute right-6 top-6 w-8 h-8 text-gold-accent/10 group-hover:text-gold-accent/20 transition-colors" />

              <div className="space-y-4">
                {/* Rating Banner */}
                <div className="flex text-yellow-400 gap-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                  {[...Array(5 - rev.rating)].map((_, i) => (
                    <Star key={i} size={15} className="text-gray-200" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed italic">
                  "{rev.comment}"
                </p>

                {/* Optional Curtain/Installation Image */}
                {rev.image && (
                  <div className="overflow-hidden rounded-xl border border-gray-100 aspect-[16/10] w-full bg-gray-100">
                    <img 
                      src={rev.image} 
                      alt="Ulasan Pemasangan Gorden" 
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>

              {/* Author metadata footer */}
              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-gray-50">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-forest-medium/10 text-forest-medium flex items-center justify-center font-bold text-sm border border-gray-100 flex-shrink-0">
                  {rev.avatar ? (
                    <img 
                      src={rev.avatar} 
                      alt={rev.name} 
                      className="w-full h-full object-cover animate-fade-in" 
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    rev.name[0] || <User size={16} />
                  )}
                </div>
                
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-gray-900 flex items-center gap-1">
                    <span>{rev.name}</span>
                    <span className="text-emerald-500 cursor-help" title="Pelanggan Terverifikasi">
                      ✓
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium">{rev.role}</div>
                </div>
              </div>

              {/* Floating Date Tag */}
              <span className="absolute top-6 right-6 text-[9.5px] text-gray-300 font-semibold group-hover:text-gray-400 transition-colors">
                {rev.date}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
