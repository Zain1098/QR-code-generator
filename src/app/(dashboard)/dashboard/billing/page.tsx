'use client';

import React from 'react';
import { Check, Info } from 'lucide-react';

export default function BillingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for testing and personal projects.',
      features: [
        'Up to 3 Static QR Codes',
        'Basic Customization',
        'Standard Support',
        'No Analytics'
      ],
      current: true,
      buttonText: 'Current Plan',
      buttonClass: 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-default'
    },
    {
      name: 'Pro',
      price: '$12',
      period: '/month',
      description: 'Ideal for small businesses and professionals.',
      features: [
        'Unlimited Static QR Codes',
        '10 Dynamic QR Codes',
        'Advanced Customization & Logos',
        'Basic Analytics (7 days)',
        'Priority Support'
      ],
      current: false,
      buttonText: 'Upgrade to Pro',
      buttonClass: 'bg-indigo-600 hover:bg-indigo-700 text-white'
    },
    {
      name: 'Business',
      price: '$29',
      period: '/month',
      description: 'For teams requiring advanced features.',
      features: [
        'Unlimited Dynamic QR Codes',
        'Custom Domains (Soon)',
        'Advanced Analytics (Unlimited)',
        'Bulk Generation',
        'Team Collaboration'
      ],
      current: false,
      buttonText: 'Upgrade to Business',
      buttonClass: 'bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-white text-white dark:text-gray-900'
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Billing & Plans</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-3">
          Choose the right plan for your needs. Upgrade or downgrade at any time.
        </p>
        
        <div className="mt-4 inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-lg text-sm font-medium">
          <Info className="w-4 h-4" />
          Payment integration is coming soon.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`relative bg-white dark:bg-gray-900 rounded-2xl border ${
              plan.name === 'Pro' 
                ? 'border-indigo-600 dark:border-indigo-500 shadow-lg shadow-indigo-100 dark:shadow-indigo-900/20' 
                : 'border-gray-200 dark:border-gray-800 shadow-sm'
            } p-8 flex flex-col`}
          >
            {plan.name === 'Pro' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                Most Popular
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm h-10">{plan.description}</p>
            </div>
            
            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
              <span className="text-gray-500 dark:text-gray-400 font-medium">{plan.period}</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              disabled={plan.current || true} // Disable upgrade buttons since payment is coming soon
              className={`w-full py-3 px-4 rounded-xl font-medium transition-colors ${plan.buttonClass} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
