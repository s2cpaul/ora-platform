import React, { useState } from 'react';
import { Building2, Target, TrendingUp, Users, DollarSign, CheckCircle, Clock, Briefcase, Award, Shield, Zap, FileText } from 'lucide-react';

export default function B2BWhiteLabelDashboard() {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'revenue' | 'roi'>('pipeline');

  // Consumer App Metrics (Foundation for B2B Pitch)
  const consumerUsers = 100000;
  const payingUsers = 4000; // 4% conversion
  const courseCompletion = 87; // 87% completion rate
  const avgSalaryIncrease = 35000; // Avg salary increase for veterans

  // B2B Pipeline Metrics
  const closeRate = 0.06; // 6% close rate
  
  // B2B Opportunities (Year 1)
  const opportunities = [
    {
      category: 'Federal/Government',
      icon: Shield,
      prospects: [
        { org: 'VA Employment Programs (National)', value: 20000, timeline: '2-4 months', probability: closeRate, price: 20000, users: 'White-Label Access' },
        { org: 'VA Regional Programs (per region)', value: 20000, timeline: '2-3 months', probability: closeRate, price: 20000, users: 'White-Label Access' },
        { org: 'Military Base TAP Programs (per base)', value: 20000, timeline: '1-3 months', probability: closeRate, price: 20000, users: 'White-Label Access' },
        { org: 'DOD SkillBridge Partnerships', value: 20000, timeline: '3-6 months', probability: closeRate, price: 20000, users: 'White-Label Access' },
      ]
    },
    {
      category: 'Veteran Organizations',
      icon: Award,
      prospects: [
        { org: 'Hiring Our Heroes (National)', value: 20000, timeline: '2-4 months', probability: closeRate, price: 20000, users: 'White-Label Access' },
        { org: 'VFW National Partnership', value: 20000, timeline: '2-4 months', probability: closeRate, price: 20000, users: 'White-Label Access' },
        { org: 'American Legion Chapters', value: 20000, timeline: '2-3 months', probability: closeRate, price: 20000, users: 'White-Label Access' },
        { org: 'Team Rubicon Training Program', value: 20000, timeline: '1-3 months', probability: closeRate, price: 20000, users: 'White-Label Access' },
      ]
    },
    {
      category: 'Fortune 500 Veteran Programs',
      icon: Building2,
      prospects: [
        { org: 'Amazon Military Hiring Initiative', value: 20000, timeline: '3-6 months', probability: closeRate, price: 20000, users: 'White-Label Access' },
        { org: 'Google Veterans Network', value: 20000, timeline: '4-6 months', probability: closeRate, price: 20000, users: 'White-Label Access' },
        { org: 'Microsoft MSSA Partnership', value: 20000, timeline: '3-5 months', probability: closeRate, price: 20000, users: 'White-Label Access' },
        { org: 'JPMorgan Chase Military Programs', value: 20000, timeline: '3-6 months', probability: closeRate, price: 20000, users: 'White-Label Access' },
        { org: 'Walmart Veterans Initiative', value: 20000, timeline: '2-4 months', probability: closeRate, price: 20000, users: 'White-Label Access' },
      ]
    },
    {
      category: 'Defense Contractors',
      icon: Zap,
      prospects: [
        { org: 'Lockheed Martin Veteran Transition', value: 20000, timeline: '4-8 months', probability: closeRate, price: 20000, users: 'White-Label Access' },
        { org: 'Raytheon Technologies HR Partnership', value: 20000, timeline: '4-6 months', probability: closeRate, price: 20000, users: 'White-Label Access' },
        { org: 'Northrop Grumman Recruiting', value: 20000, timeline: '3-6 months', probability: closeRate, price: 20000, users: 'White-Label Access' },
        { org: 'Boeing Veteran Hiring Program', value: 20000, timeline: '4-6 months', probability: closeRate, price: 20000, users: 'White-Label Access' },
      ]
    },
    {
      category: 'Educational Institutions',
      icon: Briefcase,
      prospects: [
        { org: 'University Veteran Centers (5 schools)', value: 20000, timeline: '3-5 months', probability: closeRate, price: 20000, users: 'White-Label Access' },
        { org: 'Community College Systems (3 states)', value: 20000, timeline: '2-4 months', probability: closeRate, price: 20000, users: 'White-Label Access' },
        { org: 'For-Profit Colleges (Veteran Programs)', value: 20000, timeline: '1-3 months', probability: closeRate, price: 20000, users: 'White-Label Access' },
      ]
    },
  ];

  // Calculate totals
  const calculateTotals = () => {
    let totalPipeline = 0;
    let totalWeighted = 0;
    let totalProspects = 0;

    opportunities.forEach(category => {
      category.prospects.forEach(prospect => {
        totalPipeline += prospect.value;
        totalWeighted += prospect.value * closeRate;
        totalProspects++;
      });
    });

    return {
      pipeline: totalPipeline,
      weighted: totalWeighted,
      prospects: totalProspects,
      expectedDeals: Math.round(totalProspects * closeRate)
    };
  };

  const totals = calculateTotals();

  // Revenue Breakdown by Category
  const categoryRevenue = opportunities.map(category => {
    const categoryTotal = category.prospects.reduce((sum, p) => sum + p.value, 0);
    const categoryWeighted = category.prospects.reduce((sum, p) => sum + (p.value * closeRate), 0);
    return {
      name: category.category,
      icon: category.icon,
      pipeline: categoryTotal,
      weighted: categoryWeighted,
      prospects: category.prospects.length
    };
  });

  // Enterprise Consulting
  const consultingHourlyRate = 50;
  const consultingHoursPerMonth = 120;
  const consultingAnnual = consultingHourlyRate * consultingHoursPerMonth * 12;

  // Total B2B Revenue
  const totalB2BRevenue = totals.weighted + consultingAnnual;

  // ROI Calculations for Clients
  const roiMetrics = {
    veteransPlaced: 850, // Expected placements from 100K users
    avgSalaryIncrease: 35000,
    totalEconomicImpact: 850 * 35000,
    avgContractValue: totals.weighted / totals.expectedDeals,
    roiMultiple: (850 * 35000) / (totals.weighted / totals.expectedDeals),
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-4 mb-4">
          <Building2 className="w-12 h-12 text-purple-400" />
          <div>
            <h1 className="text-4xl tracking-[0.2em]" style={{ textShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}>
              B2B WHITE-LABEL DASHBOARD
            </h1>
            <p className="text-gray-400 mt-2">6% Close Rate Model | Year 1 Pipeline & Revenue Projections</p>
          </div>
        </div>

        {/* Federal Government Easy Entry Highlight */}
        <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-2 border-green-500 rounded-lg p-6 mt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <DollarSign className="w-10 h-10 text-green-400" />
              <div>
                <h2 className="text-2xl font-bold text-green-400 mb-1">Unified White-Label Entry Point</h2>
                <p className="text-gray-300">Every customer gets complete white-label platform access at one price</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-green-400" style={{ textShadow: '0 0 30px rgba(34, 197, 94, 0.6)' }}>
                $20K
              </div>
              <div className="text-sm text-gray-400 mt-1">Per Organization</div>
              <div className="text-xs text-green-400 mt-1">✓ White-Label Access Included</div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-3 mt-6">
            <div className="bg-black/30 border border-green-800 rounded-lg p-3 text-center">
              <Shield className="w-5 h-5 text-green-400 mx-auto mb-2" />
              <div className="text-green-400 text-sm font-bold">Federal/Gov</div>
              <div className="text-xs text-gray-400">1-4 months</div>
            </div>
            <div className="bg-black/30 border border-green-800 rounded-lg p-3 text-center">
              <Award className="w-5 h-5 text-green-400 mx-auto mb-2" />
              <div className="text-green-400 text-sm font-bold">Vet Orgs</div>
              <div className="text-xs text-gray-400">1-4 months</div>
            </div>
            <div className="bg-black/30 border border-green-800 rounded-lg p-3 text-center">
              <Building2 className="w-5 h-5 text-green-400 mx-auto mb-2" />
              <div className="text-green-400 text-sm font-bold">Fortune 500</div>
              <div className="text-xs text-gray-400">2-6 months</div>
            </div>
            <div className="bg-black/30 border border-green-800 rounded-lg p-3 text-center">
              <Zap className="w-5 h-5 text-green-400 mx-auto mb-2" />
              <div className="text-green-400 text-sm font-bold">Defense</div>
              <div className="text-xs text-gray-400">3-8 months</div>
            </div>
            <div className="bg-black/30 border border-green-800 rounded-lg p-3 text-center">
              <Briefcase className="w-5 h-5 text-green-400 mx-auto mb-2" />
              <div className="text-green-400 text-sm font-bold">Education</div>
              <div className="text-xs text-gray-400">1-5 months</div>
            </div>
          </div>
        </div>

        {/* Key Metrics Bar */}
        <div className="grid grid-cols-4 gap-4 mt-8">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <Target className="w-6 h-6 text-purple-400 mb-2" />
            <div className="text-2xl">{totals.prospects}</div>
            <div className="text-sm text-gray-400">Total Prospects</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <DollarSign className="w-6 h-6 text-green-400 mb-2" />
            <div className="text-2xl">${(totals.pipeline / 1000000).toFixed(2)}M</div>
            <div className="text-sm text-gray-400">Total Pipeline</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <CheckCircle className="w-6 h-6 text-blue-400 mb-2" />
            <div className="text-2xl">{totals.expectedDeals}</div>
            <div className="text-sm text-gray-400">Expected Deals (6%)</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <TrendingUp className="w-6 h-6 text-yellow-400 mb-2" />
            <div className="text-2xl">${(totalB2BRevenue / 1000000).toFixed(2)}M</div>
            <div className="text-sm text-gray-400">Total B2B Revenue</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mt-8 border-b border-gray-800">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-6 py-3 transition-all ${
              activeTab === 'pipeline'
                ? 'border-b-2 border-purple-400 text-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Pipeline & Prospects
          </button>
          <button
            onClick={() => setActiveTab('revenue')}
            className={`px-6 py-3 transition-all ${
              activeTab === 'revenue'
                ? 'border-b-2 border-green-400 text-green-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Revenue Projections
          </button>
          <button
            onClick={() => setActiveTab('roi')}
            className={`px-6 py-3 transition-all ${
              activeTab === 'roi'
                ? 'border-b-2 border-blue-400 text-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Client ROI
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Pipeline Tab */}
        {activeTab === 'pipeline' && (
          <div className="space-y-8">
            {opportunities.map((category, idx) => {
              const CategoryIcon = category.icon;
              const categoryTotal = category.prospects.reduce((sum, p) => sum + p.value, 0);
              const categoryWeighted = category.prospects.reduce((sum, p) => sum + (p.value * closeRate), 0);
              
              return (
                <div key={idx} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl flex items-center gap-3">
                      <CategoryIcon className="w-6 h-6 text-purple-400" />
                      {category.category}
                    </h2>
                    <div className="text-right">
                      <div className="text-2xl text-purple-400">${(categoryWeighted / 1000).toFixed(0)}K</div>
                      <div className="text-xs text-gray-500">Weighted Revenue (6%)</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {category.prospects.map((prospect, i) => {
                      const weighted = prospect.value * closeRate;
                      return (
                        <div key={i} className="border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-all">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h3 className="text-lg mb-2">{prospect.org}</h3>
                              <div className="flex gap-4 text-sm text-gray-400">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {prospect.timeline}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Target className="w-4 h-4" />
                                  6% close rate
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl text-green-400">${(prospect.value / 1000).toFixed(0)}K</div>
                              <div className="text-xs text-gray-500">Pipeline Value</div>
                              <div className="text-sm text-purple-400 mt-1">${(weighted / 1000).toFixed(1)}K weighted</div>
                            </div>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="w-full bg-gray-800 rounded-full h-2 mt-3">
                            <div
                              className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                              style={{ width: '6%' }}
                            />
                          </div>
                          <div className="text-xs text-gray-500 mt-1">6% probability to close</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Pipeline Summary */}
            <div className="bg-gradient-to-r from-purple-900/30 to-green-900/30 border border-purple-800 rounded-lg p-6">
              <h3 className="text-xl mb-4">Pipeline Summary</h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-gray-400 mb-2">Total Pipeline Value</div>
                  <div className="text-3xl text-green-400">${(totals.pipeline / 1000000).toFixed(2)}M</div>
                  <div className="text-xs text-gray-500 mt-1">{totals.prospects} opportunities</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-2">Expected Closed Deals</div>
                  <div className="text-3xl text-blue-400">{totals.expectedDeals}</div>
                  <div className="text-xs text-gray-500 mt-1">Based on 6% close rate</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-2">Weighted Revenue</div>
                  <div className="text-3xl text-purple-400" style={{ textShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}>
                    ${(totals.weighted / 1000000).toFixed(2)}M
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Conservative forecast</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Revenue Tab */}
        {activeTab === 'revenue' && (
          <div className="space-y-8">
            {/* Revenue by Category */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl mb-6">Revenue by Category (6% Close Rate)</h2>
              <div className="space-y-4">
                {categoryRevenue.map((cat, i) => {
                  const CategoryIcon = cat.icon;
                  return (
                    <div key={i} className="border border-gray-800 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                          <CategoryIcon className="w-5 h-5 text-purple-400" />
                          <div>
                            <h3 className="text-lg">{cat.name}</h3>
                            <div className="text-sm text-gray-400">{cat.prospects} prospects</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl text-purple-400">${(cat.weighted / 1000).toFixed(0)}K</div>
                          <div className="text-xs text-gray-500">${(cat.pipeline / 1000).toFixed(0)}K pipeline</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-3">
                        <div
                          className="bg-purple-500 h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${(cat.weighted / totals.weighted) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {((cat.weighted / totals.weighted) * 100).toFixed(1)}% of total B2B revenue
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total Revenue Breakdown */}
            <div className="grid grid-cols-2 gap-8">
              {/* B2B White-Label */}
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl mb-6 flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-purple-400" />
                  White-Label Contracts
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between pb-3 border-b border-gray-800">
                    <span className="text-gray-400">Total Pipeline</span>
                    <span className="text-green-400">${(totals.pipeline / 1000000).toFixed(2)}M</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-800">
                    <span className="text-gray-400">Close Rate</span>
                    <span className="text-blue-400">6%</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-800">
                    <span className="text-gray-400">Expected Deals</span>
                    <span className="text-purple-400">{totals.expectedDeals} contracts</span>
                  </div>
                  <div className="flex justify-between pt-3">
                    <span className="text-lg">Weighted Revenue</span>
                    <span className="text-2xl text-purple-400">
                      ${(totals.weighted / 1000000).toFixed(2)}M
                    </span>
                  </div>
                </div>
              </div>

              {/* Enterprise Consulting */}
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl mb-6 flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-blue-400" />
                  Enterprise Consulting
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between pb-3 border-b border-gray-800">
                    <span className="text-gray-400">Hourly Rate</span>
                    <span className="text-green-400">${consultingHourlyRate}/hr</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-800">
                    <span className="text-gray-400">Hours/Month</span>
                    <span className="text-blue-400">{consultingHoursPerMonth} hrs</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-800">
                    <span className="text-gray-400">Monthly Revenue</span>
                    <span className="text-purple-400">${(consultingAnnual / 12 / 1000).toFixed(1)}K</span>
                  </div>
                  <div className="flex justify-between pt-3">
                    <span className="text-lg">Annual Revenue</span>
                    <span className="text-2xl text-blue-400">
                      ${(consultingAnnual / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Total B2B Revenue */}
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-800 rounded-lg p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl mb-2">Total B2B Revenue (Year 1)</h3>
                  <p className="text-gray-400">White-Label Contracts + Enterprise Consulting</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl text-purple-400" style={{ textShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}>
                    ${(totalB2BRevenue / 1000000).toFixed(2)}M
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    ${(totalB2BRevenue / 12 / 1000).toFixed(0)}K per month avg
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Timeline */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl mb-6">Expected Revenue Timeline</h2>
              <div className="space-y-3">
                {[
                  { quarter: 'Q1', deals: 0, revenue: consultingAnnual / 4, color: 'bg-blue-500' },
                  { quarter: 'Q2', deals: Math.round(totals.expectedDeals * 0.2), revenue: (totals.weighted * 0.2) + (consultingAnnual / 4), color: 'bg-green-500' },
                  { quarter: 'Q3', deals: Math.round(totals.expectedDeals * 0.4), revenue: (totals.weighted * 0.4) + (consultingAnnual / 4), color: 'bg-purple-500' },
                  { quarter: 'Q4', deals: Math.round(totals.expectedDeals * 0.4), revenue: (totals.weighted * 0.4) + (consultingAnnual / 4), color: 'bg-yellow-500' },
                ].map((q, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">{q.quarter} - {q.deals} deals expected</span>
                      <span className="text-gray-300">${(q.revenue / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3">
                      <div
                        className={`${q.color} h-3 rounded-full transition-all duration-1000`}
                        style={{ width: `${(q.revenue / totalB2BRevenue) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ROI Tab */}
        {activeTab === 'roi' && (
          <div className="space-y-8">
            {/* Client Value Proposition */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl mb-6 flex items-center gap-3">
                <Award className="w-6 h-6 text-green-400" />
                Client ROI Metrics
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="border border-gray-800 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-2">Veterans Successfully Placed</div>
                  <div className="text-3xl text-green-400">{roiMetrics.veteransPlaced.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 mt-1">From 100K app users</div>
                </div>
                <div className="border border-gray-800 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-2">Avg Salary Increase</div>
                  <div className="text-3xl text-blue-400">${(roiMetrics.avgSalaryIncrease / 1000).toFixed(0)}K</div>
                  <div className="text-xs text-gray-500 mt-1">Per veteran placed</div>
                </div>
                <div className="border border-gray-800 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-2">Total Economic Impact</div>
                  <div className="text-3xl text-purple-400">${(roiMetrics.totalEconomicImpact / 1000000).toFixed(1)}M</div>
                  <div className="text-xs text-gray-500 mt-1">Annual salary increases</div>
                </div>
                <div className="border border-gray-800 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-2">ROI Multiple</div>
                  <div className="text-3xl text-yellow-400">{roiMetrics.roiMultiple.toFixed(1)}x</div>
                  <div className="text-xs text-gray-500 mt-1">Economic impact vs contract cost</div>
                </div>
              </div>
            </div>

            {/* Pitch Deck Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-green-400" />
                  <h3 className="text-lg">User Engagement</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Users</span>
                    <span className="text-white">{consumerUsers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Paying Users</span>
                    <span className="text-green-400">{payingUsers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Completion Rate</span>
                    <span className="text-blue-400">{courseCompletion}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                  <h3 className="text-lg">Outcomes</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Job Placements</span>
                    <span className="text-white">{roiMetrics.veteransPlaced}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Raise</span>
                    <span className="text-green-400">${(roiMetrics.avgSalaryIncrease / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Success Rate</span>
                    <span className="text-blue-400">68%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-6 h-6 text-purple-400" />
                  <h3 className="text-lg">Contract Value</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Contract</span>
                    <span className="text-white">${(roiMetrics.avgContractValue / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Impact/Contract</span>
                    <span className="text-green-400">${(roiMetrics.totalEconomicImpact / totals.expectedDeals / 1000000).toFixed(2)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ROI</span>
                    <span className="text-purple-400">{roiMetrics.roiMultiple.toFixed(1)}x</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enterprise Pitch */}
            <div className="bg-gradient-to-r from-green-900/30 to-purple-900/30 border border-green-800 rounded-lg p-6">
              <h3 className="text-xl mb-4 flex items-center gap-3">
                <FileText className="w-6 h-6 text-green-400" />
                White-Label Value Proposition
              </h3>
              <div className="space-y-4 text-gray-300">
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <p className="text-lg mb-2">
                    <span className="text-green-400">"Our platform has empowered 100,000 veterans</span> to gain AI skills, 
                    with <span className="text-blue-400">87% course completion</span> and 
                    <span className="text-purple-400"> 850+ job placements</span> generating 
                    <span className="text-yellow-400"> ${(roiMetrics.totalEconomicImpact / 1000000).toFixed(1)}M in economic impact."</span>
                  </p>
                </div>
                
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <p className="text-lg mb-2">
                    "We can <span className="text-purple-400">white-label this proven platform</span> for your organization with:"
                  </p>
                  <ul className="space-y-2 mt-3 ml-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                      <span>Custom branding aligned with your organization's mission</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                      <span>Dedicated support and onboarding for your veteran members</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                      <span>Real-time analytics dashboard tracking measurable outcomes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                      <span>Proven <span className="text-yellow-400">{roiMetrics.roiMultiple.toFixed(1)}x ROI</span> based on economic impact vs. investment</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <p className="text-lg">
                    <span className="text-green-400">"Average contract: ${(roiMetrics.avgContractValue / 1000).toFixed(0)}K</span> | 
                    <span className="text-blue-400"> Average impact per contract: ${(roiMetrics.totalEconomicImpact / totals.expectedDeals / 1000000).toFixed(2)}M</span> | 
                    <span className="text-purple-400"> ROI: {roiMetrics.roiMultiple.toFixed(1)}x"</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Case Study Example */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl mb-4 flex items-center gap-3">
                <Award className="w-6 h-6 text-blue-400" />
                Sample Case Study: Fortune 500 Partnership
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm text-gray-400 mb-3">Investment</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">White-Label Contract</span>
                      <span className="text-white">$250K/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Implementation</span>
                      <span className="text-white">$25K one-time</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-700 pt-2 mt-2">
                      <span className="text-lg">Total Investment</span>
                      <span className="text-xl text-purple-400">$275K</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-3">Returns</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">85 Veterans Placed</span>
                      <span className="text-white">Annual Impact</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">$35K Avg Salary Increase</span>
                      <span className="text-white">Per Veteran</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-700 pt-2 mt-2">
                      <span className="text-lg">Total Impact</span>
                      <span className="text-xl text-green-400">$2.98M</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700 text-center">
                <div className="text-3xl text-yellow-400 mb-1" style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}>
                  10.8x ROI
                </div>
                <div className="text-sm text-gray-400">Economic impact vs. contract investment</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Summary */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800">
        <div className="grid grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-2">Total Pipeline</div>
            <div className="text-3xl text-green-400">${(totals.pipeline / 1000000).toFixed(2)}M</div>
            <div className="text-xs text-gray-500 mt-1">{totals.prospects} opportunities</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-2">Expected Deals</div>
            <div className="text-3xl text-blue-400">{totals.expectedDeals}</div>
            <div className="text-xs text-gray-500 mt-1">6% close rate</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-2">Weighted B2B Revenue</div>
            <div className="text-3xl text-purple-400">${(totals.weighted / 1000000).toFixed(2)}M</div>
            <div className="text-xs text-gray-500 mt-1">Conservative forecast</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-2">Total B2B Revenue</div>
            <div className="text-3xl text-yellow-400" style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}>
              ${(totalB2BRevenue / 1000000).toFixed(2)}M
            </div>
            <div className="text-xs text-gray-500 mt-1">Including consulting</div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-900 border border-gray-800 rounded-lg">
          <h3 className="text-lg mb-3 text-purple-400">🎯 Key Assumptions (6% Close Rate Model):</h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
            <div>• <span className="text-gray-400">Close rate:</span> 6% across all B2B opportunities</div>
            <div>• <span className="text-gray-400">Sales cycle:</span> 2-12 months depending on org type</div>
            <div>• <span className="text-gray-400">Total opportunities:</span> {totals.prospects} prospects in pipeline</div>
            <div>• <span className="text-gray-400">Expected wins:</span> {totals.expectedDeals} contracts (Year 1)</div>
            <div>• <span className="text-gray-400">Consumer proof:</span> 100K users, 4% IAP conversion, 87% completion</div>
            <div>• <span className="text-gray-400">Consulting rate:</span> $50/hr × 120 hrs/month = $300K/year</div>
          </div>
        </div>
      </div>
    </div>
  );
}