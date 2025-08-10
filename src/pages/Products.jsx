import React from 'react';
import ProductCard from '../components/ProductCard'; 
import { semiAutomatic, FullyAutomatic } from '../components/Options'; 
import useScrollAnimation from '../hooks/useScrollAnimation'; 

const Products = () => {
    const [headerRef, headerVisible] = useScrollAnimation(0.1);
    const [productsGridRef, productsGridVisible] = useScrollAnimation(0.1);

    return (
        <div className='bg-gray-50 min-h-screen'> {/* Added min-h-screen for better layout */}
            {/* Header Section */}
            {/* <div
                ref={headerRef}
                className={`bg-gradient-to-r from-gray-100 to-gray-300 py-16 md:py-20 text-center transform transition-all duration-700 ease-out ${
                    headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                        Our Smart Water Solutions
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Explore our range of intelligent devices designed to optimize water management and bring peace of mind to your home or business.
                    </p>
                </div>
            </div> */}

            {/* Products Grid */}
            <div
                ref={productsGridRef}
                className={`max-w-7xl mx-auto py-16 md:py-24 px-4 sm:px-6 lg:px-8 transform transition-all duration-700 ease-out ${
                    productsGridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <div className="space-y-16  gap-10">
                    <ProductCard product={semiAutomatic} />
                    <ProductCard product={FullyAutomatic} />
                </div>
            </div>
        </div>
    );
};

export default Products;
