import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, X, Shield, Zap, Trophy } from 'lucide-react';
// Ensure these imports match the actual path to your Options file
import { BannerData, MoreFeatures, ComparisionData } from '../components/Options'; 
import ComparisonTable from '../components/ComparisionTable';
const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Initialize selectedProduct to the ID of the first product in your data
//   const [selectedProduct, setSelectedProduct] = useState(ComparisionData.products[0].id);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BannerData.length);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [BannerData.length]);

  // Manual navigation functions
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + BannerData.length) % BannerData.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % BannerData.length);
  };

  // Helper function to render feature values
  const renderFeatureValue = (value, isSelected = false) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-green-500'}`} />
      ) : (
        <X className={`w-5 h-5 ${isSelected ? 'text-white/70' : 'text-red-400'}`} />
      );
    }
    return <span className={`font-medium ${isSelected ? 'text-white' : 'text-gray-700'}`}>{value}</span>;
  };

  return (
    <div className='px-4 md:px-10 py-4 md:py-8'>
      {/* Banner Section with Swiper */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-100 to-gray-300">
        {/* Slides Container */}
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {BannerData.map((slide, index) => (
            <div key={slide.id} className="w-full flex-shrink-0">
              <div className='flex flex-col lg:flex-row items-center justify-between min-h-[400px] md:min-h-[500px] lg:min-h-[600px] p-6 md:p-12'>
                {/* Content Section */}
                <div className='flex-1 text-center lg:text-left mb-8 lg:mb-0 lg:pr-8'>
                  <h3 className='font-bold text-3xl md:text-4xl lg:text-6xl mb-4 md:mb-6 text-gray-800 leading-tight'>
                    {slide.title}
                  </h3>
                  <p className='font-semibold text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-gray-600 max-w-2xl mx-auto lg:mx-0'>
                    {slide.description}
                  </p>
                  <button className='text-lg md:text-xl px-6 md:px-8 py-3 md:py-4 rounded-2xl bg-gray-600 hover:bg-gray-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'>
                    {slide.buttonText}
                  </button>
                </div>

                {/* Image Section */}
                <div className='flex-1 flex justify-center lg:justify-end'>
                  <img 
                    src={slide.image} 
                    alt={`Banner ${slide.id}`} 
                    className='h-48 md:h-64 lg:h-[60vh] w-auto object-contain rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} className="md:w-6 md:h-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={20} className="md:w-6 md:h-6" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {BannerData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-black scale-110'
                  : 'bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
          <div 
            className="h-full bg-gray-600 transition-all duration-300 ease-linear"
            style={{ width: `${((currentSlide + 1) / BannerData.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Additional Content Section */}
      <div className="mt-12 md:mt-50">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the features that make us stand out from the competition
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {MoreFeatures.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="text-4xl md:text-5xl mb-4 text-center">{feature.icon}</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Chart Section */}
      <div className="mt-12 md:mt-50"> {/* Moved this div */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Choose Your Product Visely 
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Compare our products and find the one that fits your needs perfectly
          </p>
        </div>

   

        {/* Desktop Comparison Table */}  
         <ComparisonTable />
      </div>
    </div>
  );
};

export default Home;