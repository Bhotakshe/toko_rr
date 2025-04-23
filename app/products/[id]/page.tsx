'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';
import { toast } from 'react-hot-toast';
import { getProductById } from '@/app/utils/dummyData';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price * 15000);
};

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const product = getProductById(params.id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-800">Product not found</h1>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    toast.success('Produk ditambahkan ke keranjang!');
  };

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="container mx-auto px-3 py-6 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{product.name}</h1>
            <p className="text-xl font-bold text-primary">{formatPrice(product.price)}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-1">Description</h2>
            <p className="text-gray-600 text-sm">{product.description}</p>
          </div>

          {/* Size Selection */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Select Size</h2>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    selectedSize === size
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-gray-300 text-gray-600 hover:border-primary'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Quantity</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-primary transition-colors"
              >
                -
              </button>
              <span className="text-lg font-medium w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-primary transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary text-white py-2 rounded-md font-medium hover:bg-primary-dark transition-colors text-sm"
          >
            Add to Cart
          </button>

          {/* Additional Info */}
          <div className="border-t pt-4 mt-4 space-y-3">
            <div>
              <h3 className="text-xs font-medium text-gray-900">Category</h3>
              <p className="mt-1 text-xs text-gray-500">{product.category}</p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-900">Shipping</h3>
              <p className="mt-1 text-xs text-gray-500">2-3 business days</p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-900">Returns</h3>
              <p className="mt-1 text-xs text-gray-500">30 days return policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 