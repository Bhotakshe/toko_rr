'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const categories = [
  {
    id: 1,
    name: "Men's Clothing",
    description: "Stylish and comfortable clothing for men",
    itemCount: 42,
    image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&q=80',
    slug: 'mens-clothing'
  },
  {
    id: 2,
    name: "Women's Clothing",
    description: "Elegant and fashionable clothing for women",
    itemCount: 56,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80',
    slug: 'womens-clothing'
  },
  {
    id: 3,
    name: "Accessories",
    description: "Complete your look with our accessories",
    itemCount: 28,
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80',
    slug: 'accessories'
  },
  {
    id: 4,
    name: "Footwear",
    description: "Comfortable and stylish shoes for all occasions",
    itemCount: 35,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80',
    slug: 'footwear'
  },
  {
    id: 5,
    name: "Jewelry",
    description: "Beautiful jewelry pieces to enhance your style",
    itemCount: 21,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80',
    slug: 'jewelry'
  },
  {
    id: 6,
    name: "Sports & Active Wear",
    description: "Performance clothing for your active lifestyle",
    itemCount: 31,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80',
    slug: 'sports-active-wear'
  }
];

export default function CategoriesPage() {
  const router = useRouter();

  const handleBrowse = (categoryName: string) => {
    // Mengarahkan ke Google dengan query pencarian berdasarkan kategori
    window.open(`https://www.google.com/search?q=${encodeURIComponent(categoryName)}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Shop by Category</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative aspect-video">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{category.itemCount} items</span>
                  <button 
                    onClick={() => handleBrowse(category.name)}
                    className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
                  >
                    Browse
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}