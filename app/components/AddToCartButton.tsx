'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/app/context/CartContext';

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  price: number;
  image: string;
}

export default function AddToCartButton({ productId, productName, price, image }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if button is inside a Link
    setIsAdding(true);
    try {
      await addToCart({
        id: productId,
        name: productName,
        price,
        image
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`
        w-full flex items-center justify-center space-x-2
        px-4 py-2 rounded-md
        text-sm font-medium
        ${isAdding 
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-primary hover:bg-primary-dark'
        }
        text-white
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
      `}
    >
      <ShoppingCartIcon className="h-5 w-5" />
      <span>{isAdding ? 'Adding...' : 'Add to Cart'}</span>
    </motion.button>
  );
} 