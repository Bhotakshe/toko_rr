import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import SessionProviderWrapper from './providers/SessionProviderWrapper';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/wishlist-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Elegant Threads | Premium Clothing Store',
  description: 'Discover the latest fashion trends with our premium clothing collection',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviderWrapper>
          <CartProvider>
            <WishlistProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
              <Toaster position="top-center" />
            </WishlistProvider>
          </CartProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}