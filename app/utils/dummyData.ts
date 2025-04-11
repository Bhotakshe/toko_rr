import { createApi } from 'unsplash-js';
import { Random } from 'unsplash-js/dist/methods/photos/types';

// Initialize Unsplash API
const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || '',
});

// Types for our dummy data
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  isFeatured?: boolean;
}

interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

// Categories data
export const categories: Category[] = [
  {
    id: 'cat-1',
    name: "Men's Clothing",
    image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&q=80',
    description: 'Stylish and comfortable clothing for men'
  },
  {
    id: 'cat-2',
    name: "Women's Clothing",
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80',
    description: 'Elegant and fashionable clothing for women'
  },
  {
    id: 'cat-3',
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80',
    description: 'Complete your look with our accessories'
  }
];

// Featured products data
export const featuredProducts: Product[] = [
  {
    id: 'product-1',
    name: 'Premium Smartphone',
    price: 999.99,
    description: 'Latest smartphone with advanced features',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80',
    category: 'Electronics',
    isFeatured: true
  },
  {
    id: 'product-2',
    name: 'Designer Watch',
    price: 299.99,
    description: 'Elegant timepiece for the modern individual',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80',
    category: 'Fashion',
    isFeatured: true
  },
  {
    id: 'product-3',
    name: 'Modern Sofa',
    price: 799.99,
    description: 'Comfortable and stylish living room centerpiece',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80',
    category: 'Home & Living',
    isFeatured: true
  }
];

// Hero section data
export const heroData = {
  title: "Selamat datang di Toko Kami",
  description: "Jelajahi pilihan produk premium kami dan temukan penawaran terbaik hari ini.",
  image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80"
};

// Generate random price between min and max
const getRandomPrice = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Generate dummy products
export const generateDummyProducts = async (count: number = 10): Promise<Product[]> => {
  try {
    // Fetch random photos from Unsplash
    const response = await unsplash.photos.getRandom({
      count,
      query: 'product',
    });

    if (response.type === 'success') {
      return (response.response as Random[]).map((photo: Random, index: number) => ({
        id: `product-${index + 1}`,
        name: `Product ${index + 1}`,
        price: getRandomPrice(10, 1000),
        description: `This is a description for Product ${index + 1}. It's a great product that you'll love!`,
        image: photo.urls.regular,
        category: categories[Math.floor(Math.random() * categories.length)].name,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error generating dummy data:', error);
    return [];
  }
};

// Local dummy products with Unsplash images
export const dummyProducts: Product[] = [
  {
    id: 'product-1',
    name: 'Classic Cotton T-Shirt',
    price: 299000,
    description: 'Comfortable and stylish cotton t-shirt for everyday wear',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80',
    category: "Men's Clothing"
  },
  {
    id: 'product-2',
    name: 'Slim Fit Denim Jeans',
    price: 599000,
    description: 'Modern slim fit jeans with premium denim material',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80',
    category: "Men's Clothing"
  },
  {
    id: 'product-3',
    name: 'Floral Summer Dress',
    price: 450000,
    description: 'Beautiful floral dress perfect for summer occasions',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80',
    category: "Women's Clothing"
  },
  {
    id: 'product-4',
    name: 'Elegant Blouse',
    price: 350000,
    description: 'Sophisticated blouse for professional and casual wear',
    image: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?auto=format&fit=crop&q=80',
    category: "Women's Clothing"
  },
  {
    id: 'product-5',
    name: 'Leather Handbag',
    price: 899000,
    description: 'Premium leather handbag with elegant design',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80',
    category: 'Accessories'
  },
  {
    id: 'product-6',
    name: 'Classic Sunglasses',
    price: 299000,
    description: 'Timeless sunglasses design with UV protection',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80',
    category: 'Accessories'
  },
  {
    id: 'product-7',
    name: 'Casual Sneakers',
    price: 799000,
    description: 'Comfortable sneakers for everyday use',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80',
    category: 'Footwear'
  },
  {
    id: 'product-8',
    name: 'Gold Necklace',
    price: 1299000,
    description: 'Elegant gold necklace with modern design',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80',
    category: 'Jewelry'
  },
  {
    id: 'product-9',
    name: 'Sports Running Shoes',
    price: 899000,
    description: 'High-performance running shoes for athletes',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80',
    category: 'Sports & Active Wear'
  }
];

// Function to get all products
export const getAllProducts = () => {
  return dummyProducts;
};

// Function to get a product by ID
export const getProductById = (id: string) => {
  return dummyProducts.find(product => product.id === id);
};

// Function to get products by category
export const getProductsByCategory = (category: string) => {
  return dummyProducts.filter(product => product.category.toLowerCase() === category.toLowerCase());
};

// Example usage:
// const products = await generateDummyProducts(5); 