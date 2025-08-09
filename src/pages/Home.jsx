import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check,Menu, X, Shield, Zap, Trophy } from 'lucide-react';
// Ensure these imports match your actual file structure and data definitions
import { BannerData, Impacts, MoreFeatures, SolvingCrises, steps } from '../components/Options';
import ComparisonTable from '../components/ComparisionTable'; // Assuming this component exists and is correctly structured
import useScrollAnimation from '../hooks/useScrollAnimation'; // Import the custom hook

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality for Banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BannerData.length);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [BannerData.length]);

  // Manual navigation functions for Banner
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + BannerData.length) % BannerData.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % BannerData.length);
  };

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

  // --- Scroll Animation Refs and States ---
  const [whyChooseUsRef, whyChooseUsVisible] = useScrollAnimation(0.1);
  const [howItWorksRef, howItWorksVisible] = useScrollAnimation(0.1);
  const [waterCrisisRef, waterCrisisVisible] = useScrollAnimation(0.1);
  const [sustainableImpactRef, sustainableImpactVisible] = useScrollAnimation(0.1);
  const [comparisonChartRef, comparisonChartVisible] = useScrollAnimation(0.1);


  return (
    <div className='px-4 md:px-10 py-4 md:py-8'>
      {/* Banner Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-100 to-gray-300 min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
        {/* Slides Container */}
        <div
          className="flex transition-transform duration-1000 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {BannerData.map((slide) => (
            <div key={slide.id} className="w-full flex-shrink-0 h-full">
              <div className='flex flex-col lg:flex-row items-center justify-between h-full p-6 md:p-12'>
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
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${currentSlide === index
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

      {/* Why Choose Us? Section */}
      <div ref={whyChooseUsRef} className={`mt-12 md:mt-20 transform transition-all duration-700 ease-out ${whyChooseUsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Why Choose Tank.AI?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the distinct advantages and innovative features that set our solutions apart.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {MoreFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col items-center"
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

      {/* How Tank.AI Works Section */}
      <div ref={howItWorksRef} className={`mt-20 md:mt-32 rounded-2xl py-12 bg-gradient-to-r from-gray-100 to-gray-200 transform transition-all duration-700 ease-out ${howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Seamless Process: How Tank.AI Transforms Water Management</h2>
          <p className="mt-2 text-gray-600">
            Experience intelligent automation and complete peace of mind with our straightforward approach.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full text-3xl">
                  {step.icon}
                </div>

                {/* Step number */}
                <div className="mt-3 w-8 h-8 flex items-center justify-center bg-yellow-400 rounded-full font-bold text-black">
                  {step.id}
                </div>

                {/* Title */}
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>

                {/* Description */}
                <p className="mt-1 text-gray-600 text-sm">{step.description}</p>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block text-yellow-400 text-2xl mt-4">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Solving India's Water Crisis Section */}
      <div ref={waterCrisisRef} className={`py-16 px-4 mt-20 md:mt-32 rounded-xl bg-gradient-to-r from-gray-100 to-gray-300 transform transition-all duration-700 ease-out ${waterCrisisVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Addressing India's Critical Water Challenges
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every day, communities across India face water scarcity and inefficiency. Our AI-powered solutions tackle these issues at their core.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {SolvingCrises.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-gray-400 border-2 bg-gradient-to-r from-gray-100 to-gray-300 group"
                >
                  <div className="text-blue-500 mb-4 text-center group-hover:text-blue-600 transition-colors">
                    <IconComponent size={48} className="mx-auto" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 text-center">
                    {feature.title}
                  </h3>

                  <div className="space-y-3">
                    <div className="bg-gray-300 p-3 rounded-lg border-l-4 border-gray-500">
                      <p className="text-sm font-bold text-black mb-1">Problem:</p>
                      <p className="text-black text-sm">{feature.problem}</p>
                    </div>

                    <div className="bg-blue-100 p-3 rounded-lg border-l-4 border-blue-400">
                      <p className="text-sm font-bold text-black mb-1">Solution:</p>
                      <p className="text-gray-700 text-sm">{feature.solution}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sustainable Impact Section */}
      <div ref={sustainableImpactRef} className={`mt-20 md:mt-32 py-16 bg-gradient-to-r from-gray-200 to-gray-100 rounded-xl transform transition-all duration-700 ease-out ${sustainableImpactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center'>
            <h2 className='text-4xl font-bold my-6'>Driving Sustainable Impact Across India</h2>
            <p className='text-lg mb-10'>Our commitment extends beyond technology, actively contributing to UN Sustainable Development Goals and enhancing India's water security.</p>
          </div>
          <div className='flex flex-col lg:flex-row items-center justify-around gap-10'>
            {/* Left Grid of Impact Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-7 flex-1'>
              {Impacts.map((value, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="text-4xl md:text-5xl mb-4 text-center">{value.icon}</div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 text-center">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
            {/* Right Column of Additional Impact Cards */}
            <div className='flex flex-col gap-7 flex-1'>
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="text-4xl md:text-5xl mb-4 text-center">
                  {/* Placeholder for actual icon, e.g., <MapPin className="mx-auto text-red-500" /> */}
                  <Shield size={48} className="mx-auto text-blue-500" /> {/* Example icon */}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 text-center">
                  Pan-India Impact
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Active in 15+ states, growing our footprint every day to reach more communities.
                </p>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="text-4xl md:text-5xl mb-4 text-center">
                  {/* Placeholder for actual icon, e.g., <Lightbulb className="mx-auto text-yellow-500" /> */}
                  <Zap size={48} className="mx-auto text-purple-500" /> {/* Example icon */}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 text-center">
                  Continuous Innovation
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  We constantly evolve our AI models and hardware to deliver cutting-edge solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Comparison Chart Section */}
      <div ref={comparisonChartRef} className={`mt-20 md:mt-32 transform transition-all duration-700 ease-out ${comparisonChartVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Select the Ideal Solution for Your Needs
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our product offerings and find the perfect fit for your specific water management requirements.
          </p>
        </div>

        {/* Desktop Comparison Table (Component) */}
        <ComparisonTable renderFeatureValue={renderFeatureValue} /> {/* Pass renderFeatureValue if needed by ComparisonTable */}
      </div>
    </div>
  );
};

export default Home;