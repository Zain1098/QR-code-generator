'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  QrCode, Palette, Link2, BarChart3, Download, FolderOpen, 
  Type, Wifi, User, Mail, Phone, MessageSquare, MapPin, Calendar, 
  Share2, CreditCard, CheckCircle2, ChevronDown, ChevronUp, X
} from 'lucide-react';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const features = [
    {
      title: '12 QR Types',
      description: 'Create QR codes for URLs, WiFi, vCards, Events, and much more.',
      icon: <QrCode className="w-6 h-6" />
    },
    {
      title: 'Advanced Customization',
      description: 'Personalize colors, dot styles, logos, and frames to match your brand.',
      icon: <Palette className="w-6 h-6" />
    },
    {
      title: 'Dynamic QR Codes',
      description: 'Change the destination URL anytime without reprinting your codes.',
      icon: <Link2 className="w-6 h-6" />
    },
    {
      title: 'Scan Analytics',
      description: 'Track scan counts, devices, operating systems, and geographical locations.',
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      title: 'Multiple Export Formats',
      description: 'Download in high-resolution PNG, SVG, or WebP formats for any use case.',
      icon: <Download className="w-6 h-6" />
    },
    {
      title: 'Folder Organization',
      description: 'Keep your QR codes organized by project, campaign, or client.',
      icon: <FolderOpen className="w-6 h-6" />
    }
  ];

  const qrTypes = [
    { name: 'URL', icon: <Link2 className="w-5 h-5" /> },
    { name: 'Text', icon: <Type className="w-5 h-5" /> },
    { name: 'WiFi', icon: <Wifi className="w-5 h-5" /> },
    { name: 'Contact', icon: <User className="w-5 h-5" /> },
    { name: 'Email', icon: <Mail className="w-5 h-5" /> },
    { name: 'Phone', icon: <Phone className="w-5 h-5" /> },
    { name: 'SMS', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'WhatsApp', icon: <Share2 className="w-5 h-5" /> },
    { name: 'Location', icon: <MapPin className="w-5 h-5" /> },
    { name: 'Event', icon: <Calendar className="w-5 h-5" /> },
    { name: 'Social', icon: <Share2 className="w-5 h-5" /> },
    { name: 'Payment', icon: <CreditCard className="w-5 h-5" /> },
  ];

  const useCases = [
    { title: 'Restaurants', desc: 'Touchless digital menus for safe and easy ordering.' },
    { title: 'Retail & E-commerce', desc: 'Link to product details, reviews, or special discounts.' },
    { title: 'Events & Conferences', desc: 'Ticketing, schedules, and exhibitor information.' },
    { title: 'Marketing Campaigns', desc: 'Track offline to online conversion rates easily.' },
    { title: 'Business Cards', desc: 'Instantly share contact details directly to address books.' },
    { title: 'Real Estate', desc: 'Virtual tours and property information at the tap of a screen.' },
    { title: 'Education', desc: 'Quick access to learning resources and assignments.' },
    { title: 'Healthcare', desc: 'Patient information, appointment booking, and facility maps.' }
  ];

  const faqs = [
    {
      q: 'What is a QR code?',
      a: 'A QR (Quick Response) code is a two-dimensional barcode that can be read by smartphones and dedicated QR reading devices. It can store various types of information, such as URLs, contact details, or text.'
    },
    {
      q: 'Static vs dynamic QR codes?',
      a: 'Static QR codes embed the data directly into the code. Once printed, they cannot be changed. Dynamic QR codes contain a short URL that redirects to your actual content, allowing you to change the destination anytime and track scan analytics.'
    },
    {
      q: 'Is it free to create QR codes?',
      a: 'Yes, our basic plan allows you to create static QR codes and a limited number of dynamic QR codes completely free of charge. For advanced features and higher limits, we offer premium plans.'
    },
    {
      q: 'Can I add a logo to my QR code?',
      a: 'Yes! With our Pro and Business plans, you can easily upload your company logo or any image to place in the center of your QR code to increase brand recognition.'
    },
    {
      q: 'How does scan analytics work?',
      a: 'When someone scans your dynamic QR code, our system records the scan event before redirecting them. We track metrics like time, general location (based on IP), device type, and operating system.'
    },
    {
      q: 'Can I change the destination of a QR code?',
      a: 'Yes, if you use a dynamic QR code. You can update the target URL in your dashboard at any time without needing to reprint the QR code itself.'
    },
    {
      q: 'What export formats are supported?',
      a: 'You can download your generated QR codes in PNG, SVG (vector), and WebP formats. SVG is highly recommended for print materials as it scales without losing quality.'
    },
    {
      q: 'Is my data secure?',
      a: 'Absolutely. We use industry-standard encryption to protect your data. We do not sell your personal information or the scan data of your users to third parties.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-gradient-to-b from-brand-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
              Create Powerful <span className="text-brand-600 dark:text-brand-500">QR Codes</span> in Seconds
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              Generate static and dynamic QR codes with advanced customization, analytics, and management tools. Free to use, professional-grade results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/create"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 shadow-lg hover:shadow-xl transition-all"
              >
                Create QR Code
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 shadow-sm transition-all"
              >
                Explore Features
              </Link>
            </div>
          </div>
          
          {/* Mockup Illustration */}
          <div className="mt-20 mx-auto max-w-3xl relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-100 to-brand-50 dark:from-brand-900/20 dark:to-brand-800/20 rounded-3xl blur-3xl opacity-50"></div>
            <div className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-center min-h-[300px]">
               <div className="grid grid-cols-5 gap-2 w-48 h-48 opacity-80">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`rounded-sm ${(i === 0 || i === 4 || i === 20 || i === 24) ? 'bg-brand-600 dark:bg-brand-500 scale-125' : (i % 2 === 0 ? 'bg-gray-800 dark:bg-gray-200' : 'bg-transparent')} transition-all duration-500 hover:scale-110`}
                    ></div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Everything You Need</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A complete toolkit for generating, managing, and tracking your QR codes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 inline-flex items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QR Types Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Supported QR Types</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Create specific codes for any scenario.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {qrTypes.map((type, index) => (
              <div key={index} className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-brand-500 dark:hover:border-brand-500 transition-colors group cursor-pointer">
                <div className="text-gray-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 mb-3 transition-colors">
                  {type.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{type.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Static vs Dynamic Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Static vs Dynamic</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose the right type of QR code for your needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <QrCode className="text-gray-400" /> Static QR Codes
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Data is embedded directly into the code pattern.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Works forever, never expires.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Completely free to create and use.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Destination cannot be changed once printed.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">No scan tracking or analytics.</span>
                </li>
              </ul>
            </div>
            
            <div className="p-8 rounded-2xl border-2 border-brand-500 bg-white dark:bg-gray-900 relative shadow-lg">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-brand-500 text-white px-3 py-1 rounded-full text-sm font-semibold tracking-wide">
                Recommended
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Link2 className="text-brand-500" /> Dynamic QR Codes
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Contains a short redirect URL.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300 font-medium">Change destination URL anytime without reprinting.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Track scans, locations, devices, and dates.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Password protect or set expiry dates.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Requires a free or paid account.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Endless Possibilities</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              How our users are leveraging QR codes across different industries.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{useCase.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Start for free, upgrade when you need more power.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Tier */}
            <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Free</h3>
              <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">$0<span className="text-lg font-normal text-gray-500 dark:text-gray-400">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex gap-3 text-gray-600 dark:text-gray-300"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> 10 Static QR/month</li>
                <li className="flex gap-3 text-gray-600 dark:text-gray-300"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> 3 Dynamic QR codes</li>
                <li className="flex gap-3 text-gray-600 dark:text-gray-300"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Basic customization</li>
                <li className="flex gap-3 text-gray-600 dark:text-gray-300"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> PNG export</li>
                <li className="flex gap-3 text-gray-600 dark:text-gray-300"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> 7-day analytics</li>
              </ul>
              <Link href="/signup" className="block w-full py-3 px-4 text-center rounded-lg font-medium border-2 border-brand-600 text-brand-600 hover:bg-brand-50 dark:border-brand-500 dark:text-brand-400 dark:hover:bg-brand-900/20 transition-colors">
                Get Started
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="p-8 rounded-2xl border-2 border-brand-500 bg-brand-50 dark:bg-brand-900/10 flex flex-col relative transform md:-translate-y-4 shadow-xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-500 text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wide">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pro</h3>
              <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">$12<span className="text-lg font-normal text-gray-500 dark:text-gray-400">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex gap-3 text-gray-600 dark:text-gray-300"><CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" /> Unlimited Static QR</li>
                <li className="flex gap-3 text-gray-600 dark:text-gray-300"><CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" /> 50 Dynamic QR codes</li>
                <li className="flex gap-3 text-gray-600 dark:text-gray-300"><CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" /> Advanced customization</li>
                <li className="flex gap-3 text-gray-600 dark:text-gray-300"><CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" /> Logo upload</li>
                <li className="flex gap-3 text-gray-600 dark:text-gray-300"><CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" /> All export formats (SVG, WebP)</li>
                <li className="flex gap-3 text-gray-600 dark:text-gray-300"><CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" /> 1-year analytics</li>
                <li className="flex gap-3 text-gray-600 dark:text-gray-300"><CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" /> Bulk generation</li>
              </ul>
              <Link href="/signup?plan=pro" className="block w-full py-3 px-4 text-center rounded-lg font-medium bg-brand-600 text-white hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 transition-colors shadow-md">
                Upgrade to Pro
              </Link>
            </div>

            {/* Business Tier */}
            <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Business</h3>
              <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">$39<span className="text-lg font-normal text-gray-500 dark:text-gray-400">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex gap-3 text-gray-600 dark:text-gray-300"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Everything in Pro</li>
                <li className="flex gap-3 text-gray-600 dark:text-gray-300"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> 500 Dynamic QR codes</li>
                <li className="flex gap-3 text-gray-600 dark:text-gray-300"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Team members</li>
                <li className="flex gap-3 text-gray-600 dark:text-gray-300"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> API access</li>
                <li className="flex gap-3 text-gray-600 dark:text-gray-300"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Priority support</li>
                <li className="flex gap-3 text-gray-600 dark:text-gray-300"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Custom branding</li>
              </ul>
              <Link href="/signup?plan=business" className="block w-full py-3 px-4 text-center rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <span className="font-semibold text-left text-gray-900 dark:text-white">{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />
                  )}
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index ? 'max-h-96 pb-4 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-600 dark:bg-brand-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Create Your First QR Code?</h2>
          <p className="text-xl text-brand-100 mb-10 max-w-2xl mx-auto">
            Join thousands of professionals generating millions of scans every month. No credit card required.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-xl text-brand-600 bg-white hover:bg-gray-50 hover:scale-105 shadow-xl transition-all duration-300"
          >
            Create QR Code Now
          </Link>
        </div>
      </section>
    </div>
  );
}
