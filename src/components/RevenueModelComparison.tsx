import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, Building2, Users, Handshake, DollarSign, ArrowRight, CheckCircle, Info } from 'lucide-react';

export function RevenueModelComparison() {
  const [selectedYear, setSelectedYear] = React.useState(1);

  // Year-specific data configurations
  const yearData = {
    1: {
      label: 'Year 1 (2026) - Foundation Building',
      b2b: { low: 60000, high: 120000 },
      b2c: { low: 30940, high: 90000 },
      c2c: { low: 2260, high: 15000 }
    },
    2: {
      label: 'Year 2 (2027) - Growth & Optimization',
      b2b: { low: 180000, high: 280000 },
      b2c: { low: 140000, high: 350000 },
      c2c: { low: 30000, high: 60000 }
    },
    3: {
      label: 'Year 3 (2028) - Profitability Target',
      b2b: { low: 200000, high: 350000 },
      b2c: { low: 450000, high: 800000 },
      c2c: { low: 50000, high: 100000 }
    },
    5: {
      label: 'Year 5 (2030) - Mature Operations',
      b2b: { low: 320000, high: 800000 },
      b2c: { low: 627000, high: 1570000 },
      c2c: { low: 70000, high: 182000 }
    }
  };

  const currentYearData = yearData[selectedYear as keyof typeof yearData];

  // B2B Revenue Model
  const b2bModel = {
    name: 'B2B/Enterprise',
    color: 'purple',
    icon: Building2,
    description: 'White-label training platforms for organizations',
    streams: [
      {
        name: 'White-Label Licenses',
        description: '$20K entry point per organization',
        monthlyLow: Math.round(currentYearData.b2b.low * 0.4 / 12),
        monthlyHigh: Math.round(currentYearData.b2b.high * 0.5 / 12),
        annualLow: Math.round(currentYearData.b2b.low * 0.4),
        annualHigh: Math.round(currentYearData.b2b.high * 0.5),
        metrics: selectedYear === 1 ? '3 deals/year' : selectedYear === 2 ? '6-8 deals/year' : selectedYear === 3 ? '8-12 deals/year' : '15-20 deals/year'
      },
      {
        name: 'Enterprise Consulting',
        description: 'Custom training development',
        monthlyLow: Math.round(currentYearData.b2b.low * 0.4 / 12),
        monthlyHigh: Math.round(currentYearData.b2b.high * 0.35 / 12),
        annualLow: Math.round(currentYearData.b2b.low * 0.4),
        annualHigh: Math.round(currentYearData.b2b.high * 0.35),
        metrics: selectedYear === 1 ? '$50/hour × 100 hours/month' : selectedYear === 2 ? '$65/hour × 150 hours/month' : selectedYear === 3 ? '$75/hour × 175 hours/month' : '$100/hour × 250 hours/month'
      },
      {
        name: 'Premium Support & Customization',
        description: 'Ongoing support packages',
        monthlyLow: Math.round(currentYearData.b2b.low * 0.2 / 12),
        monthlyHigh: Math.round(currentYearData.b2b.high * 0.15 / 12),
        annualLow: Math.round(currentYearData.b2b.low * 0.2),
        annualHigh: Math.round(currentYearData.b2b.high * 0.15),
        metrics: selectedYear === 1 ? '2-3 clients' : selectedYear === 2 ? '4-5 clients' : selectedYear === 3 ? '6-8 clients' : '10-12 clients'
      }
    ]
  };

  // B2C Revenue Model
  const b2cModel = {
    name: 'B2C/Consumer',
    color: 'green',
    icon: Users,
    description: 'AI education app for veterans & job seekers',
    streams: [
      {
        name: 'In-App Purchases (IAP)',
        description: 'Career courses & certifications',
        monthlyLow: Math.round(currentYearData.b2c.low * 0.5 / 12),
        monthlyHigh: Math.round(currentYearData.b2c.high * 0.6 / 12),
        annualLow: Math.round(currentYearData.b2c.low * 0.5),
        annualHigh: Math.round(currentYearData.b2c.high * 0.6),
        metrics: selectedYear === 1 ? '1K users' : selectedYear === 2 ? '10K users' : selectedYear === 3 ? '25K users' : '100K users'
      },
      {
        name: 'Premium Subscriptions',
        description: '$19.99/month premium tier',
        monthlyLow: Math.round(currentYearData.b2c.low * 0.4 / 12),
        monthlyHigh: Math.round(currentYearData.b2c.high * 0.3 / 12),
        annualLow: Math.round(currentYearData.b2c.low * 0.4),
        annualHigh: Math.round(currentYearData.b2c.high * 0.3),
        metrics: selectedYear === 1 ? '180 subscribers' : selectedYear === 2 ? '800 subscribers' : selectedYear === 3 ? '1.5K subscribers' : '3K subscribers'
      },
      {
        name: 'AdMob Revenue',
        description: 'Mobile ad monetization',
        monthlyLow: Math.round(currentYearData.b2c.low * 0.1 / 12),
        monthlyHigh: Math.round(currentYearData.b2c.high * 0.1 / 12),
        annualLow: Math.round(currentYearData.b2c.low * 0.1),
        annualHigh: Math.round(currentYearData.b2c.high * 0.1),
        metrics: selectedYear === 1 ? '500 DAU' : selectedYear === 2 ? '7K DAU' : selectedYear === 3 ? '15K DAU' : '40K DAU'
      }
    ]
  };

  // C2C Revenue Model
  const c2cModel = {
    name: 'C2C/Community',
    color: 'blue',
    icon: Handshake,
    description: 'Creator economy & peer-to-peer services',
    streams: [
      {
        name: 'HeyGen Video Services',
        description: 'Individual avatar video creation',
        monthlyLow: Math.round(currentYearData.c2c.low * 0.4 / 12),
        monthlyHigh: Math.round(currentYearData.c2c.high * 0.5 / 12),
        annualLow: Math.round(currentYearData.c2c.low * 0.4),
        annualHigh: Math.round(currentYearData.c2c.high * 0.5),
        metrics: selectedYear === 1 ? '1 video/month' : selectedYear === 2 ? '1-2 videos/month' : selectedYear === 3 ? '2-3 videos/month' : '4-6 videos/month'
      },
      {
        name: 'Seasonal Campaigns',
        description: '"What Moves You?" promotional specials',
        monthlyLow: Math.round(currentYearData.c2c.low * 0.3 / 12),
        monthlyHigh: Math.round(currentYearData.c2c.high * 0.25 / 12),
        annualLow: Math.round(currentYearData.c2c.low * 0.3),
        annualHigh: Math.round(currentYearData.c2c.high * 0.25),
        metrics: selectedYear === 1 ? '25 videos/campaign' : selectedYear === 2 ? '50 videos/campaign' : selectedYear === 3 ? '75 videos/campaign' : '150 videos/campaign'
      },
      {
        name: 'Peer Coaching Marketplace',
        description: 'Veteran-to-veteran coaching',
        monthlyLow: Math.round(currentYearData.c2c.low * 0.3 / 12),
        monthlyHigh: Math.round(currentYearData.c2c.high * 0.25 / 12),
        annualLow: Math.round(currentYearData.c2c.low * 0.3),
        annualHigh: Math.round(currentYearData.c2c.high * 0.25),
        metrics: '15-20% platform fee'
      }
    ]
  };

  // Calculate totals
  const calculateTotals = (model: typeof b2bModel | typeof b2cModel | typeof c2cModel) => {
    const monthlyLow = model.streams.reduce((sum, stream) => sum + stream.monthlyLow, 0);
    const monthlyHigh = model.streams.reduce((sum, stream) => sum + stream.monthlyHigh, 0);
    const annualLow = model.streams.reduce((sum, stream) => sum + stream.annualLow, 0);
    const annualHigh = model.streams.reduce((sum, stream) => sum + stream.annualHigh, 0);
    return { monthlyLow, monthlyHigh, annualLow, annualHigh };
  };

  const b2bTotals = calculateTotals(b2bModel);
  const b2cTotals = calculateTotals(b2cModel);
  const c2cTotals = calculateTotals(c2cModel);

  const grandTotal = {
    monthlyLow: b2bTotals.monthlyLow + b2cTotals.monthlyLow + c2cTotals.monthlyLow,
    monthlyHigh: b2bTotals.monthlyHigh + b2cTotals.monthlyHigh + c2cTotals.monthlyHigh,
    annualLow: b2bTotals.annualLow + b2cTotals.annualLow + c2cTotals.annualLow,
    annualHigh: b2bTotals.annualHigh + b2cTotals.annualHigh + c2cTotals.annualHigh
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; glow: string }> = {
      purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', glow: 'shadow-purple-500/20' },
      green: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', glow: 'shadow-green-500/20' },
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', glow: 'shadow-blue-500/20' }
    };
    return colors[color];
  };

  const renderModelCard = (model: typeof b2bModel | typeof b2cModel | typeof c2cModel) => {
    const colors = getColorClasses(model.color);
    const totals = calculateTotals(model);
    const Icon = model.icon;

    return (
      <Card key={model.name} className={`border-2 ${colors.border} ${colors.bg}`}>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Icon className={`w-8 h-8 ${colors.text}`} />
            <CardTitle className="text-2xl">{model.name}</CardTitle>
          </div>
          <CardDescription className="text-base">{model.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Revenue Streams */}
          <div className="space-y-3">
            {model.streams.map((stream, idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{stream.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{stream.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Info className="w-3 h-3" />
                      <span>{stream.metrics}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <div>
                    <div className="text-xs text-muted-foreground">Monthly Range</div>
                    <div className="text-sm font-semibold">
                      ${stream.monthlyLow.toLocaleString()} - ${stream.monthlyHigh.toLocaleString()}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Annual Range</div>
                    <div className={`text-sm font-bold ${colors.text}`}>
                      ${stream.annualLow.toLocaleString()} - ${stream.annualHigh.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Model Total */}
          <div className={`border-2 ${colors.border} rounded-lg p-4 ${colors.bg}`}>
            <div className="text-sm text-muted-foreground mb-2">{model.name} Total</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted-foreground">Annual Low</div>
                <div className="text-xl font-bold">${(totals.annualLow / 1000).toFixed(0)}K</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Annual High</div>
                <div className={`text-xl font-bold ${colors.text}`}>
                  ${(totals.annualHigh / 1000).toFixed(0)}K
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
          <TrendingUp className="w-10 h-10 text-primary" />
          ORA Revenue Model Comparison
        </h1>
        <p className="text-muted-foreground text-lg">
          Dual-Revenue Strategy: B2B/Enterprise + B2C Consumer + C2C Community
        </p>
        
        {/* Year Selector */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <span className="text-sm text-muted-foreground">Projection Year:</span>
          <div className="flex gap-2">
            {[1, 2, 3, 5].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-2 rounded-full font-bold text-sm tracking-wider transition-all duration-300 ${
                  selectedYear === year
                    ? 'bg-gradient-to-r from-purple-600 to-green-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {year === 1 && 'Year 1 (2026)'}
                {year === 2 && 'Year 2 (2027)'}
                {year === 3 && 'Year 3 (2028)'}
                {year === 5 && 'Year 5 (2030)'}
              </button>
            ))}
          </div>
        </div>
        
        {/* Year Label - Shows current selection context */}
        <div className="mt-4 inline-block">
          <div className="bg-primary/10 border border-primary/30 rounded-full px-6 py-2">
            <span className="text-sm font-semibold text-primary">{currentYearData.label}</span>
          </div>
        </div>
      </div>

      {/* Quick Summary Table */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-6 h-6" />
            Revenue Stream Comparison Summary
          </CardTitle>
          <CardDescription>Annual revenue projections across all business models</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left py-3 px-4">Revenue Stream</th>
                  <th className="text-right py-3 px-4">Monthly Low</th>
                  <th className="text-right py-3 px-4">Monthly High</th>
                  <th className="text-right py-3 px-4">Annual Low</th>
                  <th className="text-right py-3 px-4">Annual High</th>
                  <th className="text-right py-3 px-4">% of Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-purple-500/5 hover:bg-purple-500/10">
                  <td className="py-3 px-4 font-semibold flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-purple-400" />
                    B2B/Enterprise
                  </td>
                  <td className="text-right py-3 px-4">${b2bTotals.monthlyLow.toLocaleString()}</td>
                  <td className="text-right py-3 px-4">${b2bTotals.monthlyHigh.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 font-semibold">${(b2bTotals.annualLow / 1000).toFixed(0)}K</td>
                  <td className="text-right py-3 px-4 font-bold text-purple-400">${(b2bTotals.annualHigh / 1000).toFixed(0)}K</td>
                  <td className="text-right py-3 px-4">{((b2bTotals.annualHigh / grandTotal.annualHigh) * 100).toFixed(0)}%</td>
                </tr>
                <tr className="border-b bg-green-500/5 hover:bg-green-500/10">
                  <td className="py-3 px-4 font-semibold flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-400" />
                    B2C/Consumer
                  </td>
                  <td className="text-right py-3 px-4">${b2cTotals.monthlyLow.toLocaleString()}</td>
                  <td className="text-right py-3 px-4">${b2cTotals.monthlyHigh.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 font-semibold">${(b2cTotals.annualLow / 1000).toFixed(0)}K</td>
                  <td className="text-right py-3 px-4 font-bold text-green-400">${(b2cTotals.annualHigh / 1000).toFixed(0)}K</td>
                  <td className="text-right py-3 px-4">{((b2cTotals.annualHigh / grandTotal.annualHigh) * 100).toFixed(0)}%</td>
                </tr>
                <tr className="border-b bg-blue-500/5 hover:bg-blue-500/10">
                  <td className="py-3 px-4 font-semibold flex items-center gap-2">
                    <Handshake className="w-4 h-4 text-blue-400" />
                    C2C/Community
                  </td>
                  <td className="text-right py-3 px-4">${c2cTotals.monthlyLow.toLocaleString()}</td>
                  <td className="text-right py-3 px-4">${c2cTotals.monthlyHigh.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 font-semibold">${(c2cTotals.annualLow / 1000).toFixed(0)}K</td>
                  <td className="text-right py-3 px-4 font-bold text-blue-400">${(c2cTotals.annualHigh / 1000).toFixed(0)}K</td>
                  <td className="text-right py-3 px-4">{((c2cTotals.annualHigh / grandTotal.annualHigh) * 100).toFixed(0)}%</td>
                </tr>
                <tr className="border-t-2 bg-primary/10 font-bold">
                  <td className="py-4 px-4 text-lg">TOTAL REVENUE</td>
                  <td className="text-right py-4 px-4">${grandTotal.monthlyLow.toLocaleString()}</td>
                  <td className="text-right py-4 px-4">${grandTotal.monthlyHigh.toLocaleString()}</td>
                  <td className="text-right py-4 px-4 text-lg">${(grandTotal.annualLow / 1000).toFixed(0)}K</td>
                  <td className="text-right py-4 px-4 text-xl text-primary">
                    ${(grandTotal.annualHigh / 1000000).toFixed(2)}M
                  </td>
                  <td className="text-right py-4 px-4">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Stream Sketch/Diagram */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Revenue Architecture Diagram - Year 1 (2026) - 12 Months Out</CardTitle>
          <CardDescription>Visual representation of ORA's multi-stream revenue model</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Flow Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* B2B Column */}
              <div className="space-y-3">
                <div className="bg-purple-500/10 border-2 border-purple-500/30 rounded-lg p-4 text-center">
                  <Building2 className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="font-bold text-lg">B2B/Enterprise</div>
                  <div className="text-2xl font-bold text-purple-400 mt-2">
                    ${(b2bTotals.annualHigh / 1000).toFixed(0)}K
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {((b2bTotals.annualHigh / grandTotal.annualHigh) * 100).toFixed(0)}% of total
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    <span>White-label licenses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    <span>Enterprise consulting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    <span>Premium support</span>
                  </div>
                </div>
              </div>

              {/* B2C Column */}
              <div className="space-y-3">
                <div className="bg-green-500/10 border-2 border-green-500/30 rounded-lg p-4 text-center">
                  <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="font-bold text-lg">B2C/Consumer</div>
                  <div className="text-2xl font-bold text-green-400 mt-2">
                    ${(b2cTotals.annualHigh / 1000000).toFixed(2)}M
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {((b2cTotals.annualHigh / grandTotal.annualHigh) * 100).toFixed(0)}% of total
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>In-app purchases</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Premium subscriptions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>AdMob revenue</span>
                  </div>
                </div>
              </div>

              {/* C2C Column */}
              <div className="space-y-3">
                <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-lg p-4 text-center">
                  <Handshake className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="font-bold text-lg">C2C/Community</div>
                  <div className="text-2xl font-bold text-blue-400 mt-2">
                    ${(c2cTotals.annualHigh / 1000).toFixed(0)}K
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {((c2cTotals.annualHigh / grandTotal.annualHigh) * 100).toFixed(0)}% of total
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                    <span>HeyGen video services</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                    <span>Seasonal campaigns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                    <span>Peer coaching</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scenario Cards - High and Low */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* High Scenario Card */}
              <div className="bg-white border-2 border-green-500/50 rounded-xl p-8 text-center shadow-2xl shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-300">
                <div className="inline-block bg-green-600/10 border border-green-500/50 rounded-full px-4 py-1 mb-4">
                  <span className="text-green-600 text-xs tracking-widest uppercase font-bold">High Scenario</span>
                </div>
                <div className="text-sm text-gray-600 mb-2 tracking-wider uppercase">Combined Annual Revenue</div>
                <div 
                  className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-600 to-purple-600 mb-4"
                >
                  ${(grandTotal.annualHigh / 1000000).toFixed(2)}M
                </div>
                <div className="text-gray-700 text-sm mb-6 leading-relaxed">
                  Diversified revenue across B2B, B2C, and C2C models
                </div>
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-green-500/30">
                  <div>
                    <div className="text-purple-600 font-bold text-lg">${(b2bTotals.annualHigh / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-gray-600">B2B</div>
                  </div>
                  <div>
                    <div className="text-green-600 font-bold text-lg">${(b2cTotals.annualHigh / 1000000).toFixed(2)}M</div>
                    <div className="text-xs text-gray-600">B2C</div>
                  </div>
                  <div>
                    <div className="text-blue-600 font-bold text-lg">${(c2cTotals.annualHigh / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-gray-600">C2C</div>
                  </div>
                </div>
              </div>

              {/* Low/Conservative Scenario Card */}
              <div className="bg-white border-2 border-gray-400/50 rounded-xl p-8 text-center shadow-2xl shadow-gray-400/20 hover:shadow-purple-500/30 transition-all duration-300">
                <div className="inline-block bg-gray-200/50 border border-gray-400/50 rounded-full px-4 py-1 mb-4">
                  <span className="text-gray-700 text-xs tracking-widest uppercase font-bold">Conservative / Low</span>
                </div>
                <div className="text-sm text-gray-600 mb-2 tracking-wider uppercase">Combined Annual Revenue</div>
                <div 
                  className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-700 to-purple-600 mb-4"
                >
                  ${(grandTotal.annualLow / 1000000).toFixed(2)}M
                </div>
                <div className="text-gray-700 text-sm mb-6 leading-relaxed">
                  Bootstrap approach with sustainable, lean growth
                </div>
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-400/30">
                  <div>
                    <div className="text-purple-600 font-bold text-lg">${(b2bTotals.annualLow / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-gray-600">B2B</div>
                  </div>
                  <div>
                    <div className="text-green-600 font-bold text-lg">${(b2cTotals.annualLow / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-gray-600">B2C</div>
                  </div>
                  <div>
                    <div className="text-blue-600 font-bold text-lg">${(c2cTotals.annualLow / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-gray-600">C2C</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Model Cards */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Detailed Revenue Breakdown</h2>
        <div className="grid gap-6">
          {renderModelCard(b2bModel)}
          {renderModelCard(b2cModel)}
          {renderModelCard(c2cModel)}
        </div>
      </div>

      {/* Key Insights */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Strategic Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-purple-400">B2B/Enterprise Strengths</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>High-value contracts ($20K+ entry point)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Predictable recurring revenue from support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Lower customer acquisition cost (targeted outreach)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Strongest margins on consulting (84% on bundles)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-green-400">B2C/Consumer Strengths</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Largest revenue potential at scale (100K+ users)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Multiple monetization channels (IAP, Ads, Subscriptions)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Free veterans access drives brand loyalty & impact</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Network effects increase value over time</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-blue-400">C2C/Community Strengths</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Low overhead with HeyGen automation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Seasonal campaigns create urgency & virality</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Peer marketplace builds community engagement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Testing ground for B2B product features</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-primary">Revenue Diversification</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Risk mitigation across 3 independent revenue streams</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>B2B provides stability while B2C scales</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>C2C enables market validation & rapid iteration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Total addressable market: $1.97M annually (high scenario)</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}