import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { AuthProvider } from './context/AuthContext';
// Layout
import Layout from './components/layout/Layout';
// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AccountPage from './pages/AccountPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFoundPage from './pages/NotFoundPage';
import { useVapi } from './hooks/useVapi';

const App: React.FC = () => {
  useVapi();
  return (
    <AuthProvider>
      <ShoppingCartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/:productId" element={<ProductDetailPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="account" element={<AccountPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </ShoppingCartProvider>
    </AuthProvider>
  );
}

export default App;