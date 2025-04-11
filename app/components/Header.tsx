'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBagIcon, UserIcon, HeartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useCart } from '@/app/context/CartContext';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const { data: session } = useSession();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  const isActivePath = (path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname?.startsWith(path);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { href: '/', label: 'Home', onClick: handleHomeClick },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="text-2xl font-bold text-gray-800 hover:text-primary transition-colors"
            onClick={handleHomeClick}
          >
            Toko RR
          </Link>

          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={link.onClick}
                className={`${
                  isActivePath(link.href)
                    ? 'text-primary font-medium'
                    : 'text-gray-600 hover:text-primary'
                } transition-colors`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2"
            >
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-600 hover:text-primary transition-colors" />
            </motion.button>

            <Link href="/wishlist" className="p-2">
              <HeartIcon className="h-6 w-6 text-gray-600 hover:text-primary transition-colors" />
            </Link>

            <Link href="/cart" className="p-2 relative">
              <ShoppingBagIcon className="h-6 w-6 text-gray-600 hover:text-primary transition-colors" />
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            <Link href={session ? '/account' : '/auth/signin'} className="p-2">
              <UserIcon className="h-6 w-6 text-gray-600 hover:text-primary transition-colors" />
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