'use client';

import { motion } from 'framer-motion';
import { useWishlist } from '@/app/context/wishlist-context';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import { toast } from 'react-hot-toast';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price * 15000);
};

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = async (product: any) => {
    await addToCart(product);
    toast.success('Produk ditambahkan ke keranjang!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8">Wishlist Saya</h1>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">
                      {formatPrice(product.price)}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="p-2 text-red-500 hover:text-red-600"
                      >
                        Hapus
                      </button>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition-colors"
                      >
                        + Keranjang
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Wishlist Anda masih kosong</p>
            <Link
              href="/products"
              className="text-primary hover:text-primary-dark transition-colors"
            >
              Mulai Belanja
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
} 