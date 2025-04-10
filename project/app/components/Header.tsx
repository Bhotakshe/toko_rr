'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBagIcon, UserIcon, HeartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            Toko RR
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/products" className="text-gray-600 hover:text-primary transition-colors">
              Shop
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2"
            >
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-600" />
            </motion.button>

            <Link href="/wishlist" className="p-2">
              <HeartIcon className="h-6 w-6 text-gray-600" />
            </Link>

            <Link href="/cart" className="p-2 relative">
              <ShoppingBagIcon className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            <Link href={session ? '/account' : '/auth/signin'} className="p-2">
              <UserIcon className="h-6 w-6 text-gray-600" />
            </Link>
          </div>
        </div>

        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="py-4"
          >
            <input
              type="search"
              placeholder="Search products..."
              className="w-full input-field"
              autoFocus
            />
          </motion.div>
        )}
      </div>
    </header>
  );
}