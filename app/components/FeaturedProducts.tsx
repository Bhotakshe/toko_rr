import React from 'react';
import { featuredProducts } from '@/app/utils/dummyData';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';
import { toast } from 'react-hot-toast';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const FeaturedProducts = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast.success('Produk ditambahkan ke keranjang!');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">{formatPrice(product.price)}</span>
              <button 
                onClick={() => handleAddToCart(product)}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;