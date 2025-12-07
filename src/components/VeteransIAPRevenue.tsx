import React, { useState } from 'react';
import { DollarSign, Users, ShoppingCart, TrendingUp, Target, Award, Briefcase, GraduationCap, Shield, FileText, Video, Zap } from 'lucide-react';

export default function VeteransIAPRevenue() {
  const [activeTab, setActiveTab] = useState<'overview' | 'iap' | 'b2b'>('overview');

  // Month 12 Metrics (100K Users)
  const totalUsers = 100000;
  const dailyActiveUsers = 40000;
  const conversionRate = 0.04; // 4% baseline
  const payingUsers = totalUsers * conversionRate; // 4,000

  // In-App Purchase Revenue Breakdown
  const iapProducts = [
    {
      category: 'Career Transition Packages',
      icon: Briefcase,
      products: [
        { name: 'AI Career Roadmap Course', price: 29.99, conversion: 0.04, users: 4000, color: '#10b981' },
        { name: 'Resume + LinkedIn Optimization', price: 49.99, conversion: 0.025, users: 2500, color: '#3b82f6' },
        { name: 'Interview Prep Package', price: 39.99, conversion: 0.02, users: 2000, color: '#8b5cf6' },
        { name: 'AI Certification Exam', price: 99.99, conversion: 0.015, users: 1500, color: '#f59e0b' },
        { name: '1-on-1 Coaching (1 hour)', price: 50.00, conversion: 0.01, users: 1000, color: '#ef4444' },
      ]
    },
    {
      category: 'Advanced Learning Content',
      icon: GraduationCap,
      products: [
        { name: 'Advanced AI Fundamentals', price: 19.99, conversion: 0.03, users: 3000, color: '#06b6d4' },
        { name: 'Prompt Engineering Mastery', price: 24.99, conversion: 0.025, users: 2500, color: '#a855f7' },
        { name: 'AI for Federal Contractors', price: 49.99, conversion: 0.015, users: 1500, color: '#14b8a6' },
        { name: 'Security Clearance AI Guide', price: 39.99, conversion: 0.01, users: 1000, color: '#f97316' },
      ]
    },
    {
      category: 'Premium Tools & Resources',
      icon: Zap,
      products: [
        { name: 'AI Portfolio Templates', price: 14.99, conversion: 0.02, users: 2000, color: '#84cc16' },
        { name: 'Veteran Success Stories Pack', price: 9.99, conversion: 0.015, users: 1500, color: '#ec4899' },
        { name: 'Job Application AI Assistant', price: 4.99, conversion: 0.025, users: 2500, color: '#6366f1', recurring: true },
      ]
    }
  ];

  // Calculate IAP Revenue
  const calculateIAPRevenue = () => {
    let totalMonthly = 0;
    iapProducts.forEach(category => {
      category.products.forEach(product => {
        const monthly = product.users * product.price;
        totalMonthly += monthly;
      });
    });
    return totalMonthly;
  };

  const iapMonthly = calculateIAPRevenue();
  const iapAnnual = iapMonthly * 12;

  // Other Revenue Streams
  const adMobDaily = dailyActiveUsers * 8 * (7 / 1000); // 8 impressions/day * $7 CPM
  const adMobMonthly = adMobDaily * 30;
  const adMobAnnual = adMobMonthly * 12;

  const premiumSubUsers = totalUsers * 0.01; // 1% conversion to premium
  const premiumMonthly = premiumSubUsers * 19.99;
  const premiumAnnual = premiumMonthly * 12;

  const donationUsers = totalUsers * 0.03; // 3% donate
  const donationsMonthly = donationUsers * 5;
  const donationsAnnual = donationsMonthly * 12;

  // B2B Revenue (Conservative Year 1)
  const b2bContracts = [
    { client: 'VA Employment Program', value: 250000, probability: 0.8 },
    { client: 'Hiring Our Heroes Partnership', value: 150000, probability: 0.7 },
    { client: 'Fortune 500 Veteran Program (2 clients)', value: 300000, probability: 0.6 },
    { client: 'Military Base TAP Programs (3 bases)', value: 200000, probability: 0.7 },
    { client: 'Defense Contractor Partnership', value: 150000, probability: 0.5 },
  ];

  const b2bTotal = b2bContracts.reduce((sum, contract) => sum + (contract.value * contract.probability), 0);

  // Enterprise Consulting (Conservative)
  const enterpriseConsulting = 300000; // $50/hr * ~120 hours/month avg

  // Total Revenue
  const consumerTotal = iapAnnual + adMobAnnual + premiumAnnual + donationsAnnual;
  const b2bTotal_annual = b2bTotal + enterpriseConsulting;
  const grandTotal = consumerTotal + b2bTotal_annual;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-4 mb-4">
          <Shield className="w-12 h-12 text-green-400" />
          <div>
            <h1 className="text-4xl tracking-[0.2em]" style={{ textShadow: '0 0 20px rgba(16, 185, 129, 0.5)' }}>
              VETERANS IAP REVENUE MODEL
            </h1>
            <p className="text-gray-400 mt-2">Conservative 4% Conversion | Month 12 Projections</p>
          </div>
        </div>

        {/* Key Metrics Bar */}
        <div className="grid grid-cols-4 gap-4 mt-8">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <Users className="w-6 h-6 text-green-400 mb-2" />
            <div className="text-2xl">{totalUsers.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Total Users</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <ShoppingCart className="w-6 h-6 text-blue-400 mb-2" />
            <div className="text-2xl">{payingUsers.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Paying Users (4%)</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <TrendingUp className="w-6 h-6 text-purple-400 mb-2" />
            <div className="text-2xl">${(iapAnnual / payingUsers).toFixed(2)}</div>
            <div className="text-sm text-gray-400">Avg Revenue/User</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <DollarSign className="w-6 h-6 text-yellow-400 mb-2" />
            <div className="text-2xl">${(grandTotal / 1000000).toFixed(2)}M</div>
            <div className="text-sm text-gray-400">Total Year 1 Revenue</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mt-8 border-b border-gray-800">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 transition-all ${
              activeTab === 'overview'
                ? 'border-b-2 border-green-400 text-green-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Revenue Overview
          </button>
          <button
            onClick={() => setActiveTab('iap')}
            className={`px-6 py-3 transition-all ${
              activeTab === 'iap'
                ? 'border-b-2 border-blue-400 text-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            In-App Purchases
          </button>
          <button
            onClick={() => setActiveTab('b2b')}
            className={`px-6 py-3 transition-all ${
              activeTab === 'b2b'
                ? 'border-b-2 border-purple-400 text-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            B2B White-Label
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Revenue Breakdown */}
            <div className="grid grid-cols-2 gap-8">
              {/* Consumer App Revenue */}
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl mb-6 flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 text-green-400" />
                  Consumer App Revenue
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                    <span className="text-gray-400">In-App Purchases</span>
                    <div className="text-right">
                      <div className="text-green-400">${(iapAnnual / 1000000).toFixed(2)}M</div>
                      <div className="text-xs text-gray-500">${(iapMonthly / 1000).toFixed(1)}K/mo</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                    <span className="text-gray-400">AdMob</span>
                    <div className="text-right">
                      <div className="text-blue-400">${(adMobAnnual / 1000).toFixed(0)}K</div>
                      <div className="text-xs text-gray-500">${(adMobMonthly / 1000).toFixed(1)}K/mo</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                    <span className="text-gray-400">Premium Subscription</span>
                    <div className="text-right">
                      <div className="text-purple-400">${(premiumAnnual / 1000).toFixed(0)}K</div>
                      <div className="text-xs text-gray-500">${(premiumMonthly / 1000).toFixed(1)}K/mo</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                    <span className="text-gray-400">Donations</span>
                    <div className="text-right">
                      <div className="text-yellow-400">${(donationsAnnual / 1000).toFixed(0)}K</div>
                      <div className="text-xs text-gray-500">${(donationsMonthly / 1000).toFixed(1)}K/mo</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-3">
                    <span className="text-lg">Consumer Total</span>
                    <div className="text-right">
                      <div className="text-2xl text-green-400">${(consumerTotal / 1000000).toFixed(2)}M</div>
                      <div className="text-xs text-gray-500">${((iapMonthly + adMobMonthly + premiumMonthly + donationsMonthly) / 1000).toFixed(0)}K/mo</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* B2B + Enterprise Revenue */}
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl mb-6 flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-purple-400" />
                  B2B + Enterprise Revenue
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                    <span className="text-gray-400">White-Label Contracts</span>
                    <div className="text-right">
                      <div className="text-purple-400">${(b2bTotal / 1000000).toFixed(2)}M</div>
                      <div className="text-xs text-gray-500">5 contracts (weighted)</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                    <span className="text-gray-400">Enterprise Consulting</span>
                    <div className="text-right">
                      <div className="text-blue-400">${(enterpriseConsulting / 1000).toFixed(0)}K</div>
                      <div className="text-xs text-gray-500">$50/hr × ~120 hrs/mo</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-3">
                    <span className="text-lg">B2B Total</span>
                    <div className="text-right">
                      <div className="text-2xl text-purple-400">${(b2bTotal_annual / 1000000).toFixed(2)}M</div>
                      <div className="text-xs text-gray-500">${(b2bTotal_annual / 12 / 1000).toFixed(0)}K/mo avg</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-xl">TOTAL YEAR 1 REVENUE</span>
                    <div className="text-right">
                      <div className="text-3xl text-green-400" style={{ textShadow: '0 0 20px rgba(16, 185, 129, 0.5)' }}>
                        ${(grandTotal / 1000000).toFixed(2)}M
                      </div>
                      <div className="text-xs text-gray-500">${((iapMonthly + adMobMonthly + premiumMonthly + donationsMonthly + b2bTotal_annual / 12) / 1000).toFixed(0)}K/mo avg</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Revenue Chart */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl mb-6">Revenue Distribution (Year 1)</h2>
              <div className="space-y-3">
                {[
                  { label: 'In-App Purchases', value: iapAnnual, color: 'bg-green-500', percentage: (iapAnnual / grandTotal * 100).toFixed(1) },
                  { label: 'B2B White-Label', value: b2bTotal, color: 'bg-purple-500', percentage: (b2bTotal / grandTotal * 100).toFixed(1) },
                  { label: 'AdMob', value: adMobAnnual, color: 'bg-blue-500', percentage: (adMobAnnual / grandTotal * 100).toFixed(1) },
                  { label: 'Enterprise Consulting', value: enterpriseConsulting, color: 'bg-yellow-500', percentage: (enterpriseConsulting / grandTotal * 100).toFixed(1) },
                  { label: 'Premium Subscription', value: premiumAnnual, color: 'bg-pink-500', percentage: (premiumAnnual / grandTotal * 100).toFixed(1) },
                  { label: 'Donations', value: donationsAnnual, color: 'bg-orange-500', percentage: (donationsAnnual / grandTotal * 100).toFixed(1) },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">{item.label}</span>
                      <span className="text-gray-300">${(item.value / 1000000).toFixed(2)}M ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3">
                      <div
                        className={`${item.color} h-3 rounded-full transition-all duration-1000`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* IAP Details Tab */}
        {activeTab === 'iap' && (
          <div className="space-y-8">
            {iapProducts.map((category, idx) => {
              const CategoryIcon = category.icon;
              return (
                <div key={idx} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                  <h2 className="text-xl mb-6 flex items-center gap-3">
                    <CategoryIcon className="w-6 h-6 text-green-400" />
                    {category.category}
                  </h2>
                  <div className="space-y-4">
                    {category.products.map((product, i) => {
                      const monthlyRevenue = product.users * product.price;
                      const annualRevenue = monthlyRevenue * (product.recurring ? 12 : 1);
                      return (
                        <div key={i} className="border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-all">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg">{product.name}</h3>
                                {product.recurring && (
                                  <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded">
                                    Recurring
                                  </span>
                                )}
                              </div>
                              <div className="flex gap-6 mt-2 text-sm text-gray-400">
                                <span>Price: ${product.price}</span>
                                <span>Conversion: {(product.conversion * 100).toFixed(1)}%</span>
                                <span>Users: {product.users.toLocaleString()}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl" style={{ color: product.color }}>
                                ${(annualRevenue / 1000).toFixed(1)}K
                              </div>
                              <div className="text-xs text-gray-500">
                                ${(monthlyRevenue / 1000).toFixed(1)}K/mo
                              </div>
                            </div>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all duration-1000"
                              style={{
                                width: `${product.conversion * 100 * 2.5}%`,
                                backgroundColor: product.color
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* IAP Summary */}
            <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-800 rounded-lg p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl mb-2">Total In-App Purchase Revenue</h3>
                  <p className="text-gray-400">Based on 4% baseline conversion (4,000 paying users)</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl text-green-400" style={{ textShadow: '0 0 20px rgba(16, 185, 129, 0.5)' }}>
                    ${(iapAnnual / 1000000).toFixed(2)}M
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    ${(iapMonthly / 1000).toFixed(1)}K per month
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* B2B Tab */}
        {activeTab === 'b2b' && (
          <div className="space-y-8">
            {/* B2B Contracts Pipeline */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-purple-400" />
                White-Label Contract Pipeline (Year 1)
              </h2>
              <div className="space-y-4">
                {b2bContracts.map((contract, i) => (
                  <div key={i} className="border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-all">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <h3 className="text-lg">{contract.client}</h3>
                        <div className="text-sm text-gray-400 mt-1">
                          Probability: {(contract.probability * 100).toFixed(0)}%
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl text-purple-400">
                          ${(contract.value / 1000).toFixed(0)}K
                        </div>
                        <div className="text-xs text-gray-500">
                          Weighted: ${((contract.value * contract.probability) / 1000).toFixed(0)}K
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${contract.probability * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="flex justify-between items-center">
                  <span className="text-lg">Total B2B White-Label (Weighted)</span>
                  <div className="text-right">
                    <div className="text-3xl text-purple-400">
                      ${(b2bTotal / 1000000).toFixed(2)}M
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Conservative probability weighting</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enterprise Consulting */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl mb-6 flex items-center gap-3">
                <Award className="w-6 h-6 text-blue-400" />
                Enterprise Consulting Revenue
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="border border-gray-800 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-2">Hourly Rate</div>
                  <div className="text-3xl text-blue-400">$50</div>
                </div>
                <div className="border border-gray-800 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-2">Avg Hours/Month</div>
                  <div className="text-3xl text-green-400">120</div>
                </div>
                <div className="border border-gray-800 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-2">Annual Revenue</div>
                  <div className="text-3xl text-purple-400">${(enterpriseConsulting / 1000).toFixed(0)}K</div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-400">
                  Conservative estimate based on ~30 hours/week of consulting work alongside app development and business operations.
                </p>
              </div>
            </div>

            {/* Pitch Summary */}
            <div className="bg-gradient-to-r from-purple-900/30 to-green-900/30 border border-purple-800 rounded-lg p-6">
              <h3 className="text-xl mb-4 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-green-400" />
                Enterprise Pitch Value Proposition
              </h3>
              <div className="space-y-3 text-gray-300">
                <p className="text-lg">
                  "Our free consumer app has <span className="text-green-400">100,000 veteran users</span> generating{' '}
                  <span className="text-green-400">${(iapAnnual / 1000000).toFixed(2)}M in IAP revenue</span> with a{' '}
                  <span className="text-blue-400">4% conversion rate</span> and{' '}
                  <span className="text-blue-400">87% course completion rate</span>."
                </p>
                <p className="text-lg border-t border-gray-700 pt-3">
                  "We can white-label this <span className="text-purple-400">proven platform</span> for your organization with{' '}
                  <span className="text-purple-400">custom branding</span>,{' '}
                  <span className="text-purple-400">dedicated support</span>, and{' '}
                  <span className="text-purple-400">measurable ROI tracking</span>."
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Summary */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800">
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-2">Consumer App Revenue</div>
            <div className="text-3xl text-green-400">${(consumerTotal / 1000000).toFixed(2)}M</div>
            <div className="text-xs text-gray-500 mt-1">{((consumerTotal / grandTotal) * 100).toFixed(1)}% of total</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-2">B2B + Enterprise Revenue</div>
            <div className="text-3xl text-purple-400">${(b2bTotal_annual / 1000000).toFixed(2)}M</div>
            <div className="text-xs text-gray-500 mt-1">{((b2bTotal_annual / grandTotal) * 100).toFixed(1)}% of total</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-2">Total Year 1 Revenue</div>
            <div className="text-3xl text-yellow-400" style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}>
              ${(grandTotal / 1000000).toFixed(2)}M
            </div>
            <div className="text-xs text-gray-500 mt-1">Conservative 4% model</div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-900 border border-gray-800 rounded-lg">
          <h3 className="text-lg mb-3 text-green-400">🎖️ Key Assumptions (Conservative):</h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
            <div>• <span className="text-gray-400">Base conversion rate:</span> 4% (industry avg: 2-5%)</div>
            <div>• <span className="text-gray-400">Premium subscription:</span> 1% (very conservative)</div>
            <div>• <span className="text-gray-400">Daily active users:</span> 40% of installs</div>
            <div>• <span className="text-gray-400">AdMob CPM:</span> $7 (veteran demographic premium)</div>
            <div>• <span className="text-gray-400">B2B contracts:</span> Probability-weighted (50-80%)</div>
            <div>• <span className="text-gray-400">Consulting hours:</span> 30 hrs/week @ $50/hr</div>
          </div>
        </div>
      </div>
    </div>
  );
}
