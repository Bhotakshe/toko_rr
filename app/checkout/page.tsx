'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/app/context/CartContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price * 15000);
};

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Set current date and time
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    setCurrentDate(now.toLocaleDateString('id-ID', options));
  }, []);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and show success message
      clearCart();
      toast.success('Pesanan berhasil diproses!');
      router.push('/');
    } catch (error) {
      toast.error('Terjadi kesalahan saat memproses pesanan');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Keranjang Kosong</h1>
        <p className="text-gray-600 mb-6">Silakan tambahkan produk ke keranjang terlebih dahulu</p>
        <button
          onClick={() => router.push('/products')}
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
        >
          Lihat Produk
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>
          
          {/* Order Date */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-gray-600">
              Tanggal Pemesanan: <span className="font-semibold">{currentDate}</span>
            </p>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                  <div className="relative w-20 h-20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">Jumlah: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatPrice(item.price)}</p>
                    <p className="text-sm text-gray-600">
                      Total: {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Pembayaran:</span>
                <span className="text-xl font-bold text-primary">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCheckout}
            disabled={isProcessing}
            className={`w-full py-3 px-6 rounded-md text-white font-medium ${
              isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary hover:bg-primary-dark'
            } transition-colors`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </span>
            ) : (
              'Proses Pembayaran'
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
} 