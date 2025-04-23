'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CheckoutSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Clear any checkout related data from localStorage if needed
    localStorage.removeItem('cart');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f3f7] px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Pembayaran Berhasil!
          </h2>
          <p className="text-gray-600">
            Terima kasih telah berbelanja di Toko RR. Pesanan Anda akan segera diproses.
          </p>
        </div>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/account')}
            className="w-full bg-[#03ac0e] text-white py-2 px-4 rounded-md hover:bg-[#038e0b] transition-colors duration-200"
          >
            Lihat Pesanan
          </motion.button>

          <Link
            href="/"
            className="block text-[#03ac0e] hover:text-[#038e0b] transition-colors duration-200"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
} 