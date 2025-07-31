// src/components/Options.jsx

import React from 'react';
import { Sparkles, Globe, Cloud, Shield, Zap, Trophy } from 'lucide-react'; // Example icons
import BannerImg from "../assets/logo.jpg"
import aquaPrimeImg from '../assets/logo.jpg'; // Example path
import ecoFlowImg from '../assets/logo.jpg'; 


export const BannerData = [
  {
    id: 1,
    title: "Revolutionize Your Workflow",
    description: "Our innovative solutions empower your team to achieve more with less effort.",
    buttonText: "Buy Now",
    image: BannerImg, // Replace with your actual image paths
  },
  {
    id: 2,
    title: "Smart Solutions for Every Business",
    description: "From startups to enterprises, we have a plan designed just for you.",
    buttonText: "Buy Now",
    image: BannerImg,
  },
  {
    id: 3,
    title: "Smart Solutions for Every Business",
    description: "From startups to enterprises, we have a plan designed just for you.",
    buttonText: "Buy Now",
    image: BannerImg,
  },
  // Add more banner slides as needed
];

export const MoreFeatures = [
  {
    title: "Scalable Infrastructure",
    description: "Our robust cloud infrastructure scales with your needs, ensuring seamless growth.",
    icon: <Cloud className="w-12 h-12 text-blue-500" />
  },
  {
    title: "Global Reach",
    description: "Connect with customers worldwide with our globally distributed network.",
    icon: <Globe className="w-12 h-12 text-green-500" />
  },
  {
    title: "Intelligent Automation",
    description: "Automate repetitive tasks and focus on what truly matters for your business.",
    icon: <Sparkles className="w-12 h-12 text-purple-500" />
  }
];

// This is the correct structure for your comparison chart data
// export const ComparisionData = { // Renamed from ComparisionChartData for consistency with import
//   features: [
//     {
//       category: "Core Features",
//       items: [
//         { name: "User Accounts", Basic: "Up to 5", Pro: "Up to 25", Enterprise: "Unlimited" },
//         { name: "Storage", Basic: "10 GB", Pro: "100 GB", Enterprise: "500 GB" },
//         { name: "Email Support", Basic: true, Pro: true, Enterprise: true },
//         { name: "24/7 Phone Support", Basic: false, Pro: true, Enterprise: true }
//       ]
//     },
//     {
//       category: "Advanced Features",
//       items: [
//         { name: "Custom Reporting", Basic: false, Pro: true, Enterprise: true },
//         { name: "API Access", Basic: false, Pro: "Limited", Enterprise: "Full" },
//         { name: "Dedicated Account Manager", Basic: false, Pro: false, Enterprise: true },
//         { name: "SLA Guarantee", Basic: false, Pro: false, Enterprise: true }
//       ]
//     },
//     {
//       category: "Security & Compliance",
//       items: [
//         { name: "Two-Factor Authentication", Basic: true, Pro: true, Enterprise: true },
//         { name: "SSO Integration", Basic: false, Pro: "Add-on", Enterprise: true },
//         { name: "Audit Logs", Basic: false, Pro: true, Enterprise: true }
//       ]
//     }
//   ]
// };

export const ComparisionData = {
  features: [
    {
      category: "Core Features",
      items: [
        { name: "User Accounts", Basic: "Up to 5", Pro: "Up to 25", Enterprise: "Unlimited" },
        { name: "Storage", Basic: "10 GB", Pro: "100 GB", Enterprise: "500 GB" },
        { name: "Email Support", Basic: true, Pro: true, Enterprise: true },
        { name: "24/7 Phone Support", Basic: false, Pro: true, Enterprise: true }
      ]
    },
    {
      category: "Advanced Features",
      items: [
        { name: "Custom Reporting", Basic: false, Pro: true, Enterprise: true },
        { name: "API Access", Basic: false, Pro: "Limited", Enterprise: "Full" },
        { name: "Dedicated Account Manager", Basic: false, Pro: false, Enterprise: true },
        { name: "SLA Guarantee", Basic: false, Pro: false, Enterprise: true }
      ]
    },
    {
      category: "Security & Compliance",
      items: [
        { name: "Two-Factor Authentication", Basic: true, Pro: true, Enterprise: true },
        { name: "SSO Integration", Basic: false, Pro: "Add-on", Enterprise: true },
        { name: "Audit Logs", Basic: false, Pro: true, Enterprise: true }
      ]
    }
  ]
};  


// export const TeamMemebrs ={
//     {
//         name:"Priyanshu Raj",

//     }
// }
export const semiAutomatic = {
    id: 'semiAutomatic-1', // IMPORTANT: unique ID for the product
    name: 'semiAutomatic',
    description: 'Advanced water filtration system with smart monitoring.',
    image: '/images/aquaprime.png', // Path to your image
    variants: {
        wired: {
            price: 'Rs 400.00',
            features: [
                'Direct power connection',
                'Continuous flow',
                'Real-time data logging',
                'Advanced filtration stages',
            ],
            specifications: [
                { name: 'Power Source', value: 'AC' },
                { name: 'Flow Rate', value: '2L/min' },
                // ... more specs
            ],
        },
        wireless: {
            price: 'Rs 800.00',
            features: [
                'Battery-powered (up to 24hrs)',
                'Portable operation',
                'Bluetooth connectivity',
                'Self-cleaning cycle',
            ],
            specifications: [
                { name: 'Power Source', value: 'Battery' },
                { name: 'Battery Life', value: '24 hours' },
            ],
        },
    },
    specifications: [ // These are general product specs, not variant-specific
        { name: 'Material', value: 'Food-grade Stainless Steel' },
        { name: 'Dimensions', value: '20x15x30 cm' },
    ],
};

export const FullyAutomatic = {
    id: 'FullyAutomatic-2', // IMPORTANT: unique ID for the product
    name: 'FullyAutomatic Smart Starter',
    description: 'Intelligent tap system for precise water dispensing and conservation.',
    image: '/images/ecoflow.png', // Path to your image
    variants: {
        wired: {
            price: 'Rs 1599.00',
            features: [
                'Direct power connection',
                'Automated dispensing',
                'Touchless activation',
                'Water usage analytics',
            ],
            specifications: [
                { name: 'Power Source', value: 'AC' },
                { name: 'Material', value: 'Chrome Finish' },
                // ... more specs
            ],
        },
        wireless: {
            price: 'Rs 2000.00',
            features: [
                'Battery-powered (up to 3 months)',
                'Easy installation',
                'Voice control compatible',
                'Leak detection sensors',
            ],
            specifications: [
                { name: 'Power Source', value: 'Batteries (AA)' },
                { name: 'Battery Life', value: '3 months' },
                // ... more specs
            ],
        },
    },
    specifications: [
        { name: 'Installation', value: 'Countertop or Wall Mount' },
        { name: 'Connectivity', value: 'Wifi' },
    ],
};