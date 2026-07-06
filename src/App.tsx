import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  Search, 
  Languages, 
  Sparkles, 
  Clock, 
  MapPin, 
  Heart, 
  ChevronRight, 
  ShoppingBag, 
  Grid, 
  List, 
  Plus, 
  Minus, 
  X, 
  Check, 
  Info,
  ExternalLink,
  QrCode,
  Printer
} from 'lucide-react';
import { menuData } from './data';
import { MenuCategory, MenuItem, SupportedLanguage } from './types';

// Translation records
const uiTranslations = {
  en: {
    searchPlaceholder: "Search espresso, matcha, shakes, tea...",
    allCategories: "All Products",
    openingHours: "Opening Hours",
    hoursVal: "Daily: 7:00 AM to 19:00 PM",
    address: "Location",
    addressVal: "Budapest, Hungary",
    specialTitle: "HOUSE SIGNATURES",
    specialDesc: "Exclusive creations crafted by our talented baristas",
    trayTitle: "Your Selection Tray",
    emptyTray: "Your selection tray is empty. Add items below to calculate an estimate!",
    total: "Total Estimate",
    clear: "Clear All",
    addToTray: "Add to Tray",
    items: "items",
    item: "item",
    features: {
      vegan: "Vegan Option",
      organic: "100% Organic",
      chef: "Host Special"
    },
    viewMode: "Layout",
    huf: "HUF",
    infoTitle: "Welcome to Shiraz Rozi Café",
    infoSubtitle: "Experience our hand-crafted collection of premium espresso beverages, authentic Arabic coffee infused with cardamom, organic matcha, refreshing lemonades, and decadent shakes.",
    allergens: "We accommodate dietary needs. Ask our baristas for lactose-free, almond, or oat milk options.",
    addedToTray: "Added!"
  },
  hu: {
    searchPlaceholder: "Keresés eszpresszóra, matchára, shake-re...",
    allCategories: "Összes kategória",
    openingHours: "Nyitvatartás",
    hoursVal: "Minden nap: 7:00 - 19:00",
    address: "Címünk",
    addressVal: "Budapest, Magyarország",
    specialTitle: "HÁZ SPECIALITÁSAI",
    specialDesc: "Különleges finomságok, melyeket baristáink szeretettel készítenek",
    trayTitle: "Kiválasztott tételek",
    emptyTray: "A tálcája üres. Koppintson a termékekre a hozzáadáshoz és a kalkulációhoz!",
    total: "Becsült Összeg",
    clear: "Törlés",
    addToTray: "Hozzáadás",
    items: "db termék",
    item: "db termék",
    features: {
      vegan: "Vegán opció",
      organic: "100% Organikus",
      chef: "Ház ajánlata"
    },
    viewMode: "Nézet",
    huf: "Ft",
    infoTitle: "Üdvözöljük a Shiraz Rozi Caféban",
    infoSubtitle: "Kóstolja meg gondosan válogatott prémium espresso kávéinkat, autentikus arab kávéinkat kardamommal, bio matcháinkat, hűsítő limonádéinkat és prémium shake-jeinket.",
    allergens: "Különleges étrendi igényekhez is igazodunk. Kérje kávéját laktózmentes, mandula- vagy zabtejjel baristáinknál!",
    addedToTray: "Hozzáadva!"
  },
  de: {
    searchPlaceholder: "Nach Espresso, Matcha, Shakes, Tee suchen...",
    allCategories: "Alle Produkte",
    openingHours: "Öffnungszeiten",
    hoursVal: "Täglich: 7:00 Uhr - 19:00 Uhr",
    address: "Standort",
    addressVal: "Budapest, Ungarn",
    specialTitle: "HAUS-SPEZIALITÄTEN",
    specialDesc: "Exklusive Kreationen, handverlesen von unseren Baristas",
    trayTitle: "Ihr Bestellschein",
    emptyTray: "Ihr Bestellschein ist leer. Tippen Sie auf Artikel, um den Preis zu berechnen!",
    total: "Gesamtsumme",
    clear: "Leeren",
    addToTray: "Hinzufügen",
    items: "Artikel",
    item: "Artikel",
    features: {
      vegan: "Vegane Option",
      organic: "100% Bio",
      chef: "Spezialität des Hauses"
    },
    viewMode: "Ansicht",
    huf: "HUF",
    infoTitle: "Willkommen im Shiraz Rozi Café",
    infoSubtitle: "Genießen Sie unsere handverlesene Kollektion an Premium-Espressogetränken, authentischem arabischem Kaffee mit Kardamom, Bio-Matcha, erfrischenden Limonaden und feinen Milkshakes.",
    allergens: "Wir gehen auf diätetische Bedürfnisse ein. Fragen Sie unsere Baristas nach laktosefreien, Mandel- oder Hafermilch-Optionen.",
    addedToTray: "Hinzugefügt!"
  }
};

interface TrayItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export default function App() {
  const [lang, setLang] = useState<SupportedLanguage>(() => {
    try {
      const stored = localStorage.getItem('shiraz_menu_lang');
      if (stored === 'en' || stored === 'hu' || stored === 'de') {
        return stored;
      }
    } catch (e) {
      // localStorage security sandbox issues
    }
    return 'en';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [tray, setTray] = useState<TrayItem[]>([]);
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [qrUrlInput, setQrUrlInput] = useState('');
  const [qrTableInput, setQrTableInput] = useState('1');
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [preparedItems, setPreparedItems] = useState<string[]>([]);
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [tableNum, setTableNum] = useState<string | null>(null);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const table = params.get('table');
      if (table) {
        setTableNum(table);
      }
      
      // Auto-prepopulate template URL with active origin
      if (window.location.origin) {
        setQrUrlInput(window.location.origin + window.location.pathname);
      } else {
        setQrUrlInput('https://ais-pre-cdityqzfx3qo6wy2z6spfk-472197766304.europe-west2.run.app/');
      }
    } catch(e) {
      setQrUrlInput('https://ais-pre-cdityqzfx3qo6wy2z6spfk-472197766304.europe-west2.run.app/');
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('shiraz_menu_lang', lang);
    } catch(e) {}
  }, [lang]);

  // Toast effect
  useEffect(() => {
    if (successToast) {
      const timer = setTimeout(() => setSuccessToast(null), 1800);
      return () => clearTimeout(timer);
    }
  }, [successToast]);

  const translations = uiTranslations[lang];

  // Filter menu items based on selected category and search input
  const filteredCategories = useMemo(() => {
    return menuData.categories.map(category => {
      // Render in right lang
      const categoryName = category.name[lang] || category.name['en'];
      
      const matchedItems = category.items.filter(item => {
        const nameInLang = (item.name[lang] || item.name['en']).toLowerCase();
        const descInLang = ((item.description && item.description[lang]) || '').toLowerCase();
        const search = searchQuery.toLowerCase();
        
        return nameInLang.includes(search) || descInLang.includes(search);
      });

      return {
        ...category,
        items: matchedItems
      };
    }).filter(cat => {
      if (activeCategory !== 'all' && cat.id !== activeCategory) {
        return false;
      }
      return cat.items.length > 0;
    });
  }, [searchQuery, activeCategory, lang]);

  // Featured items
  const featuredItems = useMemo(() => {
    const itemsList: { item: MenuItem; categoryName: string }[] = [];
    menuData.categories.forEach(cat => {
      cat.items.forEach(itm => {
        if (itm.tags && itm.tags.length > 0) {
          itemsList.push({
            item: itm,
            categoryName: cat.name[lang] || cat.name['en']
          });
        }
      });
    });
    // Pick first 3
    return itemsList.slice(0, 3);
  }, [lang]);

  // Liked items tracking
  const toggleLike = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    setLikedItems(prev => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  // Add to estimate tray
  const addToTray = (item: MenuItem) => {
    setTray(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1 }];
    });
    setSuccessToast(translations.addedToTray + " (" + (item.name[lang] || item.name['en']) + ")");
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setTray(prev => {
      return prev.map(i => {
        if (i.item.id === itemId) {
          const nextQty = i.quantity + delta;
          return nextQty > 0 ? { ...i, quantity: nextQty } : null;
        }
        return i;
      }).filter((i): i is TrayItem => i !== null);
    });
  };

  const clearTray = () => {
    setTray([]);
  };

  const togglePreparedItem = (itemId: string) => {
    setPreparedItems(prev => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const totalEstimate = useMemo(() => {
    return tray.reduce((sum, item) => sum + (item.item.price * item.quantity), 0);
  }, [tray]);

  const totalItemsCount = useMemo(() => {
    return tray.reduce((sum, item) => sum + item.quantity, 0);
  }, [tray]);

  // Category Icon Resolver
  const getCategoryIcon = (catId: string) => {
    switch (catId.toLowerCase()) {
      case 'coffee':
        return <Coffee className="w-4 h-4" />;
      case 'arabic coffee':
        return <span className="text-sm font-semibold"></span>;
      case 'chocolate':
        return <span className="text-sm font-semibold"></span>;
      case 'tea':
        return <span className="text-sm font-semibold"></span>;
      case 'matcha':
        return <span className="text-sm font-semibold"></span>;
      case 'lemonade':
        return <span className="text-sm font-semibold"></span>;
      case 'shakes':
        return <span className="text-sm font-semibold"></span>;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div id="cafe-menu-app" className="min-h-screen bg-[#003d2b] text-white flex flex-col selection:bg-amber-100 selection:text-[#003d2b] relative overflow-x-hidden border-8 md:border-12 border-[#002218]">
      
      {/* Dynamic Toast System */}
      <AnimatePresence>
        {successToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[300] bg-[#002218] text-white px-5 py-3 rounded-full shadow-2xl font-medium flex items-center gap-2 border border-white/20"
          >
            <Check className="w-5 h-5 text-amber-100 stroke-[3]" />
            <span>{successToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Elegant Radial Top Banner Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#005a40]/30 to-transparent blur-3xl rounded-full pointer-events-none" />

      {/* Dynamic quick navigation utilities */}
      <nav className="w-full bg-[#002218]/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-[150] shadow-xl transition-all select-none">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between relative min-h-[52px]">
          
          {/* Left branding */}
          <button 
            onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
            className="text-left text-xs font-serif tracking-[0.2em] text-[#c5a880] hover:text-white uppercase font-bold transition-all cursor-pointer hidden md:block select-none bg-transparent border-0 outline-none"
          >
            SHIRAZ ROZI
          </button>

          {/* Middle: Absolutely Centered & Highly Visible Language Selection Pill */}
          <div className="flex-1 md:flex-initial flex justify-center md:absolute md:left-1/2 md:-translate-x-1/2">
            <div className="flex gap-1 bg-white/10 border border-white/10 p-0.5 sm:p-1 rounded-full shadow-lg">
              <button 
                onClick={() => setLang('en')} 
                className={`px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest transition-all cursor-pointer ${lang === 'en' ? 'bg-[#c5a880] text-[#002218] shadow-sm font-black' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
              >
                ENGLISH
              </button>
              <button 
                onClick={() => setLang('hu')} 
                className={`px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest transition-all cursor-pointer ${lang === 'hu' ? 'bg-[#c5a880] text-[#002218] shadow-sm font-black' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
              >
                MAGYAR
              </button>
              <button 
                onClick={() => setLang('de')} 
                className={`px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest transition-all cursor-pointer ${lang === 'de' ? 'bg-[#c5a880] text-[#002218] shadow-sm font-black' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
              >
                DEUTSCH
              </button>
            </div>
          </div>

          {/* Right side info & tray controls */}
          <div className="flex items-center gap-2 ml-auto md:ml-0">
            {/* Highly Visible Sticky Top Tray button */}
            <button 
              onClick={() => setIsTrayOpen(true)}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 shadow-md border ${
                tray.length > 0 
                  ? 'bg-gradient-to-r from-[#c5a880] to-[#cdb492] text-[#002218] font-black border-[#c5a880] scale-105 shadow-[#c5a880]/20 animate-pulse' 
                  : 'text-white/80 hover:text-[#c5a880] hover:bg-white/5 border-white/10 hover:border-[#c5a880]/30'
              }`}
              title="View Tray"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase font-black tracking-wider">
                {lang === 'en' ? 'Tray' : lang === 'hu' ? 'Tálca' : 'Kör'} ({totalItemsCount})
              </span>
            </button>

            <button 
              onClick={() => setInfoModalOpen(true)}
              className="px-3 py-1.5 text-white/80 hover:text-[#c5a880] hover:bg-white/5 border border-white/10 hover:border-[#c5a880]/30 rounded-full transition-all cursor-pointer flex items-center gap-1.5"
              title="Cafe Info"
            >
              <Info className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase font-bold tracking-wider hidden sm:inline">Info</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 relative">
        
        {/* HERO INTRO */}
        <div className="text-center max-w-2xl mx-auto mb-8 mt-4">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-patua text-4xl sm:text-5xl md:text-6xl text-white tracking-widest uppercase font-medium leading-tight select-none"
          >
            SHIRAZ ROZI CAFE
          </motion.h1>

          {tableNum && (
            <div className="inline-flex items-center gap-1.5 bg-[#c5a880] text-[#002218] px-3.5 py-1 rounded-full text-[10px] font-black tracking-widest mt-2 uppercase shadow-md select-none animate-bounce">
              <span>📍 Table {tableNum}</span>
            </div>
          )}
          
          {/* Ornate Gold Accent line */}
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#c5a880]/60" />
            <div className="text-[#c5a880]/70 text-sm">✦</div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#c5a880]/60" />
          </div>
        </div>

        {/* COMPACT FLOATING ADDRESS & ACTIONS BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto mb-12 text-xs text-white/80 text-center font-sans tracking-wide">
          
          {/* Badge 1: Opening Hours */}
          <div className="bg-white/5 border border-white/10 rounded-md py-3 px-4 flex items-center justify-start md:justify-center gap-2 shadow-sm select-none">
            <Clock className="w-4 h-4 text-[#c5a880] shrink-0" />
            <div className="text-left leading-tight flex-1">
              <span className="text-[9px] uppercase tracking-wider block opacity-40 font-bold">{translations.openingHours}</span>
              <span className="font-semibold block">{translations.hoursVal}</span>
            </div>
          </div>

          {/* Badge 2: Location on Google Maps */}
          <a 
            href="https://www.google.com/maps/place/Shiraz+Rozi+Cafe/@47.5155036,19.052038,17z/data=!3m1!4b1!4m6!3m5!1s0x4741ddb9b9d79c0b:0xa934c2d3aac17ce4!8m2!3d47.5155!4d19.0546129!16s%2Fg%2F11nb_fybzz?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            className="bg-white/5 border border-white/15 hover:border-white/30 hover:bg-white/10 rounded-md py-3 px-4 flex items-center justify-start md:justify-center gap-2 shadow-sm hover:shadow-md transition-all group cursor-pointer text-left"
          >
            <MapPin className="w-4 h-4 text-[#c5a880] shrink-0" />
            <div className="leading-tight flex-1">
              <span className="text-[9px] uppercase tracking-wider block opacity-40 font-bold">{translations.address}</span>
              <span className="font-semibold block group-hover:text-[#c5a880] transition-colors">{translations.addressVal}</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-white/30 group-hover:text-[#c5a880] transition-colors" />
          </a>

          {/* Badge 3: Google Map Review Link */}
          <a 
            href="https://www.google.com/maps/place/Shiraz+Rozi+Cafe/@47.5155036,19.052038,17z/data=!3m1!4b1!4m6!3m5!1s0x4741ddb9b9d79c0b:0xa934c2d3aac17ce4!8m2!3d47.5155!4d19.0546129!16s%2Fg%2F11nb_fybzz?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            className="bg-[#c5a880]/10 border border-[#c5a880]/20 hover:border-[#c5a880]/50 hover:bg-[#c5a880]/15 rounded-md py-3 px-4 flex items-center justify-start md:justify-center gap-2 shadow-sm hover:shadow-md transition-all group cursor-pointer text-left"
          >
            <Sparkles className="w-4 h-4 text-[#c5a880] shrink-0" />
            <div className="leading-tight flex-1">
              <span className="text-[9px] uppercase tracking-wider block opacity-40 font-bold">Feedback</span>
              <span className="font-bold block text-white group-hover:text-[#c5a880] transition-colors">
                {lang === 'en' ? 'Write Google Review' : lang === 'hu' ? 'Google Értékelés Írása' : 'Rezension schreiben'}
              </span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-white/30 group-hover:text-[#c5a880] transition-colors" />
          </a>

        </div>

        {/* HOUSE SIGNATURES CRADLE (Featured items carousel) */}
        {featuredItems.length > 0 && (
          <section className="mb-14">
            <div className="text-center mb-6">
              <span className="text-amber-100/60 text-xs font-bold tracking-[0.2em] block uppercase mb-1">
                {translations.specialTitle}
              </span>
              <h2 className="font-serif text-2xl text-amber-100">
                {translations.specialDesc}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {featuredItems.map(({ item, categoryName }) => (
                <motion.div
                  key={`featured-${item.id}`}
                  whileHover={{ y: -4 }}
                  className="bg-gradient-to-b from-[#003d2b] to-[#002218]/85 border-2 border-amber-100/20 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between shadow-lg"
                >
                  {/* Subtle vector sparkles */}
                  <div className="absolute top-3 right-3 text-amber-100/40">
                    <Sparkles className="w-4 h-4" />
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold block mb-2">
                      {categoryName}
                    </span>
                    <h3 className="font-serif text-lg text-white font-semibold leading-snug mb-2">
                      {item.name[lang] || item.name['en']}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-white/70 line-clamp-2 md:line-clamp-3 mb-4 font-light leading-relaxed">
                        {item.description[lang] || item.description['en']}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#005a40]/30">
                    <span className="font-mono text-amber-100 font-bold text-sm">
                      {item.price} {translations.huf}
                    </span>
                    
                    <button 
                      onClick={() => addToTray(item)}
                      className="bg-white/10 hover:bg-white text-white hover:text-[#002218] border border-[#005a40] hover:border-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{translations.addToTray}</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* MAIN CONTROLS BAR: SEARCH & VIEW MODES */}
        <section className="bg-[#002218]/40 rounded-md p-4 mb-8 border border-white/10 shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={translations.searchPlaceholder}
              className="w-full bg-[#002218]/60 border border-white/10 focus:border-white/30 rounded-md py-2.5 pl-10 pr-4 text-xs font-semibold placeholder-white/30 outline-none focus:ring-1 focus:ring-white/10 transition-all text-white font-sans"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filters / Mode Toggles */}
          <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t md:border-t-0 border-white/10 pt-3 md:pt-0">
            
            {/* View Grid/List toggles */}
            <div className="flex items-center gap-1 bg-[#002218]/60 border border-white/10 rounded-md p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all flex items-center gap-1 cursor-pointer ${viewMode === 'grid' ? 'bg-white text-[#003d2b]' : 'text-gray-400 hover:text-white'}`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px] font-bold px-0.5">{translations.viewMode}: Grid</span>
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`p-1.5 rounded-md transition-all flex items-center gap-1 cursor-pointer ${viewMode === 'compact' ? 'bg-white text-[#003d2b]' : 'text-gray-400 hover:text-white'}`}
                title="Compact View"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px] font-bold px-0.5">{translations.viewMode}: List</span>
              </button>
            </div>

            {/* Selection Tray Indicator Button */}
            <button 
              onClick={() => setIsTrayOpen(true)}
              className={`px-4 py-2.5 rounded-md text-xs font-black leading-none shadow-xl transition-all flex items-center gap-2.5 shrink-0 border ml-auto md:ml-0 cursor-pointer ${
                tray.length > 0
                  ? 'bg-gradient-to-r from-[#c5a880] to-[#cdb492] text-[#002218] border-[#c5a880] scale-105 shadow-[#c5a880]/20 animate-pulse'
                  : 'bg-white hover:bg-white/90 text-[#003d2b] border-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              <div className="flex flex-col items-start leading-none">
                <span className="text-[9px] tracking-[0.1em] uppercase block mb-0.5 font-black opacity-80">My Tray</span>
                <span className="font-mono text-[11px] font-extrabold">{totalItemsCount} {translations.items}</span>
              </div>
            </button>
          </div>
        </section>

        {/* CATEGORY SELECTOR SLIDECAP (Beautiful Horizontal Scroller) */}
        <div className="mb-8 select-none">
          <div className="flex items-center overflow-x-auto gap-2 py-2 pr-4 custom-scrollbar scroll-smooth">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2.5 rounded-md text-[10px] tracking-wider uppercase font-bold shrink-0 transition-all border flex items-center gap-1.5 cursor-pointer ${activeCategory === 'all' ? 'bg-white text-[#003d2b] border-white shadow-md font-extrabold' : 'bg-[#002218]/60 hover:bg-[#002218] border-white/10 text-white/85'}`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{translations.allCategories}</span>
            </button>
            
            {menuData.categories.map(category => {
              const isActive = activeCategory === category.id;
              const title = category.name[lang] || category.name['en'];
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2.5 rounded-md text-[10px] tracking-wider uppercase font-bold shrink-0 transition-all border flex items-center gap-1.5 cursor-pointer ${isActive ? 'bg-white text-[#003d2b] border-white shadow-md font-extrabold' : 'bg-[#002218]/60 hover:bg-[#002218] border-white/10 text-white/85'}`}
                >
                  {getCategoryIcon(category.id)}
                  <span>{title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SEARCH AND COMBINATION NOTICE */}
        {searchQuery && (
          <div className="mb-4 text-xs text-amber-200/90 leading-none bg-[#002218]/80 py-2.5 px-4 rounded-xl border border-amber-100/20 inline-block">
            Found <b className="font-semibold text-white">{filteredCategories.reduce((sum, c) => sum + c.items.length, 0)}</b> results matching &ldquo;{searchQuery}&rdquo;
          </div>
        )}

        {/* NO ITEMS MATCHING */}
        {filteredCategories.length === 0 && (
          <div className="bg-[#002218]/60 border border-[#005a40] text-center rounded-2xl p-12 text-sm max-w-lg mx-auto my-12">
            <Coffee className="w-8 h-8 text-amber-100/40 mx-auto mb-3" />
            <h3 className="font-serif text-lg text-amber-100 font-medium mb-1">No matches found</h3>
            <p className="text-gray-300 font-light">Try checking your spelling, or typing in other languages (English, Magyar, Deutsch).</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} 
              className="mt-4 bg-white/5 hover:bg-white/10 text-white border border-[#005a40] px-4 py-2 rounded-xl text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* MENU CATEGORIES CONTAINER Grid layout or List */}
        <div className="space-y-12">
          {filteredCategories.map((category) => {
            const categoryTitle = category.name[lang] || category.name['en'];
            
            return (
              <motion.div 
                key={category.id}
                className="category-block"
              >
                {/* Category Header Card */}
                <div className="flex items-center justify-between border-b border-white/20 pb-2 mb-6 text-xs tracking-[0.3em] uppercase font-bold text-white">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-[13px] tracking-[0.25em]">
                      {categoryTitle}
                    </span>
                  </div>
                  <span className="text-[10px] opacity-40 font-light tracking-[0.1em] lowercase italic">
                    {category.id === 'Coffee' || category.id === 'ARABIC COFFEE' ? 'Arabica blend' : 'select infusion'}
                  </span>
                </div>

                {/* GRID VIEW */}
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {category.items.map((item) => {
                      const itemName = item.name[lang] || item.name['en'];
                      const itemDesc = item.description ? (item.description[lang] || item.description['en']) : null;
                      const isLiked = likedItems.includes(item.id);

                      return (
                        <div 
                          key={item.id}
                          onClick={() => setSelectedItem(item)}
                          className="group bg-white/5 hover:bg-white/10 text-left rounded-md p-4.5 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:shadow-lg relative"
                        >
                          {/* Top row */}
                          <div>
                            <div className="flex items-start justify-between gap-2.5 mb-1.5">
                              <h3 className="font-serif text-base leading-snug text-white font-medium tracking-wide group-hover:text-[#c5a880] transition-colors">
                                {itemName}
                              </h3>
                              <span className="font-mono text-white/90 shrink-0 font-bold tracking-tight text-sm">
                                {item.price} {translations.huf}
                              </span>
                            </div>

                            {/* Tags */}
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mb-2.5">
                                {item.tags.map(t => (
                                  <span key={t} className="bg-white/10 text-white/80 text-[8px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded-sm">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Description preview */}
                            {itemDesc && (
                              <p className="text-white/60 text-xs font-light tracking-wide line-clamp-2 md:line-clamp-3 leading-relaxed mb-4 font-sans">
                                {itemDesc}
                              </p>
                            )}
                          </div>

                          {/* Action panel */}
                          <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-auto">
                              
                              {/* Like heart & Detail indicator */}
                              <div className="flex items-center gap-1">
                                <button 
                                  onClick={(e) => toggleLike(e, item.id)}
                                  className={`p-1.5 rounded-md transition-transform hover:scale-110 active:scale-95 cursor-pointer ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
                                >
                                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                                </button>
                                <span className="text-[10px] text-white/40 font-medium group-hover:text-[#c5a880] flex items-center gap-0.5 ml-1 select-none font-sans">
                                  View details <ChevronRight className="w-3" />
                                </span>
                              </div>

                              {/* Easy add-to-tray plus tab */}
                              <button 
                                onClick={(e) => { e.stopPropagation(); addToTray(item); }}
                                className="bg-white/10 group-hover:bg-white text-white group-hover:text-[#002218] p-1.5 rounded-md shadow-sm group-hover:shadow transition-all border border-white/10 group-hover:border-white cursor-pointer"
                                title="Add"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  
                  /* MINIMAL PRISTINE LIST VIEW (Classic Menu look) */
                  <div className="bg-white/5 rounded-md p-4 sm:p-6 border border-white/10 space-y-4">
                    {category.items.map((item) => {
                      const itemName = item.name[lang] || item.name['en'];
                      const itemDesc = item.description ? (item.description[lang] || item.description['en']) : null;
                      const isLiked = likedItems.includes(item.id);

                      return (
                        <div 
                          key={item.id}
                          className="group border-b border-dashed border-white/10 last:border-0 pb-4 last:pb-0 font-sans cursor-pointer"
                          onClick={() => setSelectedItem(item)}
                        >
                          <div className="flex items-baseline justify-between gap-4">
                            <span className="font-serif text-sm sm:text-base text-white font-medium group-hover:text-[#c5a880] transition-colors flex items-center gap-2">
                              {itemName}
                              {item.tags && item.tags.length > 0 && (
                                <span className="inline-block bg-white/10 text-white/90 text-[8px] tracking-wider font-bold px-1.5 py-0.5 rounded leading-none">
                                  {item.tags[0]}
                                </span>
                              )}
                            </span>
                            
                            {/* Dotted filling spacing spacer */}
                            <div className="flex-1 border-b border-dotted border-white/10 mx-2 hidden sm:block h-3" />
                            
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-white/95 font-bold shrink-0 text-sm">
                                {item.price} {translations.huf}
                              </span>
                              
                              {/* Compact actions for List view */}
                              <div className="opacity-70 group-hover:opacity-100 flex items-center gap-1 transition-all">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); addToTray(item); }}
                                  className="p-1 text-white hover:text-[#c5a880] transition-all cursor-pointer"
                                  title="Add to selection"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          {/* Mini description */}
                          {itemDesc && (
                            <p className="text-white/50 text-xs mt-1 max-w-2xl font-light line-clamp-1 group-hover:line-clamp-none transition-all font-sans">
                              {itemDesc}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* FOOTER DIALOGS & ACCENTS */}
      <footer className="w-full bg-[#002218] border-t border-white/10 py-12 px-4 mt-20 relative text-xs text-center text-white/40 font-light space-y-4">
        <div className="max-w-xl mx-auto space-y-4">
          
          <h4 className="font-serif text-[#c5a880] tracking-[0.25em] text-sm uppercase font-bold">SHIRAZ ROZI CAFÉ</h4>
          
          <p className="leading-relaxed text-white/60 font-sans">
            {translations.allergens}
          </p>

          <p className="text-white/40 font-medium font-sans">
            ✦ All prices presented in HUF (Hungarian Forints).
          </p>

          {/* Social icons/Links list */}
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-white/50 font-sans">
            <span>{translations.hoursVal}</span>
            <span>•</span>
            <span>Budapest, HU</span>
          </div>

          <p className="pt-6 border-t border-white/5 text-[10px] text-white/30 font-sans">
            © 2026 Shiraz Rozi Cafe. Designed and maintained by Deepak Reddy
          </p>
        </div>
      </footer>

      {/* FLOATING ACTION BOTTOM TRAY DRAWER */}
      <AnimatePresence>
        {isTrayOpen && (
          <div className="fixed inset-0 z-[200] overflow-hidden">
            
            {/* Dark glass backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTrayOpen(false)}
              className="absolute inset-0 bg-[#00110c]/85 backdrop-blur-sm"
            />

            {/* Slide up tray card */}
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute bottom-0 inset-x-0 bg-[#002218] border-t-2 border-white/20 rounded-t-xl shadow-2xl max-h-[85vh] flex flex-col max-w-2xl mx-auto"
            >
              
              {/* Header */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#c5a880]" />
                  <h3 className="font-serif text-lg tracking-wider font-bold text-white uppercase col-span-2">
                    {translations.trayTitle}
                  </h3>
                </div>
                
                <button 
                  onClick={() => setIsTrayOpen(false)}
                  className="p-1.5 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable list content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
                {tray.length === 0 ? (
                  <div className="py-12 px-6 text-center text-white/50 font-light space-y-3 font-sans">
                    <ShoppingBag className="w-8 h-8 text-white/20 mx-auto" />
                    <p className="text-sm">{translations.emptyTray}</p>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {tray.map(({ item, quantity }) => {
                      const name = item.name[lang] || item.name['en'];
                      return (
                        <div 
                          key={`tray-item-${item.id}`}
                          className="bg-white/5 border border-white/10 rounded-md p-3.5 flex items-center justify-between gap-3 shadow-inner"
                        >
                          <div>
                            <span className="font-serif text-sm block font-medium text-white">
                              {name}
                            </span>
                            <span className="font-mono text-xs text-[#c5a880] font-semibold block mt-1">
                              {item.price * quantity} {translations.huf}
                            </span>
                          </div>

                          {/* Control adjustments */}
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-7 h-7 bg-white/5 hover:bg-white/10 text-white rounded-md flex items-center justify-center border border-white/10 transition-all cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono font-bold text-sm text-center w-5">
                              {quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-7 h-7 bg-white/5 hover:bg-white/10 text-white rounded-md flex items-center justify-center border border-white/10 transition-all cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Bottom total calculator block */}
              {tray.length > 0 && (
                <div className="p-5 bg-[#001c13] border-t border-white/10 space-y-4 rounded-b-xl">
                  
                  <div className="flex justify-between items-baseline font-sans">
                    <span className="text-white/40 text-xs font-bold uppercase tracking-wider">
                      {translations.total}:
                    </span>
                    <span className="font-mono text-2xl font-black text-white tracking-tight">
                      {totalEstimate} {translations.huf}
                    </span>
                  </div>

                  {/* Actions buttons */}
                  <div className="grid grid-cols-2 gap-3.5">
                    <button 
                      onClick={clearTray}
                      className="border border-white/15 hover:bg-white/5 text-white font-bold py-3 px-4 rounded-md text-xs transition-all uppercase tracking-wide cursor-pointer"
                    >
                      {translations.clear}
                    </button>
                    
                    <button 
                      onClick={() => {
                        setTicketId(`SR-${Math.floor(100 + Math.random() * 900)}`);
                        setIsTrayOpen(false);
                        setIsReceiptOpen(true);
                      }}
                      className="bg-[#c5a880] hover:bg-[#cdb492] text-[#002218] font-extrabold py-3 px-4 rounded-md text-xs shadow-lg transition-all uppercase tracking-wider text-center cursor-pointer"
                    >
                      Confirm Selection
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GOURMET DETAIL MODAL FOR ANY INDIVIDUAL ITEM */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 overflow-hidden">
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-[#00110c]/85 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-[#002218] border border-white/20 rounded-md max-w-md w-full p-6 shadow-2xl relative z-[260] overflow-hidden"
            >
              
              {/* Sparkles accents */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />

              {/* Close Button */}
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all border border-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Detail fields */}
              <div className="space-y-4">
                
                {/* Category & Tag Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-white/50 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                    Product Details
                  </span>
                  
                  {selectedItem.tags?.map(t => (
                    <span key={t} className="bg-white/10 text-white/90 text-[9px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded-sm">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Name */}
                <h3 className="font-serif text-2xl text-white font-medium tracking-wide uppercase">
                  {selectedItem.name[lang] || selectedItem.name['en']}
                </h3>

                {/* Divider lines */}
                <div className="h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

                {/* Multilingual translations grid showcase */}
                <div className="bg-white/5 border border-white/10 p-3.5 rounded-md space-y-2.5 text-xs text-white/70 font-light font-sans">
                  <div className="flex justify-between items-center bg-white/5 p-1.5 rounded-sm">
                    <span className="font-bold text-white">English:</span>
                    <span>{selectedItem.name['en']}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-1.5 rounded-sm">
                    <span className="font-bold text-white">Magyar:</span>
                    <span>{selectedItem.name['hu']}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-1.5 rounded-sm">
                    <span className="font-bold text-white">Deutsch:</span>
                    <span>{selectedItem.name['de']}</span>
                  </div>
                </div>

                {/* Real description panel */}
                {selectedItem.description && (
                  <p className="text-white/80 text-xs font-light leading-relaxed tracking-wide mt-2 font-sans">
                    {selectedItem.description[lang] || selectedItem.description['en']}
                  </p>
                )}

                {/* Bottom Order Block */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-6 bg-white/5 -mx-6 -mb-6 p-6">
                  
                  {/* Price */}
                  <div>
                    <span className="text-[9px] text-white/40 uppercase tracking-widest block font-bold">Standard Price</span>
                    <span className="font-mono text-xl text-[#c5a880] font-extrabold tracking-tight block">
                      {selectedItem.price} {translations.huf}
                    </span>
                  </div>

                  {/* Tray Button */}
                  <button 
                    onClick={() => { addToTray(selectedItem); setSelectedItem(null); }}
                    className="bg-white hover:bg-white/90 text-[#002218] hover:scale-[1.02] transition-all font-extrabold tracking-wide text-xs px-5 py-3 rounded-md shadow-md uppercase cursor-pointer"
                  >
                    {translations.addToTray}
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SHIRAZ INTERACTIVE INFO DRAWER */}
      <AnimatePresence>
        {infoModalOpen && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 overflow-hidden">
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInfoModalOpen(false)}
              className="absolute inset-0 bg-[#00110c]/85 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#002218] border border-white/20 rounded-md max-w-md w-full p-6 shadow-2xl relative z-[260] overflow-hidden"
            >
              <button 
                onClick={() => setInfoModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all border border-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4 text-center">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/80 mx-auto shadow-inner">
                  <Coffee className="w-5 h-5" />
                </div>
                
                <h3 className="font-serif text-xl text-[#c5a880] font-bold tracking-wider uppercase">
                  {translations.infoTitle}
                </h3>

                <p className="text-white/60 text-xs font-light leading-relaxed font-sans">
                  {translations.infoSubtitle}
                </p>

                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

                <div className="space-y-2 text-left text-xs bg-white/5 border border-white/10 p-4 rounded-md font-sans">
                  <div className="flex gap-2 items-start text-white/75">
                    <Clock className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">{translations.openingHours}</strong>
                      <span className="font-sans text-white/65">{translations.hoursVal}</span>
                    </div>
                  </div>
                  <a 
                    href="https://www.google.com/maps/place/Shiraz+Rozi+Cafe/@47.5155036,19.052038,17z/data=!3m1!4b1!4m6!3m5!1s0x4741ddb9b9d79c0b:0xa934c2d3aac17ce4!8m2!3d47.5155!4d19.0546129!16s%2Fg%2F11nb_fybzz?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="flex gap-2 items-start text-white/75 mt-2 hover:text-[#c5a880] transition-colors group cursor-pointer text-left"
                  >
                    <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <strong className="text-white block group-hover:text-[#c5a880] transition-colors">{translations.address}</strong>
                      <span className="font-sans text-white/65 flex items-center gap-1 text-[11px]">
                        {translations.addressVal} <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-[#c5a880] transition-colors" />
                      </span>
                    </div>
                  </a>
                </div>

                <p className="text-[#c5a880] text-xs italic font-sans font-light">
                  {translations.allergens}
                </p>

                <button 
                  onClick={() => setInfoModalOpen(false)}
                  className="bg-white/5 hover:bg-white/10 text-white font-bold py-2.5 w-full rounded-md border border-white/10 text-xs transition-all tracking-wide cursor-pointer"
                >
                  Close Info
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DIGITAL RECEIPT MODAL FOR PRE-BILLING AT COUNTER */}
      <AnimatePresence>
        {isReceiptOpen && (
          <div className="fixed inset-0 z-[270] flex items-center justify-center p-4 overflow-y-auto bg-[#00110c]/90 backdrop-blur-sm">
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-[#002218] border border-white/20 rounded-md max-w-md w-full p-6 shadow-2xl relative overflow-hidden font-sans my-8"
            >
              
              {/* Receipt Background Texture lines */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#c5a880] via-[#cdb492] to-[#c5a880] opacity-90" />

              {/* Close Icon Button */}
              <button 
                onClick={() => setIsReceiptOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all border border-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mt-2 space-y-4">
                
                {/* Header Block */}
                <div className="text-center space-y-1">
                  <span className="text-[10px] tracking-[0.3em] font-black uppercase text-[#c5a880] block">
                    SHIRAZ ROZI CAFE
                  </span>
                  <h3 className="font-serif text-lg text-white font-extrabold uppercase tracking-widest">
                    {lang === 'en' ? 'Counter Order Ticket' : lang === 'hu' ? 'Pultos Rendelési Jegy' : 'Bestellzettel'}
                  </h3>
                  <div className="inline-block bg-[#c5a880]/15 border border-[#c5a880]/30 px-3 py-1 rounded-sm font-mono text-xs text-[#c5a880] font-bold mt-1.5 tracking-wider select-none">
                    TICKET ID: {ticketId} {tableNum && `• TABLE ${tableNum}`}
                  </div>
                </div>

                {/* Sub info */}
                <div className="flex justify-between items-center text-[10px] font-mono text-white/40 border-b border-white/10 pb-2.5">
                  <span>{new Date().toLocaleDateString(lang === 'hu' ? 'hu-HU' : lang === 'de' ? 'de-DE' : 'en-US')}</span>
                  <span>{new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})}</span>
                </div>

                {/* Barista instructions prompt */}
                <div className="bg-white/5 border border-white/10 px-3 py-2.5 rounded-md text-[11px] leading-relaxed text-white/80 font-sans">
                  <div className="font-bold text-white mb-0.5 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>{lang === 'en' ? 'Instructions for Cashier:' : lang === 'hu' ? 'Utasítás a Pénztárosnak:' : 'Anweisung für die Kasse:'}</span>
                  </div>
                  <p className="text-white/60 text-[10.5px]">
                    {lang === 'en' ? 'Key these items into your cash register system. Tap items to check them off as prepared!' : 
                     lang === 'hu' ? 'Üsse be ezeket a tételeket a pénztárgépbe. A tételek pultos készítés közben kipipálhatóak!' : 
                     'Geben Sie diese Artikel in Ihr Kassensystem ein. Tippen Sie auf Artikel zum Abhacken!'}
                  </p>
                </div>

                {/* Digital Receipt List of Items */}
                <div className="space-y-1 border-y border-dashed border-white/20 py-3.5 font-mono text-xs">
                  <div className="grid grid-cols-12 font-bold text-white/40 text-[9px] pb-1 uppercase tracking-wider">
                    <div className="col-span-1">#</div>
                    <div className="col-span-6">{lang === 'en' ? 'Item Name' : lang === 'hu' ? 'Tétel Megnevezése' : 'Artikelname'}</div>
                    <div className="col-span-2 text-center">Qty</div>
                    <div className="col-span-3 text-right">{lang === 'en' ? 'Price' : lang === 'hu' ? 'Ár' : 'Preis'}</div>
                  </div>
                  
                  {tray.map((item, idx) => {
                    const itemName = item.item.name[lang] || item.item.name['en'];
                    const isCompleted = preparedItems.includes(item.item.id);
                    return (
                      <div 
                        key={`receipt-item-${item.item.id}`}
                        onClick={() => togglePreparedItem(item.item.id)}
                        className={`grid grid-cols-12 py-2 items-center cursor-pointer transition-all border-b border-white/5 last:border-0 hover:bg-white/5 px-1 rounded ${isCompleted ? 'bg-white/5 opacity-30 text-white/40' : 'text-white/90'}`}
                      >
                        <div className="col-span-1 text-white/30 text-[9px] font-sans">
                          {isCompleted ? '✓' : idx + 1}
                        </div>
                        <div className="col-span-6">
                          <span className={`block font-sans text-xs ${isCompleted ? 'line-through text-white/30' : 'text-white font-semibold'}`}>
                            {itemName}
                          </span>
                        </div>
                        <div className="col-span-2 text-center text-xs font-bold font-mono">
                          {item.quantity}×
                        </div>
                        <div className="col-span-3 text-right text-xs font-mono font-bold text-[#c5a880]">
                          {(item.item.price * item.quantity).toLocaleString()} {translations.huf}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Estimation Total */}
                <div className="bg-white/5 p-3.5 rounded-md border border-white/10 flex flex-col justify-center items-center gap-0.5">
                  <span className="text-[9px] font-bold tracking-widest text-white/40 uppercase">
                    {translations.total}
                  </span>
                  <span className="text-2xl font-black font-mono tracking-tight text-[#c5a880]">
                    {totalEstimate.toLocaleString()} {translations.huf}
                  </span>
                </div>

                {/* Important Guest Counter Billing Information Notice */}
                <div className="bg-[#c5a880]/15 border border-[#c5a880]/30 p-4 rounded-md text-center space-y-1.5 font-sans mt-3 shadow-inner">
                  <span className="text-white font-extrabold text-[10px] tracking-wider uppercase block bg-[#c5a880] text-[#002218] px-2 py-0.5 rounded-sm w-fit mx-auto">
                    📢 {lang === 'en' ? 'GUEST NOTICE' : lang === 'hu' ? 'VENDÉG TÁJÉKOZTATÓ' : 'GÄSTE-INFO'}
                  </span>
                  <p className="text-white/90 text-[11px] font-semibold leading-relaxed">
                    {lang === 'en' ? 'Please show this receipt at the counter for billing, and our cafe will start preparing your order.' : 
                     lang === 'hu' ? 'Kérjük, mutassa be ezt a bizonylatot a pultnál a fizetéshez, és kávézónk elkezdi a rendelés elkészítését.' : 
                     'Bitte zeigen Sie diesen Beleg an der Kasse zur Abrechnung vor, und unser Café beginnt mit der Zubereitung Ihrer Bestellung.'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 space-y-2">
                  <button 
                    onClick={() => {
                      clearTray();
                      setPreparedItems([]);
                      setIsReceiptOpen(false);
                      setSuccessToast(lang === 'en' ? 'New guest menu ready!' : lang === 'hu' ? 'Új tálca elindítva!' : 'Bereit für neuen Gast!');
                    }}
                    className="w-full bg-[#c5a880] hover:bg-[#cdb492] text-[#002218] font-black py-3 rounded-md text-xs transition-colors uppercase tracking-widest cursor-pointer shadow-lg block text-center"
                  >
                    ✓ {lang === 'en' ? 'Complete & Start New Order' : lang === 'hu' ? 'Rendelés Kész / Új Vendég' : 'Abgeschlossen & Neu'}
                  </button>
                  
                  <button 
                    onClick={() => setIsReceiptOpen(false)}
                    className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-2.5 rounded-md text-xs transition-all border border-white/15 cursor-pointer block text-center uppercase tracking-wider"
                  >
                    ✏️ {lang === 'en' ? 'Add / Edit Items' : lang === 'hu' ? 'Vissza a Szerkesztéshez' : 'Einträge bearbeiten'}
                  </button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PERSISTENT FLOATING BOTTOM BAR / MOBILE EASY ACCESS TRAY TRIGGER */}
      <AnimatePresence>
        {tray.length > 0 && !isTrayOpen && !isReceiptOpen && (
          <motion.div 
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[140] w-full max-w-sm px-4"
          >
            <button 
              onClick={() => setIsTrayOpen(true)}
              className="w-full bg-gradient-to-r from-[#c5a880] to-[#cdb492] hover:scale-[1.02] active:scale-[0.98] text-[#002218] font-black py-3.5 px-5 rounded-full shadow-2xl transition-all flex items-center justify-between cursor-pointer border border-[#c5a880]/30"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#002218] flex items-center justify-center text-[#c5a880] shadow-md">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div className="text-left font-sans">
                  <span className="text-[9px] uppercase tracking-wider block opacity-70 font-black">
                    {lang === 'en' ? 'READY IN TRAY' : lang === 'hu' ? 'KÉSZ A TÁLCÁBAN' : 'IM KÖRBCHEN'}
                  </span>
                  <span className="text-xs font-bold block leading-none">
                    {totalItemsCount} {translations.items}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 font-mono text-xs font-semibold">
                <span>{totalEstimate.toLocaleString()} {translations.huf}</span>
                <ChevronRight className="w-4 h-4 shrink-0" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COFFEE TABLE STAND & QR CODE GENERATOR FOR THE PHYSICAL CAFE DESIGN */}
      <AnimatePresence>
        {isQrModalOpen && (
          <div className="fixed inset-0 z-[280] flex items-center justify-center p-4 overflow-y-auto bg-[#00110c]/90 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-[#002218] border border-white/20 rounded-md max-w-lg w-full p-6 shadow-2xl relative overflow-hidden font-sans my-8"
            >
              {/* Gold Top line decoration */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#c5a880] via-[#cdb492] to-[#c5a880] opacity-90" />

              {/* Close Icon Button */}
              <button 
                onClick={() => setIsQrModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all border border-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mt-2 space-y-5">
                
                {/* Header Block */}
                <div>
                  <h3 className="font-serif text-lg text-white font-extrabold uppercase tracking-widest flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-[#c5a880]" />
                    <span>Table QR Code Stand Generator</span>
                  </h3>
                  <p className="text-white/60 text-xs mt-1">
                    Generate beautiful table-stands for your cafe tables. Guests scan the QR to access your menu, which pre-tags their table automatically.
                  </p>
                </div>

                {/* Configuration Controls */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-md space-y-3.5 text-xs">
                  <div className="font-bold text-[#c5a880] uppercase tracking-wider text-[10px]">
                    Configure Stand Details
                  </div>
                  
                  {/* Host Link Input */}
                  <div className="space-y-1">
                    <label className="text-white/60 font-semibold block">Host URL (e.g., Streamlit, GitHub Pages, or Vercel link):</label>
                    <input 
                      type="text" 
                      value={qrUrlInput}
                      onChange={(e) => setQrUrlInput(e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-[#00110c] text-white/90 border border-white/10 rounded px-2.5 py-1.5 focus:border-[#c5a880]/50 focus:outline-none font-mono text-xs"
                    />
                    <span className="text-[10px] text-white/40 block">Tip: When hosting this app on your Streamlit/GitHub domain, paste that link here.</span>
                  </div>

                  {/* Table stand number adjustment */}
                  <div className="grid grid-cols-2 gap-3 items-end">
                    <div className="space-y-1">
                      <label className="text-white/60 font-semibold block">Table Number (e.g. 5, 12, A):</label>
                      <input 
                        type="text" 
                        value={qrTableInput}
                        onChange={(e) => setQrTableInput(e.target.value)}
                        className="w-full bg-[#00110c] text-white/90 border border-white/10 rounded px-2.5 py-1.5 focus:border-[#c5a880]/50 focus:outline-none font-mono font-bold"
                      />
                    </div>
                    <div>
                      <div className="flex gap-1">
                        {['1', '2', '3', '5', '8', '12'].map(num => (
                          <button 
                            key={`quick-table-${num}`}
                            onClick={() => setQrTableInput(num)}
                            className={`px-2 py-1.5 rounded text-[10px] font-mono border font-bold cursor-pointer transition-all ${qrTableInput === num ? 'bg-[#c5a880] text-[#002218] border-[#c5a880]' : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'}`}
                          >
                            T{num}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* The QR Stand Card Preview (Print friendly preview) */}
                <div id="printable-qr-stand" className="bg-white text-[#002218] rounded-md p-6 shadow-2xl border-2 border-[#002218]/20 text-center space-y-4 flex flex-col items-center">
                  
                  {/* Header Decoration */}
                  <div className="space-y-0.5 select-none">
                    <span className="text-[9px] tracking-[0.3em] font-black uppercase text-[#002218]/40 block">
                      WELCOME TO
                    </span>
                    <h4 className="font-serif text-lg font-black uppercase tracking-widest text-[#002218]">
                      SHIRAZ ROZI CAFE
                    </h4>
                    <div className="w-16 h-[1.5px] bg-[#c5a880] mx-auto my-1 bg-gradient-to-r from-transparent via-[#c5a880] to-transparent" />
                  </div>

                  {/* The actual QR Code Image */}
                  <div className="bg-white p-2 rounded-md border border-[#002218]/10 shadow-sm inline-block">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=8&color=002218&bgcolor=ffffff&data=${encodeURIComponent(
                        qrUrlInput + (qrUrlInput.includes('?') ? '&' : '?') + 'table=' + qrTableInput
                      )}`}
                      alt="Shiraz Rozi Table QR Code" 
                      className="w-32 h-32 bg-white"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Table Label */}
                  <div className="bg-[#002218] text-[#c5a880] font-black px-4 py-1 rounded text-[11px] tracking-[0.2em] uppercase shadow inline-block select-none">
                    TABLE {qrTableInput}
                  </div>

                  {/* Multilingual scanner guide */}
                  <div className="space-y-1 max-w-xs font-sans">
                    <p className="text-[10px] font-black tracking-wide leading-tight text-[#002218] uppercase">
                      Scan to browse our menu & select express tray
                    </p>
                    <p className="text-[9px] font-semibold text-black/50 leading-relaxed italic border-t border-black/5 pt-1">
                      Szkennelje be a menühöz és válassza ki tálcáját
                    </p>
                  </div>
                </div>

                {/* Print Sinks / Tools */}
                <div className="flex gap-2.5">
                  <button 
                    onClick={() => {
                      const printWindow = window.open('', '_blank');
                      if (printWindow) {
                        const styleNode = document.createElement('style');
                        styleNode.textContent = `
                          body { margin: 0; padding: 40px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #fff; color: #002218; }
                          #printable { border: 3px solid #002218; padding: 40px; display: inline-block; border-radius: 8px; max-width: 320px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-top: 50px; }
                          h1 { margin: 0; font-size: 20px; font-weight: 900; tracking: 0.1em; }
                          .subtitle { text-transform: uppercase; font-size: 10px; color: #777; letter-spacing: 0.3em; margin-bottom: 5px; }
                          .qr-img { width: 220px; height: 220px; margin: 20px auto; border: 1px solid #eee; padding: 5px; }
                          .table-tag { background: #002218; color: #c5a880; font-weight: 900; letter-spacing: 0.2em; display: inline-block; padding: 8px 20px; border-radius: 4px; font-size: 14px; margin-bottom: 20px; }
                          .instructions { font-size: 12px; font-weight: bold; line-height: 1.4; max-width: 280px; margin: 0 auto; }
                          .instructions-hu { font-size: 10px; opacity: 0.6; font-style: italic; margin-top: 10px; }
                        `;
                        
                        const printContent = `
                          <div id="printable">
                            <div class="subtitle">Welcome to</div>
                            <h1>SHIRAZ ROZI CAFE</h1>
                            <img class="qr-img" src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=12&color=002218&bgcolor=ffffff&data=${encodeURIComponent(
                              qrUrlInput + (qrUrlInput.includes('?') ? '&' : '?') + 'table=' + qrTableInput
                            )}" />
                            <div><span class="table-tag">TABLE ${qrTableInput}</span></div>
                            <div class="instructions">Scan to browse our menu, build your tray, and confirm at the counter!</div>
                            <div class="instructions-hu">Szkennelje be a menü böngészéséhez, állítsa össze tálcáját, majd igazolja a pultnál!</div>
                          </div>
                          <script>
                            window.onload = function() {
                              window.print();
                              setTimeout(function() { window.close(); }, 500);
                            }
                          </script>
                        `;
                        printWindow.document.write('<html><head><title>Print Shiraz Rozi ' + qrTableInput + ' QR Code</title></head><body>' + printContent + '</body></html>');
                        printWindow.document.appendChild(styleNode);
                        printWindow.document.close();
                      }
                    }}
                    className="flex-1 bg-[#c5a880] hover:bg-[#cdb492] text-[#002218] font-black py-2.5 rounded text-xs transition-colors uppercase tracking-widest cursor-pointer flex items-center justify-center gap-1.5 shadow-md border-0"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print QR Stand</span>
                  </button>

                  <button 
                    onClick={() => {
                      const downloadLink = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&margin=10&color=002218&bgcolor=ffffff&data=${encodeURIComponent(
                        qrUrlInput + (qrUrlInput.includes('?') ? '&' : '?') + 'table=' + qrTableInput
                      )}`;
                      window.open(downloadLink, '_blank');
                    }}
                    className="bg-white/5 hover:bg-white/10 text-white font-bold py-2.5 px-3.5 border border-white/15 rounded text-xs transition-all tracking-wide cursor-pointer flex items-center gap-1"
                  >
                    High-res QR
                  </button>
                </div>

                <button 
                  onClick={() => setIsQrModalOpen(false)}
                  className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-2 rounded text-xs transition-all cursor-pointer block text-center border border-white/5 uppercase"
                >
                  Close Setup
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
