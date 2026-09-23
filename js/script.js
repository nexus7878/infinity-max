/**
 * INFINITYMAX - Premium E-Commerce Platform Client Logic
 * Architecture: Modular Vanilla JavaScript (ES6+)
 */

// ==========================================================================
// 1. DATASETS (Products, Categories, Brands, Hero Slides)
// ==========================================================================

const HERO_SLIDES = [
  {
    id: 1,
    eyebrow: "MORE THAN A STORE",
    headline: "STYLE HAS<br>NO LIMITS",
    description: "Discover premium products from top brands. Fashion, sneakers, tech, lifestyle & more — all in one place.",
    image: "assets/banners/hero_campaign_sneakers_1789480739024.jpg",
    primaryBtn: "SHOP NOW →",
    primaryLink: "#bestsellers",
    secondaryBtn: "EXPLORE BRANDS",
    secondaryLink: "#brands"
  },
  {
    id: 2,
    eyebrow: "AUTUMN / WINTER 2026",
    headline: "ARCHITECTURAL<br>MINIMALISM",
    description: "Engineered outerwear and tailored essentials built for city transitions. Premium silhouettes from global houses.",
    image: "assets/banners/hero_campaign_lifestyle_1789480807939.jpg",
    primaryBtn: "SHOP APPAREL →",
    primaryLink: "#newarrivals",
    secondaryBtn: "VIEW CAMPAIGN",
    secondaryLink: "#campaigns"
  },
  {
    id: 3,
    eyebrow: "NEXT-GEN AUDIO & WEARABLES",
    headline: "SOUND & MOTION<br>IN HARMONY",
    description: "Studio-fidelity acoustics and intelligent wearables tailored to your daily performance and lifestyle.",
    image: "assets/banners/hero_campaign_tech_1789480863521.jpg",
    primaryBtn: "DISCOVER TECH →",
    primaryLink: "#limiteddrop",
    secondaryBtn: "EXPLORE DROPS",
    secondaryLink: "#limiteddrop"
  }
];

const CATEGORIES = [
  { name: "Men", image: "assets/categories/men.jpg", type: "lifestyle", link: "#newarrivals" },
  { name: "Women", image: "assets/categories/women.jpg", type: "lifestyle", link: "#newarrivals" },
  { name: "Kids", image: "assets/banners/hero_kids_editorial.jpg", type: "lifestyle", link: "kids.html" },
  { name: "Sneakers", image: "assets/categories/sneakers.webp", type: "product", link: "#bestsellers" },
  { name: "Apparel", image: "assets/categories/apparel.jpg", type: "lifestyle", link: "#newarrivals" },
  { name: "Accessories", image: "assets/categories/accessories.jpg", type: "product", link: "#bestsellers" },
  { name: "Electronics", image: "assets/categories/electronics.jpg", type: "product", link: "#bestsellers" },
  { name: "Lifestyle", image: "assets/categories/lifestyle.jpg", type: "lifestyle", link: "#trending" }
];

const BRANDS = [
  { name: "Nike", logo: "assets/brands/nike.svg" },
  { name: "Adidas", logo: "assets/brands/adidas.svg" },
  { name: "Puma", logo: "assets/brands/puma.svg" },
  { name: "Apple", logo: "assets/brands/apple.svg" },
  { name: "Samsung", logo: "assets/brands/samsung.svg" },
  { name: "boAt", logo: "assets/brands/boat.svg" },
  { name: "Levi's", logo: "assets/brands/levis.svg" },
  { name: "Zara", logo: "assets/brands/zara.svg" },
  { name: "H&M", logo: "assets/brands/handm.svg" },
  { name: "Ray-Ban", logo: "assets/brands/rayban.svg" }
];

const PRODUCTS = [
  {
    id: "p1",
    name: "Nike Air Force 1 '07",
    brand: "Nike",
    category: "Sneakers",
    price: 9695,
    originalPrice: 10995,
    discount: "12% off",
    rating: 4.8,
    reviews: "1.2k",
    image: "assets/products/addidascampus00s.webp", // clean sneaker shot
    aspectHint: "sneaker",
    isNew: true,
    isBestSeller: true,
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: ["White/Pure Platinum", "Triple Black"],
    description: "The radiance lives on in the Nike Air Force 1 '07, the basketball icon that puts a fresh spin on what you know best: stitched overlays, bold details and the perfect amount of hoops style to make heads turn."
  },
  {
    id: "p2",
    name: "Infinite Essentials Heavyweight Hoodie",
    brand: "Infinite",
    category: "Apparel",
    price: 2499,
    originalPrice: 3999,
    discount: "38% off",
    rating: 4.6,
    reviews: "892",
    image: "assets/products/zaraWoolCoat.jpg",
    aspectHint: "portrait",
    isNew: false,
    isBestSeller: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Charcoal", "Oatmeal", "Pitch Black"],
    description: "Crafted from 480 GSM organic french terry cotton with pre-shrunk density. Features a double-lined hood, relaxed drop-shoulder drape and durable kangaroo pocket."
  },
  {
    id: "p3",
    name: "boAt Rockerz 550 Wireless Over-Ear",
    brand: "boAt",
    category: "Tech",
    price: 3999,
    originalPrice: 5999,
    discount: "33% off",
    rating: 4.5,
    reviews: "3.1k",
    image: "assets/products/boatheadphones.jpg",
    aspectHint: "square",
    isNew: false,
    isBestSeller: true,
    sizes: ["Standard"],
    colors: ["Matte Black", "Army Green"],
    description: "Equipped with 50mm dynamic drivers for crisp acoustic clarity and deep bass. Up to 20 hours playback with physical playback dials and ultra-soft memory foam ear cushions."
  },
  {
    id: "p4",
    name: "Apple Watch Series 10 (GPS + Cellular)",
    brand: "Apple",
    category: "Tech",
    price: 41900,
    originalPrice: 46900,
    discount: "11% off",
    rating: 4.7,
    reviews: "2.4k",
    image: "assets/banners/campaign_tech_editorial_1789480985992.jpg",
    aspectHint: "square",
    isNew: true,
    isBestSeller: true,
    sizes: ["42mm", "46mm"],
    colors: ["Jet Black", "Silver Aluminium", "Rose Gold"],
    description: "The thinnest Apple Watch ever with the biggest display yet. Advanced health insights including ECG and sleep apnea tracking with ultra-fast charging capability."
  },
  {
    id: "p5",
    name: "Puma Core Urban Stream Backpack",
    brand: "Puma",
    category: "Men",
    price: 1799,
    originalPrice: 2499,
    discount: "28% off",
    rating: 4.4,
    reviews: "768",
    image: "assets/products/pumabackpack.jpg",
    aspectHint: "portrait",
    isNew: false,
    isBestSeller: true,
    sizes: ["26L Capacity"],
    colors: ["Black Camo", "Graphite"],
    description: "Everyday urban backpack engineered with high-density ballistic polyester. Features dedicated padded laptop compartment up to 16-inch and ergonomic mesh shoulder straps."
  },
  {
    id: "p6",
    name: "Adidas Originals Campus 00s",
    brand: "Adidas",
    category: "Sneakers",
    price: 8999,
    originalPrice: 10999,
    discount: "18% off",
    rating: 4.6,
    reviews: "1.1k",
    image: "assets/products/addidascampus00s.webp",
    aspectHint: "sneaker",
    isNew: true,
    isBestSeller: true,
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
    colors: ["Core Black / Cloud White", "Grey Three"],
    description: "Rooted in skateboarding heritage, these sneakers revamp the iconic Campus silhouette with chunky 2000s proportions, rich suede upper and retro branding."
  },
  {
    id: "p7",
    name: "Levi's Type III Sherpa Trucker Jacket",
    brand: "Levi's",
    category: "Men",
    price: 5499,
    originalPrice: 7999,
    discount: "31% off",
    rating: 4.7,
    reviews: "540",
    image: "assets/products/levi's sherpa.jpg",
    aspectHint: "portrait",
    isNew: true,
    isBestSeller: false,
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Washed Denim", "Black Corduroy"],
    description: "The classic American silhouette lined with cozy sherpa insulation. Features welt side pockets, snap-flap chest pockets and adjustable waist tabs."
  },
  {
    id: "p8",
    name: "Adidas Ultraboost Light 23 Running Shoes",
    brand: "Adidas",
    category: "Sneakers",
    price: 13999,
    originalPrice: 18999,
    discount: "26% off",
    rating: 4.8,
    reviews: "950",
    image: "assets/products/addidasultraboost.jpg",
    aspectHint: "sneaker",
    isNew: true,
    isBestSeller: false,
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: ["Core Black / Solar Red", "Cloud White"],
    description: "Experience epic energy return with Light BOOST material, 30% lighter than previous generations. Continental rubber outsole delivers peerless wet and dry grip."
  },
  {
    id: "p9",
    name: "Zara Wool Blend Tailored Overcoat",
    brand: "Zara",
    category: "Women",
    price: 8990,
    originalPrice: 11990,
    discount: "25% off",
    rating: 4.7,
    reviews: "420",
    image: "assets/products/zaraWoolCoat.jpg",
    aspectHint: "portrait",
    isNew: true,
    isBestSeller: false,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Camel", "Charcoal Grey"],
    description: "Spun from a structured Italian wool blend. Features sharp notch lapels, structured shoulders, front welt pockets and single-button closure."
  },
  {
    id: "p10",
    name: "Cyber/Edge 001 Holographic Sneaker (Limited)",
    brand: "Infinite Lab",
    category: "Sneakers",
    price: 18999,
    originalPrice: 24999,
    discount: "24% off",
    rating: 4.9,
    reviews: "320",
    image: "assets/products/limited-drop.jpg",
    aspectHint: "square",
    isNew: true,
    isBestSeller: false,
    sizes: ["UK 8", "UK 9", "UK 10"],
    colors: ["Iridescent Cyber Black"],
    description: "Individual numbered edition limited to 300 pairs worldwide. Sculpted dual-density carbon plate with translucent caged knit and adaptive lacing harness."
  },
  {
    id: "pk1",
    name: "Nike Air Max Pulse Kids (Flyer Edition)",
    brand: "Nike",
    category: "Kids",
    subCategory: "Sneakers",
    ageGroup: "Big Kids",
    price: 4995,
    originalPrice: 6495,
    discount: "23% off",
    rating: 4.9,
    reviews: "512",
    image: "assets/products/kids_airmax.jpg",
    aspectHint: "sneaker",
    isNew: true,
    isBestSeller: true,
    badge: "⚡ FEATHERLIGHT AIR",
    sizes: ["UK 1K", "UK 2K", "UK 3K", "UK 4K", "UK 5K"],
    colors: ["Volt / Coral Neon", "Triple Stealth Black"],
    description: "Built for all-day playground energy and track sprints. Features responsive Air bubble cushioning, reinforced toe-guards against scuffs, and breathable honeycomb mesh."
  },
  {
    id: "pk2",
    name: "Adidas Originals Superstar Kids 360",
    brand: "Adidas",
    category: "Kids",
    subCategory: "Sneakers",
    ageGroup: "Little Kids",
    price: 3599,
    originalPrice: 4599,
    discount: "22% off",
    rating: 4.8,
    reviews: "389",
    image: "assets/products/addidascampus00s.webp",
    aspectHint: "sneaker",
    isNew: false,
    isBestSeller: true,
    badge: "👟 EASY SLIP-ON",
    sizes: ["UK 10C", "UK 11C", "UK 12C", "UK 13C", "UK 1K", "UK 2K"],
    colors: ["Cloud White / Core Black", "Collegiate Green"],
    description: "The iconic shell-toe redesigned with ultra-flexible EVA deep-groove outsoles and a stretch-mesh slip-on build. No laces needed — easy on and off for active mornings."
  },
  {
    id: "pk3",
    name: "Puma Squad Kids Tech Fleece Set",
    brand: "Puma",
    category: "Kids",
    subCategory: "Tracksuits",
    ageGroup: "Big Kids",
    price: 2999,
    originalPrice: 4299,
    discount: "30% off",
    rating: 4.7,
    reviews: "264",
    image: "assets/banners/campaign_apparel_editorial_1789480944172.jpg",
    aspectHint: "portrait",
    isNew: true,
    isBestSeller: true,
    badge: "🔥 THERMAL FLEECE",
    sizes: ["6Y", "8Y", "10Y", "12Y", "14Y"],
    colors: ["Cyber Charcoal", "Volt Track Heather"],
    description: "Premium cotton-poly French terry hoodie and tapered jogger combo. Ribbed ankle cuffs keep kicks clean while reflective 3M safety piping ensures twilight visibility."
  },
  {
    id: "pk4",
    name: "Jordan Jumpman Kids Flight Backpack",
    brand: "Jordan",
    category: "Kids",
    subCategory: "Backpacks",
    ageGroup: "Big Kids",
    price: 2299,
    originalPrice: 3199,
    discount: "28% off",
    rating: 4.9,
    reviews: "410",
    image: "assets/products/pumabackpack.jpg",
    aspectHint: "square",
    isNew: true,
    isBestSeller: true,
    badge: "🎒 600D WATERPROOF",
    sizes: ["Standard Kids (18L)"],
    colors: ["Bred Red / Matte Black", "Royal Blue"],
    description: "Heavy-duty 600D ballistic polyester with water-resistant coating. Features ergonomic S-curve padded shoulder straps, dual mesh water bottle holsters, and a padded tablet sleeve."
  },
  {
    id: "pk5",
    name: "Zara Kids Technical Hooded Windbreaker",
    brand: "Zara",
    category: "Kids",
    subCategory: "Jackets",
    ageGroup: "Little Kids",
    price: 2490,
    originalPrice: 3590,
    discount: "31% off",
    rating: 4.6,
    reviews: "178",
    image: "assets/banners/trending_street_essentials_1789481025145.jpg",
    aspectHint: "portrait",
    isNew: false,
    isBestSeller: false,
    badge: "🌧️ ALL-WEATHER",
    sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
    colors: ["Cobalt Blue / Volt", "Sandstone Grey"],
    description: "Lightweight ripstop shell engineered to block high winds and light rain. Breathable mesh inner lining, storm-flap chin guard, and packable into its own pocket."
  },
  {
    id: "pk6",
    name: "Nike Sportswear Club Graphic Tee (2-Pack)",
    brand: "Nike",
    category: "Kids",
    subCategory: "Apparel",
    ageGroup: "Teens",
    price: 1595,
    originalPrice: 2295,
    discount: "30% off",
    rating: 4.8,
    reviews: "630",
    image: "assets/banners/cat_men_1789481276968.jpg",
    aspectHint: "portrait",
    isNew: false,
    isBestSeller: true,
    badge: "🌿 100% ORGANIC COTTON",
    sizes: ["10Y", "12Y", "14Y", "16Y"],
    colors: ["White / Black Combo", "Volt / Heather Grey Combo"],
    description: "Everyday relaxed fit crewneck t-shirts in pre-washed 180 GSM combed organic cotton. Reinforced flatlock shoulder seams survive recess and sports drills."
  },
  {
    id: "pk7",
    name: "boAt Wave Junior Smartwatch for Kids",
    brand: "boAt",
    category: "Kids",
    subCategory: "Tech",
    ageGroup: "Big Kids",
    price: 1999,
    originalPrice: 3999,
    discount: "50% off",
    rating: 4.5,
    reviews: "820",
    image: "assets/banners/campaign_tech_editorial_1789480985992.jpg",
    aspectHint: "square",
    isNew: true,
    isBestSeller: true,
    badge: "📍 GPS SAFETY GEO-FENCE",
    sizes: ["Adjustable Kids Strap"],
    colors: ["Cyber Teal", "Bubble Pink", "Neon Lime"],
    description: "Parent companion app connectivity with real-time GPS safety zones, SOS one-touch dial, fun step challenge games, 10-day battery life, and IP68 waterproof rating."
  },
  {
    id: "pk8",
    name: "Levi's Kids Heritage Denim Trucker Jacket",
    brand: "Levi's",
    category: "Kids",
    subCategory: "Jackets",
    ageGroup: "Teens",
    price: 3299,
    originalPrice: 4599,
    discount: "28% off",
    rating: 4.9,
    reviews: "215",
    image: "assets/products/levi's sherpa.jpg",
    aspectHint: "portrait",
    isNew: true,
    isBestSeller: false,
    badge: "⭐ TIMELESS ICON",
    sizes: ["8Y", "10Y", "12Y", "14Y", "16Y"],
    colors: ["Classic Stonewash", "Dark Indigo"],
    description: "Classic American style scaled down for youth. Durable non-stretch cotton denim with button-flap chest pockets and side welt pockets. Built to last through sibling hand-me-downs."
  },
  {
    id: "pk9",
    name: "Nike Dynamo Free Toddler Slip-On",
    brand: "Nike",
    category: "Kids",
    subCategory: "Sneakers",
    ageGroup: "Toddler",
    price: 2795,
    originalPrice: 3495,
    discount: "20% off",
    rating: 4.9,
    reviews: "340",
    image: "assets/products/kids_airmax.jpg",
    aspectHint: "sneaker",
    isNew: false,
    isBestSeller: true,
    badge: "👶 FIRST STEPS FLEX",
    sizes: ["UK 4C", "UK 5C", "UK 6C", "UK 7C", "UK 8C", "UK 9C"],
    colors: ["Sunset Coral / Volt", "Royal Blue / Lime"],
    description: "Wavy ribbed rubber overlays give natural stability and flexibility for toddlers learning to sprint, jump, and climb. Slip-on design with pull tabs at heel and tongue."
  }
];

// ==========================================================================
// 2. STATE MANAGEMENT (Wishlist & Cart via localStorage)
// ==========================================================================

const State = {
  wishlist: JSON.parse(localStorage.getItem('infinitymax_wishlist') || '[]'),
  cart: JSON.parse(localStorage.getItem('infinitymax_cart') || '[]'),
  currentSlide: 0,
  heroTimer: null,
  activeFilter: 'All'
};

function saveWishlist() {
  localStorage.setItem('infinitymax_wishlist', JSON.stringify(State.wishlist));
  updateWishlistUI();
}

function saveCart() {
  localStorage.setItem('infinitymax_cart', JSON.stringify(State.cart));
  updateCartUI();
}

// ==========================================================================
// 3. UI INITIALIZATION & EVENT LISTENERS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initHeroSlider();
  initCategoryCarousel();
  initBrandCarousel();
  initBestSellers();
  initNewArrivals();
  initLimitedDropCountdown();
  initSearch();
  initCartDrawer();
  initQuickViewModal();
  initNewsletter();
  initBackToTop();
  updateWishlistUI();
  updateCartUI();
});

// ==========================================================================
// 4. HEADER & NAVIGATION (Scroll states, mobile menu)
// ==========================================================================

function initHeader() {
  const header = document.querySelector('.site-header');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileNavClose = document.getElementById('mobileNavClose');

  // Scroll detection
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile drawer controls
  function openMobileNav() {
    mobileNavDrawer.classList.add('open');
    mobileNavBackdrop.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeMobileNav() {
    mobileNavDrawer.classList.remove('open');
    mobileNavBackdrop.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileNav);
  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
  if (mobileNavBackdrop) mobileNavBackdrop.addEventListener('click', closeMobileNav);

  // Close when clicking nav links in mobile drawer
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });
}

// ==========================================================================
// 5. HERO CAROUSEL
// ==========================================================================

function initHeroSlider() {
  const sliderTrack = document.getElementById('heroSliderTrack');
  const heroContent = document.getElementById('heroContent');
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');
  const counterEl = document.getElementById('heroCounter');

  if (!sliderTrack || !heroContent) return;

  // Build slides
  sliderTrack.innerHTML = HERO_SLIDES.map((slide, index) => `
    <div class="hero-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
      <div class="hero-slide-bg">
        <img src="${slide.image}" alt="${slide.eyebrow}" loading="${index === 0 ? 'eager' : 'lazy'}">
      </div>
      <div class="hero-overlay"></div>
    </div>
  `).join('');

  function renderSlideContent(index) {
    const s = HERO_SLIDES[index];
    heroContent.innerHTML = `
      <span class="hero-eyebrow">${s.eyebrow}</span>
      <h1 class="hero-headline">${s.headline}</h1>
      <p class="hero-description">${s.description}</p>
      <div class="hero-buttons">
        <a href="${s.primaryLink}" class="btn btn-primary">${s.primaryBtn}</a>
        <a href="${s.secondaryLink}" class="btn btn-outline">${s.secondaryBtn}</a>
      </div>
    `;

    if (counterEl) {
      counterEl.textContent = `0${index + 1} / 0${HERO_SLIDES.length}`;
    }

    const slides = sliderTrack.querySelectorAll('.hero-slide');
    slides.forEach((sl, i) => {
      sl.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    State.currentSlide = (State.currentSlide + 1) % HERO_SLIDES.length;
    renderSlideContent(State.currentSlide);
  }

  function prevSlide() {
    State.currentSlide = (State.currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
    renderSlideContent(State.currentSlide);
  }

  function startAutoPlay() {
    stopAutoPlay();
    State.heroTimer = setInterval(nextSlide, 7000);
  }

  function stopAutoPlay() {
    if (State.heroTimer) clearInterval(State.heroTimer);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoPlay();
    });
  }

  renderSlideContent(0);
  startAutoPlay();
}

// ==========================================================================
// 6. CATEGORIES & BRANDS CAROUSEL
// ==========================================================================

function initCategoryCarousel() {
  const track = document.getElementById('categoryTrack');
  const prevBtn = document.getElementById('categoryPrevBtn');
  const nextBtn = document.getElementById('categoryNextBtn');
  if (!track) return;

  track.innerHTML = CATEGORIES.map(cat => {
    const isProduct = cat.type === 'product';
    return `
      <a href="${cat.link}" class="category-card" aria-label="Shop ${cat.name}">
        <div class="category-img-container ${isProduct ? 'is-product' : 'is-lifestyle'}">
          <img 
            src="${cat.image}" 
            alt="${cat.name}" 
            class="${isProduct ? 'category-product-img' : 'category-lifestyle-img'}" 
            loading="lazy"
            decoding="async"
          >
        </div>
        <div class="category-info">
          <span class="category-name">${cat.name}</span>
          <span class="category-arrow-btn" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </a>
    `;
  }).join('');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -280, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: 280, behavior: 'smooth' });
    });
  }
}

function initBrandCarousel() {
  const track = document.getElementById('brandsTrack');
  if (!track) return;

  track.innerHTML = BRANDS.map(brand => `
    <div class="brand-card" title="${brand.name}" tabindex="0" role="button" aria-label="${brand.name}">
      <img src="${brand.logo}" alt="${brand.name}" loading="lazy">
    </div>
  `).join('');
}

// ==========================================================================
// 7. PRODUCT CARD CREATION SYSTEM (Respects natural image proportions)
// ==========================================================================

function createProductCardHTML(p) {
  const isWishlisted = State.wishlist.includes(p.id);
  const formattedPrice = `₹${p.price.toLocaleString('en-IN')}`;
  const formattedOriginalPrice = p.originalPrice ? `₹${p.originalPrice.toLocaleString('en-IN')}` : '';

  // Check if image is lifestyle editorial photo vs studio product shot
  const isLifestyle = p.id === 'p2' || p.id === 'p4' || p.id === 'p9' || p.aspectHint === 'portrait';

  return `
    <div class="product-card" data-product-id="${p.id}">
      <div class="product-image-box ${isLifestyle ? 'is-lifestyle-photo' : 'is-studio-product'}">
        ${p.isNew ? '<span class="badge-tag badge-new">NEW</span>' : ''}
        ${!p.isNew && p.discount ? `<span class="badge-tag badge-discount">${p.discount}</span>` : ''}
        
        <button class="btn-wishlist-toggle ${isWishlisted ? 'active' : ''}" data-id="${p.id}" aria-label="Wishlist ${p.name}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async">

        <div class="quick-view-overlay">
          <button class="btn-quick-view" data-id="${p.id}">Quick View</button>
        </div>
      </div>

      <div class="product-info-box">
        <span class="product-brand">${p.brand}</span>
        <h3 class="product-title" title="${p.name}">${p.name}</h3>

        <div class="product-rating">
          <svg class="star-icon" viewBox="0 0 24 24">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span>${p.rating}</span>
          <span class="review-count">(${p.reviews})</span>
        </div>

        <div class="product-pricing-box">
          <span class="current-price">${formattedPrice}</span>
          ${formattedOriginalPrice ? `<span class="original-price">${formattedOriginalPrice}</span>` : ''}
          ${p.discount ? `<span class="discount-tag">${p.discount}</span>` : ''}
        </div>

        <button class="btn-add-bag" data-id="${p.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          Add to Bag
        </button>
      </div>
    </div>
  `;
}

// ==========================================================================
// 8. BEST SELLERS & NEW ARRIVALS
// ==========================================================================

function initBestSellers() {
  const track = document.getElementById('bestSellersTrack');
  const prevBtn = document.getElementById('bestSellersPrev');
  const nextBtn = document.getElementById('bestSellersNext');

  if (!track) return;

  const bestSellers = PRODUCTS.filter(p => p.isBestSeller);
  track.innerHTML = bestSellers.map(createProductCardHTML).join('');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -320, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }

  attachCardEventListeners(track);
}

function initNewArrivals() {
  const grid = document.getElementById('newArrivalsGrid');
  const tabBtns = document.querySelectorAll('.filter-tab');

  if (!grid) return;

  function renderFiltered(category) {
    State.activeFilter = category;
    let filtered = PRODUCTS;
    if (category !== 'All') {
      filtered = PRODUCTS.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (filtered.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-tertiary);">No products found in this category.</div>`;
      return;
    }

    grid.innerHTML = filtered.map(createProductCardHTML).join('');
    attachCardEventListeners(grid);
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderFiltered(filter);
    });
  });

  renderFiltered('All');
}

function attachCardEventListeners(container) {
  // Wishlist toggle
  container.querySelectorAll('.btn-wishlist-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      toggleWishlist(id);
    });
  });

  // Quick View
  container.querySelectorAll('.btn-quick-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      openQuickView(id);
    });
  });

  // Add to Bag
  container.querySelectorAll('.btn-add-bag').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      addToCart(id);
    });
  });
}

// ==========================================================================
// 9. WISHLIST & CART OPERATIONS
// ==========================================================================

function toggleWishlist(productId) {
  const idx = State.wishlist.indexOf(productId);
  const prod = PRODUCTS.find(p => p.id === productId);

  if (idx > -1) {
    State.wishlist.splice(idx, 1);
    showToast(`Removed ${prod?.name || 'item'} from Wishlist`);
  } else {
    State.wishlist.push(productId);
    showToast(`Added ${prod?.name || 'item'} to Wishlist`);
  }
  saveWishlist();

  // Sync any visible heart buttons
  document.querySelectorAll(`.btn-wishlist-toggle[data-id="${productId}"]`).forEach(btn => {
    btn.classList.toggle('active', State.wishlist.includes(productId));
  });
}

function updateWishlistUI() {
  const countBadges = document.querySelectorAll('.wishlist-count-badge');
  const count = State.wishlist.length;
  countBadges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

function addToCart(productId, size = null, qty = 1) {
  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  const chosenSize = size || (prod.sizes && prod.sizes.length > 0 ? prod.sizes[0] : 'Standard');
  const existingIndex = State.cart.findIndex(item => item.id === productId && item.size === chosenSize);

  if (existingIndex > -1) {
    State.cart[existingIndex].quantity += qty;
  } else {
    State.cart.push({
      id: prod.id,
      name: prod.name,
      brand: prod.brand,
      price: prod.price,
      image: prod.image,
      size: chosenSize,
      quantity: qty
    });
  }

  saveCart();
  showToast(`Added ${prod.name} to Cart`);
  openCartDrawer();
}

function removeFromCart(index) {
  State.cart.splice(index, 1);
  saveCart();
}

function updateCartItemQty(index, delta) {
  if (!State.cart[index]) return;
  State.cart[index].quantity += delta;
  if (State.cart[index].quantity <= 0) {
    removeFromCart(index);
  } else {
    saveCart();
  }
}

function updateCartUI() {
  const countBadges = document.querySelectorAll('.cart-count-badge');
  const totalCount = State.cart.reduce((acc, item) => acc + item.quantity, 0);

  countBadges.forEach(badge => {
    badge.textContent = totalCount;
    badge.style.display = totalCount > 0 ? 'flex' : 'none';
  });

  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartTotalEl = document.getElementById('cartTotal');

  if (!cartItemsContainer) return;

  if (State.cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <p style="font-weight: 600; font-size: 1rem; color: #ffffff; margin-bottom: 6px;">Your bag is empty</p>
        <p style="font-size: 0.85rem;">Discover new drops and add them here.</p>
      </div>
    `;
    if (cartSubtotalEl) cartSubtotalEl.textContent = '₹0';
    if (cartTotalEl) cartTotalEl.textContent = '₹0';
    return;
  }

  let subtotal = 0;
  cartItemsContainer.innerHTML = State.cart.map((item, index) => {
    subtotal += item.price * item.quantity;
    return `
      <div class="cart-item">
        <div class="cart-item-thumb">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <span class="cart-item-brand">${item.brand}</span>
          <span class="cart-item-name">${item.name}</span>
          <span style="font-size: 0.76rem; color: var(--text-tertiary); margin-bottom: 4px;">Size: ${item.size}</span>
          <span class="cart-item-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>

          <div class="cart-item-ctrls">
            <div class="cart-qty-picker">
              <button class="qty-btn" onclick="updateCartItemQty(${index}, -1)" aria-label="Decrease quantity">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn" onclick="updateCartItemQty(${index}, 1)" aria-label="Increase quantity">+</button>
            </div>
            <button class="cart-remove-btn" onclick="removeFromCart(${index})">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const delivery = subtotal > 999 ? 0 : 99;
  const total = subtotal + delivery;

  if (cartSubtotalEl) cartSubtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  if (cartTotalEl) cartTotalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
}

// ==========================================================================
// 10. CART DRAWER TOGGLE
// ==========================================================================

function initCartDrawer() {
  const openBtns = document.querySelectorAll('.open-cart-btn');
  const closeBtn = document.getElementById('cartCloseBtn');
  const backdrop = document.getElementById('cartBackdrop');
  const drawer = document.getElementById('cartDrawer');

  openBtns.forEach(btn => btn.addEventListener('click', openCartDrawer));
  if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
  if (backdrop) backdrop.addEventListener('click', closeCartDrawer);
}

function openCartDrawer() {
  const backdrop = document.getElementById('cartBackdrop');
  const drawer = document.getElementById('cartDrawer');
  if (backdrop && drawer) {
    backdrop.classList.add('active');
    drawer.classList.add('open');
    document.body.classList.add('cart-open');
  }
}

function closeCartDrawer() {
  const backdrop = document.getElementById('cartBackdrop');
  const drawer = document.getElementById('cartDrawer');
  if (backdrop && drawer) {
    backdrop.classList.remove('active');
    drawer.classList.remove('open');
    document.body.classList.remove('cart-open');
  }
}

// ==========================================================================
// 11. QUICK VIEW MODAL
// ==========================================================================

function initQuickViewModal() {
  const backdrop = document.getElementById('quickViewBackdrop');
  const closeBtn = document.getElementById('quickViewClose');

  if (closeBtn) closeBtn.addEventListener('click', closeQuickView);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeQuickView();
    });
  }

  // Escape key closes modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuickView();
      closeCartDrawer();
    }
  });
}

function openQuickView(productId) {
  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  const backdrop = document.getElementById('quickViewBackdrop');
  const container = document.getElementById('quickViewContent');
  if (!backdrop || !container) return;

  let selectedSize = prod.sizes && prod.sizes.length > 0 ? prod.sizes[0] : 'Standard';

  container.innerHTML = `
    <div class="quickview-grid">
      <div class="quickview-gallery">
        <img src="${prod.image}" alt="${prod.name}">
      </div>
      <div class="quickview-details">
        <span class="qv-brand">${prod.brand}</span>
        <h2 class="qv-title">${prod.name}</h2>

        <div class="qv-rating">
          <svg class="star-icon" viewBox="0 0 24 24">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span>${prod.rating}</span>
          <span style="color: var(--text-tertiary);">(${prod.reviews} reviews)</span>
        </div>

        <div class="qv-prices">
          <span class="qv-price">₹${prod.price.toLocaleString('en-IN')}</span>
          ${prod.originalPrice ? `<span class="qv-original">₹${prod.originalPrice.toLocaleString('en-IN')}</span>` : ''}
          ${prod.discount ? `<span class="discount-tag">${prod.discount}</span>` : ''}
        </div>

        <p style="font-size: 0.88rem; color: #d4d4d8; line-height: 1.5; margin-bottom: 20px;">
          ${prod.description}
        </p>

        <div class="qv-option-label">Select Size</div>
        <div class="qv-sizes-row" id="qvSizesRow">
          ${(prod.sizes || []).map(sz => `
            <button class="size-pill ${sz === selectedSize ? 'selected' : ''}" data-size="${sz}">${sz}</button>
          `).join('')}
        </div>

        <div class="qv-action-btns">
          <button class="btn btn-primary" id="qvAddBagBtn" style="flex: 1;">ADD TO BAG</button>
          <button class="btn btn-outline" id="qvBuyNowBtn">BUY NOW</button>
        </div>
      </div>
    </div>
  `;

  // Size click handling
  const sizePills = container.querySelectorAll('.size-pill');
  sizePills.forEach(pill => {
    pill.addEventListener('click', () => {
      sizePills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      selectedSize = pill.getAttribute('data-size');
    });
  });

  // Action buttons
  const addBagBtn = container.querySelector('#qvAddBagBtn');
  const buyNowBtn = container.querySelector('#qvBuyNowBtn');

  if (addBagBtn) {
    addBagBtn.addEventListener('click', () => {
      addToCart(prod.id, selectedSize, 1);
      closeQuickView();
    });
  }

  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      addToCart(prod.id, selectedSize, 1);
      closeQuickView();
      openCartDrawer();
    });
  }

  backdrop.classList.add('active');
  document.body.classList.add('modal-open');
}

function closeQuickView() {
  const backdrop = document.getElementById('quickViewBackdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
}

// ==========================================================================
// 12. LIMITED DROP COUNTDOWN TIMER
// ==========================================================================

function initLimitedDropCountdown() {
  const hoursEl = document.getElementById('dropHours');
  const minsEl = document.getElementById('dropMins');
  const secsEl = document.getElementById('dropSecs');

  if (!hoursEl || !minsEl || !secsEl) return;

  // 8 hours, 42 mins, 19 seconds target
  let totalSeconds = (8 * 3600) + (42 * 60) + 19;

  function tick() {
    if (totalSeconds <= 0) {
      totalSeconds = 24 * 3600; // loop
    }
    totalSeconds--;

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);

  const shopDropBtn = document.getElementById('shopDropBtn');
  if (shopDropBtn) {
    shopDropBtn.addEventListener('click', () => {
      openQuickView('p10');
    });
  }
}

// ==========================================================================
// 13. SEARCH & REAL-TIME SUGGESTIONS
// ==========================================================================

function initSearch() {
  const searchInput = document.getElementById('headerSearchInput');
  const searchDropdown = document.getElementById('searchDropdown');
  const searchResultsWrap = document.getElementById('searchResultsWrap');
  const searchClearBtn = document.getElementById('searchClearBtn');

  if (!searchInput || !searchDropdown) return;

  // Open dropdown on focus
  searchInput.addEventListener('focus', () => {
    searchDropdown.classList.add('open');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-search')) {
      searchDropdown.classList.remove('open');
    }
  });

  // Real-time filtering
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    if (query.length > 0) {
      if (searchClearBtn) searchClearBtn.classList.add('active');

      const matches = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );

      if (matches.length > 0) {
        searchResultsWrap.innerHTML = `
          <div class="dropdown-section-title">Products (${matches.length})</div>
          <div class="search-live-results">
            ${matches.map(m => `
              <div class="search-result-item" data-id="${m.id}">
                <img src="${m.image}" class="search-result-thumb" alt="${m.name}">
                <div class="search-result-info">
                  <div class="search-result-name">${m.name}</div>
                  <div class="search-result-meta">
                    <span>${m.brand}</span> • <span>₹${m.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `;

        searchResultsWrap.querySelectorAll('.search-result-item').forEach(item => {
          item.addEventListener('click', () => {
            const id = item.getAttribute('data-id');
            searchDropdown.classList.remove('open');
            openQuickView(id);
          });
        });
      } else {
        searchResultsWrap.innerHTML = `
          <div style="padding: 16px; font-size: 0.85rem; color: var(--text-tertiary); text-align: center;">
            No matching products found for "${query}".
          </div>
        `;
      }
    } else {
      if (searchClearBtn) searchClearBtn.classList.remove('active');
      renderDefaultSearchDropdown();
    }
  });

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchClearBtn.classList.remove('active');
      renderDefaultSearchDropdown();
      searchInput.focus();
    });
  }

  // Clicking on suggestion tags
  document.querySelectorAll('.search-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      searchInput.value = tag.textContent.trim();
      searchInput.dispatchEvent(new Event('input'));
    });
  });

  function renderDefaultSearchDropdown() {
    searchResultsWrap.innerHTML = `
      <div class="search-dropdown-section">
        <div class="dropdown-section-title">Trending Searches</div>
        <div class="search-tags">
          <button class="search-tag">Nike Air Force</button>
          <button class="search-tag">Adidas Campus</button>
          <button class="search-tag">Heavyweight Hoodie</button>
          <button class="search-tag">Apple Watch</button>
          <button class="search-tag">Overcoat</button>
        </div>
      </div>
      <div class="search-dropdown-section">
        <div class="dropdown-section-title">Popular Brands</div>
        <div class="search-tags">
          <button class="search-tag">Nike</button>
          <button class="search-tag">Adidas</button>
          <button class="search-tag">Apple</button>
          <button class="search-tag">Zara</button>
          <button class="search-tag">Puma</button>
        </div>
      </div>
    `;

    searchResultsWrap.querySelectorAll('.search-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        searchInput.value = tag.textContent.trim();
        searchInput.dispatchEvent(new Event('input'));
      });
    });
  }
}

// ==========================================================================
// 14. NEWSLETTER FORM VALIDATION
// ==========================================================================

function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  const input = document.getElementById('newsletterInput');
  const msg = document.getElementById('newsletterMsg');

  if (!form || !input || !msg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      msg.textContent = 'Please enter a valid email address.';
      msg.className = 'newsletter-msg error';
      input.focus();
      return;
    }

    // Success
    msg.textContent = 'Thank you for subscribing! You are on the drop list.';
    msg.className = 'newsletter-msg success';
    input.value = '';

    setTimeout(() => {
      msg.style.display = 'none';
      msg.className = 'newsletter-msg';
    }, 5000);
  });
}

// ==========================================================================
// 15. BACK TO TOP BUTTON & TOAST NOTIFICATION SYSTEM
// ==========================================================================

function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 300ms ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ==========================================================================
// 16. SECURE CHECKOUT FLOW (Connects Cart to Order Tracking Page)
// ==========================================================================

function proceedToCheckout() {
  if (!State.cart || State.cart.length === 0) {
    showToast('Your bag is empty! Add products before checkout.');
    return;
  }

  const subtotal = State.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxes = Math.round(subtotal * 0.045);
  const total = subtotal + taxes;
  const orderNum = 'PU-2026-' + Math.floor(10000 + Math.random() * 90000);

  const formattedItems = State.cart.map(item => ({
    id: item.id,
    name: item.name,
    brand: item.brand,
    category: "Apparel & Accessories",
    price: item.price,
    quantity: item.quantity,
    variant: "Standard Edition",
    size: item.size || "M",
    image: item.image
  }));

  const newOrder = {
    orderNumber: orderNum,
    status: "CONFIRMED",
    orderDate: "15 September 2026",
    orderTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    estimatedDelivery: "18–20 September 2026",
    carrier: "Delhivery Express Logistics",
    trackingId: "TRK" + Math.floor(100000000 + Math.random() * 900000000),
    paymentStatus: "Paid",
    paymentMethod: "UPI (Express Checkout)",
    paymentCardMask: "UPI ID: user@okaxis",
    transactionId: "TXN" + Date.now(),
    address: {
      name: "NOVA",
      street: "123 Example Street, Suite 4B",
      locality: "Vasant Kunj",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110070",
      country: "India",
      phone: "+91 98765 43210"
    },
    items: formattedItems,
    pricing: {
      subtotal: subtotal,
      discount: 0,
      delivery: 0,
      taxes: taxes,
      total: total
    },
    timeline: [
      {
        stepKey: "ORDER_PLACED",
        title: "ORDER PLACED",
        date: "15 Sep 2026",
        time: "Just now",
        location: "New Delhi",
        description: "Your order has been placed and received by our system.",
        completed: true
      },
      {
        stepKey: "CONFIRMED",
        title: "CONFIRMED",
        date: "15 Sep 2026",
        time: "Just now",
        location: "New Delhi Central Hub",
        description: "Payment confirmed via Google Pay. Queueing for fulfillment.",
        completed: true
      },
      {
        stepKey: "PACKED",
        title: "PACKED",
        date: "16 Sep 2026",
        time: "Expected 02:00 PM",
        location: "Fulfillment Center",
        description: "Items quality-inspected and sealed for logistics.",
        completed: false
      },
      {
        stepKey: "SHIPPED",
        title: "SHIPPED",
        date: "17 Sep 2026",
        time: "Expected 08:30 AM",
        location: "Regional Sorting Hub",
        description: "Package handed over to logistics partner.",
        completed: false
      },
      {
        stepKey: "OUT_FOR_DELIVERY",
        title: "OUT FOR DELIVERY",
        date: "18 Sep 2026",
        time: "Expected 09:00 AM",
        location: "Local Destination Facility",
        description: "Package en route with local delivery executive.",
        completed: false
      },
      {
        stepKey: "DELIVERED",
        title: "DELIVERED",
        date: "18 Sep 2026",
        time: "Expected 02:00 PM",
        location: "Destination Address",
        description: "Package delivered safely.",
        completed: false
      }
    ],
    cancelledData: {
      refundStatus: "Initiated to Original Payment Source",
      refundAmount: total,
      cancelDate: "16 Sep 2026",
      reason: "Requested by customer prior to shipment dispatch"
    },
    returnTimeline: [
      { title: "Return Requested", date: "19 Sep 2026 • 11:30 AM", desc: "Return request submitted.", done: true },
      { title: "Pickup Scheduled", date: "20 Sep 2026 • 10:00 AM - 02:00 PM", desc: "Courier partner assigned for doorstep pickup.", done: true },
      { title: "Item Picked Up", date: "20 Sep 2026 • 01:15 PM", desc: "Package handed over to pickup executive.", done: true },
      { title: "Quality Check", date: "21 Sep 2026 • 04:00 PM", desc: "Item arrived at warehouse and passed condition check.", done: true },
      { title: "Refund Initiated", date: "21 Sep 2026 • 04:30 PM", desc: "Refund processed to original UPI account.", done: true },
      { title: "Refund Completed", date: "22 Sep 2026 • 09:10 AM", desc: "Transaction confirmed by bank.", done: true }
    ]
  };

  localStorage.setItem('infinitymax_currentOrder', JSON.stringify(newOrder));
  State.cart = [];
  saveCart();
  window.location.href = "order.html";
}

