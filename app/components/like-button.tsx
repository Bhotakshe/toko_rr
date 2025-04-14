'use client';

import { useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface LikeButtonProps {
  product: {
    id: string;
    name: string;
  };
}

export default function LikeButton({ product }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      toast.success('Ditambahkan ke favorit');
    } else {
      toast.success('Dihapus dari favorit');
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleLike}
      className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white/90 transition-colors"
    >
      {isLiked ? (
        <HeartIconSolid className="h-5 w-5 text-red-500" />
      ) : (
        <HeartIcon className="h-5 w-5 text-gray-600" />
      )}
    </motion.button>
  );
} 