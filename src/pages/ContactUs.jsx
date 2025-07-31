import React from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

const ContactUs = () => {
    return (
        <div className="bg-gray-50">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-gray-100 to-gray-300 py-16 md:py-20 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Get in Touch</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        We're here to help and answer any question you might have. We look forward to hearing from you.
                    </p>
                </div>
            </div>

            {/* Main Content: Form and Contact Info */}
            <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Column 1: Contact Information & Map */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800">Contact Information</h2>
                            <p className="mt-3 text-lg text-gray-600">
                                Fill out the form, or for a more direct response, use one of the methods below.
                            </p>
                            <div className="mt-8 space-y-6">
                                {/* Address */}
                                <div className="flex items-start">
                                    <MapPinIcon className="flex-shrink-0 h-6 w-6 text-[#005595]" aria-hidden="true" />
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-800">Our Address</h3>
                                        <p className="text-gray-600">123 Saravanampatti Road, Keeranatham</p>
                                        <p className="text-gray-600">Coimbatore, Tamil Nadu 641035, India</p>
                                    </div>
                                </div>
                                {/* Phone */}
                                <div className="flex items-start">
                                    <PhoneIcon className="flex-shrink-0 h-6 w-6 text-[#005595]" aria-hidden="true" />
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-800">Call Us</h3>
                                        <p className="text-gray-600">+91 88257 04318</p>
                                    </div>
                                </div>
                                {/* Email */}
                                <div className="flex items-start">
                                    <EnvelopeIcon className="flex-shrink-0 h-6 w-6 text-[#005595]" aria-hidden="true" />
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-800">Email Us</h3>
                                        <p className="text-gray-600">admin@eshwartanks.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Map Placeholder */}
                        <div>
                           <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Location</h2>
                           <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg border border-gray-200">
                                {/* To embed a real Google Map, go to Google Maps, find your location, click "Share", then "Embed a map", and copy the HTML. */}
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125298.37553556096!2d76.9934988426027!3d11.082292671049257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f79c7b57e513%3A0x155c2d31b1ac29a4!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1722064234559!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                           </div>
                        </div>
                    </div>

                    {/* Column 2: Contact Form */}
                    <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-200/50">
                        <h2 className="text-3xl font-bold text-gray-800">Send us a Message</h2>
                        <form action="#" method="POST" className="mt-8 space-y-6">
                            <div>
                                <label htmlFor="full-name" className="block text-sm font-semibold text-gray-700">Full Name</label>
                                <div className="mt-1">
                                    <input type="text" name="full-name" id="full-name" autoComplete="name" required className="block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-[#005595] focus:ring-[#005595]" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
                                <div className="mt-1">
                                    <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-[#005595] focus:ring-[#005595]" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Phone Number (Optional)</label>
                                <div className="mt-1">
                                    <input type="text" name="phone" id="phone" autoComplete="tel" className="block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-[#005595] focus:ring-[#005595]" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-gray-700">Message</label>
                                <div className="mt-1">
                                    <textarea id="message" name="message" rows={5} required className="block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-[#005595] focus:ring-[#005595]"></textarea>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-bold text-white bg-[#005595] hover:bg-[#004477] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005595] transition-colors duration-300"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContactUs;