'use client';

import React from 'react';
import Link from 'next/link';
import { Layout, Utensils, Wifi, Briefcase, Calendar, Share2, ShoppingBag, Contact, CreditCard } from 'lucide-react';

const SYSTEM_TEMPLATES = [
  { id: 1, name: 'Restaurant Menu', type: 'URL', icon: Utensils, color: 'bg-orange-100 text-orange-600', preview: 'bg-gradient-to-br from-orange-400 to-red-500' },
  { id: 2, name: 'WiFi Access', type: 'WiFi', icon: Wifi, color: 'bg-blue-100 text-blue-600', preview: 'bg-gradient-to-br from-blue-400 to-cyan-500' },
  { id: 3, name: 'Business Card', type: 'vCard', icon: Briefcase, color: 'bg-gray-100 text-gray-800', preview: 'bg-gradient-to-br from-gray-700 to-gray-900' },
  { id: 4, name: 'Event', type: 'Event', icon: Calendar, color: 'bg-purple-100 text-purple-600', preview: 'bg-gradient-to-br from-purple-400 to-pink-500' },
  { id: 5, name: 'Social Profile', type: 'Social', icon: Share2, color: 'bg-pink-100 text-pink-600', preview: 'bg-gradient-to-br from-pink-400 to-rose-500' },
  { id: 6, name: 'Product Link', type: 'URL', icon: ShoppingBag, color: 'bg-green-100 text-green-600', preview: 'bg-gradient-to-br from-green-400 to-emerald-500' },
  { id: 7, name: 'Contact Card', type: 'vCard', icon: Contact, color: 'bg-zinc-100 text-zinc-600', preview: 'bg-white border-2 border-gray-200' },
  { id: 8, name: 'Payment', type: 'URL', icon: CreditCard, color: 'bg-yellow-100 text-yellow-600', preview: 'bg-gradient-to-br from-yellow-400 to-amber-500' },
];

export default function TemplatesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Templates</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Start quickly with pre-designed QR code templates.</p>
      </div>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <Layout className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">System Templates</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SYSTEM_TEMPLATES.map((template) => (
            <div key={template.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className={`h-32 ${template.preview} flex items-center justify-center p-4 relative`}>
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                    <template.icon className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{template.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${template.color}`}>
                    {template.type}
                  </span>
                </div>
                <div className="mt-auto pt-4">
                  <Link 
                    href={`/dashboard/create?template=${template.id}`}
                    className="block w-full py-2 text-center text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-lg transition-colors"
                  >
                    Use Template
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Saved Templates</h2>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-8 text-center min-h-[200px] flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3">
            <Layout className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't saved any custom templates yet.</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Customize a QR code and save it as a template to reuse your branding across multiple codes.
          </p>
        </div>
      </section>
    </div>
  );
}
