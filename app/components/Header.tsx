'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBagIcon, UserIcon, HeartIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useCart } from '@/app/context/CartContext';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/app/providers/AuthProvider';

export default function Header() {
  const { data: session } = useSession();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, signOut } = useAuth();

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-xl sm:text-2xl font-bold text-gray-800 hover:text-primary transition-colors"
              onClick={handleHomeClick}
            >
              Toko RR
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={link.onClick}
                className={`${
                  isActivePath(link.href)
                    ? 'text-primary font-medium'
                    : 'text-gray-600 hover:text-primary'
                } transition-colors text-sm sm:text-base`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2"
            >
              <MagnifyingGlassIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 hover:text-primary transition-colors" />
            </motion.button>

            <Link href="/wishlist" className="p-2">
              <HeartIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 hover:text-primary transition-colors" />
            </Link>

            <Link href="/cart" className="p-2 relative">
              <ShoppingBagIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 hover:text-primary transition-colors" />
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="p-2 flex items-center space-x-1 sm:space-x-2">
                  <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 hover:text-primary transition-colors" />
                  <span className="hidden sm:inline text-sm text-gray-600">{user?.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Account
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/auth/signin" className="p-2">
                <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 hover:text-primary transition-colors" />
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
              ) : (
                <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (link.onClick) link.onClick(e);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`${
                    isActivePath(link.href)
                      ? 'text-primary font-medium'
                      : 'text-gray-600 hover:text-primary'
                  } transition-colors px-3 py-2 text-base`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}

        {/* Search Bar */}
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="py-4 border-t border-gray-200"
          >
            <div className="max-w-3xl mx-auto px-4">
              <input
                type="search"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}