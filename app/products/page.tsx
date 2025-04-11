'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { dummyProducts } from '@/app/utils/dummyData';
import { useCart } from '@/app/context/CartContext';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price * 15000);
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, items, updateQuantity } = useCart();

  useEffect(() => {
    setTimeout(() => {
      setProducts(dummyProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success('Produk ditambahkan ke keranjang!');
  };

  const getItemQuantity = (productId: string) => {
    const item = items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Our Products</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {loading ? (
            [...Array(10)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-gray-200"></div>
                <div className="p-3">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2 w-2/3"></div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    <div className="h-6 w-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            products.map((product) => {
              const quantity = getItemQuantity(product.id);
              return (
                <Link 
                  href={`/products/${product.id}`} 
                  key={product.id}
                  className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden group">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <h2 className="text-sm font-semibold mb-1 truncate">{product.name}</h2>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold">{formatPrice(product.price)}</span>
                        {quantity === 0 ? (
                          <button 
                            onClick={(e) => handleAddToCart(product)}
                            className="bg-primary text-white px-2 py-1 rounded text-xs hover:bg-primary-dark transition-colors"
                          >
                            Add to Cart
                          </button>
                        ) : (
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={(e) => updateQuantity(product.id, quantity - 1)}
                              className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-xs hover:bg-gray-200"
                            >
                              -
                            </button>
                            <span className="text-xs font-medium w-4 text-center">{quantity}</span>
                            <button
                              onClick={(e) => updateQuantity(product.id, quantity + 1)}
                              className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-xs hover:bg-gray-200"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="mt-2">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })
          )}
        </div>
      </motion.div>
    </div>
  );
}