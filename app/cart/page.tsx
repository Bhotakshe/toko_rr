'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export default function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCart();

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.11; // PPN 11%
  const total = subtotal + tax;

  const handleCheckout = () => {
    // Format pesan untuk WhatsApp
    const message = `*Order dari Toko RR*\n\n` +
      `*Detail Pesanan:*\n` +
      items.map(item => 
        `${item.name} x${item.quantity} = ${formatPrice(item.price * item.quantity)}`
      ).join('\n') +
      `\n\n*Subtotal:* ${formatPrice(subtotal)}` +
      `\n*PPN (11%):* ${formatPrice(tax)}` +
      `\n*Total:* ${formatPrice(total)}` +
      `\n\nMohon konfirmasi pesanan saya.`;

    // Nomor WhatsApp toko (ganti dengan nomor yang sesuai)
    const phoneNumber = '6281286383535';
    
    // Buat URL WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Buka WhatsApp di tab baru
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8">Keranjang Belanja</h1>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6 mb-4">
                  <div className="flex items-center">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="ml-6 flex-grow">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600 mt-1">{formatPrice(item.price)}</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          -
                        </button>
                        <span className="mx-4">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-red-500 hover:text-red-700"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>PPN (11%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-primary text-white py-2 rounded-md mt-6 hover:bg-primary-dark transition-colors"
              >
                Checkout via WhatsApp
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Keranjang belanja Anda kosong</p>
            <Link href="/products" className="text-primary hover:text-primary-dark">
              Mulai Berbelanja
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
} 