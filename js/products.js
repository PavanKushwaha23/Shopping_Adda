
const PRODUCTS_DATA = [
  {
    id: "prod-1",
    name: "Aura Noise-Cancelling Wireless Headphones",
    category: "Electronics",
    price: 749.99,
    originalPrice: 790.99,
    discount: 24,
    rating: 4.8,
    reviewsCount: 142,
    stock: 18,
    isFeatured: true,
    isTrending: true,
    isFlashDeal: true,
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80",
    ],
    colors: ["#1e293b", "#e2e8f0", "#94a3b8"],
    colorNames: ["Midnight Black", "Platinum Silver", "Slate Gray"],
    sizes: ["Standard"],
    description:
      "Immerse yourself in pure studio-grade acoustics with advanced hybrid active noise cancellation, 40-hour battery life, and ultra-plush memory foam earcups.",
    specs: {
      "Driver Size": "40mm Dynamic Drivers",
      "Battery Life": "40 Hours (ANC On)",
      Connectivity: "Bluetooth 5.3 + 3.5mm Aux",
      Weight: "250g",
      Warranty: "2 Years International",
    },
    reviews: [
      {
        name: "Bharti Sharma",
        rating: 5,
        date: "2026-07-14",
        comment:
          "The noise cancellation is astonishing. Battery easily lasted through my Mumbai flight!",
      },
      {
        name: "Rajendra Das",
        rating: 4,
        date: "2026-06-28",
        comment:
          "Superb soundstage, deep bass without muddiness. Very comfortable padding.",
      },
    ],
  },
  {
    id: "prod-2",
    name: "Minimalist Chronograph Leather Watch",
    category: "Accessories",
    price: 689.0,
    originalPrice: 700.0,
    discount: 14,
    rating: 4.9,
    reviewsCount: 98,
    stock: 12,
    isFeatured: true,
    isTrending: true,
    isFlashDeal: false,
    badge: "Trending",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1612817159450-08a180df028b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGVhdGhlciUyMHdhdGNofGVufDB8fDB8fHww",
    ],
    colors: ["#78350f", "#0f172a", "#1e3a8a"],
    colorNames: ["Cognac Brown", "Obsidian Black", "Navy Blue"],
    sizes: ["40mm", "42mm"],
    description:
      "Crafted with surgical-grade stainless steel, sapphire crystal glass, and Italian genuine leather strap for effortless everyday sophistication.",
    specs: {
      "Case Material": "316L Stainless Steel",
      Glass: "Anti-Reflective Sapphire Crystal",
      Movement: "Japanese Quartz Chronograph",
      "Water Resistance": "5 ATM / 50 Meters",
      "Strap Width": "20mm Genuine Italian Calfskin",
    },
    reviews: [
      {
        name: "Mohan Gupta",
        rating: 5,
        date: "2026-08-02",
        comment:
          "Looks like a thousand-rupees luxury watch. Compliments every time I wear it.",
      },
    ],
  },
  {
    id: "prod-3",
    name: "Ultra-Light Carbon Fiber Running Shoes",
    category: "Footwear",
    price: 459.5,
    originalPrice: 499.0,
    discount: 20,
    rating: 4.7,
    reviewsCount: 215,
    stock: 25,
    isFeatured: true,
    isTrending: false,
    isFlashDeal: true,
    badge: "Hot Deal",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
    ],
    colors: ["#dc2626", "#0284c7", "#18181b"],
    colorNames: ["Crimson Red", "Electric Cyan", "Triple Black"],
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    description:
      "Propel your stride forward with embedded carbon plate propulsion, breathable engineered mesh, and high-rebound nitrogen-infused foam.",
    specs: {
      Weight: "198g (Size US 9)",
      Drop: "8mm",
      Midsole: "Supercritical Nitrogen Foam",
      Plate: "Full-Length Curved Carbon Fiber",
      Terrain: "Road & Track Racing",
    },
    reviews: [
      {
        name: "Yamini Sarkar",
        rating: 5,
        date: "2026-07-20",
        comment:
          "Shaved 45 seconds off my 5k PB on the first run. The energy return is unreal!",
      },
    ],
  },
  {
    id: "prod-4",
    name: "Architectural Ceramic Aroma Diffuser & Lamp",
    category: "Home & Living",
    price: 179.0,
    originalPrice: 195.0,
    discount: 16,
    rating: 4.6,
    reviewsCount: 84,
    stock: 30,
    isFeatured: true,
    isTrending: true,
    isFlashDeal: false,
    badge: "New Arrival",
    image:
      "https://m.media-amazon.com/images/I/917bXTkdmxL._AC_UF894,1000_QL80_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/917bXTkdmxL._AC_UF894,1000_QL80_.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEuCPKwflHRMJUbvj61jDpZvkerWkvk49vpQ8UKXOW8EZ7b7pAnaX_gr8F&s=10",
    ],
    colors: ["#e5e5e5", "#78716c", "#ca8a04"],
    colorNames: ["Stone White", "Basalt Grey", "Terracotta Gold"],
    sizes: ["300ml"],
    description:
      "Handcrafted matte ceramic exterior with ultrasonic cool mist dispersion and ambient warm candlelight LED lighting for tranquil living.",
    specs: {
      Capacity: "300ml Water Tank",
      Runtime: "Up to 10 Hours continuous",
      Lighting: "Warm 2700K Dimmable Glow",
      "Auto Shut-off": "Yes (When Water Level Low)",
      Coverage: "400 sq. ft.",
    },
    reviews: [
      {
        name: "Sulekha Mahajan",
        rating: 5,
        date: "2026-08-11",
        comment:
          "Beautiful scandi aesthetic and silent operation. Fills the entire bedroom with lavender.",
      },
    ],
  },
  {
    id: "prod-5",
    name: "Tailored Merino Wool Overcoat",
    category: "Fashion",
    price: 810.0,
    originalPrice: 870.0,
    discount: 26,
    rating: 4.9,
    reviewsCount: 67,
    stock: 8,
    isFeatured: true,
    isTrending: false,
    isFlashDeal: true,
    badge: "Luxury Pick",
    image:
      "https://cdn.woollen-wear.in/cache/data/coat/men-coats-2324/24518-brunette/24518-brunette-s1-300x382.jpg",
    images: [
      "https://cdn.woollen-wear.in/cache/data/coat/men-coats-2324/24518-brunette/24518-brunette-s1-300x382.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlkT-BphOME_D8F-pnGefqVnOKAgT69rrU_V4g4Jx7b7PFVkfUbeZIexM&s=10",
    ],
    colors: ["#b45309", "#1e293b", "#475569"],
    colorNames: ["Camel Wool", "Midnight Navy", "Charcoal"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "100% Australian extra-fine Merino wool tailored with structured notch lapels, horn buttons, and breathable silk-blend interior lining.",
    specs: {
      Material: "100% Australian Merino Wool",
      Lining: "Viscose Silk Blend",
      Care: "Professional Dry Clean Only",
      Pockets: "Two Flap Pockets, Two Interior Welt",
      Fit: "Modern Tailored Cut",
    },
    reviews: [
      {
        name: "Rajiv Deshmukh",
        rating: 5,
        date: "2026-07-30",
        comment:
          "Unbeatable drape and warmth. Heavyweight fabric with exquisite stitching.",
      },
    ],
  },
  {
    id: "prod-6",
    name: "Pro 4K Mirrorless Cinema Camera",
    category: "Electronics",
    price: 999.0,
    originalPrice: 899.0,
    discount: 14,
    rating: 4.9,
    reviewsCount: 176,
    stock: 5,
    isFeatured: true,
    isTrending: true,
    isFlashDeal: false,
    badge: "Pro Choice",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80",
    ],
    colors: ["#18181b"],
    colorNames: ["Matte Black"],
    sizes: ["Body Only", "Kit with 24-70mm f/2.8"],
    description:
      "Capture breathtaking 4K 120fps video and 33MP RAW stills with 5-axis IBIS, real-time AI eye tracking autofocus, and 15+ stops of dynamic range.",
    specs: {
      Sensor: "33MP Full-Frame Exmor R CMOS",
      "Video Resolution": "4K UHD at up to 120p 10-bit 4:2:2",
      Stabilization: "5-Axis In-Body Image Stabilization",
      Screen: "3.0-inch 1.44M-Dot Vari-Angle Touchscreen",
      Storage: "Dual CFexpress Type A / SD Card Slots",
    },
    reviews: [
      {
        name: "Harshita Patel",
        rating: 5,
        date: "2026-08-05",
        comment:
          "Color science and autofocus accuracy are next level. Used it on two commercial shoots already.",
      },
    ],
  },
  {
    id: "prod-7",
    name: "Botanical Restorative Face Oil",
    category: "Beauty & Wellness",
    price: 64.0,
    originalPrice: 80.0,
    discount: 20,
    rating: 4.8,
    reviewsCount: 310,
    stock: 45,
    isFeatured: false,
    isTrending: true,
    isFlashDeal: false,
    badge: "Organic",
    image:
      "https://treesnailwellness.com/cdn/shop/files/MatureSkinNaturalSkincareBundle.jpg?v=1750964480&width=533",
    images: [
      "https://treesnailwellness.com/cdn/shop/files/MatureSkinNaturalSkincareBundle.jpg?v=1750964480&width=533",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
    ],
    colors: ["#d97706"],
    colorNames: ["Golden Amber"],
    sizes: ["30ml", "50ml"],
    description:
      "Infused with cold-pressed rosehip seed, squalane, and vitamin C ester to brighten skin tone, hydrate deeply, and restore cellular glow.",
    specs: {
      Volume: "30ml / 1.0 fl oz",
      "Key Actives": "15% THD Ascorbate, Botanical Squalane, Rosehip Oil",
      "Skin Type": "All Skin Types (Cruelty-Free, Vegan)",
      Origin: "Formulated in France",
    },
    reviews: [
      {
        name: "Rachna Sharma",
        rating: 5,
        date: "2026-08-15",
        comment:
          "My skin drank this in. Non-greasy finish and faded my sun spots within 3 weeks.",
      },
    ],
  },
  {
    id: "prod-8",
    name: "Handmade Full-Grain Leather Travel Duffle",
    category: "Accessories",
    price: 365.0,
    originalPrice: 380.0,
    discount: 22,
    rating: 4.9,
    reviewsCount: 119,
    stock: 14,
    isFeatured: false,
    isTrending: true,
    isFlashDeal: true,
    badge: "Artisan",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
    ],
    colors: ["#713f12", "#1c1917"],
    colorNames: ["Vintage Tan", "Rustic Black"],
    sizes: ["45L Carry-On"],
    description:
      "Rugged yet refined weekend duffle with reinforced brass YKK zippers, padded laptop compartment, and dedicated ventilated shoe pocket.",
    specs: {
      Dimensions: "55 x 30 x 28 cm (Flight Carry-On Approved)",
      Capacity: "45 Liters",
      Hardware: "Solid Antique Brass",
      "Laptop Sleeve": "Fits up to 16-inch MacBook Pro",
    },
    reviews: [
      {
        name: "Bansuri Verma",
        rating: 5,
        date: "2026-07-19",
        comment:
          "The leather smell is heavenly. Fits 4 days of clothes and shoes easily.",
      },
    ],
  },
  {
    id: "prod-9",
    name: "Ergonomic Mechanical Wireless Keyboard",
    category: "Electronics",
    price: 189.99,
    originalPrice: 199.0,
    discount: 20,
    rating: 4.8,
    reviewsCount: 162,
    stock: 22,
    isFeatured: true,
    isTrending: false,
    isFlashDeal: false,
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80",
    ],
    colors: ["#334155", "#f8fafc"],
    colorNames: ["Industrial Grey", "Retro Chalk"],
    sizes: ["75% Compact", "Full Size"],
    description:
      "Gasket-mounted acoustic dampening with hot-swappable tactile switches, per-key RGB backlighting, and tri-mode Bluetooth/2.4GHz/USB-C connection.",
    specs: {
      "Switch Type": "Gateron Pro Yellow / Brown (Hot-swap)",
      Connectivity: "Bluetooth 5.1 / 2.4G Wireless / Type-C",
      Keycaps: "Double-shot PBT Cherry Profile",
      Battery: "4000mAh (Up to 200 hours without RGB)",
    },
    reviews: [
      {
        name: "Ishika Sharma",
        rating: 5,
        date: "2026-08-01",
        comment:
          "Thocky sound straight out of the box. No rattles on the spacebar.",
      },
    ],
  },
  {
    id: "prod-10",
    name: "Nordic Minimalist Linen Lounge Armchair",
    category: "Home & Living",
    price: 1200.0,
    originalPrice: 1220.0,
    discount: 21,
    rating: 4.7,
    reviewsCount: 53,
    stock: 6,
    isFeatured: false,
    isTrending: false,
    isFlashDeal: true,
    badge: "Sale",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1580481077167-336352347437?w=800&auto=format&fit=crop&q=80",
    ],
    colors: ["#d4d4d8", "#44403c", "#15803d"],
    colorNames: ["Sand Beige", "Charcoal Oak", "Forest Olive"],
    sizes: ["Standard Accent Chair"],
    description:
      "Solid FSC-certified oak frame with high-density foam cushioning upholstered in durable Belgian textured linen weave.",
    specs: {
      Frame: "Kiln-Dried Solid White Oak",
      Upholstery: "Belgian Textured Linen (Removable & Washable)",
      "Max Load": "160 kg / 350 lbs",
      Assembly: "Easy 10-Minute Toolless Assembly",
    },
    reviews: [
      {
        name: "Rohan Yadav",
        rating: 5,
        date: "2026-06-18",
        comment:
          "Matches our living room decor seamlessly. Extremely comfortable reading nook chair.",
      },
    ],
  },
  {
    id: "prod-11",
    name: "Classic Italian Silk-Cotton Button Down",
    category: "Fashion",
    price: 95.0,
    originalPrice: 125.0,
    discount: 24,
    rating: 4.6,
    reviewsCount: 88,
    stock: 20,
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    badge: "Essentials",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80",
    ],
    colors: ["#ffffff", "#93c5fd", "#fecdd3"],
    colorNames: ["Crisp White", "Sky Blue", "Pale Rose"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Silky-smooth Egyptian cotton blended with mulberry silk. Breathable, wrinkle-resistant, and cut with a flattering modern slim silhouette.",
    specs: {
      Composition: "80% Long-Staple Cotton, 20% Mulberry Silk",
      Collar: "Semi-Spread Collar with Removable Stays",
      Cuffs: "Double Button Barrel Cuffs",
    },
    reviews: [
      {
        name: "Neha Banerjee",
        rating: 4,
        date: "2026-07-22",
        comment:
          "Incredible hand-feel fabric. Washes well without losing sheen.",
      },
    ],
  },
  {
    id: "prod-12",
    name: "Titanium Smart Health & Fitness Ring",
    category: "Electronics",
    price: 299.0,
    originalPrice: 349.0,
    discount: 14,
    rating: 4.8,
    reviewsCount: 204,
    stock: 15,
    isFeatured: true,
    isTrending: true,
    isFlashDeal: true,
    badge: "Smart Tech",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80",
    ],
    colors: ["#e2e8f0", "#eab308", "#1e293b"],
    colorNames: ["Brushed Silver", "Stealth Gold", "Matte Black"],
    sizes: ["Size 7", "Size 8", "Size 9", "Size 10", "Size 11"],
    description:
      "Discreet aerospace titanium ring that monitors sleep stages, readiness score, heart rate variability (HRV), and body temperature with 7-day battery life.",
    specs: {
      Material: "Aerospace-Grade Titanium with DLC Coating",
      Sensors: "Optical Heart Rate, Red/Infrared SpO2, Skin Temperature",
      Waterproofing: "100m / 10 ATM",
      "Battery Life": "Up to 7 Days per single charge",
      Compatibility: "iOS and Android Companion App",
    },
    reviews: [
      {
        name: "Ramesh Das",
        rating: 5,
        date: "2026-08-08",
        comment:
          "So lightweight I forget I have it on. Sleep stage breakdown is remarkably accurate.",
      },
    ],
  },
];

// Product Categories metadata
const CATEGORIES_DATA = [
  {
    id: "Electronics",
    name: "Electronics & Audio",
    itemCount: 4,
    icon: "headphone",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    description:
      "Studio headphones, cinema cameras, mechanical keyboards & smart rings.",
  },
  {
    id: "Accessories",
    name: "Luxury Accessories",
    itemCount: 2,
    icon: "watch",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    description:
      "Chronograph watches, full-grain duffles, and artisan leather goods.",
  },
  {
    id: "Footwear",
    name: "Footwear & Running",
    itemCount: 1,
    icon: "shoe",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    description: "Carbon-plated performance runners and lifestyle footwear.",
  },
  {
    id: "Fashion",
    name: "Fashion & Apparel",
    itemCount: 2,
    icon: "shirt",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_x0lsKv5MnqZMaLMQaSsGr6XZB-bLIgX1EfyUXHL0yUylzhH60X3Vj3A&s=10",
    description:
      "Merino wool coats, silk shirts, and modern tailored wardrobe.",
  },
  {
    id: "Home & Living",
    name: "Home & Living",
    itemCount: 2,
    icon: "lamp",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2YhQz-8dXrDJJQDylahdhM-rvfvqvnCtzUEQ3tH9yKQ&s=10",
    description:
      "Ceramic aroma diffusers, linen armchairs, and interior essentials.",
  },
  {
    id: "Beauty & Wellness",
    name: "Beauty & Wellness",
    itemCount: 1,
    icon: "sparkle",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9NwZ75pMQ1Uve_4tLo-0xhVcbN1mj1SbO8PzJ-0HfWqXxGwJqMfIji_c&s=10",
    description: "Botanical oils, restorative serums, and clean self-care.",
  },
];

// Available coupon codes
const DISCOUNT_COUPONS = {
  "SAVE20": { code: "SAVE20", discountPercent: 20, description: "20% Off Storewide (Special Offer)" },
  "WELCOME10": { code: "WELCOME10", discountPercent: 10, description: "10% Off First Order" },
  "FLASH30": { code: "FLASH30", discountPercent: 30, description: "30% Flash Sale Discount" },
  "FREESHIP": { code: "FREESHIP", discountAmount: 15, freeShipping: true, description: "Free Express Shipping" }
};

// Helper: Render Star rating SVGs
function renderStars(rating) {
  let html = '';
  const numRating = Number(rating) || 0;
  const fullStars = Math.floor(numRating);
  const hasHalf = numRating % 1 >= 0.4;
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      html += `<svg class="star-icon star-full" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
    } else if (i === fullStars + 1 && hasHalf) {
      html += `<svg class="star-icon star-half" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
    } else {
      html += `<svg class="star-icon star-empty" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
    }
  }
  return html;
}

// Generate reusable Product Card HTML across all pages (Home, Shop, Product Details)
function createProductCardHtml(p) {
  if (!p) return '';
  const inWishlist = (typeof Storage !== 'undefined' && Storage.isInWishlist) ? Storage.isInWishlist(p.id) : false;
  return `
    <div class="product-card" id="card-${p.id}">
      <div class="product-media">
        <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy">
        <div class="product-badge-group">
          ${p.badge ? `<span class="product-badge badge-primary">${p.badge}</span>` : ''}
          ${p.discount ? `<span class="product-badge badge-discount">-${p.discount}%</span>` : ''}
        </div>
        <div class="product-card-actions">
          <button class="card-action-btn ${inWishlist ? 'active-wishlist' : ''}" 
                  onclick="handleCardToggleWishlist('${p.id}', this)" 
                  title="Wishlist" aria-label="Add to Wishlist">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="${inWishlist ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          </button>
          <button class="card-action-btn" onclick="openQuickView('${p.id}')" title="Quick View" aria-label="Quick View">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>
          </button>
        </div>
      </div>
      <div class="product-body">
        <div class="product-cat">${p.category}</div>
        <a href="product-details.html?id=${p.id}" class="product-title" title="${p.name}">${p.name}</a>
        <div class="product-rating">
          <div class="star-rating">${renderStars(p.rating)}</div>
          <span>(${p.reviewsCount})</span>
        </div>
        <div class="product-price-row">
          <div class="product-prices">
            <span class="current-price">Rs.${p.price.toFixed(2)}</span>
            ${p.originalPrice ? `<span class="old-price">Rs.${p.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <button class="card-add-cart-btn" onclick="handleCardAddToCart('${p.id}')" title="Add to Cart" aria-label="Add to Cart">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Global click handlers for cards
window.handleCardAddToCart = function(productId) {
  if (typeof Storage !== 'undefined' && Storage.addToCart) {
    const res = Storage.addToCart(productId, 1);
    if (res.success && typeof Toast !== 'undefined') {
      Toast.success(`Added "${res.product.name}" to cart!`);
    }
  }
};

window.handleCardToggleWishlist = function(productId, btn) {
  if (typeof Storage !== 'undefined' && Storage.toggleWishlist) {
    const res = Storage.toggleWishlist(productId);
    const svg = btn ? btn.querySelector('svg') : null;
    if (res.inWishlist) {
      if (btn) btn.classList.add('active-wishlist');
      if (svg) svg.setAttribute('fill', 'currentColor');
      if (typeof Toast !== 'undefined') Toast.success(`Saved "${res.product.name}" to wishlist`);
    } else {
      if (btn) btn.classList.remove('active-wishlist');
      if (svg) svg.setAttribute('fill', 'none');
      if (typeof Toast !== 'undefined') Toast.info(`Removed from wishlist`);
    }
  }
};
