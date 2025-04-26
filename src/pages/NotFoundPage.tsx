import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-50 rounded-full text-primary-500 mb-6">
            <Search size={36} />
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Page Not Found</h1>
          <p className="text-neutral-600 text-lg mb-8">
            We're sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button variant="primary" size="lg" onClick={() => window.history.back()}>
            <ArrowLeft size={16} className="mr-2" /> Go Back
          </Button>
          <Link 
            to="/" 
            className="px-6 py-3 border border-primary-500 text-primary-500 rounded-md hover:bg-primary-50 transition-colors duration-200 font-medium"
          >
            Return Home
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">You might be interested in:</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-between text-left">
            <div>
              <h3 className="font-medium text-neutral-800 mb-2">Popular Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/products?category=plants" className="text-primary-500 hover:text-primary-600">
                    Indoor Plants
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=tools" className="text-primary-500 hover:text-primary-600">
                    Gardening Tools
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=soil" className="text-primary-500 hover:text-primary-600">
                    Soil & Fertilizers
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-neutral-800 mb-2">Customer Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/contact" className="text-primary-500 hover:text-primary-600">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-primary-500 hover:text-primary-600">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/shipping" className="text-primary-500 hover:text-primary-600">
                    Shipping Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;