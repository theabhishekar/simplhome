import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, Heart, ChevronLeft, ChevronRight, Truck, ShieldCheck, 
  RefreshCcw, Star, Minus, Plus, Share2
} from 'lucide-react';
import { getProductById, getProductsByCategory, Product } from '../data/products';
import { useShoppingCart } from '../context/ShoppingCartContext';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();
  
  const product = getProductById(Number(productId));
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  
  const quantity = getItemQuantity(Number(productId));
  
  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">Product Not Found</h1>
          <p className="text-neutral-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Button variant="primary" onClick={() => navigate('/products')}>
            Return to Products
          </Button>
        </div>
      </div>
    );
  }
  
  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);
  
  const handlePrevImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex((currentImageIndex - 1 + product.images.length) % product.images.length);
    }
  };
  
  const handleNextImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex((currentImageIndex + 1) % product.images.length);
    }
  };
  
  const productImages = product.images || [product.image];
  
  return (
    <div className="bg-neutral-50 pb-16">
      {/* Breadcrumbs */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex">
            <Link to="/" className="text-neutral-500 hover:text-primary-500">Home</Link>
            <span className="mx-2 text-neutral-400">/</span>
            <Link to="/products" className="text-neutral-500 hover:text-primary-500">Products</Link>
            <span className="mx-2 text-neutral-400">/</span>
            <Link 
              to={`/products?category=${product.category}`} 
              className="text-neutral-500 hover:text-primary-500 capitalize"
            >
              {product.category}
            </Link>
            <span className="mx-2 text-neutral-400">/</span>
            <span className="text-neutral-800 truncate">{product.name}</span>
          </nav>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Product images */}
          <div>
            <div className="relative bg-white rounded-lg overflow-hidden shadow-soft mb-4">
              <img
                src={productImages[currentImageIndex]}
                alt={product.name}
                className="w-full h-96 object-contain"
              />
              
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-neutral-700 hover:text-primary-500"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-neutral-700 hover:text-primary-500"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.isNew && (
                  <span className="bg-accent-500 text-white px-2 py-1 rounded-md text-xs">
                    New
                  </span>
                )}
                {product.discountedPrice && (
                  <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs">
                    {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% Off
                  </span>
                )}
                {product.isBestseller && (
                  <span className="bg-secondary-500 text-white px-2 py-1 rounded-md text-xs">
                    Bestseller
                  </span>
                )}
              </div>
              
              {/* Wishlist button */}
              <button
                className="absolute top-2 right-2 bg-white/90 hover:bg-white p-2 rounded-full shadow-sm text-neutral-700 hover:text-red-500 transition-colors duration-200"
                aria-label="Add to wishlist"
              >
                <Heart size={20} />
              </button>
            </div>
            
            {/* Thumbnail images */}
            {productImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative min-w-20 h-20 rounded border-2 overflow-hidden ${
                      index === currentImageIndex
                        ? 'border-primary-500'
                        : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} - view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product details */}
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? 'fill-current' : 'text-neutral-300'}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-neutral-600">
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="mb-4">
              {product.discountedPrice ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-neutral-900 mr-2">
                    ${product.discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-lg text-neutral-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-neutral-900">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            
            {/* Stock status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <span className="inline-flex items-center text-sm text-green-700 bg-green-50 px-2 py-1 rounded">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-1"></span>
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="inline-flex items-center text-sm text-red-700 bg-red-50 px-2 py-1 rounded">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-1"></span>
                  Out of Stock
                </span>
              )}
            </div>
            
            {/* Short description */}
            <p className="text-neutral-700 mb-6">{product.description}</p>
            
            {/* Add to cart */}
            <div className="mb-6">
              {quantity === 0 ? (
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="py-3"
                  onClick={() => increaseCartQuantity(product.id)}
                  rightIcon={<ShoppingCart size={18} />}
                  disabled={product.stock === 0}
                >
                  Add to Cart
                </Button>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center border border-neutral-300 rounded-md overflow-hidden">
                    <button
                      className="p-2 bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                      onClick={() => decreaseCartQuantity(product.id)}
                    >
                      <Minus size={18} />
                    </button>
                    <span className="px-4 py-2 text-neutral-800 font-medium">{quantity}</span>
                    <button
                      className="p-2 bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                      onClick={() => increaseCartQuantity(product.id)}
                      disabled={quantity >= product.stock}
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <Button
                    variant="primary"
                    className="flex-grow py-2"
                    onClick={() => navigate('/cart')}
                  >
                    View Cart
                  </Button>
                </div>
              )}
            </div>
            
            {/* Share */}
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-neutral-700">Share:</span>
              <div className="flex space-x-2">
                <button
                  className="p-2 rounded-full bg-neutral-100 text-neutral-700 hover:bg-primary-50 hover:text-primary-500"
                  aria-label="Share on Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </button>
                <button
                  className="p-2 rounded-full bg-neutral-100 text-neutral-700 hover:bg-primary-50 hover:text-primary-500"
                  aria-label="Share on Twitter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </button>
                <button
                  className="p-2 rounded-full bg-neutral-100 text-neutral-700 hover:bg-primary-50 hover:text-primary-500"
                  aria-label="Share via Email"
                >
                  <Mail size={16} />
                </button>
                <button
                  className="p-2 rounded-full bg-neutral-100 text-neutral-700 hover:bg-primary-50 hover:text-primary-500"
                  aria-label="Copy Link"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>
            
            {/* Shipping & Returns */}
            <div className="bg-neutral-50 rounded-lg p-4 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start">
                  <Truck size={20} className="text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900">Free Shipping</h4>
                    <p className="text-xs text-neutral-600">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <ShieldCheck size={20} className="text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900">Secure Payment</h4>
                    <p className="text-xs text-neutral-600">100% secure payment</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <RefreshCcw size={20} className="text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900">Easy Returns</h4>
                    <p className="text-xs text-neutral-600">30 day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product tabs */}
        <div className="mt-12">
          <div className="border-b border-neutral-200">
            <nav className="flex -mb-px">
              <button
                className={`px-4 py-2 font-medium text-sm border-b-2 ${
                  activeTab === 'description'
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-neutral-600 hover:text-neutral-800 hover:border-neutral-300'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm border-b-2 ${
                  activeTab === 'features'
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-neutral-600 hover:text-neutral-800 hover:border-neutral-300'
                }`}
                onClick={() => setActiveTab('features')}
              >
                Features
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm border-b-2 ${
                  activeTab === 'specifications'
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-neutral-600 hover:text-neutral-800 hover:border-neutral-300'
                }`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-neutral-600 hover:text-neutral-800 hover:border-neutral-300'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({product.reviewCount})
              </button>
            </nav>
          </div>
          
          <div className="py-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-neutral-700">{product.description}</p>
                {/* Add more detailed description here */}
                <p className="text-neutral-700 mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
                </p>
              </div>
            )}
            
            {activeTab === 'features' && (
              <div>
                {product.features ? (
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-neutral-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-neutral-600">No features listed for this product.</p>
                )}
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div>
                {product.specifications ? (
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-neutral-200">
                      <tbody className="divide-y divide-neutral-200">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <tr key={key}>
                            <td className="py-3 px-4 text-sm text-neutral-900 font-medium bg-neutral-50 w-1/3">
                              {key}
                            </td>
                            <td className="py-3 px-4 text-sm text-neutral-700">
                              {String(value)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-neutral-600">No specifications listed for this product.</p>
                )}
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-neutral-900">
                      Customer Reviews
                    </h3>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={i < Math.floor(product.rating) ? 'fill-current' : 'text-neutral-300'}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-neutral-600">
                        Based on {product.reviewCount} reviews
                      </span>
                    </div>
                  </div>
                  <Button variant="outline">Write a Review</Button>
                </div>
                
                {/* Placeholder for reviews */}
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="border border-neutral-200 rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center mr-2">
                            <span className="text-neutral-600 font-medium">
                              {String.fromCharCode(65 + i)}
                            </span>
                          </div>
                          <span className="font-medium text-neutral-900">Customer {i + 1}</span>
                        </div>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              size={14}
                              className={j < 5 - i % 2 ? 'fill-current' : 'text-neutral-300'}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-neutral-700 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                      <div className="mt-2 text-xs text-neutral-500">
                        Posted on {new Date(Date.now() - i * 3e6).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <Button variant="outline">Load More Reviews</Button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;