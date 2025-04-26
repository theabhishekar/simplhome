import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { getBestsellerProducts } from '../../data/products';
import ProductCard from '../ui/ProductCard';

const FeaturedProducts: React.FC = () => {
  const featuredProducts = getBestsellerProducts();
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900">Bestselling Products</h2>
            <p className="text-neutral-600 mt-2">Our most popular products based on sales</p>
          </div>
          <Link 
            to="/products" 
            className="hidden sm:flex items-center text-primary-500 hover:text-primary-600 font-medium transition-colors duration-200"
          >
            View all products <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="flex justify-center sm:hidden">
          <Link 
            to="/products" 
            className="flex items-center text-primary-500 hover:text-primary-600 font-medium transition-colors duration-200"
          >
            View all products <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;