'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { dummyProducts } from '@/app/utils/dummyData';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for better UX
    setTimeout(() => {
      setProducts(dummyProducts);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeleton
            [...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 w-20 bg-gray-200 rounded"></div>
                    <div className="h-8 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            products.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-square relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                    <button className="btn-primary">Add to Cart</button>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-gray-500">Category: {product.category}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}