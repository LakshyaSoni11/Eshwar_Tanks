import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import logo from "./../assets/logo.jpg";

const Footer = () => {
  const footerNavigations = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, url: 'https://facebook.com/tank.ai' },
    { icon: <FaTwitter />, url: 'https://twitter.com/tank.ai' },
    { icon: <FaInstagram />, url: 'https://instagram.com/tank.ai' },
    { icon: <FaLinkedinIn />, url: 'https://linkedin.com/company/tank.ai' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-700 pb-12">

          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-5">
              <img src={logo} alt="Tank.AI Logo" className="h-20 w-auto rounded-lg shadow-lg" />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-gray-400">
              Tank.AI provides intelligent water management solutions for a sustainable and secure future.
              Optimizing water usage, preventing waste, and ensuring peace of mind.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5 border-l-4 border-blue-500 pl-3">Quick Links</h3>
            <ul className="space-y-3">
              {footerNavigations.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-blue-400 transition-colors duration-300 text-base"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5 border-l-4 border-blue-500 pl-3">Contact Us</h3>
            <p className="text-sm mb-2">
              Email: <a href="mailto:support@tankai.com" className="hover:text-blue-400">admin@eshwartanks.com</a>
            </p>
            <p className="text-sm mb-6">
              Phone: <a href="tel:+911234567890" className="hover:text-blue-400">+91 88257 04318</a>
            </p>

            <div className="flex space-x-5">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-700 hover:bg-blue-500 rounded-full text-white transition duration-300 shadow-md"
                  aria-label={`Follow us on ${link.url.split('.')[1]}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5 border-l-4 border-blue-500 pl-3">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-4">Subscribe to get the latest updates and offers.</p>
            <form className="flex flex-col sm:flex-row sm:items-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium shadow-md transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Tank.AI — All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
