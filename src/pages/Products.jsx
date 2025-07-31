import React from 'react'
import ProductCard from '../components/ProductCard'
import { semiAutomatic, FullyAutomatic } from '../components/Options';
const Products = () => {
    // Import your product data from Options.js

    return (
        <div className='bg-gray-50'>
            {/* Header Section */}
            <div className="bg-gradient-to-r from-gray-100 to-gray-300 py-16 md:py-20 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Our Products</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Innovative water management solutions designed for a sustainable and secure future.
                    </p>
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 sm:px-6 lg:px-8">
                <div className="space-y-16">
                    <ProductCard product={semiAutomatic} />
                    <ProductCard product={FullyAutomatic} />
                </div>
            </div>
        </div>
    );
};

export default Products;