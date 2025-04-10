'use client';

import { motion } from 'framer-motion';

const categories = [
  {
    id: 1,
    name: "Men's Clothing",
    description: "Stylish and comfortable clothing for men",
    itemCount: 42
  },
  {
    id: 2,
    name: "Women's Clothing",
    description: "Elegant and fashionable clothing for women",
    itemCount: 56
  },
  {
    id: 3,
    name: "Accessories",
    description: "Complete your look with our accessories",
    itemCount: 28
  },
  {
    id: 4,
    name: "Footwear",
    description: "Comfortable and stylish shoes for all occasions",
    itemCount: 35
  },
  {
    id: 5,
    name: "Jewelry",
    description: "Beautiful jewelry pieces to enhance your style",
    itemCount: 21
  },
  {
    id: 6,
    name: "Sports & Active Wear",
    description: "Performance clothing for your active lifestyle",
    itemCount: 31
  }
];

export default function CategoriesPage() {
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
              <div className="aspect-video bg-gray-200"></div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{category.itemCount} items</span>
                  <button className="btn-primary">Browse</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}