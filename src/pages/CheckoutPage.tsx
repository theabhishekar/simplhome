import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ChevronRight, Check } from 'lucide-react';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { getProductById } from '../data/products';
import Button from '../components/ui/Button';

const CheckoutPage: React.FC = () => {
  const { cartItems } = useShoppingCart();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };
  
  const handlePlaceOrder = () => {
    // In a real application, you would process the order here
    navigate('/order-confirmation');
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
  
  const shipping = subtotal > 50 ? 0 : 7.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Your Cart is Empty</h1>
          <p className="text-neutral-600 mb-8">Add items to your cart before proceeding to checkout.</p>
          <Button variant="primary" onClick={() => navigate('/products')}>
            Shop Now
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-neutral-50 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Checkout steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className={`flex flex-col items-center ${step >= 1 ? 'text-primary-500' : 'text-neutral-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-primary-500 text-white' : 'bg-neutral-200 text-neutral-500'
              }`}>
                {step > 1 ? <Check size={16} /> : 1}
              </div>
              <span className="mt-1 text-xs sm:text-sm">Shipping</span>
            </div>
            
            <div className={`flex-1 h-0.5 mx-2 ${step >= 2 ? 'bg-primary-500' : 'bg-neutral-200'}`}></div>
            
            <div className={`flex flex-col items-center ${step >= 2 ? 'text-primary-500' : 'text-neutral-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-primary-500 text-white' : 'bg-neutral-200 text-neutral-500'
              }`}>
                {step > 2 ? <Check size={16} /> : 2}
              </div>
              <span className="mt-1 text-xs sm:text-sm">Payment</span>
            </div>
            
            <div className={`flex-1 h-0.5 mx-2 ${step >= 3 ? 'bg-primary-500' : 'bg-neutral-200'}`}></div>
            
            <div className={`flex flex-col items-center ${step >= 3 ? 'text-primary-500' : 'text-neutral-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 3 ? 'bg-primary-500 text-white' : 'bg-neutral-200 text-neutral-500'
              }`}>
                3
              </div>
              <span className="mt-1 text-xs sm:text-sm">Review</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main checkout form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-soft p-6">
                <div className="flex items-center mb-6">
                  <Truck size={20} className="text-primary-500 mr-2" />
                  <h2 className="text-xl font-bold text-neutral-900">Shipping Information</h2>
                </div>
                
                <form onSubmit={handleShippingSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                        First Name*
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
                      Street Address*
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-1">
                        City*
                      </label>
                      <input
                        type="text"
                        id="city"
                        className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-neutral-700 mb-1">
                        State/Province*
                      </label>
                      <input
                        type="text"
                        id="state"
                        className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-neutral-700 mb-1">
                        ZIP/Postal Code*
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="country" className="block text-sm font-medium text-neutral-700 mb-1">
                      Country*
                    </label>
                    <select
                      id="country"
                      className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      value={shippingInfo.country}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      variant="primary"
                      rightIcon={<ChevronRight size={16} />}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            {step === 2 && (
              <div className="bg-white rounded-lg shadow-soft p-6">
                <div className="flex items-center mb-6">
                  <CreditCard size={20} className="text-primary-500 mr-2" />
                  <h2 className="text-xl font-bold text-neutral-900">Payment Information</h2>
                </div>
                
                <form onSubmit={handlePaymentSubmit}>
                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-neutral-700 mb-1">
                      Card Number*
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="cardName" className="block text-sm font-medium text-neutral-700 mb-1">
                      Cardholder Name*
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="John Doe"
                      value={paymentInfo.cardName}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-neutral-700 mb-1">
                        Expiry Date*
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-neutral-700 mb-1">
                        CVV*
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="bg-neutral-50 rounded-md p-4 mb-6">
                    <p className="text-sm text-neutral-600">
                      <span className="font-medium">Secure Payment: </span>
                      Your payment information is encrypted and secure. We do not store your credit card details.
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      className="text-primary-500 hover:text-primary-600 font-medium flex items-center"
                      onClick={() => setStep(1)}
                    >
                      <ChevronRight size={16} className="rotate-180 mr-1" /> Back to Shipping
                    </button>
                    
                    <Button
                      type="submit"
                      variant="primary"
                      rightIcon={<ChevronRight size={16} />}
                    >
                      Review Order
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            {step === 3 && (
              <div className="bg-white rounded-lg shadow-soft p-6">
                <h2 className="text-xl font-bold text-neutral-900 mb-6">Order Review</h2>
                
                <div className="border-b border-neutral-200 pb-6 mb-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">Items in Your Order</h3>
                  <div className="space-y-4">
                    {cartProducts.map(item => {
                      if (!item.product) return null;
                      return (
                        <div key={item.id} className="flex items-start">
                          <div className="w-16 h-16 rounded border border-neutral-200 overflow-hidden flex-shrink-0">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <h4 className="text-neutral-900 font-medium">{item.product.name}</h4>
                            <div className="text-sm text-neutral-500">Quantity: {item.quantity}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-neutral-900 font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">Shipping Information</h3>
                    <div className="bg-neutral-50 rounded-md p-4">
                      <p className="text-neutral-800 font-medium">
                        {shippingInfo.firstName} {shippingInfo.lastName}
                      </p>
                      <p className="text-neutral-700">{shippingInfo.address}</p>
                      <p className="text-neutral-700">
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                      </p>
                      <p className="text-neutral-700">{shippingInfo.country}</p>
                      <p className="text-neutral-700 mt-2">{shippingInfo.email}</p>
                      <p className="text-neutral-700">{shippingInfo.phone}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">Payment Method</h3>
                    <div className="bg-neutral-50 rounded-md p-4">
                      <p className="text-neutral-800 font-medium">Credit Card</p>
                      <p className="text-neutral-700">
                        **** **** **** {paymentInfo.cardNumber.slice(-4)}
                      </p>
                      <p className="text-neutral-700">{paymentInfo.cardName}</p>
                      <p className="text-neutral-700">Expires: {paymentInfo.expiryDate}</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-neutral-200 pt-6 mb-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">Delivery Method</h3>
                  <div className="bg-neutral-50 rounded-md p-4">
                    <div className="flex items-center">
                      <input
                        id="standard-shipping"
                        name="shipping-method"
                        type="radio"
                        className="h-4 w-4 text-primary-500 border-neutral-300"
                        checked
                        readOnly
                      />
                      <label htmlFor="standard-shipping" className="ml-2 block text-neutral-800">
                        Standard Shipping (3-5 business days)
                      </label>
                      <span className="ml-auto font-medium">
                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="text-primary-500 hover:text-primary-600 font-medium flex items-center"
                    onClick={() => setStep(2)}
                  >
                    <ChevronRight size={16} className="rotate-180 mr-1" /> Back to Payment
                  </button>
                  
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Order summary */}
          <div>
            <div className="bg-white rounded-lg shadow-soft p-6 sticky top-24">
              <h2 className="text-lg font-bold text-neutral-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="text-neutral-900 font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
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
              
              <div className="text-sm text-neutral-600 mb-6">
                By placing your order, you agree to our{' '}
                <a href="#" className="text-primary-500 hover:text-primary-600">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary-500 hover:text-primary-600">
                  Privacy Policy
                </a>
              </div>
              
              <div className="text-center">
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

export default CheckoutPage;