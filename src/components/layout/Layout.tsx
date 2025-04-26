import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Search, ShoppingCart, User, Menu, X, Leaf, ChevronDown,
  Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin
} from 'lucide-react';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useAuth } from '../../context/AuthContext';
import CallButton from '../ui/CallButton';

const Layout: React.FC = () => {
  const { cartQuantity } = useShoppingCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location]);

  const categories = [
    { name: "Plants", path: "/products?category=plants" },
    { name: "Seeds", path: "/products?category=seeds" },
    { name: "Tools", path: "/products?category=tools" },
    { name: "Soil & Fertilizers", path: "/products?category=soil" },
    { name: "Pots & Planters", path: "/products?category=pots" },
    { name: "Irrigation", path: "/products?category=irrigation" }
  ];

  useEffect(() => {
    // Initialize Vapi
    window.vapiInstance = null;
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
    script.defer = true;
    script.async = true;
    script.onload = () => {
      if (window.vapiSDK) {
        window.vapiInstance = window.vapiSDK.run({
          apiKey: "2be689ca-bd49-40f3-baa6-ccbdc0055bec",
          assistant: "e8635d3e-b8bd-44ad-9928-329fa7879114",
          config: {
            position: 'bottom-right',
            theme: {
              primaryColor: '#0A5F38',
              backgroundColor: '#ffffff',
              textColor: '#232323'
            }
          },
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'}`}>
        {/* Top announcement bar */}
        <div className="bg-primary-500 text-white py-2 text-center text-sm">
          <p>Free shipping on orders over $50 | Shop our Spring sale with code SPRING25</p>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo & Mobile Menu Button */}
            <div className="flex items-center">
              <button
                className="md:hidden mr-2 p-2 text-neutral-700"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <Link to="/" className="flex items-center">
                <Leaf className="h-8 w-8 text-primary-500" />
                <span className="ml-2 text-xl font-semibold text-primary-500">SimplHome</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <div className="relative group">
                <button className="flex items-center text-neutral-800 hover:text-primary-500 transition-colors duration-200">
                  Shop <ChevronDown size={16} className="ml-1" />
                </button>
                <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-500"
                        role="menuitem"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link to="/products" className="text-neutral-800 hover:text-primary-500 transition-colors duration-200">
                All Products
              </Link>

              <Link to="/about" className="text-neutral-800 hover:text-primary-500 transition-colors duration-200">
                About Us
              </Link>

              <Link to="/blog" className="text-neutral-800 hover:text-primary-500 transition-colors duration-200">
                Garden Blog
              </Link>
            </nav>

            {/* Search, Cart, Account */}
            <div className="flex items-center space-x-4">
              <button
                className="p-2 text-neutral-700 hover:text-primary-500 transition-colors duration-200"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <Link
                to="/cart"
                className="p-2 text-neutral-700 hover:text-primary-500 transition-colors duration-200 relative"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {cartQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartQuantity}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <div className="relative group">
                  <button className="p-2 text-neutral-700 hover:text-primary-500 transition-colors duration-200 flex items-center">
                    <User size={20} />
                    <span className="hidden md:block ml-2 text-sm">{user?.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link
                        to="/account"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-500"
                        role="menuitem"
                      >
                        My Account
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-500"
                        role="menuitem"
                      >
                        Order History
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-500"
                        role="menuitem"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="p-2 text-neutral-700 hover:text-primary-500 transition-colors duration-200 flex items-center"
                >
                  <User size={20} />
                  <span className="hidden md:block ml-2 text-sm">Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Search bar - conditionally shown */}
        {searchOpen && (
          <div className="border-t border-neutral-200 py-3 px-4 sm:px-6 lg:px-8 bg-white animate-slide-down">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for plants, tools, and more..."
                  className="w-full px-4 py-2 pl-10 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <Search className="absolute left-3 top-2.5 text-neutral-500" size={18} />
                <button
                  className="absolute right-3 top-2.5 text-neutral-500 hover:text-neutral-700"
                  onClick={() => setSearchOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu - slide from left */}
      <div className={`fixed inset-0 z-50 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="absolute inset-0 bg-black opacity-25" onClick={closeMenu}></div>
        <div className="relative w-64 max-w-sm h-full bg-white shadow-xl overflow-y-auto">
          <div className="p-4 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center" onClick={closeMenu}>
                <Leaf className="h-7 w-7 text-primary-500" />
                <span className="ml-2 text-lg font-semibold text-primary-500">GreenThumb</span>
              </Link>
              <button
                className="p-2 text-neutral-700"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <nav className="px-4 py-2">
            <div className="py-4 space-y-1">
              <div className="pb-2 text-xs uppercase text-neutral-500 font-semibold tracking-wider">
                Shop Categories
              </div>
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="block py-2 text-neutral-800 hover:text-primary-500"
                  onClick={closeMenu}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <div className="py-4 border-t border-neutral-200 space-y-1">
              <Link to="/products" className="block py-2 text-neutral-800 hover:text-primary-500" onClick={closeMenu}>
                All Products
              </Link>
              <Link to="/about" className="block py-2 text-neutral-800 hover:text-primary-500" onClick={closeMenu}>
                About Us
              </Link>
              <Link to="/blog" className="block py-2 text-neutral-800 hover:text-primary-500" onClick={closeMenu}>
                Garden Blog
              </Link>
            </div>

            <div className="py-4 border-t border-neutral-200 space-y-1">
              {isAuthenticated ? (
                <>
                  <div className="px-2 py-2 text-sm text-neutral-500">
                    Signed in as {user?.name}
                  </div>
                  <Link to="/account" className="block py-2 text-neutral-800 hover:text-primary-500" onClick={closeMenu}>
                    My Account
                  </Link>
                  <Link to="/orders" className="block py-2 text-neutral-800 hover:text-primary-500" onClick={closeMenu}>
                    Order History
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="block w-full text-left py-2 text-neutral-800 hover:text-primary-500"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block py-2 text-neutral-800 hover:text-primary-500" onClick={closeMenu}>
                    Sign In
                  </Link>
                  <Link to="/signup" className="block py-2 text-neutral-800 hover:text-primary-500" onClick={closeMenu}>
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <CallButton />

      {/* Footer */}
      <footer className="bg-neutral-100 pt-12 pb-8 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Leaf className="h-8 w-8 text-primary-500" />
                <span className="ml-2 text-xl font-semibold text-primary-500">GreenThumb</span>
              </div>
              <p className="text-neutral-600 mb-6">Growing beautiful gardens together since 2005.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-neutral-600 hover:text-primary-500">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-neutral-600 hover:text-primary-500">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-neutral-600 hover:text-primary-500">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-neutral-600 hover:text-primary-500">
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wide mb-4">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/products?category=plants" className="text-neutral-600 hover:text-primary-500">Plants</Link>
                </li>
                <li>
                  <Link to="/products?category=seeds" className="text-neutral-600 hover:text-primary-500">Seeds</Link>
                </li>
                <li>
                  <Link to="/products?category=tools" className="text-neutral-600 hover:text-primary-500">Tools</Link>
                </li>
                <li>
                  <Link to="/products?category=soil" className="text-neutral-600 hover:text-primary-500">Soil & Fertilizers</Link>
                </li>
                <li>
                  <Link to="/products?category=pots" className="text-neutral-600 hover:text-primary-500">Pots & Planters</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wide mb-4">Information</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-neutral-600 hover:text-primary-500">About Us</Link>
                </li>
                <li>
                  <Link to="/blog" className="text-neutral-600 hover:text-primary-500">Garden Blog</Link>
                </li>
                <li>
                  <Link to="/planting-guides" className="text-neutral-600 hover:text-primary-500">Planting Guides</Link>
                </li>
                <li>
                  <Link to="/faq" className="text-neutral-600 hover:text-primary-500">FAQ</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-neutral-600 hover:text-primary-500">Contact Us</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wide mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex">
                  <MapPin size={18} className="mt-0.5 mr-2 text-primary-500 flex-shrink-0" />
                  <span className="text-neutral-600">123 Garden Street, Plantville, CA 94123</span>
                </li>
                <li className="flex">
                  <Phone size={18} className="mt-0.5 mr-2 text-primary-500 flex-shrink-0" />
                  <span className="text-neutral-600">(555) 123-4567</span>
                </li>
                <li className="flex">
                  <Mail size={18} className="mt-0.5 mr-2 text-primary-500 flex-shrink-0" />
                  <span className="text-neutral-600">support@greenthumb.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-500 text-sm">&copy; {new Date().getFullYear()} GreenThumb Gardening. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6 text-sm">
                <li>
                  <Link to="/privacy" className="text-neutral-500 hover:text-primary-500">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms" className="text-neutral-500 hover:text-primary-500">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/shipping" className="text-neutral-500 hover:text-primary-500">Shipping Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;