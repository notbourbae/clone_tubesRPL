import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Plus, Minus, CheckCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Apakah survei lokasi dan pengukuran jendela dikenakan biaya?',
    answer: 'Sama sekali tidak! Gorden Yulie Batu menyediakan layanan survei lokasi, pembawaan katalog contoh bahan kain fisik, serta pengukuran presisi millmeter ke lokasi Anda secara GRATIS tanpa pungutan biaya apa pun untuk wilayah Kota Batu, Malang Raya, dan sekitarnya.'
  },
  {
    question: 'Berapa lama estimasi proses pembuatan gorden hingga siap pasang?',
    answer: 'Standard proses penjahitan berkisar antara 4 hingga 7 hari kerja tergantung dari volume pesanan gorden Anda. Begitu jahitan selesai, kami akan mengonfirmasi jadwal pemasangan langsung di hari yang sama.'
  },
  {
    question: 'Apakah material gorden aman dicuci berulang kali?',
    answer: 'Sangat aman! Lini kain gorden kami (baik blackout velvet, linen, maupun jacquard royal) dirancang dengan pewarnaan sirkuit ganda khusus untuk ketahanan pencucian. Kami juga bersedia memberikan panduan cara mencuci gorden rumbai/eyelets yang benar agar kain tidak kusut.'
  },
  {
    question: 'Di mana saja cakupan area pengerjaan dan pengiriman Gorden Yulie?',
    answer: 'Layanan utama survei dan pemasangan langsung meliputi area Kota Batu, Kota Malang, Kabupaten Malang (Malang Raya), dan sekitarnya. Namun, kami juga menerima pengiriman pesanan gorden custom yang siap pasang ke seluruh Indonesia via kargo kilat tepercaya.'
  }
];

interface HubungiKamiProps {
  setActiveTab?: (tab: string) => void;
}

export default function HubungiKami({ setActiveTab }: HubungiKamiProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('gorden_minimalis');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Convert interest selection to readable text
    let interestLabel = 'Gorden Minimalis';
    if (interest === 'gorden_klasik') interestLabel = 'Gorden Klasik Jacquard';
    if (interest === 'roller_blind') interestLabel = 'Roller / Vertical Blind';
    if (interest === 'vitrase') interestLabel = 'Vitrase Sheer';
    if (interest === 'custom') interestLabel = 'Custom Design & Aksesoris';

    // Generate WhatsApp direct text template
    const waBase = 'https://wa.me/6281233965303';
    const waText = `Halo Gorden Yulie Batu, saya ingin berkonsultasi mengenai pemesanan gorden.%0A%0A*RINCIAN KONSULTASI*%0A-%20Nama%3A%20${encodeURIComponent(name)}%0A-%20WhatsApp%2FNo.HP%3A%20${encodeURIComponent(phone)}%0A-%20Minat%20Produk%3A%20*${encodeURIComponent(interestLabel)}*%0A-%20Pesan%20Pertanyaan%3A%20${encodeURIComponent(message)}%0A%0AHubungi%20saya%20kembali%20ya.%20Terima%20kasih!`;

    // Open WhatsApp in new tab
    window.open(`${waBase}?text=${waText}`, '_blank');
    
    // Display local success state
    setSubmitted(true);
    setName('');
    setPhone('');
    setMessage('');

    // Hide success after 5s
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div id="hubungi-kami-page" className="bg-gray-50 min-h-screen">
      
      {/* 1. HERO HEADER SECTION */}
      <div 
        id="hubungi-kami-hero"
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
              Hubungi Kami
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
              <span className="text-gold-accent font-semibold">Hubungi Kami</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 animate-fade-in">
        
        {/* Header Block */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-forest-light">
            HUBUNGI KAMI DAN ALAMAT
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            Konsultasi Sekarang Gratis!
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base">
            Tim ahli kami siap mensurvei, mengukur, serta membawakan contoh bahan kain langsung ke lokasi Anda gratis.
          </p>
        </div>

        {/* Success Alert */}
        <AnimatePresence>
          {submitted && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-5 rounded-2xl flex items-center gap-4 text-sm font-semibold mb-12 max-w-4xl mx-auto shadow-sm"
            >
              <CheckCircle size={22} className="text-emerald-600 flex-shrink-0" />
              <div>
                <strong className="block text-emerald-950 font-bold mb-0.5">Form WhatsApp Terkirim!</strong>
                Aplikasi WhatsApp Anda telah dibuka di jendela baru dengan isi pesan konsultasi terperinci. Tim admin Gorden Yulie Batu akan segera membalas di nomor WA yang bersangkutan.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Information & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24" id="contacts-block-grid">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick WhatsApp Widget Card */}
            <div className="bg-emerald-600 text-white rounded-3xl p-6 shadow-md border border-emerald-500 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-10 blur-sm">
                <MessageSquare size={160} />
              </div>
              
              <div className="space-y-4 z-10 relative">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold tracking-wider uppercase">
                  FAST RESPONSE RESPONSIVE
                </span>
                <h3 className="text-xl font-bold">WhatsApp Direct Hub</h3>
                <p className="text-white/80 text-xs md:text-sm leading-relaxed font-light">
                  Kirimkan foto jendela atau ruang tamu Anda, lalui chat instan interaktif dengan tim admin kami sekarang juga.
                </p>
              </div>

              <a 
                href="https://wa.me/6281233965303?text=Halo%20Gorden%20Yulie%20Batu%2C%20saya%20ingin%20berkonsultasi%20mengenai%20pemasangan%20gorden%20dengan%20cepat.%20Bisa%20dibantu%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full flex items-center justify-center gap-2 bg-white text-emerald-700 py-3 rounded-xl font-bold text-xs md:text-sm tracking-wide shadow-lg hover:bg-gray-100 transition-colors cursor-pointer text-center"
              >
                <Phone size={16} />
                <span>Mulai Chat WhatsApp Resmi</span>
              </a>
            </div>

            {/* General Corporate Details Box */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-150 space-y-6">
              <h3 className="text-gray-900 font-bold text-lg border-b border-gray-100 pb-4">
                Informasi Kontak Layanan
              </h3>

              <div className="space-y-5">
                {/* 1. Address */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-200">
                    <MapPin className="w-5 h-5 text-forest-medium" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Lokasi Usaha</span>
                    <span className="text-gray-800 text-sm font-semibold block mt-0.5">
                      Kota Batu, Malang, Jawa Timur, Indonesia
                    </span>
                  </div>
                </div>

                {/* 2. Phone */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-200">
                    <Phone className="w-5 h-5 text-forest-medium" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Telepon / WhatsApp</span>
                    <a 
                      href="https://wa.me/6281233965303" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-800 text-sm font-semibold block mt-0.5 hover:text-gold-accent transition-colors"
                    >
                      +6281233965303
                    </a>
                  </div>
                </div>

                {/* 3. Email */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-200">
                    <Mail className="w-5 h-5 text-forest-medium" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Surel Email</span>
                    <a 
                      href="mailto:yuliekorden39@gmail.com" 
                      className="text-gray-800 text-sm font-semibold block mt-0.5 hover:text-gold-accent transition-colors"
                    >
                      yuliekorden39@gmail.com
                    </a>
                  </div>
                </div>

                {/* 4. Hours */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-200">
                    <Clock className="w-5 h-5 text-forest-medium" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Jam Operasional</span>
                    <span className="text-gray-800 text-sm font-semibold block mt-0.5">
                      Setiap Hari: 08.00 WIB - 20.00 WIB
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Interactive Consultation Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-150 space-y-6">
              
              <div className="space-y-1">
                <div className="text-gold-accent text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                  <Sparkles size={14} className="text-gold-accent animate-pulse" />
                  <span>FORM KONSULTASI ONLINE</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Rencanakan Desain Tirai Anda
                </h3>
                <p className="text-gray-500 text-xs md:text-sm font-light">
                  Isikan biodata Anda di bawah, sistem kami akan meramu pesan terperinci untuk diteruskan langsung ke WhatsApp admin support kami.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                
                {/* Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700">Nama Lengkap Anda</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Pak Kurnia"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-accent"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700">Nomor WhatsApp / HP Aktif</label>
                  <input 
                    type="tel" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contoh: 0812xxxxxxxx"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-accent"
                  />
                </div>

                {/* Interest Model selector */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700">Model Interior yang Diminati</label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-gold-accent font-medium cursor-pointer"
                  >
                    <option value="gorden_minimalis">Gorden Minimalis Modern (Bahan Polos)</option>
                    <option value="gorden_klasik">Gorden Klasik Jacquard (Motif Damask)</option>
                    <option value="roller_blind">Roller / Vertical Blind (Kantor / Dapur)</option>
                    <option value="vitrase">Vitrase Sheer Tipis (Penapis Cahaya)</option>
                    <option value="custom">Desain Kustom Lainnya & Aksesoris Rumah</option>
                  </select>
                </div>

                {/* Messages */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700">Pesan / Rencana Ukuran Jendela (Opsional)</label>
                  <textarea 
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Contoh: Saya butuh gorden blackout warna krem untuk 3 jendela kamar tidur di Batu."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-accent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-forest-medium hover:bg-forest-light text-white py-3.5 rounded-xl font-bold tracking-wide shadow-lg transition-all transform active:scale-98 cursor-pointer text-sm"
                >
                  <Send size={16} />
                  <span>Kirim via WhatsApp Chat</span>
                </button>

              </form>

            </div>
          </div>

        </div>

        {/* 2. FREQUENTLY ASKED QUESTIONS SECTION */}
        <section className="max-w-4xl mx-auto" id="faq-section">
          
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-forest-light">
              PERTANYAAN UMUM SECARA DETAIL
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
          </div>

          <div className="space-y-4" id="faq-accordion-board">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow transition-shadow"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-6 py-4 md:py-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <span className="font-bold text-gray-900 text-sm md:text-base leading-tight">
                      {faq.question}
                    </span>
                    <span className="text-forest-medium flex-shrink-0">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-5 text-gray-500 text-xs md:text-sm leading-relaxed border-t border-gray-50 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </section>

      </div>
    </div>
  );
}
