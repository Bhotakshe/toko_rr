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
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80',
    description: 'Latest gadgets and electronics'
  },
  {
    id: 'cat-2',
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80',
    description: 'Trendy clothing and accessories'
  },
  {
    id: 'cat-3',
    name: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80',
    description: 'Home decor and essentials'
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
    name: 'Premium Leather Bag',
    price: 299.99,
    description: 'Handcrafted leather bag with premium quality materials and elegant design.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80',
    category: 'Fashion'
  },
  {
    id: 'product-2',
    name: 'Wireless Headphones',
    price: 199.99,
    description: 'High-quality wireless headphones with noise cancellation technology.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80',
    category: 'Electronics'
  },
  {
    id: 'product-3',
    name: 'Smart Watch',
    price: 249.99,
    description: 'Modern smartwatch with health tracking and notification features.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80',
    category: 'Electronics'
  },
  {
    id: 'product-4',
    name: 'Running Shoes',
    price: 129.99,
    description: 'Comfortable and durable running shoes for professional athletes.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80',
    category: 'Sports'
  },
  {
    id: 'product-5',
    name: 'Minimalist Backpack',
    price: 89.99,
    description: 'Stylish and practical backpack for everyday use.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80',
    category: 'Fashion'
  },
  {
    id: 'product-6',
    name: 'Coffee Maker',
    price: 159.99,
    description: 'Modern coffee maker for the perfect morning brew.',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80',
    category: 'Home'
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