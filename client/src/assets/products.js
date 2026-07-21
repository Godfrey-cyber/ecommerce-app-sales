import {
  ShoppingCart, Search, Heart, User, ChevronRight, ChevronLeft,
  Star, Zap, TrendingUp, ArrowRight, Phone, Shield, Truck, RotateCcw,
  Bell, Menu, X, MapPin
} from "lucide-react";

export const products = [
  {
    "id": "1",
    "name": "Apple iPhone 14 Pro",
    "category": "Smartphones",
    "price": 999.99,
    "description": "The latest Apple iPhone 14 Pro with 128GB storage, 6.1-inch display, and advanced camera system.",
    "features": [
      "6.1-inch Super Retina XDR display with ProMotion",
      "A16 Bionic chip for lightning-fast performance",
      "Pro camera system: 48MP Main, 12MP Ultra Wide, 12MP Telephoto",
      "Dynamic Island for a new way to interact with iPhone",
      "Emergency SOS via satellite",
      "Up to 23 hours video playback",
      "iOS 17 with the latest features",
      "5G capable for superfast downloads"
    ],
    "stock": 50,
    "discount": 12,
    "brand": "Apple",
    "rating": 4.7,
    "image": "https://images.unsplash.com/photo-1678652122524-a90ed5d2fc58?w=500",
    "totalReviews": 342,
    "reviews": [
      {
        "user": "JaneDoe",
        "rating": 5,
        "comment": "Amazing phone! Worth every penny."
      },
      {
        "user": "JohnSmith",
        "rating": 4,
        "comment": "Great phone, but a bit pricey."
      }
    ]
  },
  {
    "id": "2",
    "name": "Samsung Galaxy S23 Ultra",
    "category": "Smartphones",
    "price": 1199.99,
    "description": "Samsung Galaxy S23 Ultra with 256GB storage, 6.8-inch display, and S Pen.",
    "features": [
      "6.1-inch Super Retina XDR display with ProMotion",
      "A16 Bionic chip for lightning-fast performance",
      "Pro camera system: 48MP Main, 12MP Ultra Wide, 12MP Telephoto",
      "Dynamic Island for a new way to interact with iPhone",
      "Emergency SOS via satellite",
      "Up to 23 hours video playback",
      "iOS 17 with the latest features",
      "5G capable for superfast downloads"
    ],
    "stock": 30,
    "discount": 15,
    "brand": "Samsung",
    "rating": 4.5,
    "image": "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
    "totalReviews": 342,
    "reviews": [
      {
        "user": "AliceBrown",
        "rating": 4,
        "comment": "Very good phone with a stunning display."
      },
      {
        "user": "BobWhite",
        "rating": 5,
        "comment": "Best phone I've ever had!"
      }
    ]
  },
  {
    "id": "3",
    "name": "Sony WH-1000XM5 Headphones",
    "category": "Audio",
    "price": 399.99,
    "description": "Premium noise-cancelling wireless headphones with industry-leading sound quality.",
    "features": [
      "6.1-inch Super Retina XDR display with ProMotion",
      "A16 Bionic chip for lightning-fast performance",
      "Pro camera system: 48MP Main, 12MP Ultra Wide, 12MP Telephoto",
      "Dynamic Island for a new way to interact with iPhone",
      "Emergency SOS via satellite",
      "Up to 23 hours video playback",
      "iOS 17 with the latest features",
      "5G capable for superfast downloads"
    ],
    "stock": 75,
    "discount": 20,
    "brand": "Sony",
    "rating": 4.8,
    "image": "https://images.unsplash.com/photo-1545127398-14699f92334b?w=500",
    "totalReviews": 342,
    "reviews": [
      {
        "user": "CarolGreen",
        "rating": 5,
        "comment": "Best noise-cancelling headphones on the market."
      },
      {
        "user": "DavidBlue",
        "rating": 4,
        "comment": "Great sound quality but a bit bulky."
      }
    ]
  },
  {
    "id": "4",
    "name": "Apple MacBook Pro 14\"",
    "category": "Laptops",
    "price": 1999.99,
    "description": "MacBook Pro 14-inch with M3 chip, 16GB RAM, and stunning Liquid Retina XDR display.",
    "features": [
      "6.1-inch Super Retina XDR display with ProMotion",
      "A16 Bionic chip for lightning-fast performance",
      "Pro camera system: 48MP Main, 12MP Ultra Wide, 12MP Telephoto",
      "Dynamic Island for a new way to interact with iPhone",
      "Emergency SOS via satellite",
      "Up to 23 hours video playback",
      "iOS 17 with the latest features",
      "5G capable for superfast downloads"
    ],
    "stock": 25,
    "discount": 10,
    "brand": "Apple",
    "rating": 4.9,
    "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
    "totalReviews": 342,
    "reviews": [
      {
        "user": "EmilyClark",
        "rating": 5,
        "comment": "Perfect for creative work!"
      },
      {
        "user": "MichaelRed",
        "rating": 5,
        "comment": "Best laptop I've ever owned."
      }
    ]
  },
  {
    "id": "5",
    "name": "Apple Watch Series 9",
    "category": "Wearables",
    "price": 429.99,
    "description": "Advanced health and fitness tracking with always-on Retina display.",
    "features": [
      "6.1-inch Super Retina XDR display with ProMotion",
      "A16 Bionic chip for lightning-fast performance",
      "Pro camera system: 48MP Main, 12MP Ultra Wide, 12MP Telephoto",
      "Dynamic Island for a new way to interact with iPhone",
      "Emergency SOS via satellite",
      "Up to 23 hours video playback",
      "iOS 17 with the latest features",
      "5G capable for superfast downloads"
    ],
    "stock": 60,
    "discount": 18,
    "brand": "Apple",
    "rating": 4.6,
    "image": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500",
    "totalReviews": 342,
    "reviews": [
      {
        "user": "NancyWhite",
        "rating": 4,
        "comment": "Great fitness tracker with useful features."
      },
      {
        "user": "TomBlack",
        "rating": 5,
        "comment": "Love the GPS tracking and health insights."
      }
    ]
  },
  {
    "id": "6",
    "name": "iPad Pro 12.9\" M2",
    "category": "Tablets",
    "price": 1099.99,
    "description": "Powerful iPad Pro with M2 chip, 128GB storage, and ProMotion display.",
    "features": [
      "6.1-inch Super Retina XDR display with ProMotion",
      "A16 Bionic chip for lightning-fast performance",
      "Pro camera system: 48MP Main, 12MP Ultra Wide, 12MP Telephoto",
      "Dynamic Island for a new way to interact with iPhone",
      "Emergency SOS via satellite",
      "Up to 23 hours video playback",
      "iOS 17 with the latest features",
      "5G capable for superfast downloads"
    ],
    "stock": 40,
    "discount": 8,
    "brand": "Apple",
    "rating": 4.7,
    "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
    "totalReviews": 342,
    "reviews": [
      {
        "user": "SophiaYoung",
        "rating": 5,
        "comment": "Perfect for drawing and note-taking!"
      },
      {
        "user": "JamesMiller",
        "rating": 4,
        "comment": "Great tablet, a bit expensive."
      }
    ]
  },
  {
    "id": "7",
    "name": "Canon EOS R6 Mark II",
    "category": "Cameras",
    "price": 2499.99,
    "description": "Professional mirrorless camera with 24.2MP sensor and 4K video recording.",
    "features": [
      "6.1-inch Super Retina XDR display with ProMotion",
      "A16 Bionic chip for lightning-fast performance",
      "Pro camera system: 48MP Main, 12MP Ultra Wide, 12MP Telephoto",
      "Dynamic Island for a new way to interact with iPhone",
      "Emergency SOS via satellite",
      "Up to 23 hours video playback",
      "iOS 17 with the latest features",
      "5G capable for superfast downloads"
    ],
    "stock": 15,
    "discount": 5,
    "brand": "Canon",
    "rating": 4.9,
    "image": "https://images.unsplash.com/photo-1606980329345-c7167f07e0dd?w=500",
    "totalReviews": 342,
    "reviews": [
      {
        "user": "PhotoPro",
        "rating": 5,
        "comment": "Incredible image quality!"
      },
      {
        "user": "JanePhotographer",
        "rating": 5,
        "comment": "Best camera for professionals."
      }
    ]
  },
  {
    "id": "8",
    "name": "Samsung 55\" QLED 4K TV",
    "category": "TV & Video",
    "price": 899.99,
    "description": "Quantum Dot technology with 4K resolution and HDR support.",
    "features": [
      "6.1-inch Super Retina XDR display with ProMotion",
      "A16 Bionic chip for lightning-fast performance",
      "Pro camera system: 48MP Main, 12MP Ultra Wide, 12MP Telephoto",
      "Dynamic Island for a new way to interact with iPhone",
      "Emergency SOS via satellite",
      "Up to 23 hours video playback",
      "iOS 17 with the latest features",
      "5G capable for superfast downloads"
    ],
    "stock": 20,
    "discount": 25,
    "brand": "Samsung",
    "rating": 4.6,
    "image": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500",
    "totalReviews": 342,
    "reviews": [
      {
        "user": "MovieFan",
        "rating": 5,
        "comment": "Amazing picture quality!"
      },
      {
        "user": "TechLover",
        "rating": 4,
        "comment": "Great TV for the price."
      }
    ]
  },
  {
    "id": "9",
    "name": "Bose QuietComfort Earbuds II",
    "category": "Audio",
    "price": 299.99,
    "description": "Premium noise-cancelling wireless earbuds with personalized sound.",
    "features": [
      "6.1-inch Super Retina XDR display with ProMotion",
      "A16 Bionic chip for lightning-fast performance",
      "Pro camera system: 48MP Main, 12MP Ultra Wide, 12MP Telephoto",
      "Dynamic Island for a new way to interact with iPhone",
      "Emergency SOS via satellite",
      "Up to 23 hours video playback",
      "iOS 17 with the latest features",
      "5G capable for superfast downloads"
    ],
    "stock": 55,
    "discount": 22,
    "brand": "Bose",
    "rating": 4.7,
    "image": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
    "totalReviews": 342,
    "reviews": [
      {
        "user": "MusicLover",
        "rating": 5,
        "comment": "Best earbuds I've tried!"
      },
      {
        "user": "Audiophile",
        "rating": 4,
        "comment": "Great sound, comfy fit."
      }
    ]
  },
  {
    "id": "10",
    "name": "DJI Mini 3 Pro Drone",
    "category": "Cameras",
    "price": 759.99,
    "description": "Compact drone with 4K HDR video, obstacle avoidance, and extended flight time.",
    "features": [
      "6.1-inch Super Retina XDR display with ProMotion",
      "A16 Bionic chip for lightning-fast performance",
      "Pro camera system: 48MP Main, 12MP Ultra Wide, 12MP Telephoto",
      "Dynamic Island for a new way to interact with iPhone",
      "Emergency SOS via satellite",
      "Up to 23 hours video playback",
      "iOS 17 with the latest features",
      "5G capable for superfast downloads"
    ],
    "stock": 35,
    "discount": 12,
    "brand": "DJI",
    "rating": 4.8,
    "image": "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500",
    "totalReviews": 342,
    "reviews": [
      {
        "user": "SkyExplorer",
        "rating": 5,
        "comment": "Amazing footage quality!"
      },
      {
        "user": "DroneEnthusiast",
        "rating": 5,
        "comment": "Easy to fly, great features."
      }
    ]
  }
];

export const categories = [
  "Best Deals",
  "TV & Video",
  "Cameras",
  "Audio",
  "Smartphones",
  "Laptops",
  "Tablets",
  "Wearables"
];

export const featuredProduct = {
    id: "featured",
    name: "Canon EOS R6 Mark II",
    brand: "Canon",
    price: 2499.99,
    discount: 15,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200",
    thumbnails: [
      "https://images.unsplash.com/photo-1606980329345-c7167f07e0dd?w=200",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200"
    ]
  };

  export const item = {
    id: "1",
    name: "Apple iPhone 14 Pro",
    brand: "Apple",
    category: "Smartphones",
    price: 999.99,
    originalPrice: 1136.35,
    discount: 12,
    rating: 4.7,
    totalReviews: 342,
    stock: 50,
    description: "Experience the power of the A16 Bionic chip with the iPhone 14 Pro. Featuring a stunning 6.1-inch Super Retina XDR display with ProMotion technology, advanced camera system with 48MP main camera, and all-day battery life.",
    features: [
      "6.1-inch Super Retina XDR display with ProMotion",
      "A16 Bionic chip for lightning-fast performance",
      "Pro camera system: 48MP Main, 12MP Ultra Wide, 12MP Telephoto",
      "Dynamic Island for a new way to interact with iPhone",
      "Emergency SOS via satellite",
      "Up to 23 hours video playback",
      "iOS 17 with the latest features",
      "5G capable for superfast downloads"
    ],
    specifications: {
      "Display": "6.1-inch OLED, 2556 x 1179 pixels",
      "Processor": "A16 Bionic chip",
      "Storage": "128GB / 256GB / 512GB / 1TB",
      "Camera": "48MP + 12MP + 12MP (Triple)",
      "Front Camera": "12MP TrueDepth",
      "Battery": "3200mAh",
      "OS": "iOS 17",
      "Colors": "Space Black, Silver, Gold, Deep Purple"
    },
    images: [
      "https://images.unsplash.com/photo-1678652122524-a90ed5d2fc58?w=600",
      "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=600",
      "https://images.unsplash.com/photo-1592286927505-edab6b3c924f?w=600",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=600"
    ],
    reviews: [
      {
        user: "Sarah Johnson",
        rating: 5,
        date: "2 days ago",
        comment: "Absolutely love this phone! The camera quality is incredible and the battery lasts all day. Best iPhone I've owned.",
        verified: true
      },
      {
        user: "Michael Chen",
        rating: 4,
        date: "1 week ago",
        comment: "Great phone overall. The Dynamic Island is a game-changer. Only wish it came with a charger in the box.",
        verified: true
      },
      {
        user: "Emma Davis",
        rating: 5,
        date: "2 weeks ago",
        comment: "The display is stunning and the performance is blazing fast. Worth every penny!",
        verified: true
      },
      {
        user: "James Wilson",
        rating: 4,
        date: "3 weeks ago",
        comment: "Excellent build quality and camera. The Pro models are definitely worth the upgrade.",
        verified: false
      }
    ]
  };

export const NAV_LINKS = ["Deals", "New Arrivals", "Brands", "Sell on Zuri", "Help"];

export const CATEGORIES = [
  { id: 1, name: "Phones & Tablets",  icon: "📱", color: "from-violet-500 to-purple-600",  bg: "bg-violet-50",   accent: "text-violet-600", count: "2,400+ items" },
  { id: 2, name: "Computing",         icon: "💻", color: "from-blue-500 to-cyan-600",       bg: "bg-blue-50",     accent: "text-blue-600",   count: "1,800+ items" },
  { id: 3, name: "TVs & Audio",       icon: "📺", color: "from-slate-600 to-gray-800",      bg: "bg-slate-50",    accent: "text-slate-600",  count: "980+ items"  },
  { id: 4, name: "Appliances",        icon: "🏠", color: "from-orange-400 to-red-500",      bg: "bg-orange-50",   accent: "text-orange-600", count: "1,200+ items" },
  { id: 5, name: "Health & Beauty",   icon: "✨", color: "from-pink-400 to-rose-500",       bg: "bg-pink-50",     accent: "text-pink-600",   count: "3,100+ items" },
  { id: 6, name: "Home & Office",     icon: "🛋️", color: "from-emerald-500 to-teal-600",   bg: "bg-emerald-50",  accent: "text-emerald-600",count: "2,600+ items" },
];

export const HERO_SLIDES = [
  {
    id: 1,
    tag: "Flash Sale — Ends Tonight",
    title: "MacBook Air M3",
    subtitle: "Supercharged by Apple Silicon",
    desc: "15-inch · 8GB · 512GB SSD",
    price: "Ksh 185,000",
    originalPrice: "Ksh 231,000",
    discount: "20% OFF",
    cta: "Shop Now",
    bg: "from-slate-900 via-slate-800 to-slate-900",
    accent: "#F59E0B",
    imgBg: "from-slate-700 to-slate-600",
    emoji: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/49/6087603/1.jpg?2623",
  },
  {
    id: 2,
    tag: "New Arrival",
    title: "Samsung Galaxy S24 Ultra",
    subtitle: "Photography redefined",
    desc: "200MP · Titanium Frame · 5000mAh",
    price: "Ksh 135,000",
    originalPrice: "Ksh 160,000",
    discount: "15% OFF",
    cta: "Explore",
    bg: "from-violet-900 via-purple-900 to-indigo-900",
    accent: "#A78BFA",
    imgBg: "from-violet-700 to-purple-600",
    emoji: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/95/2128623/1.jpg?4682",
  },
  {
    id: 3,
    tag: "Weekend Deal",
    title: "Sony 65\" OLED 4K",
    subtitle: "Cinema in your living room",
    desc: "Bravia XR · Dolby Vision · 120Hz",
    price: "Ksh 210,000",
    originalPrice: "Ksh 280,000",
    discount: "25% OFF",
    cta: "View Deal",
    bg: "from-gray-900 via-zinc-900 to-neutral-900",
    accent: "#34D399",
    imgBg: "from-zinc-700 to-gray-600",
    emoji: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/87/8178771/1.jpg?1231",
  },
];

export const TRENDING = [
  { id:1, brand:"Apple",   title:"iPhone 15 Pro 256GB Natural Titanium",    price:145000, original:185000, rating:4.9, reviews:2840, discount:22, badge:"Best Seller", emoji:"📱", bg:"from-stone-100 to-gray-100" },
  { id:2, brand:"Samsung", title:"55\" Crystal 4K Smart TV UHD Series",     price:58000,  original:75000,  rating:4.7, reviews:1230, discount:23, badge:"Hot",         emoji:"📺", bg:"from-slate-100 to-blue-50"  },
  { id:3, brand:"Sony",    title:"WH-1000XM5 Wireless Noise Cancelling",     price:38000,  original:52000,  rating:4.9, reviews:3120, discount:27, badge:"Top Rated",   emoji:"🎧", bg:"from-zinc-100 to-gray-100"  },
  { id:4, brand:"LG",      title:"Side-by-Side Refrigerator 600L Inverter",  price:95000,  original:115000, rating:4.6, reviews:890,  discount:17, badge:"",            emoji:"🧊", bg:"from-sky-50 to-blue-50"     },
  { id:5, brand:"Dell",    title:"XPS 15 Core i9 1TB RTX 4060 Laptop",      price:185000, original:210000, rating:4.8, reviews:540,  discount:12, badge:"New",         emoji:"💻", bg:"from-blue-50 to-indigo-50"  },
  { id:6, brand:"Dyson",   title:"V15 Detect Absolute Cordless Vacuum",      price:52000,  original:65000,  rating:4.8, reviews:1780, discount:20, badge:"",            emoji:"🌀", bg:"from-purple-50 to-violet-50"},
  { id:7, brand:"Philips", title:"Air Fryer HD9270 6.2L XXL Capacity",      price:15500,  original:19000,  rating:4.7, reviews:4200, discount:18, badge:"Top Rated",   emoji:"🍳", bg:"from-orange-50 to-amber-50" },
  { id:8, brand:"Logitech","title":"MX Master 3S Wireless Mouse Graphite",   price:12000,  original:14500,  rating:4.9, reviews:6100, discount:17, badge:"",            emoji:"🖱️", bg:"from-gray-50 to-slate-50"   },
];

export const FLASH_DEALS = [
  { id:1, brand:"Hisense",  title:"43\" Full HD Smart TV VIDAA",      price:28000,  original:42000,  discount:33, emoji:"📺", timeLeft:{ h:2, m:14, s:30 } },
  { id:2, brand:"Xiaomi",   title:"Redmi Note 13 Pro 256GB",           price:24000,  original:32000,  discount:25, emoji:"📱", timeLeft:{ h:5, m:48, s:12 } },
  { id:3, brand:"JBL",      title:"Charge 5 Bluetooth Speaker IPX7",  price:11500,  original:16000,  discount:28, emoji:"🔊", timeLeft:{ h:1, m:32, s:44 } },
  { id:4, brand:"Breville",  title:"Barista Express Espresso Machine", price:45000,  original:62000,  discount:27, emoji:"☕", timeLeft:{ h:3, m:7, s:55 } },
];

export const BRAND_DEALS = [
  { brand:"Apple",   color:"bg-gray-900",    text:"text-white",  emoji:"🍎", deal:"Up to 20% off"  },
  { brand:"Samsung", color:"bg-blue-600",    text:"text-white",  emoji:"💠", deal:"New arrivals"   },
  { brand:"Sony",    color:"bg-black",       text:"text-white",  emoji:"⚡", deal:"Up to 30% off"  },
  { brand:"LG",      color:"bg-red-600",     text:"text-white",  emoji:"🔴", deal:"Flash deals"    },
  { brand:"HP",      color:"bg-blue-800",    text:"text-white",  emoji:"💙", deal:"Clearance"      },
  { brand:"Dyson",   color:"bg-purple-700",  text:"text-white",  emoji:"🌀", deal:"Up to 25% off"  },
];

export const PERKS = [
  { icon: Truck,      label: "Free Delivery",       sub: "Orders over Ksh 5,000" },
  { icon: RotateCcw,  label: "Easy Returns",         sub: "30-day hassle-free"   },
  { icon: Shield,     label: "Secure Payments",      sub: "100% protected"       },
  { icon: Phone,      label: "24/7 Support",          sub: "Always here for you"  },
];