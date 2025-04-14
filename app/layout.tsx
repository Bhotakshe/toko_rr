'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth/');

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <CartProvider>
            {!isAuthPage && <Header />}
            <main className="flex-grow">
              {children}
            </main>
            {!isAuthPage && <Footer />}
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}