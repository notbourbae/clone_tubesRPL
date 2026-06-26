import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  getStoredProducts, 
  saveStoredProduct, 
  deleteStoredProduct, 
  getStoredProjects, 
  saveStoredProject, 
  deleteStoredProject 
} from '../utils/storage';
import { Product, Project } from '../types';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  FolderHeart, 
  MessageSquare,
  LogOut, 
  Plus, 
  Edit3, 
  Trash2, 
  X, 
  Check, 
  Eye, 
  Lock, 
  Mail, 
  Search, 
  ExternalLink,
  Camera,
  Upload
} from 'lucide-react';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('yulie_admin_logged') === 'true';
  });
  
  // Login form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Loaded data state
  const [products, setProducts] = useState<Product[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  
  // Dashboard navigation tab: 'products' | 'projects' | 'testimonials'
  const [activeSubTab, setActiveSubTab] = useState<'products' | 'projects' | 'testimonials'>('products');
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Modal / Form state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<any | null>(null);

  // Form input states (Product)
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('gorden');
  const [prodPrice, setProdPrice] = useState(100000);
  const [prodDesc, setProdDesc] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [prodFeatures, setProdFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState('');
  const [prodBahan, setProdBahan] = useState('');
  const [prodLebar, setProdLebar] = useState('');
  const [prodBlockout, setProdBlockout] = useState('');

  // Form input states (Project)
  const [projTitle, setProjTitle] = useState('');
  const [projCategory, setProjCategory] = useState('residensial');
  const [projLocation, setProjLocation] = useState('');
  const [projYear, setProjYear] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projImage, setProjImage] = useState('');

  // Form input states (Testimonial)
  const [testName, setTestName] = useState('');
  const [testRole, setTestRole] = useState('');
  const [testRating, setTestRating] = useState(5);
  const [testComment, setTestComment] = useState('');
  const [testDate, setTestDate] = useState('');
  const [testAvatar, setTestAvatar] = useState('');
  const [testImage, setTestImage] = useState('');
  const [testAvatarDragActive, setTestAvatarDragActive] = useState(false);
  const [testImageDragActive, setTestImageDragActive] = useState(false);

  // Notifications
  const [notification, setNotification] = useState<string | null>(null);

  const fetchAllData = () => {
    fetch('/api/products', {
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
          localStorage.setItem('yulie_products', JSON.stringify(data));
        }
      })
      .catch(err => console.error('Gagal mengambil data produk SQL:', err));

    fetch('/api/projects', {
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProjects(data);
          localStorage.setItem('yulie_projects', JSON.stringify(data));
        }
      })
      .catch(err => console.error('Gagal mengambil data portofolio SQL:', err));

    fetch('/api/testimonials', {
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTestimonials(data);
          localStorage.setItem('gorden_yulie_reviews', JSON.stringify(data));
        }
      })
      .catch(err => console.error('Gagal mengambil data testimoni SQL:', err));
  };

  useEffect(() => {
    if (isLoggedIn) {
      setProducts(getStoredProducts());
      setProjects(getStoredProjects());
      try {
        const localRev = localStorage.getItem('gorden_yulie_reviews');
        if (localRev) {
          setTestimonials(JSON.parse(localRev));
        }
      } catch (e) {}
      fetchAllData();
    }
  }, [isLoggedIn]);

  const triggerNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        if (res.ok) return res.json();
        return res.json().then(errData => {
          throw new Error(errData.message || 'Email atau Sandi salah.');
        });
      })
      .then(data => {
        if (data.success) {
          localStorage.setItem('yulie_admin_logged', 'true');
          setIsLoggedIn(true);
          setLoginError('');
          triggerNotification('Selamat datang kembali, Admin!');
        } else {
          setLoginError(data.message || 'Email atau Sandi salah.');
        }
      })
      .catch(err => {
        console.error('Gagal login:', err);
        setLoginError(err.message || 'Email atau Sandi salah. Gunakan email default.');
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('yulie_admin_logged');
    setIsLoggedIn(false);
  };

  // PRODUCT OPERATIONS
  const openAddProductModal = () => {
    setSelectedProduct(null);
    setProdName('');
    setProdCategory('gorden');
    setProdPrice(150000);
    setProdDesc('');
    setProdImage('https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=600');
    setProdFeatures(['Polyester Premium', 'Peredam Panas']);
    setProdBahan('Polyester High Quality');
    setProdLebar('280 cm');
    setProdBlockout('90%');
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setSelectedProduct(product);
    setProdName(product.name);
    setProdCategory(product.category);
    setProdPrice(product.pricePerMeter);
    setProdDesc(product.description || '');
    setProdImage(product.image);
    setProdFeatures(product.features || []);
    setProdBahan(product.specs?.bahan || '');
    setProdLebar(product.specs?.lebar || '');
    setProdBlockout(product.specs?.blockout || '');
    setIsProductModalOpen(true);
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setProdFeatures([...prodFeatures, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (idx: number) => {
    setProdFeatures(prodFeatures.filter((_, i) => i !== idx));
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) return;

    const newProductId = selectedProduct?.id || 'prod_' + Date.now();
    const newProduct: Product = {
      id: newProductId,
      name: prodName,
      category: prodCategory,
      description: prodDesc,
      image: prodImage || 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=600',
      pricePerMeter: prodPrice,
      features: prodFeatures,
      specs: {
        bahan: prodBahan,
        lebar: prodLebar,
        blockout: prodBlockout
      }
    };

    const isEdit = !!selectedProduct;
    const url = isEdit ? `/api/products/${newProductId}` : '/api/products';
    const method = isEdit ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(newProduct)
    })
      .then(res => {
        if (!res.ok) throw new Error('Gagal menyimpan ke database SQL');
        return res.json();
      })
      .then(() => {
        const updated = saveStoredProduct(newProduct);
        setProducts(updated);
        setIsProductModalOpen(false);
        triggerNotification(isEdit ? 'Produk berhasil diperbarui di SQL-DB!' : 'Produk baru ditambahkan ke SQL-DB!');
        fetchAllData();
      })
      .catch(err => {
        console.error('Error saving product to SQL:', err);
        const updated = saveStoredProduct(newProduct);
        setProducts(updated);
        setIsProductModalOpen(false);
        triggerNotification(isEdit ? 'Produk diperbarui (lokal).' : 'Produk baru ditambahkan (lokal).');
      });
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini dari katalog?')) {
      fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        }
      })
        .then(res => {
          if (!res.ok) throw new Error('Gagal menghapus produk dari SQL-DB');
          return res.json();
        })
        .then(() => {
          const updated = deleteStoredProduct(id);
          setProducts(updated);
          triggerNotification('Produk berhasil dihapus dari SQL-DB!');
          fetchAllData();
        })
        .catch(err => {
          console.error(err);
          const updated = deleteStoredProduct(id);
          setProducts(updated);
          triggerNotification('Produk dihapus (lokal cache).');
        });
    }
  };

  // PROJECT OPERATIONS
  const openAddProjectModal = () => {
    setSelectedProject(null);
    setProjTitle('');
    setProjCategory('residensial');
    setProjLocation('');
    setProjYear(new Date().getFullYear().toString());
    setProjDesc('');
    setProjImage('https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=600');
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (proj: Project) => {
    setSelectedProject(proj);
    setProjTitle(proj.title);
    setProjCategory(proj.category);
    setProjLocation(proj.location);
    setProjYear(proj.year);
    setProjDesc(proj.description || '');
    setProjImage(proj.image);
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim()) return;

    const newProjectId = selectedProject?.id || 'proj_' + Date.now();
    const newProject: Project = {
      id: newProjectId,
      title: projTitle,
      category: projCategory,
      location: projLocation,
      year: projYear,
      description: projDesc,
      image: projImage || 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=600'
    };

    const isEdit = !!selectedProject;
    const url = isEdit ? `/api/projects/${newProjectId}` : '/api/projects';
    const method = isEdit ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(newProject)
    })
      .then(res => {
        if (!res.ok) throw new Error('Gagal menyimpan proyek ke database SQL');
        return res.json();
      })
      .then(() => {
        const updated = saveStoredProject(newProject);
        setProjects(updated);
        setIsProjectModalOpen(false);
        triggerNotification(isEdit ? 'Proyek diperbarui di SQL-DB!' : 'Proyek baru disimpan ke SQL-DB!');
        fetchAllData();
      })
      .catch(err => {
        console.error('Error saving project to SQL:', err);
        const updated = saveStoredProject(newProject);
        setProjects(updated);
        setIsProjectModalOpen(false);
        triggerNotification(isEdit ? 'Proyek diperbarui (lokal).' : 'Proyek baru ditambahkan (lokal).');
      });
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus proyek ini dari portofolio?')) {
      fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        }
      })
        .then(res => {
          if (!res.ok) throw new Error('Gagal menghapus proyek dari SQL-DB');
          return res.json();
        })
        .then(() => {
          const updated = deleteStoredProject(id);
          setProjects(updated);
          triggerNotification('Proyek portofolio berhasil dihapus dari SQL-DB!');
          fetchAllData();
        })
        .catch(err => {
          console.error(err);
          const updated = deleteStoredProject(id);
          setProjects(updated);
          triggerNotification('Proyek dihapus (lokal cache).');
        });
    }
  };

  // TESTIMONIAL OPERATIONS
  const handleTestFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'image') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          if (type === 'avatar') {
            setTestAvatar(reader.result);
          } else {
            setTestImage(reader.result);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTestDrag = (e: React.DragEvent, type: 'avatar' | 'image', active: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    if (type === 'avatar') {
      setTestAvatarDragActive(active);
    } else {
      setTestImageDragActive(active);
    }
  };

  const handleTestDrop = (e: React.DragEvent, type: 'avatar' | 'image') => {
    e.preventDefault();
    e.stopPropagation();
    if (type === 'avatar') {
      setTestAvatarDragActive(false);
    } else {
      setTestImageDragActive(false);
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
            setTestAvatar(reader.result);
          } else {
            setTestImage(reader.result);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddTestimonialModal = () => {
    setSelectedTestimonial(null);
    setTestName('');
    setTestRole('');
    setTestRating(5);
    setTestComment('');
    setTestAvatar('');
    setTestImage('');
    setTestDate(new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }));
    setIsTestimonialModalOpen(true);
  };

  const openEditTestimonialModal = (testi: any) => {
    setSelectedTestimonial(testi);
    setTestName(testi.name);
    setTestRole(testi.role || '');
    setTestRating(testi.rating || 5);
    setTestComment(testi.comment || '');
    setTestAvatar(testi.avatar || '');
    setTestImage(testi.image || '');
    setTestDate(testi.date || '');
    setIsTestimonialModalOpen(true);
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testName.trim() || !testComment.trim()) return;

    const testId = selectedTestimonial?.id || 'test_' + Date.now();
    const newTestimonial = {
      id: testId,
      name: testName,
      role: testRole || 'Pelanggan Setia Gorden Yulie',
      rating: testRating,
      comment: testComment,
      avatar: testAvatar || undefined,
      image: testImage || undefined,
      date: testDate || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    const isEdit = !!selectedTestimonial;
    const url = isEdit ? `/api/testimonials/${testId}` : '/api/testimonials';
    const method = isEdit ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(newTestimonial)
    })
      .then(res => {
        if (!res.ok) throw new Error('Gagal menyimpan testimoni');
        return res.json();
      })
      .then(() => {
        setIsTestimonialModalOpen(false);
        triggerNotification(isEdit ? 'Testimoni berhasil diperbarui!' : 'Testimoni baru ditambahkan!');
        fetchAllData();
      })
      .catch(err => {
        console.error('Error saving testimonial:', err);
        const updated = isEdit 
          ? testimonials.map(t => t.id === testId ? newTestimonial : t)
          : [newTestimonial, ...testimonials];
        setTestimonials(updated);
        localStorage.setItem('gorden_yulie_reviews', JSON.stringify(updated));
        setIsTestimonialModalOpen(false);
        triggerNotification(isEdit ? 'Testimoni diperbarui (lokal).' : 'Testimoni ditambahkan (lokal).');
      });
  };

  const handleDeleteTestimonial = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus testimoni ini?')) {
      fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        }
      })
        .then(res => {
          if (!res.ok) throw new Error('Gagal menghapus testimoni');
          return res.json();
        })
        .then(() => {
          triggerNotification('Testimoni berhasil dihapus!');
          fetchAllData();
        })
        .catch(err => {
          console.error(err);
          const updated = testimonials.filter(t => t.id !== id);
          setTestimonials(updated);
          localStorage.setItem('gorden_yulie_reviews', JSON.stringify(updated));
          triggerNotification('Testimoni dihapus (lokal cache).');
        });
    }
  };

  // Filter lists based on UI Search & Category select
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.location && p.location.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredTestimonials = testimonials.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (t.comment && t.comment.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (t.role && t.role.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  // Login View Renderer
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Accent Deco */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-y-12 -translate-x-12" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl translate-y-12 translate-x-12" />

        <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <div className="flex justify-center items-center gap-1.5 mb-2">
            <span className="text-xl font-bold tracking-widest text-amber-500 uppercase">YULIE</span>
            <div className="h-5 w-[1.5px] bg-amber-500/30" />
            <span className="text-sm font-medium tracking-widest text-gray-400 uppercase">Dashboard Admin</span>
          </div>
          <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
            Masuk Panel Kelola
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Kelola data katalog dan portofolio Gorden Yulie Batu
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
          <div className="bg-slate-800/80 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-2xl border border-slate-700/60 sm:px-10">
            {loginError && (
              <div className="mb-4 p-3.5 bg-red-900/30 border border-red-500/30 rounded-xl text-red-400 text-xs font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                {loginError}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-xs font-bold text-gray-300 tracking-wider uppercase mb-2">
                  Alamat Email Admin
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@yuliegordenbatu.com"
                    className="block w-full pl-10 pr-3 py-3 bg-slate-900/50 border border-slate-705/40 text-gray-100 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 tracking-wider uppercase mb-2">
                  Kata Sandi
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="h-4.5 w-4.5" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-3 py-3 bg-slate-900/50 border border-slate-705/40 text-gray-100 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-sm transition-all"
                  />
                </div>
              </div>

              <div className="bg-amber-500/5 rounded-xl border border-amber-500/10 p-3 text-amber-500/95 text-xs font-medium space-y-1">
                <p className="font-bold uppercase tracking-wider text-[10px]">Petunjuk Login:</p>
                <p>Email: <span className="font-mono bg-amber-500/10 px-1 rounded">admin@yuliegordenbatu.com</span></p>
                <p>Sandi: <span className="font-mono bg-amber-500/10 px-1 rounded">password</span></p>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-slate-900 bg-amber-500 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all font-sans transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Masuk ke Panel Admin
                </button>
              </div>
            </form>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => window.location.href = '/'}
                className="text-xs text-gray-400 hover:text-amber-505 transition-colors flex items-center gap-1 cursor-pointer font-medium"
              >
                Kembali ke Situs Utama <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard Render (Logged In)
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-amber-500 text-slate-950 font-semibold px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-2 border border-amber-400"
          >
            <Check className="w-4 h-4" />
            <span className="text-sm tracking-wide">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Navy Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
          
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-amber-505/10 rounded-xl border border-amber-500/20 text-amber-500">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-widest text-amber-500 uppercase">YULIE</span>
                <span className="text-xs bg-slate-800 border border-slate-700/80 text-gray-400 font-mono px-1.5 py-0.5 rounded">
                  Admin Panel
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium font-sans uppercase tracking-wider">
                Pengelolaan Katalog & Portofolio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.open('/', '_blank')}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-750 text-gray-300 font-semibold px-3.5 py-2 rounded-xl border border-slate-700 transition-colors cursor-pointer"
            >
              Lihat Website <Eye className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs bg-red-950/40 hover:bg-red-900/35 text-red-400 font-semibold px-4 py-2 rounded-xl border border-red-900/40 transition-all cursor-pointer"
            >
              Keluar <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin UI Core */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* STATS HIGHLIGHTS */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                Katalog Produk
              </p>
              <h3 className="text-3xl font-black text-white">{products.length} Items</h3>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/10">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                Proyek Portofolio
              </p>
              <h3 className="text-3xl font-black text-white">{projects.length} Proyek</h3>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/10">
              <FolderHeart className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                Database Testimoni
              </p>
              <h3 className="text-3xl font-black text-white">{testimonials.length} Ulasan</h3>
            </div>
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500 border border-amber-500/10">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>
        </section>

        {/* CONTROLS BAR: SEARCH, TABS, AND ACTIONS */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-8 flex flex-col xl:flex-row gap-4 justify-between items-center">
          
          {/* Sub-Tabs Selector */}
          <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 w-full xl:w-auto">
            <button
              onClick={() => { setActiveSubTab('products'); setSearchQuery(''); }}
              className={`flex-1 xl:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                activeSubTab === 'products'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" /> Katalog
            </button>
            <button
              onClick={() => { setActiveSubTab('projects'); setSearchQuery(''); }}
              className={`flex-1 xl:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                activeSubTab === 'projects'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FolderHeart className="w-4 h-4" /> Portofolio
            </button>
            <button
              onClick={() => { setActiveSubTab('testimonials'); setSearchQuery(''); }}
              className={`flex-1 xl:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                activeSubTab === 'testimonials'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Testimoni
            </button>
          </div>

          {/* Search, Filter, Add Action */}
          <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto items-stretch sm:items-center">
            
            {/* Search Input */}
            <div className="relative flex-1 sm:w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder={activeSubTab === 'products' ? "Cari produk..." : activeSubTab === 'projects' ? "Cari proyek..." : "Cari ulasan..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-955 border border-slate-800 pl-9 pr-3 py-2.5 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-gray-100"
              />
            </div>

            {/* Category Filter */}
            {activeSubTab === 'products' ? (
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-slate-955 border border-slate-800 text-xs rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-gray-300"
              >
                <option value="all">Semua Kategori</option>
                <option value="gorden">Gorden</option>
                <option value="vitrase">Vitrase</option>
                <option value="roller_blind">Roller Blind</option>
                <option value="wallpaper">Wallpaper</option>
                <option value="kitchen_set">Kitchen Set</option>
              </select>
            ) : activeSubTab === 'projects' ? (
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-slate-955 border border-slate-800 text-xs rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-gray-300"
              >
                <option value="all">Semua Proyek</option>
                <option value="villa">Villa</option>
                <option value="residensial">Residensial</option>
                <option value="komersial">Komersial</option>
              </select>
            ) : null}

            {/* Add Button */}
            <button
              onClick={activeSubTab === 'products' ? openAddProductModal : activeSubTab === 'projects' ? openAddProjectModal : openAddTestimonialModal}
              className="flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold tracking-wider uppercase px-5 py-3 rounded-xl transition-all font-sans transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 bg-slate-950 text-amber-500 rounded-full p-0.5" /> Tambah Baru
            </button>
          </div>
        </div>

        {/* CORE DATA TABLES */}
        <section className="bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden shadow-xl">
          
          {activeSubTab === 'products' ? (
            /* PRODUCTS LISTING TABLE */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/70 border-b border-slate-800 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                    <th className="py-4.5 px-6">Gambar & Nama Produk</th>
                    <th className="py-4.5 px-6">Kategori</th>
                    <th className="py-4.5 px-6">Harga/Meter</th>
                    <th className="py-4.5 px-6">Spesifikasi Utama</th>
                    <th className="py-4.5 px-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-500 text-sm italic">
                        Tidak ada katalog produk yang cocok dengan pencarian Anda.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-850/30 transition-colors text-sm text-gray-200">
                        <td className="py-4 px-6 flex items-center gap-4">
                          <img 
                            src={p.image} 
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 object-cover rounded-xl border border-slate-800 shadow"
                          />
                          <div>
                            <p className="font-bold text-white text-base tracking-tight leading-snug">{p.name}</p>
                            <p className="text-gray-400 text-xs mt-0.5 max-w-sm truncate">{p.description || '-'}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-xs font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-slate-800 text-gray-300 border border-slate-700/60">
                            {p.category.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-mono font-bold text-amber-500">
                          IDR {p.pricePerMeter.toLocaleString('id-ID')}
                        </td>
                        <td className="py-4 px-6 text-xs text-gray-300 space-y-0.5 max-w-xs">
                          {p.specs?.bahan && <p><span className="text-gray-500 font-medium">Bahan:</span> {p.specs.bahan}</p>}
                          {p.specs?.lebar && <p><span className="text-gray-500 font-medium">Lebar:</span> {p.specs.lebar}</p>}
                          {p.specs?.blockout && <p><span className="text-gray-500 font-medium">Blockout:</span> {p.specs.blockout}</p>}
                        </td>
                        <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => openEditProductModal(p)}
                            className="inline-flex p-2 bg-slate-800 hover:bg-slate-750 text-blue-400 rounded-xl border border-slate-700 transition-colors cursor-pointer"
                            title="Edit Produk"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="inline-flex p-2 bg-slate-800 hover:bg-red-955/30 text-red-400 rounded-xl border border-slate-700 hover:border-red-900/50 transition-colors cursor-pointer"
                            title="Hapus Produk"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : activeSubTab === 'projects' ? (
            /* PROJECTS LISTING TABLE */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/70 border-b border-slate-800 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                    <th className="py-4.5 px-6">Gambar & Judul Proyek</th>
                    <th className="py-4.5 px-6">Kategori</th>
                    <th className="py-4.5 px-6">Lokasi</th>
                    <th className="py-4.5 px-6">Tahun</th>
                    <th className="py-4.5 px-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProjects.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-500 text-sm italic">
                        Tidak ada daftar proyek portofolio yang cocok dengan pencarian Anda.
                      </td>
                    </tr>
                  ) : (
                    filteredProjects.map((proj) => (
                      <tr key={proj.id} className="hover:bg-slate-850/30 transition-colors text-sm text-gray-200">
                        <td className="py-4 px-6 flex items-center gap-4">
                          <img 
                            src={proj.image} 
                            alt={proj.title}
                            referrerPolicy="no-referrer"
                            className="w-14 h-10 object-cover rounded-xl border border-slate-800 shadow shadow-amber-500/5"
                          />
                          <div>
                            <p className="font-bold text-white text-base tracking-tight leading-snug">{proj.title}</p>
                            <p className="text-gray-400 text-xs mt-0.5 max-w-sm truncate">{proj.description || '-'}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-xs font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-slate-800 text-gray-300 border border-slate-700/60">
                            {proj.category}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-300 font-medium">
                          {proj.location}
                        </td>
                        <td className="py-4 px-6 font-mono text-gray-400">
                          {proj.year}
                        </td>
                        <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => openEditProjectModal(proj)}
                            className="inline-flex p-2 bg-slate-800 hover:bg-slate-750 text-blue-400 rounded-xl border border-slate-700 transition-colors cursor-pointer"
                            title="Edit Proyek"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="inline-flex p-2 bg-slate-800 hover:bg-red-955/30 text-red-400 rounded-xl border border-slate-700 hover:border-red-900/50 transition-colors cursor-pointer"
                            title="Hapus Proyek"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            /* TESTIMONIALS LISTING TABLE */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/70 border-b border-slate-800 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                    <th className="py-4.5 px-6">Nama & Peranan Pelanggan</th>
                    <th className="py-4.5 px-6">Rating</th>
                    <th className="py-4.5 px-6">Ulasan/Komentar</th>
                    <th className="py-4.5 px-6">Tanggal</th>
                    <th className="py-4.5 px-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredTestimonials.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-500 text-sm italic">
                        Tidak ada daftar rujukan testimoni yang cocok dengan kriteria pencarian Anda.
                      </td>
                    </tr>
                  ) : (
                    filteredTestimonials.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-850/30 transition-colors text-sm text-gray-200">
                        <td className="py-4 px-6">
                          <p className="font-bold text-white text-base tracking-tight leading-snug">{t.name}</p>
                          <p className="text-gray-400 text-xs mt-0.5">{t.role || 'Pelanggan Setia'}</p>
                        </td>
                        <td className="py-4 px-6 text-yellow-400 font-bold flex items-center gap-1">
                          {'★'.repeat(t.rating || 5)}{'☆'.repeat(5 - (t.rating || 5))} <span className="text-gray-400 font-mono text-xs ml-1">({t.rating || 5}/5)</span>
                        </td>
                        <td className="py-4 px-6 text-gray-350 max-w-md break-words italic">
                          "{t.comment}"
                        </td>
                        <td className="py-4 px-6 text-gray-400 font-mono text-xs">
                          {t.date}
                        </td>
                        <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => openEditTestimonialModal(t)}
                            className="inline-flex p-2 bg-slate-800 hover:bg-slate-750 text-blue-400 rounded-xl border border-slate-700 transition-colors cursor-pointer"
                            title="Edit Testimoni"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTestimonial(t.id)}
                            className="inline-flex p-2 bg-slate-800 hover:bg-red-955/30 text-red-400 rounded-xl border border-slate-700 hover:border-red-900/50 transition-colors cursor-pointer"
                            title="Hapus Testimoni"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* --- ADD/EDIT PRODUCT MODAL DIALOG --- */}
      <AnimatePresence>
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProductModalOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl relative w-full max-w-2xl px-6 py-6 overflow-hidden z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-500/10 text-amber-500 rounded-lg">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedProduct ? 'Ubah Katalog Produk' : 'Tambah Katalog Produk Baru'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="p-1.5 hover:bg-slate-800 text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Nama Produk *
                    </label>
                    <input
                      type="text"
                      required
                      value={prodName}
                      onChange={(e) => setProdName(e.target.value)}
                      placeholder="Contoh: Gorden Abu Velvet Premium"
                      className="w-full bg-slate-950 border border-slate-800 px-3 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Kategori Katalog *
                    </label>
                    <select
                      value={prodCategory}
                      onChange={(e) => setProdCategory(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 px-3 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-gray-300"
                    >
                      <option value="gorden">Gorden</option>
                      <option value="vitrase">Vitrase</option>
                      <option value="roller_blind">Roller Blind</option>
                      <option value="wallpaper">Wallpaper</option>
                      <option value="kitchen_set">Kitchen Set</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Harga Per Meter (IDR) *
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={prodPrice}
                      onChange={(e) => setProdPrice(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 px-3 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-gray-100 font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Tautan Gambar (Unsplash URL) *
                    </label>
                    <input
                      type="text"
                      required
                      value={prodImage}
                      onChange={(e) => setProdImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-slate-950 border border-slate-800 px-3 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-gray-100 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Deskripsi Ringkas Produk
                  </label>
                  <textarea
                    rows={3}
                    value={prodDesc}
                    onChange={(e) => setProdDesc(e.target.value)}
                    placeholder="Tuliskan detail mengenai estetika dan keunggulan gorden ini..."
                    className="w-full bg-slate-950 border border-slate-800 px-3 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-gray-100 resize-none"
                  />
                </div>

                {/* Technical Specs Custom Inputs */}
                <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-4">
                  <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest border-b border-slate-800 pb-2">
                    Spesifikasi Teknis Produk
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Bahan Kain
                      </label>
                      <input
                        type="text"
                        value={prodBahan}
                        onChange={(e) => setProdBahan(e.target.value)}
                        placeholder="Premium Velvet / Polyester"
                        className="w-full bg-slate-900 border border-slate-800 px-2.5 py-2 text-xs rounded-lg focus:outline-none focus:text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        lebar Gulungan
                      </label>
                      <input
                        type="text"
                        value={prodLebar}
                        onChange={(e) => setProdLebar(e.target.value)}
                        placeholder="280 cm / Kustom"
                        className="w-full bg-slate-900 border border-slate-800 px-2.5 py-2 text-xs rounded-lg focus:outline-none focus:text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Blockout Rate
                      </label>
                      <input
                        type="text"
                        value={prodBlockout}
                        onChange={(e) => setProdBlockout(e.target.value)}
                        placeholder="100% / Semi-transparan"
                        className="w-full bg-slate-900 border border-slate-800 px-2.5 py-2 text-xs rounded-lg focus:outline-none focus:text-slate-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Features (Kelebihan) Management */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Kelebihan Produk (List Fitur)
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      placeholder="Masukkan kelebihan (misal: Serat Anti-Debu)"
                      className="flex-grow bg-slate-950 border border-slate-800 px-3 py-2 text-xs rounded-xl focus:outline-none text-gray-100"
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="bg-slate-800 hover:bg-slate-700 text-amber-500 font-bold px-4 rounded-xl text-xs flex items-center gap-1 cursor-pointer"
                    >
                      Tambah Fitur
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {prodFeatures.length === 0 ? (
                      <span className="text-gray-500 text-xs italic">Belum ada fitur ditambahkan.</span>
                    ) : (
                      prodFeatures.map((feat, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] bg-slate-800 hover:bg-slate-750 text-gray-200 rounded-full border border-slate-750">
                          {feat}
                          <button type="button" onClick={() => handleRemoveFeature(idx)} className="text-red-400 hover:text-red-300">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))
                    )}
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-5 mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-4 py-2 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                  >
                    Simpan Modifikasi
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- ADD/EDIT PROJECT MODAL DIALOG --- */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProjectModalOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl relative w-full max-w-2xl px-6 py-6 overflow-hidden z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-500/10 text-amber-500 rounded-lg">
                    <FolderHeart className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedProject ? 'Ubah Portofolio Proyek' : 'Tambah Portofolio Proyek Baru'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="p-1.5 hover:bg-slate-800 text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Judul Proyek *
                    </label>
                    <input
                      type="text"
                      required
                      value={projTitle}
                      onChange={(e) => setProjTitle(e.target.value)}
                      placeholder="Contoh: Luxury Residence Songgokerto"
                      className="w-full bg-slate-950 border border-slate-800 px-3 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Tipe Proyek *
                    </label>
                    <select
                      value={projCategory}
                      onChange={(e) => setProjCategory(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 px-3 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-gray-300"
                    >
                      <option value="residensial">Residensial</option>
                      <option value="villa">Villa</option>
                      <option value="komersial">Komersial</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Lokasi Proyek *
                    </label>
                    <input
                      type="text"
                      required
                      value={projLocation}
                      onChange={(e) => setProjLocation(e.target.value)}
                      placeholder="Contoh: Batu, Jawa Timur / Malang"
                      className="w-full bg-slate-950 border border-slate-800 px-3 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Tahun Proyek *
                    </label>
                    <input
                      type="text"
                      required
                      value={projYear}
                      onChange={(e) => setProjYear(e.target.value)}
                      placeholder="Contoh: 2025"
                      className="w-full bg-slate-955 border border-slate-800 px-3 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-gray-100 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Tautan Gambar Proyek *
                  </label>
                  <input
                    type="text"
                    required
                    value={projImage}
                    onChange={(e) => setProjImage(e.target.value)}
                    placeholder="https://picsum.photos/..."
                    className="w-full bg-slate-950 border border-slate-800 px-3 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-gray-100 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Narasi Deskripsi Proyek
                  </label>
                  <textarea
                    rows={4}
                    value={projDesc}
                    onChange={(e) => setProjDesc(e.target.value)}
                    placeholder="Tuliskan cerita instalasi, bahan yang dipilih, dan konsep desain yang dipasang pada properti ini..."
                    className="w-full bg-slate-955 border border-slate-800 px-3 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-gray-100 resize-none/y"
                  />
                </div>

                <div className="border-t border-slate-800 pt-5 mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsProjectModalOpen(false)}
                    className="px-4 py-2 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                  >
                    Simpan Proyek
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- ADD/EDIT TESTIMONIAL MODAL DIALOG --- */}
      <AnimatePresence>
        {isTestimonialModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTestimonialModalOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl relative w-full max-w-xl px-6 py-6 overflow-hidden z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-500/10 text-amber-500 rounded-lg">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedTestimonial ? 'Ubah Ulasan Testimoni' : 'Tambah Ulasan Testimoni Baru'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTestimonialModalOpen(false)}
                  className="p-1.5 hover:bg-slate-800 text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveTestimonial} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Nama Pelanggan *
                    </label>
                    <input
                      type="text"
                      required
                      value={testName}
                      onChange={(e) => setTestName(e.target.value)}
                      placeholder="Contoh: Ibu Linda Rahayu"
                      className="w-full bg-slate-950 border border-slate-800 px-3 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Peranan / Label *
                    </label>
                    <input
                      type="text"
                      required
                      value={testRole}
                      onChange={(e) => setTestRole(e.target.value)}
                      placeholder="Contoh: Pemilik Villa / Pelanggan Batu"
                      className="w-full bg-slate-950 border border-slate-800 px-3 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-gray-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Penilaian (1 - 5 Bintang) *
                    </label>
                    <select
                      value={testRating}
                      onChange={(e) => setTestRating(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 px-3 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-gray-300"
                    >
                      <option value="5">★★★★★ (5 Bintang)</option>
                      <option value="4">★★★★☆ (4 Bintang)</option>
                      <option value="3">★★★☆☆ (3 Bintang)</option>
                      <option value="2">★★☆☆☆ (2 Bintang)</option>
                      <option value="1">★☆☆☆☆ (1 Bintang)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Tanggal Review *
                    </label>
                    <input
                      type="text"
                      required
                      value={testDate}
                      onChange={(e) => setTestDate(e.target.value)}
                      placeholder="Contoh: 18 Mei 2026"
                      className="w-full bg-slate-950 border border-slate-800 px-3 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-gray-100 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Isi Ulasan Testimoni *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={testComment}
                    onChange={(e) => setTestComment(e.target.value)}
                    placeholder="Tuliskan ulasan jujur dan kepuasan pelanggan terhadap pelayanan Gorden Yulie..."
                    className="w-full bg-slate-955 border border-slate-800 px-3 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-gray-100 resize-none opacity-100"
                  />
                </div>

                {/* Image & Avatar Upload Row for Admin */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  {/* 1. Avatar (Profile Image) */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Foto Profil Pelanggan (Opsional)
                    </label>
                    <div 
                      onDragOver={(e) => handleTestDrag(e, 'avatar', true)}
                      onDragLeave={(e) => handleTestDrag(e, 'avatar', false)}
                      onDrop={(e) => handleTestDrop(e, 'avatar')}
                      className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-3 text-center transition-all min-h-[120px] cursor-pointer ${
                        testAvatarDragActive ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800 bg-slate-950 hover:bg-slate-900'
                      }`}
                    >
                      {testAvatar ? (
                        <div className="flex flex-col items-center space-y-2">
                          <img src={testAvatar} alt="Avatar Preview" className="w-12 h-12 rounded-full object-cover border border-slate-700 shadow-md" referrerPolicy="no-referrer" />
                          <button 
                            type="button" 
                            onClick={() => setTestAvatar('')}
                            className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 transition-colors"
                          >
                            <Trash2 size={10} /> Hapus
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full text-gray-400">
                          <Camera size={18} className="text-gray-500 mb-1" />
                          <span className="text-[10px] font-bold text-gray-300">Klik / Seret Foto</span>
                          <span className="text-[8px] text-gray-500 mt-0.5">Maks 5MB</span>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleTestFileChange(e, 'avatar')}
                            className="hidden" 
                          />
                        </label>
                      )}
                    </div>
                    {/* URL alternative */}
                    {!testAvatar && (
                      <input 
                        type="url" 
                        placeholder="Atau tempel link URL foto..." 
                        value={testAvatar}
                        onChange={(e) => setTestAvatar(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30 mt-1.5"
                      />
                    )}
                  </div>

                  {/* 2. Customer Installation Photo */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Foto Pemasangan Gorden (Opsional)
                    </label>
                    <div 
                      onDragOver={(e) => handleTestDrag(e, 'image', true)}
                      onDragLeave={(e) => handleTestDrag(e, 'image', false)}
                      onDrop={(e) => handleTestDrop(e, 'image')}
                      className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-3 text-center transition-all min-h-[120px] cursor-pointer ${
                        testImageDragActive ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800 bg-slate-950 hover:bg-slate-900'
                      }`}
                    >
                      {testImage ? (
                        <div className="flex flex-col items-center space-y-2 w-full">
                          <img src={testImage} alt="Gorden Preview" className="h-12 w-24 rounded object-cover border border-slate-700 shadow-md" referrerPolicy="no-referrer" />
                          <button 
                            type="button" 
                            onClick={() => setTestImage('')}
                            className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 transition-colors"
                          >
                            <Trash2 size={10} /> Hapus
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full text-gray-400">
                          <Upload size={18} className="text-gray-500 mb-1" />
                          <span className="text-[10px] font-bold text-gray-300">Klik / Seret Gorden</span>
                          <span className="text-[8px] text-gray-500 mt-0.5">Maks 5MB</span>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleTestFileChange(e, 'image')}
                            className="hidden" 
                          />
                        </label>
                      )}
                    </div>
                    {/* URL alternative */}
                    {!testImage && (
                      <input 
                        type="url" 
                        placeholder="Atau tempel link URL gorden..." 
                        value={testImage}
                        onChange={(e) => setTestImage(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30 mt-1.5"
                      />
                    )}
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-5 mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsTestimonialModalOpen(false)}
                    className="px-4 py-2 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                  >
                    Simpan Testimoni
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
