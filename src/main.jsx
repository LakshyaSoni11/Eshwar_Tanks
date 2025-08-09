// src/index.jsx
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';

// Context Providers
import { AuthProvider } from './contexts/authContext';
import { CartProvider } from './contexts/CartContext';

// Components and Pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Products from './pages/Products';
import CartPage from './pages/CartPage';
import Login from './components/auth/login';
import Register from './components/auth/register';
import PrivateRoute from './components/PrivateRoute';

// Separate App component
function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register'];

  return (
    <>
      {/* Show Navbar only if route is not in hideNavbarPaths */}
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Route */}
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />
      </Routes>

      {!hideNavbarPaths.includes(location.pathname) && <Footer />}
    </>
  );
}

// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <Router>
          <App />
        </Router>
      </CartProvider>
    </AuthProvider>

    {/* Toast notifications */}
    <Toaster position="bottom-right" richColors />
  </StrictMode>
);
