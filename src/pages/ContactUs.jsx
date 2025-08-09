import React, { useState } from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { db } from '../firebase/firebase';

const ContactUs = () => {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!form.fullName.trim() || !form.email.trim() || !form.message.trim()) {
            setSuccess('Please fill in all required fields');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setSuccess('Please enter a valid email address');
            return;
        }

        setLoading(true);
        setSuccess('');

        try {
            // Saveing to Firestore 
            await addDoc(collection(db, "ContactMessages"), {
                fullName: form.fullName,
                email: form.email,
                phone: form.phone,
                message: form.message,
                createdAt: serverTimestamp(),
                status: 'new'
            });


            // First email - to admin (current functionality)
            const adminEmailParams = {
                to_name: "Eshwar Tanks Admin",
                from_name: form.fullName,
                from_email: "priyanshu7248raj@gmail.com",
                phone: form.phone || "Not provided",
                message: form.message,
                reply_to: form.email,
            };

            // Second email - confirmation to user
            const userEmailParams = {
                to_name: form.fullName,
                to_email: form.email,
                from_name: "Eshwar Tanks",
                from_email: "admin@eshwartanks.com",
                message: "Thank you for contacting us. We have received your message and will get back to you soon.",
                user_message: form.message, // Include their original message
            };

            // Sending both emails
            await emailjs.send('service_4mzjfwk', 'template_8cdmgqb', adminEmailParams, '_fLcZAqJV4N6WR9-l');
            await emailjs.send('service_4mzjfwk', 'template_user_confirmation', userEmailParams, '_fLcZAqJV4N6WR9-l');

            setSuccess(' Your message has been sent successfully! We will get back to you soon.');
            setForm({ fullName: "", email: "", phone: "", message: "" });

        } catch (error) {
            console.error("Error:", error);

            if (error.text) {
                // EmailJS error
                setSuccess(' Failed to send email. Please try again or contact us directly.');
            } else if (error.code === 'permission-denied') {
                setSuccess(' Permission denied. Please check Firestore security rules.');
            } else {
                setSuccess(' Something went wrong. Please try again later.');
            }
        }

        setLoading(false);
    }

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

            {/* Main Content */}
            <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Contact Information & Map */}
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

                        {/* Map */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Location</h2>
                            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg border border-gray-200">
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

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-2xl border">
                        <h2 className="text-3xl font-bold text-gray-800">Send us a Message</h2>
                        {success && (
                            <div className={`mt-4 p-3 rounded-md ${success.includes('successfully')
                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                    : 'bg-red-50 text-red-700 border border-red-200'
                                }`}>
                                {success}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-[#005595] focus:ring-[#005595] focus:outline-none"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-[#005595] focus:ring-[#005595] focus:outline-none"
                                    placeholder="Enter your email address"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-[#005595] focus:ring-[#005595] focus:outline-none"
                                    placeholder="Enter your phone number (optional)"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Message *</label>
                                <textarea
                                    name="message"
                                    rows={5}
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-[#005595] focus:ring-[#005595] focus:outline-none"
                                    placeholder="Tell us how we can help you..."
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-3 px-4 rounded-md text-base font-bold text-white bg-[#005595] hover:bg-[#004477] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Message'
                                    )}
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