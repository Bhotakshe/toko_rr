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
        <h1 className="text-4xl font-bold mb-8 text-center">About Elegant Threads</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-6">
            Founded in 2023, Elegant Threads has been dedicated to providing premium quality clothing
            and accessories to our discerning customers. We believe that everyone deserves to feel
            confident and stylish in what they wear.
          </p>
          <p className="text-gray-600">
            Our curated collection features carefully selected pieces that combine contemporary design
            with timeless elegance. We work with ethical manufacturers and sustainable materials to
            ensure our fashion footprint remains responsible and conscious.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">Quality First</h3>
            <p className="text-gray-600">Premium materials and expert craftsmanship in every piece</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">Sustainable Fashion</h3>
            <p className="text-gray-600">Committed to ethical and environmentally conscious practices</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">Customer Focus</h3>
            <p className="text-gray-600">Dedicated to providing exceptional shopping experiences</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-4">Visit Our Store</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Opening Hours</h3>
              <ul className="text-gray-600 space-y-2">
                <li>Monday - Friday: 10:00 AM - 8:00 PM</li>
                <li>Saturday: 10:00 AM - 6:00 PM</li>
                <li>Sunday: 12:00 PM - 5:00 PM</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
              <ul className="text-gray-600 space-y-2">
                <li>123 Fashion Street</li>
                <li>Style City, SC 12345</li>
                <li>Phone: (555) 123-4567</li>
                <li>Email: info@elegantthreads.com</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}