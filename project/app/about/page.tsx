'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-center"> Tentang Toko RR </h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Kisah Kami</h2>
          <p className="text-gray-600 mb-6">
          Didirikan pada tahun 2019, Elegant Threads telah didedikasikan untuk menyediakan pakaian berkualitas premium
          dan aksesori untuk pelanggan kami yang cerdas. Kami percaya bahwa setiap orang berhak merasakan
          percaya diri dan bergaya dalam apa yang mereka kenakan.
          </p>
          <p className="text-gray-600">
          Koleksi kami yang dipilih dengan cermat mencampurkan desain modern dengan eleganitas yang tak terlupakan. Kami bekerja dengan produsen etis dan bahan yang berkelanjutan untuk memastikan kaki kami tetap bertanggung jawab dan berkomitmen.
          dengan keanggunan abadi. Kami bekerja dengan produsen etis dan bahan berkelanjutan untuk
          memastikan jejak mode kami tetap bertanggung jawab dan sadar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">Kualitas Pertama</h3>
            <p className="text-gray-600">Bahan premium dan pengerjaan ahli di setiap bagian</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">Mode Berkelanjutan</h3>
            <p className="text-gray-600">Berkomitmen pada praktik etis dan sadar lingkungan</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">Fokus Pelanggan</h3>
            <p className="text-gray-600">Berdedikasi untuk memberikan pengalaman berbelanja yang luar biasa</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}