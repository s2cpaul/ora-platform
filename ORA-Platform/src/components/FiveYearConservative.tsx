import React, { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, DollarSign, Users, Target } from 'lucide-react';

export function FiveYearConservative() {
  const [expandedYear, setExpandedYear] = useState<number | null>(null);

  const toggleYear = (year: number) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-green-600 text-white px-6 py-2 rounded-full text-sm tracking-widest uppercase shadow-lg">
              Conservative Bootstrap Path
            </div>
          </div>
          <h1 
            className="text-5xl md:text-7xl font-black mb-6 tracking-[0.15em] bg-gradient-to-r from-purple-400 via-green-400 to-purple-400 bg-clip-text text-transparent"
            style={{
              textShadow: '0 0 40px rgba(168, 85, 247, 0.3)',
            }}
          >
            ORA 5-YEAR PROJECTION
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 tracking-[0.1em] mb-4">
            SUSTAINABLE GROWTH • LEAN OPERATIONS • VETERAN-FOCUSED
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Building a profitable, mission-driven business without VC funding
          </p>
        </div>

        {/* Executive Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/40 border border-purple-500/30 rounded-xl p-6 shadow-xl shadow-purple-500/20">
            <DollarSign className="w-8 h-8 text-purple-400 mb-3" />
            <div className="text-3xl font-black text-white mb-2">$2.4M</div>
            <div className="text-sm text-purple-300 tracking-wider uppercase">Total 5-Year Revenue</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-900/40 to-green-950/40 border border-green-500/30 rounded-xl p-6 shadow-xl shadow-green-500/20">
            <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
            <div className="text-3xl font-black text-white mb-2">45%</div>
            <div className="text-sm text-green-300 tracking-wider uppercase">Avg Annual Growth</div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/40 border border-blue-500/30 rounded-xl p-6 shadow-xl shadow-blue-500/20">
            <Users className="w-8 h-8 text-blue-400 mb-3" />
            <div className="text-3xl font-black text-white mb-2">12</div>
            <div className="text-sm text-blue-300 tracking-wider uppercase">Team Size by Year 5</div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-950/40 border border-yellow-500/30 rounded-xl p-6 shadow-xl shadow-yellow-500/20">
            <Target className="w-8 h-8 text-yellow-400 mb-3" />
            <div className="text-3xl font-black text-white mb-2">Year 3</div>
            <div className="text-sm text-yellow-300 tracking-wider uppercase">Profitability Target</div>
          </div>
        </div>

        {/* 5-Year Annual Overview Table */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8 mb-12 backdrop-blur-sm shadow-2xl">
          <h2 className="text-3xl font-black mb-8 tracking-[0.15em] text-center">
            📊 ANNUAL REVENUE SUMMARY
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-purple-500/50">
                  <th className="py-4 px-4 text-gray-400 tracking-wider uppercase text-sm">Year</th>
                  <th className="py-4 px-4 text-gray-400 tracking-wider uppercase text-sm text-right">B2B Revenue</th>
                  <th className="py-4 px-4 text-gray-400 tracking-wider uppercase text-sm text-right">B2C Revenue</th>
                  <th className="py-4 px-4 text-gray-400 tracking-wider uppercase text-sm text-right">C2C + Donations</th>
                  <th className="py-4 px-4 text-gray-400 tracking-wider uppercase text-sm text-right">Total Revenue</th>
                  <th className="py-4 px-4 text-gray-400 tracking-wider uppercase text-sm text-right">Growth</th>
                </tr>
              </thead>
              <tbody>
                {/* Year 1 */}
                <tr className="border-b border-gray-700 hover:bg-purple-900/20 transition-colors cursor-pointer" onClick={() => toggleYear(1)}>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">Year 1 (2025)</span>
                      {expandedYear === 1 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                    <div className="text-sm text-gray-500">Foundation Building</div>
                  </td>
                  <td className="py-4 px-4 text-right text-purple-400">$60,000</td>
                  <td className="py-4 px-4 text-right text-green-400">$30,940</td>
                  <td className="py-4 px-4 text-right text-blue-400">$2,260</td>
                  <td className="py-4 px-4 text-right font-black text-xl">$93,200</td>
                  <td className="py-4 px-4 text-right text-gray-500">—</td>
                </tr>
                
                {expandedYear === 1 && (
                  <tr className="bg-gray-800/50">
                    <td colSpan={6} className="py-6 px-8">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-bold text-purple-400 mb-3 tracking-wider">B2B METRICS</h4>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li>• 3 white-label clients @ $20K</li>
                            <li>• 6-9 month sales cycle</li>
                            <li>• 15% close rate</li>
                            <li>• Focus: Agency AI solutions</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-green-400 mb-3 tracking-wider">B2C METRICS</h4>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li>• 180 paid subscribers (Dec)</li>
                            <li>• $19.99/month average</li>
                            <li>• 15% monthly churn</li>
                            <li>• 1,000 DAU by year-end</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-blue-400 mb-3 tracking-wider">OPERATIONS</h4>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li>• Team: 2-3 people</li>
                            <li>• Marketing: $15K budget</li>
                            <li>• Bootstrap mode</li>
                            <li>• Proving product-market fit</li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Year 2 */}
                <tr className="border-b border-gray-700 hover:bg-purple-900/20 transition-colors cursor-pointer" onClick={() => toggleYear(2)}>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">Year 2 (2026)</span>
                      {expandedYear === 2 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                    <div className="text-sm text-gray-500">Growth & Optimization</div>
                  </td>
                  <td className="py-4 px-4 text-right text-purple-400">$180,000</td>
                  <td className="py-4 px-4 text-right text-green-400">$140,000</td>
                  <td className="py-4 px-4 text-right text-blue-400">$30,000</td>
                  <td className="py-4 px-4 text-right font-black text-xl">$350,000</td>
                  <td className="py-4 px-4 text-right text-green-400 font-bold">+275%</td>
                </tr>
                
                {expandedYear === 2 && (
                  <tr className="bg-gray-800/50">
                    <td colSpan={6} className="py-6 px-8">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-bold text-purple-400 mb-3 tracking-wider">B2B METRICS</h4>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li>• 9 white-label clients total</li>
                            <li>• $20K average deal size</li>
                            <li>• Referral engine kicking in</li>
                            <li>• 3-4 month sales cycle</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-green-400 mb-3 tracking-wider">B2C METRICS</h4>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li>• 650 avg paid subscribers</li>
                            <li>• 12% monthly churn (improved)</li>
                            <li>• 3,500 DAU</li>
                            <li>• In-app purchases: $20K</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-blue-400 mb-3 tracking-wider">OPERATIONS</h4>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li>• Team: 5-6 people</li>
                            <li>• Hire: Sales rep + Marketer</li>
                            <li>• Marketing: $50K budget</li>
                            <li>• Still reinvesting all profit</li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Year 3 */}
                <tr className="border-b border-gray-700 hover:bg-purple-900/20 transition-colors cursor-pointer" onClick={() => toggleYear(3)}>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">Year 3 (2027)</span>
                      {expandedYear === 3 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                    <div className="text-sm text-gray-500">Scale & Profitability</div>
                  </td>
                  <td className="py-4 px-4 text-right text-purple-400">$420,000</td>
                  <td className="py-4 px-4 text-right text-green-400">$385,000</td>
                  <td className="py-4 px-4 text-right text-blue-400">$95,000</td>
                  <td className="py-4 px-4 text-right font-black text-xl">$900,000</td>
                  <td className="py-4 px-4 text-right text-green-400 font-bold">+157%</td>
                </tr>
                
                {expandedYear === 3 && (
                  <tr className="bg-gray-800/50">
                    <td colSpan={6} className="py-6 px-8">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-bold text-purple-400 mb-3 tracking-wider">B2B METRICS</h4>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li>• 21 total clients</li>
                            <li>• Mix: $20K and $30K deals</li>
                            <li>• 80% renewal rate</li>
                            <li>• Add enterprise tier</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-green-400 mb-3 tracking-wider">B2C METRICS</h4>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li>• 1,800 avg paid subscribers</li>
                            <li>• 10% monthly churn</li>
                            <li>• 8,000 DAU</li>
                            <li>• Premium features driving IAP</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-blue-400 mb-3 tracking-wider">OPERATIONS</h4>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li>• Team: 8-9 people</li>
                            <li>• 🎯 PROFITABLE by Q4</li>
                            <li>• Marketing: $120K</li>
                            <li>• C2C marketplace launch</li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Year 4 */}
                <tr className="border-b border-gray-700 hover:bg-purple-900/20 transition-colors cursor-pointer" onClick={() => toggleYear(4)}>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">Year 4 (2028)</span>
                      {expandedYear === 4 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                    <div className="text-sm text-gray-500">Market Leadership</div>
                  </td>
                  <td className="py-4 px-4 text-right text-purple-400">$630,000</td>
                  <td className="py-4 px-4 text-right text-green-400">$520,000</td>
                  <td className="py-4 px-4 text-right text-blue-400">$150,000</td>
                  <td className="py-4 px-4 text-right font-black text-xl text-yellow-400">$1.30 Mil</td>
                  <td className="py-4 px-4 text-right text-green-400 font-bold">+44%</td>
                </tr>
                
                {expandedYear === 4 && (
                  <tr className="bg-gray-800/50">
                    <td colSpan={6} className="py-6 px-8">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-bold text-purple-400 mb-3 tracking-wider">B2B METRICS</h4>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li>• 31 total clients</li>
                            <li>• 5 enterprise deals @ $40K+</li>
                            <li>• 85% renewal rate</li>
                            <li>• Industry case studies</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-green-400 mb-3 tracking-wider">B2C METRICS</h4>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li>• 2,400 avg paid subscribers</li>
                            <li>• 8% monthly churn</li>
                            <li>• 12,000 DAU</li>
                            <li>• Annual plans growing</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-blue-400 mb-3 tracking-wider">OPERATIONS</h4>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li>• Team: 10-11 people</li>
                            <li>• 💰 30% profit margin</li>
                            <li>• Marketing: $180K</li>
                            <li>• C2C GMV: $1M+</li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Year 5 */}
                <tr className="border-b-2 border-purple-500/50 hover:bg-purple-900/20 transition-colors cursor-pointer" onClick={() => toggleYear(5)}>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">Year 5 (2029)</span>
                      {expandedYear === 5 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                    <div className="text-sm text-gray-500">Mature & Sustainable</div>
                  </td>
                  <td className="py-4 px-4 text-right text-purple-400">$800,000</td>
                  <td className="py-4 px-4 text-right text-green-400">$650,000</td>
                  <td className="py-4 px-4 text-right text-blue-400">$210,000</td>
                  <td className="py-4 px-4 text-right font-black text-2xl text-green-400">$1.66 Mil</td>
                  <td className="py-4 px-4 text-right text-green-400 font-bold">+28%</td>
                </tr>
                
                {expandedYear === 5 && (
                  <tr className="bg-gray-800/50">
                    <td colSpan={6} className="py-6 px-8">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-bold text-purple-400 mb-3 tracking-wider">B2B METRICS</h4>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li>• 40 total clients</li>
                            <li>• 10 enterprise @ $40-60K</li>
                            <li>• 90% renewal rate</li>
                            <li>• Market leader in niche</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-green-400 mb-3 tracking-wider">B2C METRICS</h4>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li>• 3,000 avg paid subscribers</li>
                            <li>• 7% monthly churn</li>
                            <li>• 15,000 DAU</li>
                            <li>• Strong brand loyalty</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-blue-400 mb-3 tracking-wider">OPERATIONS</h4>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li>• Team: 12-14 people</li>
                            <li>• 💰 35-40% profit margin</li>
                            <li>• Marketing: $200K</li>
                            <li>• Consider Series A or exit</li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Total Row */}
                <tr className="bg-gradient-to-r from-purple-900/50 to-green-900/50">
                  <td className="py-6 px-4 font-black text-xl tracking-wider">5-YEAR TOTAL</td>
                  <td className="py-6 px-4 text-right font-black text-purple-300">$2.09 Mil</td>
                  <td className="py-6 px-4 text-right font-black text-green-300">$1.73 Mil</td>
                  <td className="py-6 px-4 text-right font-black text-blue-300">$487K</td>
                  <td className="py-6 px-4 text-right font-black text-3xl text-white">$4.30 Mil</td>
                  <td className="py-6 px-4 text-right text-gray-400">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue Mix Chart */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Year 1 vs Year 5 */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-black mb-6 tracking-wider text-center">YEAR 1 REVENUE MIX</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-purple-400">B2B</span>
                  <span className="text-white font-bold">64% ($60K)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div className="bg-gradient-to-r from-purple-600 to-purple-400 h-3 rounded-full" style={{ width: '64%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-green-400">B2C</span>
                  <span className="text-white font-bold">33% ($31K)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-600 to-green-400 h-3 rounded-full" style={{ width: '33%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-blue-400">Other</span>
                  <span className="text-white font-bold">3% ($2.3K)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-3 rounded-full" style={{ width: '3%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-black mb-6 tracking-wider text-center">YEAR 5 REVENUE MIX</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-purple-400">B2B</span>
                  <span className="text-white font-bold">48% ($800K)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div className="bg-gradient-to-r from-purple-600 to-purple-400 h-3 rounded-full" style={{ width: '48%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-green-400">B2C</span>
                  <span className="text-white font-bold">39% ($650K)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-600 to-green-400 h-3 rounded-full" style={{ width: '39%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-blue-400">C2C + Donations</span>
                  <span className="text-white font-bold">13% ($210K)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-3 rounded-full" style={{ width: '13%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Milestones */}
        <div className="bg-gradient-to-br from-purple-900/20 to-green-900/20 border border-purple-500/30 rounded-2xl p-8 mb-12 backdrop-blur-sm shadow-2xl">
          <h2 className="text-3xl font-black mb-8 tracking-[0.15em] text-center">🎯 KEY MILESTONES</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20">
              <div className="text-purple-400 font-black text-4xl mb-2">Q4 2027</div>
              <div className="text-white font-bold text-lg mb-2">Break Even</div>
              <div className="text-gray-400 text-sm">First profitable quarter at $900K annual run rate</div>
            </div>
            
            <div className="bg-black/40 rounded-xl p-6 border border-green-500/20">
              <div className="text-green-400 font-black text-4xl mb-2">2028</div>
              <div className="text-white font-bold text-lg mb-2">$1M+ Revenue</div>
              <div className="text-gray-400 text-sm">Cross million-dollar threshold with 30% margins</div>
            </div>
            
            <div className="bg-black/40 rounded-xl p-6 border border-blue-500/20">
              <div className="text-blue-400 font-black text-4xl mb-2">2029</div>
              <div className="text-white font-bold text-lg mb-2">Market Leader</div>
              <div className="text-gray-400 text-sm">Sustainable $1.66M business serving 40+ B2B clients</div>
            </div>
          </div>
        </div>

        {/* Cash Flow & Team Growth */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Cash Flow */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-2xl font-black mb-6 tracking-wider">💰 CASH FLOW PROJECTION</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">Year 1 (2025)</span>
                <span className="text-red-400 font-bold">-$150K (burn)</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">Year 2 (2026)</span>
                <span className="text-red-400 font-bold">-$80K (burn)</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">Year 3 (2027)</span>
                <span className="text-green-400 font-bold">+$50K profit</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">Year 4 (2028)</span>
                <span className="text-green-400 font-bold">+$390K profit</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-400">Year 5 (2029)</span>
                <span className="text-green-400 font-bold">+$600K profit</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t-2 border-purple-500/50">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">5-Year Net Profit</span>
                <span className="text-green-400 font-black text-2xl">+$810K</span>
              </div>
            </div>
          </div>

          {/* Team Growth */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-2xl font-black mb-6 tracking-wider">👥 TEAM GROWTH</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">Year 1</span>
                <span className="text-white font-bold">2-3 people</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">Year 2</span>
                <span className="text-white font-bold">5-6 people</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">Year 3</span>
                <span className="text-white font-bold">8-9 people</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">Year 4</span>
                <span className="text-white font-bold">10-11 people</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-400">Year 5</span>
                <span className="text-white font-bold">12-14 people</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t-2 border-purple-500/50">
              <div className="text-gray-400 text-sm">
                Key Hires: Sales (2), Marketing (2), Engineering (4), Support (2), Operations (2)
              </div>
            </div>
          </div>
        </div>

        {/* Capital Requirements */}
        <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-2xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-3xl font-black mb-6 tracking-[0.15em] text-center text-red-300">
            💵 CAPITAL REQUIREMENTS
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Initial Funding Needed</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>Runway (18 months)</span>
                  <span className="text-white font-bold">$250K</span>
                </div>
                <div className="flex justify-between">
                  <span>Product Development</span>
                  <span className="text-white font-bold">$50K</span>
                </div>
                <div className="flex justify-between">
                  <span>Marketing & Sales</span>
                  <span className="text-white font-bold">$80K</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-red-500/30">
                  <span className="font-bold text-lg">TOTAL NEEDED</span>
                  <span className="text-red-300 font-black text-2xl">$380K</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Funding Options</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span><strong className="text-white">Bootstrap:</strong> Start part-time, use savings, grow slowly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span><strong className="text-white">Friends & Family:</strong> $50-100K to get started</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span><strong className="text-white">Angel Round:</strong> $250-500K at reasonable terms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span><strong className="text-white">Revenue Financing:</strong> Use Year 2+ cash flow for growth</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Risk & Reality Check */}
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-3xl font-black mb-6 tracking-[0.15em] text-center text-yellow-300">
            ⚠️ REALITY CHECK
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-red-400">🚨</span> Critical Risks
              </h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li>• <strong>B2B Sales Cycle:</strong> Could take 12+ months to close first clients</li>
                <li>• <strong>Cash Flow:</strong> Need $380K runway or grow VERY slowly</li>
                <li>• <strong>Market Competition:</strong> Larger players entering AI education space</li>
                <li>• <strong>Founder Time:</strong> Requires full-time commitment by Month 6</li>
                <li>• <strong>Churn:</strong> If B2C churn exceeds 15%, growth stalls</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-green-400">✅</span> Success Factors
              </h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li>• <strong>Product-Market Fit:</strong> Veterans desperately need AI education</li>
                <li>• <strong>Mission-Driven:</strong> Cause attracts talent and customers</li>
                <li>• <strong>Dual Revenue:</strong> B2B funds growth, B2C scales</li>
                <li>• <strong>Bootstrap-Friendly:</strong> Can start lean and grow organically</li>
                <li>• <strong>Network Effects:</strong> Veteran community spreads word quickly</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-black/40 rounded-xl border border-yellow-500/20">
            <p className="text-yellow-200 text-center text-lg">
              <strong>Bottom Line:</strong> This is achievable with hustle, discipline, and either $380K in funding OR willingness to grow slowly over 2-3 years while keeping day jobs.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
