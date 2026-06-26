import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const DB_FILE = path.join(process.cwd(), "storage", "db.json");

interface DBData {
  products: any[];
  projects: any[];
  testimonials: any[];
}

const DEFAULT_DB: DBData = {
  products: [
    {
      id: "g1",
      name: "Gorden Blackout Premium Velvet",
      category: "gorden",
      description: "Gorden blackout super premium berbahan heavy velvet lembut yang memblokir sinar matahari hingga 100%. Sempurna untuk menjaga privasi, meredam suara luar, serta menambah kemewahan ruangan utama Anda.",
      image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=600",
      pricePerMeter: 180000,
      features: ["100% Blokir Cahaya Matahari", "Tekstur Velvet Halus", "Membantu Meredam Kebisingan"],
      specs: {
        bahan: "Polyester Velvet Heavyweight",
        lebar: "140 cm / Custom",
        blockout: "100% Blackout"
      }
    },
    {
      id: "v1",
      name: "Vitrase Putih Polos Organza Luxe",
      category: "vitrase",
      description: "Lapis dalam gorden (vitrase) premium berwarna putih bersih dari bahan sutra organza sintetis tebal namun transparan elegan. Memberikan pencahayaan alami yang lembut tanpa menyilaukan mata.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600",
      pricePerMeter: 85000,
      features: ["Efek Transparan Elegan", "Bahan Organza Premium Berkilau", "Serat Padat Kuat"],
      specs: {
        bahan: "Organza Silk Blend",
        lebar: "280 cm",
        blockout: "Semi-transparent"
      }
    },
    {
      id: "r1",
      name: "Roller Blind Sunscreen UV Filter",
      category: "roller_blind",
      description: "Roller blind fungsional dengan keunggulan mereduksi panas ruangan akibat sinar UV matahari tanpa menutup pandangan sama sekali. Sangat digemari untuk area ruang kerja, perkantoran, maupun dapur modern.",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600",
      pricePerMeter: 145000,
      features: ["Menolak Panas UV Efektif", "Konsep Minimalis Praktis", "Mekanisme Tarik Halus"],
      specs: {
        bahan: "Fiberglass & PVC Sunscreen",
        lebar: "Custom Sesuai Ukuran Jendela",
        blockout: "Translucent"
      }
    },
    {
      id: "w1",
      name: "Wallpaper Dinding Floral Classic",
      category: "wallpaper",
      description: "Wallpaper dinding eksklusif bermotif bunga emboss khas Eropa klasik. Berbahan Vinyl berkualitas tinggi yang tahan lembab dan mudah dibersihkan.",
      image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80&w=600",
      pricePerMeter: 75000,
      features: ["Motif Timbul Mewah", "Lapisan Vinyl Tebal", "Anti Lembab & Awet"],
      specs: {
        bahan: "Premium Vinyl Cover",
        lebar: "53 cm x 10 m",
        blockout: "N/A"
      }
    },
    {
      id: "k1",
      name: "Kitchen Set HPL Minimalis Modern",
      category: "kitchen_set",
      description: "Kitchen set kustom berstruktur plywood lapis HPL antikarat dan anti rayap. Dilengkapi laci berengsel soft-close senyap otomatis dan layout yang memaksimalkan efisiensi penyimpanan.",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600",
      pricePerMeter: 1850000,
      features: ["Desain Custom Ergonomis", "HPL Pelapis Kuat", "Engsel Soft-Close Senyap"],
      specs: {
        bahan: "Plywood & HPL Finish",
        lebar: "Kustom Sesuai Dapur",
        blockout: "N/A"
      }
    }
  ],
  projects: [
    {
      id: "proj1",
      title: "Master Bedroom Villa Kusuma Pinus",
      category: "villa",
      location: "Batu, Jawa Timur",
      image: "/assets/images/curtains_minimal_interior_1782007633904.jpg",
      year: "2026",
      description: "Instalasi gorden blackout double-rail model lipat cubicle dengan vitrase organza. Menghadirkan kenyamanan istirahat maksimal dengan kontrol cahaya matahari 100% blackout."
    },
    {
      id: "proj2",
      title: "Living Room Residence Ijen",
      category: "residensial",
      location: "Malang, Jawa Timur",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600",
      year: "2026",
      description: "Pengerjaan gorden minimalis bermodel ring eyelet berbahan semi-blackout linen warna abu-abu hangat, disesuaikan dengan arsitektur rumah modern minimalis industrial."
    },
    {
      id: "proj3",
      title: "Lobby Area Boutique Hotel Batu",
      category: "komersial",
      location: "Batu, Jawa Timur",
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600",
      year: "2025",
      description: "Pemasangan gorden ceiling mount setinggi 5 meter berbahan Jacquard Royal damask motif timbul bernuansa emas tembaga untuk menambah estetika mewah, formal dan anggun di lobi utama."
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "Bu Shinta Rosalia",
      role: "Pemilik Villa – Kusuma Pinus",
      rating: 5,
      comment: "Sangat puas dengan hasil pengerjaan Gorden Yulie! Bahannya sangat tebal, pengerjaan jahitannya rapi sekali, dan timnya luar biasa sopan saat instalasi ke Batu. Rekomendasi bintang 5!",
      date: "10 Mei 2026",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120",
      image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "t2",
      name: "Pak Rudy Hermawan",
      role: "Pribadi – Perumahan Ijen, Malang",
      rating: 5,
      comment: "Order gorden minimalis semi-blackout lari 12 meter untuk lantai dua rumah. Selesai tepat waktu. Harga jujur sesuai kalkulator estimasi dan diukur real gratis ke rumah. Sangat profesional.",
      date: "28 April 2026",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "t3",
      name: "Bu Dian Sasmita",
      role: "Manager Operasional – Boutique Hotel",
      rating: 5,
      comment: "Sudah langganan lebih dari 5 tahun dengan Gorden Yulie Batu untuk kebutuhan gorden hotel kami. Jahitan presisi, sangat fungsional memblokir cahaya, dan tidak gampang lusuh saat dicuci.",
      date: "15 Maret 2026",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600"
    }
  ]
};

function readDb(): DBData {
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DB, null, 2), "utf8");
      return DEFAULT_DB;
    }
    const content = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(content);
  } catch (e) {
    console.error("Error reading database file, returning defaults:", e);
    return DEFAULT_DB;
  }
}

function writeDb(data: DBData) {
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (e) {
    console.error("Error writing database file:", e);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body Parser Middleware
  app.use(express.json());

  // 1. API: LOGIN
  app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    if (email === "admin@yuliegordenbatu.com" && password === "password") {
      return res.json({
        success: true,
        message: "Login successful",
        user: { name: "Yulie Gorden Admin", email: "admin@yuliegordenbatu.com" }
      });
    }
    return res.status(401).json({
      success: false,
      message: "Email atau Password Admin salah!"
    });
  });

  // 2. API: PRODUCTS
  app.get("/api/products", (req, res) => {
    const db = readDb();
    res.json(db.products);
  });

  app.post("/api/products", (req, res) => {
    const db = readDb();
    const newProduct = req.body;
    if (!newProduct.id) {
      newProduct.id = "prod_" + Date.now();
    }
    db.products.push(newProduct);
    writeDb(db);
    res.status(201).json({ success: true, product: newProduct });
  });

  app.put("/api/products/:id", (req, res) => {
    const db = readDb();
    const { id } = req.params;
    const index = db.products.findIndex(p => p.id === id);
    if (index !== -1) {
      db.products[index] = { ...db.products[index], ...req.body, id }; // keep original id
      writeDb(db);
      return res.json({ success: true, product: db.products[index] });
    }
    res.status(404).json({ success: false, message: "Produk tidak ditemukan" });
  });

  app.delete("/api/products/:id", (req, res) => {
    const db = readDb();
    const { id } = req.params;
    const filtered = db.products.filter(p => p.id !== id);
    if (filtered.length !== db.products.length) {
      db.products = filtered;
      writeDb(db);
      return res.json({ success: true, message: "Produk berhasil dihapus" });
    }
    res.status(404).json({ success: false, message: "Produk tidak ditemukan" });
  });

  // 3. API: PROJECTS
  app.get("/api/projects", (req, res) => {
    const db = readDb();
    res.json(db.projects);
  });

  app.post("/api/projects", (req, res) => {
    const db = readDb();
    const newProject = req.body;
    if (!newProject.id) {
      newProject.id = "proj_" + Date.now();
    }
    db.projects.push(newProject);
    writeDb(db);
    res.status(201).json({ success: true, project: newProject });
  });

  app.put("/api/projects/:id", (req, res) => {
    const db = readDb();
    const { id } = req.params;
    const index = db.projects.findIndex(p => p.id === id);
    if (index !== -1) {
      db.projects[index] = { ...db.projects[index], ...req.body, id };
      writeDb(db);
      return res.json({ success: true, project: db.projects[index] });
    }
    res.status(404).json({ success: false, message: "Proyek tidak ditemukan" });
  });

  app.delete("/api/projects/:id", (req, res) => {
    const db = readDb();
    const { id } = req.params;
    const filtered = db.projects.filter(p => p.id !== id);
    if (filtered.length !== db.projects.length) {
      db.projects = filtered;
      writeDb(db);
      return res.json({ success: true, message: "Proyek berhasil dihapus" });
    }
    res.status(404).json({ success: false, message: "Proyek tidak ditemukan" });
  });

  // 4. API: TESTIMONIALS
  app.get("/api/testimonials", (req, res) => {
    const db = readDb();
    res.json(db.testimonials);
  });

  app.post("/api/testimonials", (req, res) => {
    const db = readDb();
    const newTestimonial = req.body;
    if (!newTestimonial.id) {
      newTestimonial.id = "test_" + Date.now();
    }
    if (!newTestimonial.date) {
      const today = new Date();
      const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
      newTestimonial.date = today.toLocaleDateString('id-ID', options);
    }
    db.testimonials.push(newTestimonial);
    writeDb(db);
    res.status(201).json({ success: true, testimonial: newTestimonial });
  });

  app.put("/api/testimonials/:id", (req, res) => {
    const db = readDb();
    const { id } = req.params;
    const index = db.testimonials.findIndex(t => t.id === id);
    if (index !== -1) {
      db.testimonials[index] = { ...db.testimonials[index], ...req.body, id };
      writeDb(db);
      return res.json({ success: true, testimonial: db.testimonials[index] });
    }
    res.status(404).json({ success: false, message: "Testimoni tidak ditemukan" });
  });

  app.delete("/api/testimonials/:id", (req, res) => {
    const db = readDb();
    const { id } = req.params;
    const filtered = db.testimonials.filter(t => t.id !== id);
    if (filtered.length !== db.testimonials.length) {
      db.testimonials = filtered;
      writeDb(db);
      return res.json({ success: true, message: "Testimoni berhasil dihapus" });
    }
    res.status(404).json({ success: false, message: "Testimoni tidak ditemukan" });
  });


  // Serve static files in public directory (like laravel public files)
  app.use(express.static(path.join(process.cwd(), 'public')));

  if (process.env.NODE_ENV !== "production") {
    // In development (AI Studio Sandbox), run Vite in middleware mode
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
        hmr: false // Disable HMR to save CPU and prevent flickering during agent edits
      },
      appType: "custom",
    });

    app.use(vite.middlewares);

    // Deliver the SPA index dynamically
    app.get('*', async (req, res, next) => {
      try {
        const title = "Remix: Gorden Yulie Batu";
        const html = `<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <!-- Inject Vite Client and React entry point directly -->
    <script type="module" src="/@vite/client"></script>
    <script type="module" src="/resources/js/main.tsx"></script>
  </head>
  <body class="bg-gray-50 text-gray-800 antialiased">
    <div id="root"></div>
  </body>
</html>`;
        const transformedHtml = await vite.transformIndexHtml(req.originalUrl, html);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(transformedHtml);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });

  } else {
    // Serve production static assets if someone runs npm run build
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[AI Studio Sandbox] Server running on http://localhost:${PORT}`);
  });
}

startServer();
