import React from 'react'
import aboutImg from "../assets/about.jpg"
import LogoImg from "../assets/logo.jpg"
import bannerImg from "../assets/bannerImg.jpg"
const AboutUs = () => {
    return (
        <div className='px-10 pt-4'>
            {/* Hero Banner */}
        <div className="relative h-[80vh] rounded-2xl overflow-hidden shadow-2xl mb-10">

            {/* 2. The Background Image (Bottom Layer) */}
            <img
                // src={aboutBanner} // <-- Use your actual banner image here
                src={bannerImg} // <-- Placeholder image
                className="absolute inset-0 w-full h-[100vh] bg-pos object-contain z-0"
                alt="Water tank in a rural Indian setting"
            />

            {/* 3. The Dark Gradient Overlay (Middle Layer for contrast) */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10"
                aria-hidden="true"
            ></div>

            {/* 4. The Content (Top Layer) */}
            <div className="relative flex flex-col md:flex-row items-center justify-between w-full h-full p-8 md:p-12 lg:p-20 z-20">
                
                {/* Text Content and CTA */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl">
                    <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mt-29">
                        Building Sustainable Bharat
                    </h2>
                    <h3 className="text-xl md:text-3xl mt-4 text-gray-200">
                        One Tank at a Time
                    </h3>
                    <button
                        className='bg-white text-[#005595] px-6 py-3 rounded-lg font-bold hover:bg-blue-100 transform hover:scale-105 transition-all duration-300 cursor-pointer mt-8'
                    >
                        Join Us
                    </button>
                </div>

                {/* Logo/Illustration Image */}
                <div className="mt-8 md:mt-0">
                    {/* <img
                        // src={LogoImg} // <-- Use your actual logo image here
                        src={LogoImg} // Placeholder, replace with your logo
                        alt="Company Logo"
                        className='h-[40vh] md:h-[60vh] max-h-[500px] w-auto' // Adjusted size for better balance
                    /> */}
                </div>

            </div>
        </div>
            {/* About section */}
            <div className='flex items-start justify-around gap-10'>
                <div className='flex-2/3'>
                    <h3 className='font-bold text-6xl text-center'>Our Mission</h3>
                    <p className='text-left text-xl text-gray-600 mt-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. A, vitae sapiente, dignissimos ut nobis eius suscipit ullam, qui pariatur voluptatibus iure aliquam! Nulla quos sed quidem suscipit maxime laborum vero! Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam veritatis molestiae quisquam facilis iste architecto dicta is vitae delectus eum fugiat molestias quod blanditiis tempora placeat soluta facere. Sapiente, quos! Dolorum dolorem quia alias omnis tempora distinctio assumenda excepturi magni consectetur aspernatur temporibus ipsa corporis ut, deleniti eaque pariatur doloribus accusamus eum voluptatibus. Tempore cumque sint vel perferendis eos eius corporis, voluptatem accusantium! Inventore quod sed atque ducimus, enim, animi obcaecati rerum voluptatem voluptates debitis voluptate adipisci eaque nostrum, temporibus dignissimos non iusto molestias assumenda ab magni? Debitis officiis minima ratione est, totam repudiandae vel expedita? Iusto dicta facilis, facere corrupti doloremque, officia totam perspicinatus totam. Dolores et iusto nostrum ad quis perferendis odio hic. Nihil, provident?</p>
                </div>
                <div>
                    <img src={aboutImg} alt="img" className='h-[80vh] w-[70vw] flex-1/3'  />
                </div>
            </div>

           {/*Charity Section */}
<div className='py-16 md:py-24 h-[80vh]'> {/* <--- Corrected class here */}
    <div className='max-w-4xl mx-auto text-center px-4'>
        <h4 className='text-base font-semibold text-[#005595] uppercase tracking-wider'>
            A Promise for a Better Future
        </h4>
        <p className='mt-4 font-bold text-4xl md:text-5xl text-gray-800'>
            We are proud to donate <span className='text-yellow-500'>40% of our profits</span> to charity.
        </p>
        <p className='mt-6 text-lg text-gray-600 max-w-2xl mx-auto'>
            Every project we undertake not only helps build a more sustainable India but also directly contributes to social welfare programs. Your partnership with us helps create a ripple effect of positive change across communities.
        </p>
    </div>
</div>
            

        </div>
    )
}

export default AboutUs