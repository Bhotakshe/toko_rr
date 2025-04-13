'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/providers/AuthProvider';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(email, password);
      toast.success('Login berhasil!');
      router.push('/');
    } catch (error) {
      toast.error('Email atau password salah');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f0f3f7]">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#f0f3f7] items-center justify-center relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 relative">
            {/* You can add your own store illustration here */}
            <div className="absolute w-16 h-16 bg-green-500 rounded-lg animate-float top-0 right-0">
              <div className="flex items-center justify-center h-full">
                <span className="text-white text-4xl">🛍️</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <div className="w-32 h-32 bg-white rounded-lg shadow-lg flex items-center justify-center">
                <span className="text-6xl">🏪</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 text-center">
              Masuk ke Toko RR
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              <Link 
                href="/auth/register" 
                className="font-medium text-[#03ac0e] hover:text-[#038e0b]"
              >
                Daftar
              </Link>
            </p>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="sr-only">
                Nomor HP atau Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#03ac0e] focus:border-[#03ac0e] sm:text-sm"
                placeholder="Nomor HP atau Email"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading || !email ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#03ac0e] hover:bg-[#038e0b]'
              } transition-colors duration-200`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </span>
              ) : (
                'Selanjutnya'
              )}
            </motion.button>

            <div className="mt-4 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">atau masuk dengan</span>
                </div>
              </div>

              <div className="mt-4 grid gap-2">
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span className="mr-2">🔍</span>
                  Google
                </button>
              </div>
            </div>
          </form>

          <div className="mt-4 text-center text-xs text-gray-600">
            <p>Butuh bantuan?</p>
          </div>
        </div>
      </div>
    </div>
  );
} 