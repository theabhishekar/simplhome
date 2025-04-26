import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { Product } from '../../data/products';
import Button from './Button';

interface ProductCardProps {
  product: Product;
  isCompact?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isCompact = false }) => {
  const { increaseCartQuantity } = useShoppingCart();
  
  const discountPercentage = product.discountedPrice 
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;
    
  return (
    <div className={`group bg-white rounded-lg overflow-hidden shadow-soft transition-all duration-300 hover:shadow-medium ${isCompact ? 'h-full' : ''}`}>
      {/* Product image and badges */}
      <div className="relative overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-md">
              New
            </span>
          )}
          {product.discountedPrice && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-md">
              {discountPercentage}% Off
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-secondary-500 text-white text-xs px-2 py-1 rounded-md">
              Bestseller
            </span>
          )}
        </div>
        
        {/* Quick action buttons */}
        <div className="absolute top-2 right-2">
          <button 
            className="bg-white/90 hover:bg-white p-1.5 rounded-full shadow-sm transition-colors duration-200"
            aria-label="Add to wishlist"
          >
            <Heart size={18} className="text-neutral-700 hover:text-red-500 transition-colors duration-200" />
          </button>
        </div>
      </div>
      
      {/* Product info */}
      <div className="p-4">
        <div className="mb-2">
          <Link to={`/products/${product.id}`} className="hover:text-primary-500">
            <h3 className="font-medium text-neutral-800 line-clamp-1">{product.name}</h3>
          </Link>
          <div className="text-sm text-neutral-500 capitalize">{product.category}</div>
        </div>
        
        {/* Pricing */}
        <div className="flex items-center mb-3">
          {product.discountedPrice ? (
            <>
              <span className="font-bold text-lg mr-2">${product.discountedPrice.toFixed(2)}</span>
              <span className="text-neutral-500 line-through text-sm">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          )}
        </div>
        
        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-neutral-300'}`}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <span className="ml-1 text-xs text-neutral-500">({product.reviewCount})</span>
        </div>
        
        {/* Action buttons */}
        {!isCompact && (
          <div className="flex items-center space-x-2">
            <Button 
              variant="primary" 
              className="py-1.5 flex-grow text-sm"
              onClick={() => increaseCartQuantity(product.id)}
              rightIcon={<ShoppingCart size={16} />}
            >
              Add to Cart
            </Button>
            <Link 
              to={`/products/${product.id}`} 
              className="text-sm px-3 py-1.5 border border-primary-500 text-primary-500 rounded-md hover:bg-primary-50 transition-colors duration-200"
            >
              Details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;