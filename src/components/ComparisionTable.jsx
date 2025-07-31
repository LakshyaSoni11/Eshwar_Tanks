import React from 'react';
import { ComparisionData } from './Options'; // Adjust the import path
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const ComparisonTable = () => {
  const productPlans = ComparisionData.features.length > 0 ?
    Object.keys(ComparisionData.features[0].items[0]).filter(key => key !== 'name') : [];

  // Helper function to render the value (text, checkmark, or cross)
  const renderFeatureValue = (value) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckCircleIcon className="h-7 w-7 text-green-500 mx-auto" aria-label="Included" />
      ) : (
        <XCircleIcon className="h-7 w-7 text-red-400 mx-auto" aria-label="Not included" />
      );
    }
    return <span className="text-gray-700 text-sm">{value}</span>;
  };

  return (
    <div className="antialiased w-full p-4 sm:p-6 lg:p-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Comparison Table */}
        <div className="hidden md:block">
          <div className="bg-gradient-to-r from-gray-100 to-gray-300 rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50">
            {/* Product Plan Headers */}
            <div className="grid grid-cols-4 bg-gray-50/75">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800">Features</h2>
              </div>
              {productPlans.map(plan => (
                <div key={plan} className="p-6 text-center border-2 border-gray-200/75">
                  <h3 className="text-xl font-bold text-gray-800">{plan}</h3>
                  {/* Optional: You can add price or a CTA button here */}
                  {/* <p className="text-sm text-gray-500 mt-1">Starting at $...</p> */}
                </div>
              ))}
            </div>

            {/* Feature Categories & Rows */}
            {ComparisionData.features.map((category, categoryIndex) => (
              <div key={categoryIndex} className="group/category">
                {/* Category Header */}
                <div className="bg-gray-100/50 border-t border-2 border-gray-200/75">
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-gray-700">{category.category}</h4>
                  </div>
                </div>

                {/* Feature Rows */}
                {category.items.map((feature, featureIndex) => (
                  <div key={featureIndex} className="grid grid-cols-4 items-center border-t border-2 border-gray-200/75 hover:bg-gray-50/70 transition-colors duration-200">
                    {/* Feature Name */}
                    <div className="p-4 text-left">
                      <span className="font-semibold text-gray-800">{feature.name}</span>
                    </div>

                    {/* Feature Values for each product */}
                    {productPlans.map(plan => (
                      <div key={plan} className="p-4 text-center border-2 border-gray-200/75">
                        {renderFeatureValue(feature[plan])}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* You can add a mobile-friendly version here if needed */}
        <div className="md:hidden text-center text-gray-700">
          <p>Please view on a larger screen to see the feature comparison.</p>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;