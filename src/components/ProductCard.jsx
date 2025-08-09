// ProductCard.jsx (your provided code)
import React, { useState } from 'react';
import { ShoppingCartIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { useCart } from '../contexts/CartContext.jsx'; // <--- Import useCart hook

const ProductCard = ({ product }) => {
    const [selectedVariant, setSelectedVariant] = useState('wired');
    const { addItemToCart } = useCart(); 

    const handleVariantChange = (variant) => {
        setSelectedVariant(variant);
    };

    const activeVariant = product.variants[selectedVariant];

    const handleBuyNow = () => {
        addItemToCart(product, selectedVariant); 
        console.log(product);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200/50">
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Product Image */}
                <div className="p-4 md:p-6">
                    
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl" />
                </div>

                {/* Product Details */}
                <div className="p-6 md:p-8 flex flex-col">
                    <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
                    <p className="mt-2 text-gray-600 flex-grow">{product.description}</p>

                    {/* Variant Selector */}
                    <div className="mt-6">
                        <h3 className="text-sm font-semibold text-gray-700">Select Variant:</h3>
                        <div className="mt-2 grid grid-cols-2 gap-3">
                            <button
                                onClick={() => handleVariantChange('wired')}
                                className={`p-3 rounded-lg border text-sm font-bold transition-all duration-200 ${selectedVariant === 'wired' ? 'bg-[#005595] text-white border-[#005595]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                            >
                                Wired
                            </button>
                            <button
                                onClick={() => handleVariantChange('wireless')}
                                className={`p-3 rounded-lg border text-sm font-bold transition-all duration-200 ${selectedVariant === 'wireless' ? 'bg-[#005595] text-white border-[#005595]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                            >
                                Wireless
                            </button>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="mt-6">
                        <p className="text-4xl font-extrabold text-gray-900">{activeVariant.price}</p>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-6">
                        <button
                            onClick={handleBuyNow}
                            className="w-full flex items-center justify-center bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors duration-300 shadow-md">
                            <ShoppingCartIcon className="h-5 w-5 mr-2" />
                            Add to Cart
                        </button>
                    </div>

                    {/* Key Features for selected variant */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-800">Key Features:</h4>
                        <ul className="mt-4 space-y-3">
                            {activeVariant.features.map(feature => (
                                <li key={feature} className="flex items-center text-gray-600">
                                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {/* Full Specifications */}
            <div className="bg-gray-50/70 p-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800">Full Specifications:</h4>
                <ul className="mt-4 space-y-3">
                    {product.specifications.map(spec => (
                        <li key={spec.name} className="flex justify-between text-sm border-b border-gray-200 pb-2">
                            <span className="font-medium text-gray-600">{spec.name}</span>
                            <span className="text-gray-800">{spec.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default ProductCard;
// --- MAIN PRODUCTS PAGE COMPONENT ---

