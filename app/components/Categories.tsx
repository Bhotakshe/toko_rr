import React from 'react';
import { categories } from '@/app/utils/dummyData';
import Image from 'next/image';
import Link from 'next/link';

const Categories = () => {
  const categoryItemCounts: Record<string, number> = {
    "Men's Clothing": 42,
    "Women's Clothing": 56,
    "Accessories": 28
  };

  const getCategorySlug = (categoryName: string) => {
    return categoryName.toLowerCase().replace("'s", "s").replace(" ", "-");
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{categoryItemCounts[category.name]} items</span>
                  <Link href={`/products/${getCategorySlug(category.name)}`}>
                    <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors">
                      Browse
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;