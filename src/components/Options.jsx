// src/components/Options.jsx

import React from 'react';
// Import Lucide React icons
import {
  Sparkles, Globe, Cloud, Zap, Droplets, TrendingDown,
  Shield, Trophy, Wifi, Bell, Smartphone, Clock, Wrench,
  CalendarCheck, Mail, Phone, Gauge, Activity, BatteryCharging,
  Home, Settings, TrendingUp, Heart, MessageSquare, PhoneCall,
  Check, X // Ensure Check and X are imported if renderFeatureValue is used elsewhere
} from 'lucide-react';

// Import React-Icons
import { FaHandHoldingWater } from "react-icons/fa";
import { SlEnergy } from "react-icons/sl";
import { SiCrowdsource } from "react-icons/si";
import { MdFamilyRestroom } from "react-icons/md";
import { MdEnergySavingsLeaf } from "react-icons/md";
import { GiAchievement } from "react-icons/gi";

// Assuming these are your actual image paths in the public folder
import BannerImg from "../assets/logo.jpg";
import aquaPrimeImg from '../assets/logo.jpg'; // Example path for semiAutomatic
import ecoFlowImg from '../assets/logo.jpg'; // Example path for FullyAutomatic

// --- Product Data Definitions (as provided by you) ---
export const semiAutomatic = {
    id: 'semiAutomatic-1', // IMPORTANT: unique ID for the product
    name: 'Semi-Automatic', // Internal name, display name will be "Basic Plan"
    description: 'Reliable water level alerts for essential tank management.',
    image: aquaPrimeImg, // Use imported image
    variants: {
        wired: {
            price: 'Rs 400.00',
            features: [
                'Direct power connection',
                'High/Low level alerts',
                'Manual pump control notification',
            ],
            specifications: [
                { name: 'Power Source', value: 'AC' },
                { name: 'Flow Rate', value: 'N/A' }, // Adjusted for alarm
            ],
        },
        wireless: {
            price: 'Rs 800.00',
            features: [
                'Battery-powered (up to 24hrs)',
                'High/Low level alerts',
                'Manual pump control notification',
                'Simple wireless setup',
            ],
            specifications: [
                { name: 'Power Source', value: 'Battery' },
                { name: 'Battery Life', value: '24 hours' },
            ],
        },
    },
    specifications: [ // These are general product specs, not variant-specific
        { name: 'Material', value: 'Durable ABS Plastic' },
        { name: 'Dimensions', value: 'Compact (e.g., 10x8x5 cm)' },
        { name: 'Alert Type', value: 'Audible Buzzer' },
    ],
};

export const FullyAutomatic = {
    id: 'FullyAutomatic-2', // IMPORTANT: unique ID for the product
    name: 'Fully Automatic', // Internal name, display name will be "Pro Plan"
    description: 'Advanced, automated water management with smart controls and analytics.',
    image: ecoFlowImg, // Use imported image
    variants: {
        wired: {
            price: 'Rs 1599.00',
            features: [
                'Direct power connection',
                'Automated pump ON/OFF',
                'Real-time water usage analytics',
                'Mobile app control',
            ],
            specifications: [
                { name: 'Power Source', value: 'AC' },
                { name: 'Material', value: 'Premium ABS' },
            ],
        },
        wireless: {
            price: 'Rs 2000.00',
            features: [
                'Battery-powered (up to 3 months)',
                'Automated pump ON/OFF',
                'Voice assistant integration',
                'Leak detection sensors',
            ],
            specifications: [
                { name: 'Power Source', value: 'Batteries (AA)' },
                { name: 'Battery Life', value: '3 months' },
            ],
        },
    },
    specifications: [
        { name: 'Installation', value: 'Professional/Guided' },
        { name: 'Connectivity', value: 'Wi-Fi' },
        { name: 'Alert Type', value: 'App, SMS, Voice' },
    ],
};

// --- Data for other sections (improved content language) ---
export const BannerData = [
  {
    id: 1,
    title: "Smart Water Management for Every Indian Home",
    description: "Experience peace of mind with Tank.AI – intelligent water level monitoring and automation.",
    buttonText: "Explore Products",
    image: BannerImg,
  },
  {
    id: 2,
    title: "Conserve Water, Save Money, Live Smarter",
    description: "Our AI-powered devices prevent wastage and optimize water usage for a sustainable future.",
    buttonText: "View Solutions",
    image: BannerImg,
  },
  {
    id: 3,
    title: "Seamless Integration, Effortless Control",
    description: "Tank.AI blends into your home, providing intuitive control over your water resources.",
    buttonText: "Discover More",
    image: BannerImg,
  },
];

export const MoreFeatures = [
  {
    title: "Real-time Monitoring",
    description: "Get instant updates on your water tank levels directly to your smartphone, anytime, anywhere.",
    icon: <Gauge className="w-12 h-12 text-blue-500" />
  },
  {
    title: "Automated Pump Control",
    description: "Prevent overflows and dry runs with intelligent pump automation based on your custom settings.",
    icon: <Activity className="w-12 h-12 text-green-500" />
  },
  {
    title: "Energy Efficiency",
    description: "Optimize pump operation cycles to significantly reduce electricity consumption and lower utility bills.",
    icon: <SlEnergy className="w-12 h-12 text-purple-500" /> // Using SlEnergy from react-icons/sl
  },
  {
    title: "Effortless Installation",
    description: "Our devices are designed for quick and easy setup, often taking less than 15 minutes.",
    icon: <Wrench className="w-12 h-12 text-orange-500" />
  },
  {
    title: "Robust & Durable",
    description: "Built with high-quality materials to withstand diverse Indian environmental conditions for long-term reliability.",
    icon: <Shield className="w-12 h-12 text-red-500" />
  },
  {
    title: "Dedicated Support",
    description: "Access our expert customer support team 24/7 for any queries or assistance you may need.",
    icon: <PhoneCall className="w-12 h-12 text-cyan-500" />
  },
];

export const Impacts = [
  {
    title: "50 Million+",
    description: "Liters of water saved daily across all Tank.AI installations, preventing significant wastage.",
    icon: <FaHandHoldingWater className="w-12 h-12 text-blue-600" />,
  },
  {
    title: "10 SDG Goals",
    description: "Directly supporting UN Sustainable Development Goals related to clean water, energy, and sustainable communities.",
    icon: <GiAchievement className="w-12 h-12 text-green-600" />,
  },
  {
    title: "100,000+",
    description: "Families and businesses now enjoy uninterrupted water supply and peace of mind.",
    icon: <MdFamilyRestroom className="w-12 h-12 text-purple-600" />,
  },
  {
    title: "40% Energy",
    description: "Average reduction in pump-related electricity consumption, leading to substantial savings and lower carbon footprint.",
    icon: <MdEnergySavingsLeaf className="w-12 h-12 text-orange-600" />,
  }
];

export const SolvingCrises = [
  {
    icon: Droplets,
    title: "Preventing Water Overflow",
    problem: "An estimated 15 billion liters of precious water are wasted daily across India due to overflowing tanks.",
    solution: "Tank.AI's smart monitoring prevents 99% of overflow incidents, sending instant alerts or automating pump cut-off.",
  },
  {
    icon: Zap,
    title: "Combating Energy Waste",
    problem: "Inefficient and manual pump operation leads to an annual loss of ₹2000 crores in electricity.",
    solution: "Our AI optimization reduces energy consumption by up to 40%, ensuring pumps run only when necessary.",
  },
  {
    icon: TrendingDown,
    title: "Eliminating Dry Taps",
    problem: "Over 40% of urban Indian homes frequently face water scarcity and dry taps.",
    solution: "Predictive analytics and timely alerts ensure continuous water supply, eliminating unexpected disruptions.",
  },
];

export const steps = [
  {
    id: "01",
    icon: <Wifi className="w-10 h-10 text-blue-600" />, // Using Lucide icon for sensor
    title: "Effortless Installation",
    description: "Our smart sensors are designed for a quick and easy setup, typically within 15 minutes.",
  },
  {
    id: "02",
    icon: <Smartphone className="w-10 h-10 text-green-600" />, // Using Lucide icon for app
    title: "Seamless App Connection",
    description: "Link your Tank.AI devices to our intuitive smartphone app for instant control and monitoring.",
  },
  {
    id: "03",
    icon: <TrendingUp className="w-10 h-10 text-purple-600" />, // Using Lucide icon for AI learning
    title: "Intelligent AI Learning",
    description: "The system learns your unique water usage patterns to optimize and automate management.",
  },
  {
    id: "04",
    icon: <Check className="w-10 h-10 text-yellow-600" />, // Using Lucide icon for smart management
    title: "Enjoy Smart Management",
    description: "Experience worry-free water supply with intelligent automation and significant savings.",
  },
];

// --- Comparison Table Data for Basic (Semi-Automatic) and Pro (Fully Automatic) Plans ---
export const ComparisionData = {
  products: [
    {
      id: semiAutomatic.id,
      name: "Basic Plan",
      price: semiAutomatic.variants.wired.price, // Default price for comparison header
      period: "/unit",
      popular: false,
      description: "Ideal for essential water level alerts and basic tank management.",
      color: "from-blue-400 to-blue-600",
      icon: <Shield className="w-8 h-8" />
    },
    {
      id: FullyAutomatic.id,
      name: "Pro Plan",
      price: FullyAutomatic.variants.wired.price, // Default price for comparison header
      period: "/unit",
      popular: true,
      description: "Comprehensive water automation with smart controls and advanced insights.",
      color: "from-purple-400 to-purple-600",
      icon: <Zap className="w-8 h-8" />
    },
  ],
  features: [
    {
      category: "Core Monitoring & Alerts",
      items: [
        { name: "Water Level Alerts", Basic: "High/Low (Audible)", Pro: "All Levels (App, SMS, Voice)" },
        { name: "Overflow Prevention", Basic: true, Pro: true },
        { name: "Dry Run Prevention (Pump Safety)", Basic: false, Pro: true },
        { name: "Power Source", Basic: "Wired / Optional Battery", Pro: "Wired / Long-life Battery" },
      ]
    },
    {
      category: "Automation & Control",
      items: [
        { name: "Manual Pump Notification", Basic: true, Pro: false }, // Semi-auto notifies, not controls
        { name: "Automatic Pump ON/OFF", Basic: false, Pro: true },
        { name: "Mobile App Control", Basic: false, Pro: true },
        { name: "Historical Usage Data", Basic: false, Pro: "30-day Log" },
      ]
    },
    {
      category: "Advanced Smart Features",
      items: [
        { name: "Wi-Fi Connectivity", Basic: false, Pro: true },
        { name: "Voice Assistant Integration", Basic: false, Pro: true },
        { name: "Leak Detection Sensors", Basic: false, Pro: true },
        { name: "Customizable Schedules", Basic: false, Pro: true },
      ]
    },
    {
      category: "Installation & Support",
      items: [
        { name: "Installation Type", Basic: "DIY (Simple)", Pro: "Guided / Professional Recommended" },
        { name: "Warranty", Basic: "1 Year", Pro: "2 Years" },
        { name: "Email Support", Basic: true, Pro: true },
        { name: "Phone Support", Basic: false, Pro: true },
      ]
    }
  ]
};

// Example of how you might define TeamMembers if needed elsewhere
// export const TeamMembers = [
//     {
//         name: "Priyanshu Raj",
//         // ... other details
//     }
// ];