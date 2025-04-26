import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Heart, MapPin, CreditCard, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const AccountPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profile');
  
  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-lg">
          <div className="bg-white rounded-lg shadow-soft p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-full text-primary-500 mb-4">
              <User size={32} />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Sign In Required</h1>
            <p className="text-neutral-600 mb-6">
              Please sign in to access your account dashboard
            </p>
            <div className="space-y-3">
              <Button
                variant="primary"
                fullWidth
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={() => navigate('/signup')}
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-neutral-50 pb-16">
      <div className="bg-primary-500 text-white py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">My Account</h1>
          <p className="text-primary-100">
            Welcome back, {user.name}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-soft overflow-hidden">
              <div className="p-6 text-center border-b border-neutral-200">
                <div className="w-20 h-20 mx-auto bg-primary-100 rounded-full flex items-center justify-center text-primary-500 mb-4">
                  <span className="text-2xl font-bold">{user.name.charAt(0)}</span>
                </div>
                <h2 className="text-lg font-bold text-neutral-900">{user.name}</h2>
                <p className="text-neutral-600 text-sm">{user.email}</p>
              </div>
              
              <nav className="p-2">
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                    activeTab === 'profile'
                      ? 'bg-primary-50 text-primary-500'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  <User size={18} className="mr-3" />
                  <span>Profile</span>
                </button>
                
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                    activeTab === 'orders'
                      ? 'bg-primary-50 text-primary-500'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                  onClick={() => setActiveTab('orders')}
                >
                  <ShoppingBag size={18} className="mr-3" />
                  <span>Orders</span>
                </button>
                
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                    activeTab === 'wishlist'
                      ? 'bg-primary-50 text-primary-500'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                  onClick={() => setActiveTab('wishlist')}
                >
                  <Heart size={18} className="mr-3" />
                  <span>Wishlist</span>
                </button>
                
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                    activeTab === 'addresses'
                      ? 'bg-primary-50 text-primary-500'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                  onClick={() => setActiveTab('addresses')}
                >
                  <MapPin size={18} className="mr-3" />
                  <span>Addresses</span>
                </button>
                
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                    activeTab === 'payment'
                      ? 'bg-primary-50 text-primary-500'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                  onClick={() => setActiveTab('payment')}
                >
                  <CreditCard size={18} className="mr-3" />
                  <span>Payment Methods</span>
                </button>
                
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                    activeTab === 'notifications'
                      ? 'bg-primary-50 text-primary-500'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <Bell size={18} className="mr-3" />
                  <span>Notifications</span>
                </button>
                
                <button
                  className="w-full text-left px-4 py-2 rounded-lg flex items-center text-red-600 hover:bg-red-50"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  <LogOut size={18} className="mr-3" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-soft p-6">
                <h2 className="text-xl font-bold text-neutral-900 mb-6">Profile Information</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        defaultValue="Demo"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        defaultValue="User"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      defaultValue={user.email}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      defaultValue="(555) 123-4567"
                    />
                  </div>
                  
                  <div className="pt-4 border-t border-neutral-200">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">Change Password</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="primary">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-soft p-6">
                <h2 className="text-xl font-bold text-neutral-900 mb-6">Order History</h2>
                
                <div className="border border-neutral-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-neutral-200">
                    <thead className="bg-neutral-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Order #
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-200">
                      {/* Demo order data */}
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                          #12345
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                          April 23, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Delivered
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                          $129.95
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-primary-500 hover:text-primary-600 font-medium">
                            View Details
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                          #12344
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                          March 15, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Delivered
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                          $75.50
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-primary-500 hover:text-primary-600 font-medium">
                            View Details
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                          #12343
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                          February 2, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Delivered
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                          $42.99
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-primary-500 hover:text-primary-600 font-medium">
                            View Details
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-neutral-600 text-sm">
                    Showing 3 of 3 orders
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg shadow-soft p-6">
                <h2 className="text-xl font-bold text-neutral-900 mb-6">My Wishlist</h2>
                
                <div className="text-center py-12">
                  <Heart size={48} className="mx-auto mb-4 text-neutral-300" />
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">Your wishlist is empty</h3>
                  <p className="text-neutral-600 mb-6">
                    Save items you love by clicking the heart icon on any product
                  </p>
                  <Button variant="primary" onClick={() => navigate('/products')}>
                    Browse Products
                  </Button>
                </div>
              </div>
            )}
            
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-lg shadow-soft p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-neutral-900">Saved Addresses</h2>
                  <Button variant="outline">
                    Add New Address
                  </Button>
                </div>
                
                <div className="border border-neutral-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="font-medium text-neutral-900">Home</span>
                        <span className="ml-2 text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded">
                          Default
                        </span>
                      </div>
                      <div className="text-neutral-600 text-sm">
                        <p>Demo User</p>
                        <p>123 Garden Street</p>
                        <p>Plantville, CA 94123</p>
                        <p>United States</p>
                        <p className="mt-1">(555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button className="text-primary-500 hover:text-primary-600 text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-neutral-500 hover:text-neutral-700 text-sm">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="border border-neutral-200 rounded-lg p-4">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium text-neutral-900 mb-2">Work</div>
                      <div className="text-neutral-600 text-sm">
                        <p>Demo User</p>
                        <p>456 Office Plaza, Suite 200</p>
                        <p>San Francisco, CA 94107</p>
                        <p>United States</p>
                        <p className="mt-1">(555) 987-6543</p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button className="text-primary-500 hover:text-primary-600 text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-neutral-500 hover:text-neutral-700 text-sm">
                        Delete
                      </button>
                      <button className="text-neutral-500 hover:text-neutral-700 text-sm">
                        Set as Default
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'payment' && (
              <div className="bg-white rounded-lg shadow-soft p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-neutral-900">Payment Methods</h2>
                  <Button variant="outline">
                    Add New Card
                  </Button>
                </div>
                
                <div className="border border-neutral-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between">
                    <div className="flex">
                      <div className="w-12 h-8 bg-neutral-200 rounded mr-3"></div>
                      <div>
                        <div className="flex items-center mb-1">
                          <span className="font-medium text-neutral-900">Visa ending in 4567</span>
                          <span className="ml-2 text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded">
                            Default
                          </span>
                        </div>
                        <div className="text-neutral-600 text-sm">
                          <p>Expires 05/2025</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button className="text-primary-500 hover:text-primary-600 text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-neutral-500 hover:text-neutral-700 text-sm">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="border border-neutral-200 rounded-lg p-4">
                  <div className="flex justify-between">
                    <div className="flex">
                      <div className="w-12 h-8 bg-neutral-200 rounded mr-3"></div>
                      <div>
                        <div className="font-medium text-neutral-900 mb-1">Mastercard ending in 8901</div>
                        <div className="text-neutral-600 text-sm">
                          <p>Expires 12/2024</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button className="text-primary-500 hover:text-primary-600 text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-neutral-500 hover:text-neutral-700 text-sm">
                        Delete
                      </button>
                      <button className="text-neutral-500 hover:text-neutral-700 text-sm">
                        Set as Default
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-lg shadow-soft p-6">
                <h2 className="text-xl font-bold text-neutral-900 mb-6">Notification Preferences</h2>
                
                <div className="space-y-4">
                  <div className="border-b border-neutral-200 pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-neutral-900">Order Updates</h3>
                        <p className="text-neutral-600 text-sm">
                          Receive notifications about your order status
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            id="order-updates"
                            className="checked:bg-primary-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                            defaultChecked
                          />
                          <label
                            htmlFor="order-updates"
                            className="block overflow-hidden h-6 rounded-full bg-neutral-300 cursor-pointer"
                          ></label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b border-neutral-200 pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-neutral-900">Promotional Emails</h3>
                        <p className="text-neutral-600 text-sm">
                          Receive emails about sales, offers, and new products
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            id="promo-emails"
                            className="checked:bg-primary-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                            defaultChecked
                          />
                          <label
                            htmlFor="promo-emails"
                            className="block overflow-hidden h-6 rounded-full bg-neutral-300 cursor-pointer"
                          ></label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b border-neutral-200 pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-neutral-900">Gardening Tips & Advice</h3>
                        <p className="text-neutral-600 text-sm">
                          Receive seasonal gardening tips and plant care advice
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            id="gardening-tips"
                            className="checked:bg-primary-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                            defaultChecked
                          />
                          <label
                            htmlFor="gardening-tips"
                            className="block overflow-hidden h-6 rounded-full bg-neutral-300 cursor-pointer"
                          ></label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-neutral-900">Product Reviews</h3>
                        <p className="text-neutral-600 text-sm">
                          Receive reminders to review products you've purchased
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            id="product-reviews"
                            className="checked:bg-primary-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                          />
                          <label
                            htmlFor="product-reviews"
                            className="block overflow-hidden h-6 rounded-full bg-neutral-300 cursor-pointer"
                          ></label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button variant="primary">
                    Save Preferences
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;