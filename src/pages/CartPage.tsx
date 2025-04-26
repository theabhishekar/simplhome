import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, X, ShoppingBag, Trash2 } from 'lucide-react';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { getProductById } from '../data/products';
import Button from '../components/ui/Button';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const navigate = useNavigate();
  
  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'SPRING25') {
      setCouponApplied(true);
    } else {
      alert('Invalid coupon code');
    }
  };
  
  const cartProducts = cartItems.map(item => {
    const product = getProductById(item.id);
    return {
      ...item,
      product,
      price: product ? (product.discountedPrice || product.price) : 0
    };
  });
  
  const subtotal = cartProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  const discount = couponApplied ? subtotal * 0.25 : 0;
  const shipping = subtotal > 50 ? 0 : 7.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="bg-white rounded-lg shadow-soft p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-50 rounded-full text-primary-500 mb-4">
                <ShoppingBag size={36} />
              </div>
              <h1 className="text-2xl font-bold text-neutral-900 mb-2">Your Cart is Empty</h1>
              <p className="text-neutral-600">Looks like you haven't added any products to your cart yet.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" onClick={() => navigate('/products')}>
                Start Shopping
              </Button>
              <Button variant="outline" onClick={() => navigate('/')}>
                Continue Browsing
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-neutral-50 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart items */}
          <div className="md:w-2/3">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-neutral-900">Shopping Cart ({cartItems.length})</h1>
              <Link
                to="/products"
                className="text-primary-500 hover:text-primary-600 flex items-center text-sm font-medium"
              >
                <ChevronLeft size={16} className="mr-1" /> Continue Shopping
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-soft overflow-hidden">
              <div className="divide-y divide-neutral-200">
                {cartProducts.map(item => {
                  if (!item.product) return null;
                  return (
                    <div key={item.id} className="flex flex-col sm:flex-row items-center py-4 px-4 sm:px-6">
                      <div className="flex flex-1 w-full sm:w-auto">
                        <div className="w-20 h-20 flex-shrink-0 rounded border border-neutral-200 overflow-hidden">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="ml-4 flex-1">
                          <Link 
                            to={`/products/${item.id}`}
                            className="text-neutral-900 font-medium hover:text-primary-500"
                          >
                            {item.product.name}
                          </Link>
                          
                          <div className="text-sm text-neutral-500 capitalize mt-1">
                            {item.product.category}
                            {item.product.subcategory && ` / ${item.product.subcategory}`}
                          </div>
                          
                          <div className="mt-1 sm:hidden">
                            <span className="font-medium text-neutral-900">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                          
                          <div className="flex items-center mt-2 sm:mt-4">
                            <button
                              className="p-1 text-neutral-400 hover:text-red-500"
                              onClick={() => removeFromCart(item.id)}
                              aria-label="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-4 sm:mt-0">
                        <div className="flex items-center border border-neutral-300 rounded-md overflow-hidden mr-6">
                          <button
                            className="p-1.5 bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                            onClick={() => decreaseCartQuantity(item.id)}
                          >
                            <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 1H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </button>
                          <span className="px-3 py-1 text-neutral-800">{item.quantity}</span>
                          <button
                            className="p-1.5 bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                            onClick={() => increaseCartQuantity(item.id)}
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </button>
                        </div>
                        
                        <div className="text-right min-w-24">
                          <div className="text-neutral-900 font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-neutral-500">
                            ${item.price.toFixed(2)} each
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Cart summary */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow-soft p-6">
              <h2 className="text-lg font-bold text-neutral-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="text-neutral-900 font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                {couponApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (25%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="text-neutral-900">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">Tax (8%)</span>
                  <span className="text-neutral-900">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-neutral-200 pt-3 flex justify-between">
                  <span className="text-neutral-900 font-bold">Total</span>
                  <span className="text-neutral-900 font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
              
              {!couponApplied && (
                <div className="mb-6">
                  <label htmlFor="coupon" className="block text-sm font-medium text-neutral-700 mb-1">
                    Coupon Code
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="coupon"
                      className="flex-1 border border-neutral-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button
                      className="bg-neutral-800 text-white px-4 py-2 rounded-r-md hover:bg-neutral-700"
                      onClick={applyCoupon}
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">Try "SPRING25" for 25% off</p>
                </div>
              )}
              
              <Button
                variant="primary"
                fullWidth
                className="py-3"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-neutral-500 mb-2">Secure Payment Processing</p>
                <div className="flex justify-center space-x-2">
                  <div className="w-8 h-5 bg-neutral-200 rounded"></div>
                  <div className="w-8 h-5 bg-neutral-200 rounded"></div>
                  <div className="w-8 h-5 bg-neutral-200 rounded"></div>
                  <div className="w-8 h-5 bg-neutral-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;