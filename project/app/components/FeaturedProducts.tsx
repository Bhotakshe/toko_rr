import React from 'react';
import { featuredProducts } from '@/app/utils/dummyData';
import Image from 'next/image';

const FeaturedProducts = () => {
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
              <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
              <button className="btn-primary">Add to Cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;