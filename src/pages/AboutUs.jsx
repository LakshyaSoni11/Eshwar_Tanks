import React from 'react';
import aboutImg from "../assets/about.jpg"; // Ensure this path is correct
import LogoImg from "../assets/logo.jpg"; // Ensure this path is correct
import bannerImg from "../assets/bannerImg.jpg"; // Ensure this path is correct
import useScrollAnimation from '../hooks/useScrollAnimation'; // Import the custom hook

const AboutUs = () => {
    // Refs for scroll animations
    const [heroRef, heroVisible] = useScrollAnimation(0.1);
    const [missionRef, missionVisible] = useScrollAnimation(0.1);
    const [charityRef, charityVisible] = useScrollAnimation(0.1);

    return (
        <div className='px-4 md:px-10 py-4 md:py-8'>
            {/* Hero Banner Section */}
            <div
                ref={heroRef}
                className={`relative h-[60vh] md:h-[70vh] lg:h-[80vh] rounded-2xl overflow-hidden shadow-2xl mb-10
                    transform transition-all duration-700 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                {/* Background Image */}
                <img
                    src={bannerImg} // Use your actual banner image here
                    className="absolute inset-0 w-full h-full object-cover object-center z-0"
                    alt="Water tank in a rural Indian setting"
                />

                {/* Dark Gradient Overlay for contrast */}
                <div
                    className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10"
                    aria-hidden="true"
                ></div>

                {/* Content */}
                <div className="relative flex flex-col md:flex-row items-center justify-center w-full h-full p-8 md:p-12 lg:p-20 z-20 text-center">
                    {/* Text Content and CTA */}
                    <div className="flex flex-col items-center text-white max-w-2xl">
                        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                            Building a Sustainable Bharat
                        </h2>
                        <h3 className="text-xl md:text-3xl mt-4 text-gray-200">
                            One Tank at a Time
                        </h3>
                        <button
                            className='bg-white text-[#005595] px-8 py-3 rounded-full font-bold hover:bg-blue-100 transform hover:scale-105 transition-all duration-300 cursor-pointer mt-8 shadow-lg'
                        >
                            Join Our Mission
                        </button>
                    </div>
                </div>
            </div>

            {/* Our Mission Section */}
            <div
                ref={missionRef}
                className={`flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-16 py-10 md:py-16 px-4
                    transform transition-all duration-700 ease-out ${missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <div className='flex-1 lg:max-w-[60%]'>
                    <h3 className='font-bold text-4xl md:text-5xl text-center lg:text-left text-gray-800 mb-6'>Our Mission</h3>
                    <p className='text-lg md:text-xl text-gray-600 leading-relaxed text-justify'>
                        At Tank.AI, our core mission is to revolutionize water management across India through intelligent, accessible technology. We are dedicated to empowering communities and households with smart solutions that prevent water wastage, optimize consumption, and ensure a continuous, worry-free supply. By integrating cutting-edge AI with robust hardware, we strive to build a more sustainable future, one tank at a time, contributing significantly to national water security and environmental preservation.
                    </p>
                </div>
                <div className='flex-1 lg:max-w-[40%] flex justify-center'>
                    <img
                        src={aboutImg} // Use your actual about image
                        alt="Team collaborating on water solutions"
                        className='w-full h-auto max-w-md md:max-w-lg lg:max-w-full rounded-xl shadow-lg object-cover'
                    />
                </div>
            </div>

            {/* Charity Section */}
            <div
                ref={charityRef}
                className={`py-16 md:py-24 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl text-center px-4 mt-10 md:mt-20
                    transform transition-all duration-700 ease-out ${charityVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <div className='max-w-4xl mx-auto'>
                    <h4 className='text-base font-semibold text-[#005595] uppercase tracking-wider mb-2'>
                        A Promise for a Better Future
                    </h4>
                    <p className='mt-4 font-bold text-4xl md:text-5xl text-gray-800 leading-tight'>
                        We are proud to donate <span className='text-yellow-600'>40% of our profits</span> to impactful charity initiatives.
                    </p>
                    <p className='mt-6 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed'>
                        Every project we undertake not only helps build a more sustainable India but also directly contributes to vital social welfare programs. Your partnership with us creates a ripple effect of positive change, fostering improved living conditions and access to essential resources across communities.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
