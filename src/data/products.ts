export type Product = {
  id: number;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  discountedPrice?: number;
  image: string;
  images?: string[];
  rating: number;
  reviewCount: number;
  description: string;
  features?: string[];
  specifications?: Record<string, string | number>;
  stock: number;
  isNew?: boolean;
  isBestseller?: boolean;
  tags?: string[];
};

export const products: Product[] = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    category: "plants",
    subcategory: "indoor",
    price: 39.99,
    image: "https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    images: [
      "https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/6913387/pexels-photo-6913387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/6646775/pexels-photo-6646775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    rating: 4.8,
    reviewCount: 128,
    description: "The Monstera Deliciosa, also known as the Swiss Cheese Plant, is famous for its uniquely beautiful leaves and is a perfect addition to any interior space. It's easy to care for and purifies the air in your home.",
    features: [
      "Low maintenance",
      "Air purifying",
      "Pet friendly",
      "Thrives in indirect light"
    ],
    specifications: {
      "Height": "14-18 inches",
      "Pot Size": "6 inches",
      "Light": "Medium to bright indirect light",
      "Water": "Weekly, allowing soil to dry between waterings",
      "Temperature": "65-85°F (18-29°C)"
    },
    stock: 42,
    isNew: false,
    isBestseller: true,
    tags: ["air purifying", "indoor", "popular", "tropical"]
  },
  {
    id: 2,
    name: "Fiddle Leaf Fig Tree",
    category: "plants",
    subcategory: "indoor",
    price: 79.99,
    image: "https://images.pexels.com/photos/6207369/pexels-photo-6207369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    images: [
      "https://images.pexels.com/photos/6207369/pexels-photo-6207369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/7728082/pexels-photo-7728082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    rating: 4.6,
    reviewCount: 87,
    description: "The Fiddle Leaf Fig Tree is a stunning indoor plant with large, violin-shaped leaves that can elevate any room's aesthetics. This trendy plant adds vertical interest to your space with its tall, elegant structure.",
    features: [
      "Statement piece",
      "Air purifying",
      "Architectural foliage",
      "Grows up to 10 feet tall indoors"
    ],
    specifications: {
      "Height": "24-36 inches",
      "Pot Size": "10 inches",
      "Light": "Bright indirect light",
      "Water": "Every 7-10 days, allowing soil to dry between waterings",
      "Temperature": "60-80°F (15-27°C)"
    },
    stock: 18,
    isNew: false,
    isBestseller: true,
    tags: ["statement plant", "indoor", "trendy", "air purifying"]
  },
  {
    id: 3,
    name: "Organic Vegetable Garden Soil",
    category: "soil",
    subcategory: "garden soil",
    price: 19.99,
    discountedPrice: 16.99,
    image: "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.9,
    reviewCount: 203,
    description: "Premium organic garden soil specially formulated for vegetable gardens. This nutrient-rich mix creates the perfect growing environment for all types of vegetables, herbs and fruits.",
    features: [
      "100% organic ingredients",
      "Excellent drainage",
      "Enhanced with worm castings",
      "Rich in essential nutrients"
    ],
    specifications: {
      "Volume": "25 quarts",
      "Weight": "22 lbs",
      "pH Level": "6.5-7.0",
      "Composition": "Compost, aged bark, perlite, worm castings"
    },
    stock: 154,
    isNew: false,
    isBestseller: true,
    tags: ["organic", "vegetable garden", "compost"]
  },
  {
    id: 4,
    name: "Premium Rose Fertilizer",
    category: "soil",
    subcategory: "fertilizer",
    price: 15.99,
    image: "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.7,
    reviewCount: 142,
    description: "Specially formulated fertilizer to promote vibrant blooms and healthy growth in all types of roses. This balanced fertilizer provides essential nutrients for beautiful, long-lasting blooms throughout the growing season.",
    features: [
      "Promotes vibrant blooms",
      "Strengthens root systems",
      "Improves disease resistance",
      "Long-lasting formula"
    ],
    specifications: {
      "Weight": "4 lbs",
      "Application Rate": "1/4 cup per plant",
      "NPK Ratio": "4-8-4",
      "Contains": "Bone meal, blood meal, alfalfa meal, epsom salts"
    },
    stock: 89,
    isNew: true,
    isBestseller: false,
    tags: ["fertilizer", "roses", "organic"]
  },
  {
    id: 5,
    name: "Professional Pruning Shears",
    category: "tools",
    subcategory: "hand tools",
    price: 34.99,
    discountedPrice: 29.99,
    image: "https://images.pexels.com/photos/6231763/pexels-photo-6231763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    images: [
      "https://images.pexels.com/photos/6231763/pexels-photo-6231763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/6231738/pexels-photo-6231738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    rating: 4.9,
    reviewCount: 312,
    description: "Professional-grade pruning shears with hardened steel blades for clean, precise cuts. Ergonomic handles reduce hand fatigue and provide comfortable use during extended pruning sessions.",
    features: [
      "Hardened steel blades",
      "Ergonomic non-slip handles",
      "Sap groove to prevent sticking",
      "Safety lock mechanism"
    ],
    specifications: {
      "Length": "8 inches",
      "Weight": "7.2 oz",
      "Cutting Capacity": "3/4 inch diameter",
      "Material": "High-carbon steel blades, aluminum handles with rubber grip"
    },
    stock: 76,
    isNew: false,
    isBestseller: true,
    tags: ["pruning", "tools", "professional"]
  },
  {
    id: 6,
    name: "Ceramic Plant Pot Set (3-Pack)",
    category: "pots",
    subcategory: "indoor pots",
    price: 49.99,
    image: "https://images.pexels.com/photos/5858235/pexels-photo-5858235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    images: [
      "https://images.pexels.com/photos/5858235/pexels-photo-5858235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/6045060/pexels-photo-6045060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5825579/pexels-photo-5825579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    rating: 4.8,
    reviewCount: 95,
    description: "Set of three beautifully crafted ceramic plant pots in varying sizes. Each pot features a minimalist design with a matte finish and includes a drainage hole with a removable plug for versatile use.",
    features: [
      "Minimalist, modern design",
      "Drainage hole with removable plug",
      "3 different sizes for versatility",
      "Durable ceramic construction"
    ],
    specifications: {
      "Small Size": "4 inches diameter × 3.5 inches height",
      "Medium Size": "6 inches diameter × 5 inches height",
      "Large Size": "8 inches diameter × 7 inches height",
      "Material": "Ceramic with matte finish",
      "Colors": "White, sage green, and terracotta"
    },
    stock: 37,
    isNew: true,
    isBestseller: false,
    tags: ["pots", "ceramic", "set", "indoor"]
  },
  {
    id: 7,
    name: "Organic Herb Seed Collection",
    category: "seeds",
    subcategory: "herbs",
    price: 24.99,
    image: "https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.7,
    reviewCount: 164,
    description: "Start your culinary herb garden with this collection of 12 different non-GMO, organic herb seeds. Includes basil, cilantro, parsley, dill, chives, oregano, thyme, mint, sage, rosemary, lavender, and chamomile.",
    features: [
      "12 varieties of culinary and medicinal herbs",
      "Non-GMO and certified organic seeds",
      "Easy-to-follow planting guide included",
      "Packaged in reusable seed storage bags"
    ],
    specifications: {
      "Varieties": "12 different herbs",
      "Seeds Per Variety": "~50-100 seeds each",
      "Germination Rate": "85-95%",
      "Storage Life": "2-3 years when properly stored"
    },
    stock: 62,
    isNew: false,
    isBestseller: true,
    tags: ["seeds", "herbs", "organic", "culinary"]
  },
  {
    id: 8,
    name: "Automatic Drip Irrigation Kit",
    category: "irrigation",
    subcategory: "watering systems",
    price: 59.99,
    discountedPrice: 49.99,
    image: "https://images.pexels.com/photos/6044246/pexels-photo-6044246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.6,
    reviewCount: 128,
    description: "Complete drip irrigation kit for garden beds and containers. This water-efficient system delivers moisture directly to plant roots, reducing water usage by up to 70% compared to traditional watering methods.",
    features: [
      "Covers up to 150 square feet",
      "Includes timer with multiple scheduling options",
      "Water-saving technology",
      "Easy tool-free installation"
    ],
    specifications: {
      "Coverage": "Up to 150 sq ft",
      "Hose Length": "50 ft main line",
      "Includes": "Timer, pressure regulator, 20 drippers, tubing, connectors",
      "Timer Settings": "Multiple daily schedules, 1-120 minutes per cycle"
    },
    stock: 29,
    isNew: true,
    isBestseller: false,
    tags: ["irrigation", "watering", "water-saving", "automatic"]
  }
];

export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}

export function getNewProducts(): Product[] {
  return products.filter(product => product.isNew);
}

export function getBestsellerProducts(): Product[] {
  return products.filter(product => product.isBestseller);
}

export function getProductsBySearch(query: string): Product[] {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    (product.subcategory && product.subcategory.toLowerCase().includes(searchTerm)) ||
    (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
  );
}