'use client';

import { motion } from 'framer-motion';
import FeaturedProducts from './components/FeaturedProducts';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Newsletter from './components/Newsletter';

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <FeaturedProducts />
      </motion.div>
      <Categories />
      <Newsletter />
    </div>
  );
}