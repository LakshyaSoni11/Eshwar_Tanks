import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider, SignIn, SignUp } from '@clerk/clerk-react';
import { Toaster } from 'sonner';

// Import your CartProvider
import { CartProvider } from './context/CartContext.jsx';

// Your Page and Component Imports
import Navbar from './components/Navbar';
import CartPage from './pages/CartPage.jsx'; // ← Changed to pages directory
import Home from './pages/Home.jsx';
import AboutUs from './pages/AboutUs.jsx';
import ContactUs from './pages/ContactUs.jsx';
import Products from './pages/Products.jsx';

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            {/* Public routes */}
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/products' element={<Products />} />
            <Route path='/cart' element={<CartPage />} />

            {/* Clerk authentication routes */}
            <Route
              path="/sign-in/*"
              element={<SignIn routing="path" path="/sign-in" />}
            />
            <Route
              path="/sign-up/*"
              element={<SignUp routing="path" path="/sign-up" />}
            />
          </Routes>
        </Router>
      </CartProvider>
    </ClerkProvider>
    
    {/* Toast notifications */}
    <Toaster position="bottom-right" richColors />
  </StrictMode>
);