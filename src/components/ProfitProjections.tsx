import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { TrendingUp, DollarSign, Package, Calendar, Sparkles } from 'lucide-react';
import { IncomeProjection6Month } from './IncomeProjection6Month';
import { SocialMediaStrategy } from './SocialMediaStrategy';
import VeteransIAPRevenue from './VeteransIAPRevenue';
import B2BWhiteLabelDashboard from './B2BWhiteLabelDashboard';
import { RevenueModelComparison } from './RevenueModelComparison';

interface PackageData {
  name: string;
  price: number;
  videoMinutes: number;
  avatarSetup: boolean;
  laborHours: number;
  hegyCost: number;
  laborCost: number;
  avatarCost: number;
  totalCost: number;
  profit: number;
  margin: number;
}

export function ProfitProjections() {
  const [selectedScenario, setSelectedScenario] = useState<'conservative' | 'moderate' | 'optimistic'>('conservative');
  const [showSixMonth, setShowSixMonth] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [showVeterans, setShowVeterans] = useState(false);
  const [showB2B, setShowB2B] = useState(false);
  const [showRevenueComparison, setShowRevenueComparison] = useState(false);

  if (showRevenueComparison) {
    return (
      <div>
        <div className="p-6 max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => setShowRevenueComparison(false)}
            className="mb-4"
          >
            ← Back to Projections
          </Button>
        </div>
        <RevenueModelComparison />
      </div>
    );
  }

  if (showSixMonth) {
    return (
      <div>
        <div className="p-6 max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => setShowSixMonth(false)}
            className="mb-4"
          >
            ← Back to Projections
          </Button>
        </div>
        <IncomeProjection6Month />
      </div>
    );
  }

  if (showSocial) {
    return (
      <div>
        <div className="p-6 max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => setShowSocial(false)}
            className="mb-4"
          >
            ← Back to Projections
          </Button>
        </div>
        <SocialMediaStrategy />
      </div>
    );
  }

  if (showVeterans) {
    return (
      <div>
        <div className="p-6 max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => setShowVeterans(false)}
            className="mb-4"
          >
            ← Back to Projections
          </Button>
        </div>
        <VeteransIAPRevenue />
      </div>
    );
  }

  if (showB2B) {
    return (
      <div>
        <div className="p-6 max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => setShowB2B(false)}
            className="mb-4"
          >
            ← Back to Projections
          </Button>
        </div>
        <B2BWhiteLabelDashboard />
      </div>
    );
  }

  const packages: PackageData[] = [
    {
      name: "What Moves You?",
      price: 24,
      videoMinutes: 0.5, // 30-second fun video
      avatarSetup: false,
      laborHours: 0.33, // 20 minutes setup time
      hegyCost: 0.5 * 1.30,
      laborCost: 0.33 * 50,
      avatarCost: 0,
      totalCost: 0,
      profit: 0,
      margin: 0
    },
    {
      name: "Video Bundle",
      price: 1999,
      videoMinutes: 20, // 6 training videos + 1 promotional short
      avatarSetup: true,
      laborHours: 5, // Efficient workflow for bundle
      hegyCost: 20 * 1.30,
      laborCost: 5 * 50,
      avatarCost: 50,
      totalCost: 0,
      profit: 0,
      margin: 0
    }
  ];

  // Calculate totals for each package
  packages.forEach(pkg => {
    pkg.totalCost = pkg.hegyCost + pkg.laborCost + pkg.avatarCost;
    pkg.profit = pkg.price - pkg.totalCost;
    pkg.margin = (pkg.profit / pkg.price) * 100;
  });

  // Move Me seasonal projections (Dec 17 - Mar 17 = 3 months)
  // 100 30-minute avatar videos per month
  const seasonalProjections = {
    conservative: { perMonth: 90, monthsTotal: 3, total: 270 }, // 90/month × 3 months
    moderate: { perMonth: 100, monthsTotal: 3, total: 300 }, // 100/month × 3 months
    optimistic: { perMonth: 110, monthsTotal: 3, total: 330 } // 110/month × 3 months
  };

  const entertainMePkg = packages[0];
  const selectedProj = seasonalProjections[selectedScenario];
  const seasonalRevenue = selectedProj.total * entertainMePkg.price;
  const seasonalProfit = selectedProj.total * entertainMePkg.profit;
  const seasonalCosts = selectedProj.total * entertainMePkg.totalCost;

  // HeyGen subscription cost analysis
  const monthlyHeyGenCost = 39;
  const totalVideoMinutes = selectedProj.total * entertainMePkg.videoMinutes;
  const hegyCyclesNeeded = Math.ceil(totalVideoMinutes / 30);
  const totalHeyGenCost = hegyCyclesNeeded * monthlyHeyGenCost;

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
          <TrendingUp className="w-10 h-10 text-primary" />
          Profit Projections
        </h1>
        <p className="text-muted-foreground">Financial analysis based on $50/hour labor rate and HeyGen Basic Plan ($39/month, $1.30/minute)</p>
      </div>

      {/* Package Profit Breakdown */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Package Profit Margins
          </CardTitle>
          <CardDescription>Cost breakdown and profit analysis per package</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Package</th>
                  <th className="text-right py-3 px-2">Price</th>
                  <th className="text-right py-3 px-2">Video Min</th>
                  <th className="text-right py-3 px-2">HeyGen Cost</th>
                  <th className="text-right py-3 px-2">Labor</th>
                  <th className="text-right py-3 px-2">Avatar Setup</th>
                  <th className="text-right py-3 px-2">Total Cost</th>
                  <th className="text-right py-3 px-2 font-bold">Profit</th>
                  <th className="text-right py-3 px-2">Margin</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-2 font-medium">{pkg.name}</td>
                    <td className="text-right py-3 px-2">${pkg.price}</td>
                    <td className="text-right py-3 px-2">{pkg.videoMinutes}</td>
                    <td className="text-right py-3 px-2 text-red-500">${pkg.hegyCost.toFixed(2)}</td>
                    <td className="text-right py-3 px-2 text-red-500">${pkg.laborCost}</td>
                    <td className="text-right py-3 px-2 text-red-500">${pkg.avatarCost.toFixed(2)}</td>
                    <td className="text-right py-3 px-2 font-medium text-red-500">${pkg.totalCost.toFixed(2)}</td>
                    <td className="text-right py-3 px-2 font-bold text-green-600">${pkg.profit.toFixed(2)}</td>
                    <td className="text-right py-3 px-2">
                      <span className={`px-2 py-1 rounded ${
                        pkg.margin >= 50 ? 'bg-green-100 text-green-700' :
                        pkg.margin >= 40 ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {pkg.margin.toFixed(0)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-primary/5 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Key Insights
            </h4>
            <ul className="space-y-1 text-sm">
              <li>• <strong>Best Margin:</strong> Video Bundle (84%) at $1,999 - Premium package with exceptional profitability</li>
              <li>• <strong>Best Revenue:</strong> Video Bundle ($1,999) - 6 training videos + 1 promotional short</li>
              <li>• <strong>Promotion Special:</strong> What Moves You? ($24) at 29% margin - Perfect for long distance messages & micro-learning</li>
              <li>• <strong>HeyGen Efficiency:</strong> $39/month plan provides 30 minutes at $1.30/minute</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Campaign Projections */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            "What Moves You?" Seasonal Campaign
          </CardTitle>
          <CardDescription className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              🎁 Promotional Campaign Special - Raising AI Awareness & Making the World a Better Place!
            </div>
            <div>Dec 17 - Mar 17 • First 100 Each Month • 30-second fun videos</div>
            <div className="text-xs">Perfect for long distance messages, motivational messages & micro-learning!</div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Scenario Selector */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={selectedScenario === 'conservative' ? 'default' : 'outline'}
              onClick={() => setSelectedScenario('conservative')}
              className="flex-1"
            >
              Conservative
              <span className="ml-2 text-xs opacity-70">90/mo</span>
            </Button>
            <Button
              variant={selectedScenario === 'moderate' ? 'default' : 'outline'}
              onClick={() => setSelectedScenario('moderate')}
              className="flex-1"
            >
              Moderate
              <span className="ml-2 text-xs opacity-70">100/mo</span>
            </Button>
            <Button
              variant={selectedScenario === 'optimistic' ? 'default' : 'outline'}
              onClick={() => setSelectedScenario('optimistic')}
              className="flex-1"
            >
              Optimistic
              <span className="ml-2 text-xs opacity-70">110/mo</span>
            </Button>
          </div>

          {/* Projection Results */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-card">
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-1">Total Sales</div>
                <div className="text-3xl font-bold">{selectedProj.total}</div>
                <div className="text-xs text-muted-foreground mt-1">{selectedProj.perMonth}/month × 3.5 months</div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-1">Total Revenue</div>
                <div className="text-3xl font-bold text-blue-600">${seasonalRevenue.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">@${entertainMePkg.price} per sale</div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-1">Total Costs</div>
                <div className="text-3xl font-bold text-red-600">${seasonalCosts.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">${entertainMePkg.totalCost.toFixed(2)} per unit</div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <div className="text-sm text-green-700 mb-1">Net Profit</div>
                <div className="text-3xl font-bold text-green-600">${seasonalProfit.toLocaleString()}</div>
                <div className="text-xs text-green-700 mt-1">{entertainMePkg.margin.toFixed(0)}% margin</div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Cost Breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-semibold mb-3">Cost Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>HeyGen Rendering ({totalVideoMinutes} min)</span>
                  <span className="font-medium">${(selectedProj.total * entertainMePkg.hegyCost).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Labor ({selectedProj.total * entertainMePkg.laborHours} hours @ $50/hr)</span>
                  <span className="font-medium">${(selectedProj.total * entertainMePkg.laborCost).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avatar Setup</span>
                  <span className="font-medium">$0</span>
                </div>
                <div className="flex justify-between pt-2 border-t font-bold">
                  <span>Total Operating Cost</span>
                  <span>${seasonalCosts.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-semibold mb-3">HeyGen Subscription Analysis</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Video Minutes</span>
                  <span className="font-medium">{totalVideoMinutes} min</span>
                </div>
                <div className="flex justify-between">
                  <span>HeyGen Cycles Needed</span>
                  <span className="font-medium">{hegyCyclesNeeded} × $39</span>
                </div>
                <div className="flex justify-between">
                  <span>HeyGen Subscription Cost</span>
                  <span className="font-medium">${totalHeyGenCost}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-muted-foreground">Effective per-minute rate</span>
                  <span className="text-muted-foreground">${(totalHeyGenCost / totalVideoMinutes).toFixed(2)}/min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Strategic Notes */}
          <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <h4 className="font-semibold mb-2">Strategic Notes</h4>
            <ul className="space-y-1 text-sm">
              <li>• <strong>Comfortable Capacity:</strong> {selectedProj.perMonth} videos/month = {selectedProj.total} total over 3 months (Dec 17 - Mar 17)</li>
              <li>• <strong>Time Commitment:</strong> ~{Math.round(selectedProj.perMonth * 0.33 / 4)} hours/week at 20 min per video</li>
              <li>• <strong>No Avatar Setup:</strong> Uses existing avatars, maximizing efficiency and speed</li>
              <li>• <strong>Templates Key:</strong> Pre-made templates + quick customization = consistent 20-min turnaround</li>
              <li>• <strong>Promotion Special:</strong> Holiday gifting period ideal for sending long distance gifts & personal messages</li>
              <li>• <strong>Upsell Opportunity:</strong> Add-ons can increase AOV by $50-$100 per sale</li>
              <li> <strong>HeyGen Optimization:</strong> {selectedScenario === 'conservative' ? 'Low volume = better margins' : selectedScenario === 'moderate' ? 'Balanced usage = stable costs' : 'High volume may benefit from Advanced Plan ($99/mo for API)'}</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Annual Projections Summary */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Full Year Revenue Scenarios</CardTitle>
          <CardDescription>Mixed package sales with Move Me seasonal campaign</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {(['conservative', 'moderate', 'optimistic'] as const).map((scenario) => {
              const entertainerSales = seasonalProjections[scenario].total;
              const entertainerProfit = entertainerSales * entertainMePkg.profit;
              
              // Assume regular package sales throughout year
              const regularSales = scenario === 'conservative' ? 20 : scenario === 'moderate' ? 40 : 60;
              const avgPackageProfit = packages[1].profit; // Video Bundle
              const regularProfit = regularSales * avgPackageProfit;
              
              const totalProfit = entertainerProfit + regularProfit;
              
              return (
                <Card key={scenario} className={scenario === 'moderate' ? 'border-primary' : ''}>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold capitalize mb-4">{scenario}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Move Me</span>
                        <span className="text-green-600 font-medium">${entertainerProfit.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Regular Packages</span>
                        <span className="text-green-600 font-medium">${regularProfit.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t font-bold">
                        <span>Annual Profit</span>
                        <span className="text-green-600">${totalProfit.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 6 Month Income Projection */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>6 Month Income Projection</CardTitle>
          <CardDescription>Income projection for the next 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="default"
            onClick={() => setShowSixMonth(true)}
            className="w-full"
          >
            View 6 Month Projection
          </Button>
        </CardContent>
      </Card>

      {/* Social Media Strategy */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Social Media Strategy</CardTitle>
          <CardDescription>Plan to maximize reach and engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="default"
            onClick={() => setShowSocial(true)}
            className="w-full"
          >
            View Social Media Strategy
          </Button>
        </CardContent>
      </Card>

      {/* Veterans Revenue Dashboard */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Veterans Revenue Dashboard</CardTitle>
          <CardDescription>Consumer app revenue model for veterans and service members</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="default"
            onClick={() => setShowVeterans(true)}
            className="w-full"
          >
            View Veterans Dashboard
          </Button>
        </CardContent>
      </Card>

      {/* B2B Revenue Dashboard */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>B2B Revenue Dashboard</CardTitle>
          <CardDescription>Enterprise white-label training platform revenue model</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="default"
            onClick={() => setShowB2B(true)}
            className="w-full"
          >
            View B2B Dashboard
          </Button>
        </CardContent>
      </Card>

      {/* Revenue Model Comparison */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Revenue Model Comparison</CardTitle>
          <CardDescription>Compare different revenue models</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="default"
            onClick={() => setShowRevenueComparison(true)}
            className="w-full"
          >
            View Revenue Model Comparison
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}