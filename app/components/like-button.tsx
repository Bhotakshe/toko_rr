'use client';

import { motion } from 'framer-motion';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useWishlist } from '@/app/context/wishlist-context';
import { toast } from 'react-hot-toast';

interface LikeButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
  };
  className?: string;
}

export default function LikeButton({ product, className = '' }: LikeButtonProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isLiked = isInWishlist(product.id);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if button is inside a Link
    
    if (isLiked) {
      removeFromWishlist(product.id);
      toast.success('Dihapus dari wishlist');
    } else {
      addToWishlist(product);
      toast.success('Ditambahkan ke wishlist');
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleLikeClick}
      className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${className}`}
    >
      {isLiked ? (
        <HeartSolidIcon className="h-6 w-6 text-red-500" />
      ) : (
        <HeartIcon className="h-6 w-6 text-gray-600" />
      )}
    </motion.button>
  );
} 