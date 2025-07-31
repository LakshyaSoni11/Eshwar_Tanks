import React, { useState } from 'react';
import { useNavigate, useLocation, Link, Navigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from "../assets/logo.jpg";
import { FaShoppingCart } from "react-icons/fa";
import { SignedIn, SignedOut, UserButton, useUser, SignInButton, SignUpButton } from '@clerk/clerk-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const calculateTotalQuantity = (cartItems) => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }
    const { cartItems, removeItemFromCart, updateItemQuantity, clearCart } = useCart();
    console.log("items details", cartItems);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useUser();
    const totalItems = calculateTotalQuantity(cartItems);
    console.log(totalItems)

    const Navigations = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'About', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
    ];

    const handleNavigation = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    const isActivePath = (path) => {
        return location.pathname === path;
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="sticky top-0 z-50 bg-white">
            <div className="flex items-center justify-between py-4 md:py-5 shadow-md px-4 md:px-10">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link to="/">
                        <img
                            src={logo}
                            alt="logo"
                            className="h-12 md:h-16 w-auto"
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center gap-8 lg:gap-12 text-lg lg:text-xl font-semibold">
                    {Navigations.map((item) => (
                        <li key={item.name} className="relative group cursor-pointer" onClick={() => handleNavigation(item.path)}>
                            <span
                                className={`relative pb-1 transition-colors duration-300 hover:text-[#005595] ${isActivePath(item.path) ? 'text-[#005595]' : 'text-gray-700'
                                    } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:bg-[#005595] after:transition-all after:duration-300 ${isActivePath(item.path)
                                        ? 'after:w-full'
                                        : 'after:w-0 group-hover:after:w-full'
                                    }`}
                            >
                                {item.name}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Desktop Authentication Section */}
                <div className="hidden md:flex items-center gap-4">
                    <SignedOut>
                        {/* Ensure only ONE child element or text is passed */}
                        <SignInButton mode="modal">
                            <button className="text-gray-700 hover:text-[#005595] font-semibold transition-colors duration-300">
                                Sign In
                            </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="bg-[#005595] hover:bg-[#004477] text-white px-5 py-2 rounded-lg font-semibold transition-colors duration-300">
                                Sign Up
                            </button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <a href="/cart"><FaShoppingCart size={28} /></a>
                        {/* add here */}
                        <p>{totalItems}</p>
                        <span className="font-semibold text-gray-800 hidden lg:block">Hi, {user?.firstName}</span>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-700 hover:text-[#005595] transition-colors duration-300"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                {/* Mobile Menu Header & User Profile */}
                <div className="p-4 border-b">
                    <SignedIn>
                        <div className="flex items-center gap-4">
                            <UserButton afterSignOutUrl="/" />
                            <div className='flex'>
                                <p className='flex items-start text-xsm'>{calculateTotalQuantity(cartItems)}</p>
                                <div className="relative inline-block">
                                    <FaShoppingCart className="text-2xl text-gray-700 hover:text-blue-800 transition duration-200" />
                                    {totalItems > 0 && (
                                        <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[10px] font-semibold rounded-full px-1.5 py-0.5 shadow-md border border-white">
                                            {totalItems > 99 ? "99+" : totalItems}
                                        </span>
                                    )}
                                </div>

                            </div>
                            <div>
                                <p className="font-bold text-lg text-gray-800">{user?.fullName}</p>
                                <p className="text-sm text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
                            </div>
                        </div>
                    </SignedIn>
                    <SignedOut>
                        <img src={logo} alt="logo" className="h-10 w-auto" />
                    </SignedOut>
                </div>

                {/* Mobile Navigation Links */}
                <ul className="py-4 flex-grow">
                    {Navigations.map((item) => (
                        <li key={item.name} className="border-b border-gray-100 last:border-b-0">
                            <span
                                className={`block px-6 py-4 text-lg font-semibold cursor-pointer transition-all duration-300 ${isActivePath(item.path)
                                        ? 'text-[#005595] bg-blue-50 border-r-4 border-[#005595]'
                                        : 'text-gray-700 hover:text-[#005595] hover:bg-gray-50'
                                    }`}
                                onClick={() => handleNavigation(item.path)}
                            >
                                {item.name}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Mobile Authentication Buttons */}
                <div className="p-6 border-t">
                    <SignedOut>
                        <div className="space-y-4">
                            {/* Ensure only ONE child element or text is passed */}
                            <SignUpButton mode="modal">
                                <button className="w-full bg-[#005595] hover:bg-[#004477] text-white py-3 rounded-lg font-semibold transition-colors duration-300">
                                    Create Account
                                </button>
                            </SignUpButton>
                            <SignInButton mode="modal">
                                <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-colors duration-300">
                                    Sign In
                                </button>
                            </SignInButton>
                        </div>
                    </SignedOut>
                </div>
            </div>
        </div>
    );
};

export default Navbar;