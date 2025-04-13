'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { heroData } from '@/app/utils/dummyData';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();

  const handleShopNow = () => {
    router.push('/products');
  };

  return (
    <div className="relative h-[600px] bg-gray-900 text-white">
      <div className="absolute inset-0">
        <Image
          src={heroData.image}
          alt="Hero background"
          fill
          className="object-cover opacity-50"
        />
      </div>
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl font-bold mb-6">{heroData.title}</h1>
          <p className="text-xl mb-8">{heroData.description}</p>
          <motion.button 
            onClick={handleShopNow}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;