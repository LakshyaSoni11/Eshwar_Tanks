import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowLeft } from 'lucide-react';
import logo from "../assets/logo.jpg";
import placeholderImg from "../assets/placeholder-profile.jpg"; 
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from '../contexts/CartContext';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
    const calculateTotalQuantity = (cartItems) => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const { cartItems } = useCart();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const totalItems = calculateTotalQuantity(cartItems);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const logOut = async () => {
        try {
            await signOut(auth);
            setIsMobileMenuOpen(false);
            setDropdownOpen(false);
            navigate('/');
            window.scrollTo(0, 0);
        } catch (error) {
            console.error("Sign-out error:", error);
        }
    };

    const Navigations = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'About', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
    ];

    const handleNavigation = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const isActivePath = (path) => location.pathname === path;
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <div className="sticky top-0 z-50 bg-white">
            <div className="flex items-center justify-between py-4 md:py-5 shadow-md px-4 md:px-10">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <img src={logo} alt="logo" className="h-12 md:h-16 w-auto" />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center gap-8 lg:gap-12 text-lg lg:text-xl font-semibold">
                    {Navigations.map((item) => (
                        <li key={item.name} className="relative group cursor-pointer" onClick={() => handleNavigation(item.path)}>
                            <span
                                className={`relative pb-1 transition-colors duration-300 hover:text-[#005595] ${isActivePath(item.path) ? 'text-[#005595]' : 'text-gray-700'}
                                    after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:bg-[#005595] after:transition-all after:duration-300 ${isActivePath(item.path)
                                        ? 'after:w-full'
                                        : 'after:w-0 group-hover:after:w-full'
                                    }`}
                            >
                                {item.name}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Desktop Auth & Cart */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Cart */}
                    <Link to="/cart" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="relative transition-colors duration-300 hover:text-[#005595] text-gray-700">
                        <FaShoppingCart size={24} />
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1.5 py-0.5">
                                {totalItems > 99 ? "99+" : totalItems}
                            </span>
                        )}
                    </Link>

                    {!user ? (
                        <>
                            <Link to="/login" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                <button className="text-gray-700 hover:text-[#005595] font-semibold transition-colors duration-300">
                                    Sign In
                                </button>
                            </Link>
                            <Link to="/register" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                <button className="bg-[#005595] hover:bg-[#004477] text-white px-5 py-2 rounded-lg font-semibold transition-colors duration-300">
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    ) : (
                        <div className="relative">
                            <button
                                className="flex items-center gap-2 font-semibold text-gray-800 hover:text-[#005595] transition-colors duration-300"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <img
                                    src={user.photoURL || placeholderImg}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full border-2 border-gray-300"
                                />
                                <ChevronDown size={18} />
                            </button>
                            {dropdownOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50 animate-fadeIn"
                                    onMouseLeave={() => setDropdownOpen(false)}
                                >
                                    <p className="px-4 py-2 text-gray-800 font-semibold">{user.displayName || user.email}</p>
                                    <hr />
                                    <button
                                        onClick={logOut}
                                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 transition-colors duration-200"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                    {/* Profile Image Outside Side Menu */}
                    {user && (
                        <img
                            src={user.photoURL || placeholderImg}
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-gray-300"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        />
                    )}
                    {/* Cart */}
                    <Link to="/cart" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="relative transition-colors duration-300 hover:text-[#005595] text-gray-700">
                        <FaShoppingCart size={28} />
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-sm px-1.5 py-0.5">
                                {totalItems > 99 ? "99+" : totalItems}
                            </span>
                        )}
                    </Link>
                    <button
                        className="p-2 text-gray-700 hover:text-[#005595] transition-colors duration-300"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 md:hidden 
                ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-4 border-b flex items-center gap-4">
                    <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-[#005595]">
                        <ArrowLeft size={28} />
                    </button>
                    <p className="font-bold text-lg text-gray-800">Menu</p>
                </div>

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

                <div className="p-6 border-t">
                    {!user ? (
                        <div className="space-y-4">
                            <Link to="/register" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                <button className="w-full bg-[#005595] hover:bg-[#004477] text-white py-3 rounded-lg font-semibold transition-colors duration-300">
                                    Create Account
                                </button>
                            </Link>
                            <Link to="/login" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-colors duration-300">
                                    Sign In
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <button
                            onClick={logOut}
                            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition-colors duration-300"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
