import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Calendar, TrendingUp, DollarSign, Package, Heart, Video, BookOpen, Repeat } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface PackageData {
  name: string;
  price: number;
  videoMinutes: number;
  avatarSetup: boolean;
  laborHours: number;
  hegyCost?: number;
  avatarCost?: number;
  laborCost?: number;
  totalCost?: number;
  profit?: number;
  margin?: number;
}

export function IncomeProjection90Day() {
  // Package definitions with costs
  const packages: PackageData[] = [
    {
      name: "Move Me",
      price: 24,
      videoMinutes: 1.5,
      avatarSetup: false,
      laborHours: 0.33, // 20 minutes
      hegyCost: 1.5 * 1.30,
      avatarCost: 0,
      laborCost: 0.33 * 50,
      totalCost: 0,
      profit: 0,
      margin: 0
    },
    {
      name: "Full Service Training Video",
      price: 100,
      videoMinutes: 2.65, // 159 seconds = 2.65 minutes
      avatarSetup: true,
      laborHours: 2, // Script writing + consultation + setup
      hegyCost: 2.65 * 1.30,
      avatarCost: 25,
      laborCost: 2 * 50,
      totalCost: 0,
      profit: 0,
      margin: 0
    },
    {
      name: "Video Bundle",
      price: 696,
      videoMinutes: 24,
      avatarSetup: true,
      laborHours: 7,
      hegyCost: 24 * 1.30,
      avatarCost: 25,
      laborCost: 7 * 50,
      totalCost: 0,
      profit: 0,
      margin: 0
    }
  ];

  // Calculate costs and profits
  packages.forEach(pkg => {
    pkg.totalCost = (pkg.hegyCost || 0) + (pkg.laborCost || 0) + (pkg.avatarCost || 0);
    pkg.profit = pkg.price - pkg.totalCost;
    pkg.margin = (pkg.profit / pkg.price) * 100;
  });

  const entertainMe = packages[0];
  const trainingPkg = packages[1];
  const videoBundle = packages[2];

  // 90-day projection (Dec 1 - Feb 28, 2026)
  // 100 30-minute avatar videos per month
  const weeksInPeriod = 13; // Full 90 days
  const entertainMePerMonth = 100;
  const monthsForEntertainMe = 3; // Dec, Jan, Feb
  const totalEntertainMe = monthsForEntertainMe * entertainMePerMonth; // 300 videos

  // 1 customer per month for each other package (3 months = 3 customers each)
  const monthsInPeriod = 3;
  const trainingCustomers = monthsInPeriod * 1;
  const bundleCustomers = monthsInPeriod * 2; // 2 customers per month

  // Revenue calculations
  const entertainMeRevenue = totalEntertainMe * entertainMe.price;
  const trainingRevenue = trainingCustomers * trainingPkg.price;
  const bundleRevenue = bundleCustomers * videoBundle.price;
  const totalRevenue = entertainMeRevenue + trainingRevenue + bundleRevenue;

  // Profit calculations
  const entertainMeProfit = totalEntertainMe * (entertainMe.profit || 0);
  const trainingProfit = trainingCustomers * (trainingPkg.profit || 0);
  const bundleProfit = bundleCustomers * (videoBundle.profit || 0);
  const totalProfit = entertainMeProfit + trainingProfit + bundleProfit;

  // Weekly breakdown data
  const weeklyData = [];
  let cumulativeRevenue = 0;
  let cumulativeProfit = 0;

  for (let week = 1; week <= weeksInPeriod; week++) {
    const weekRevenue = 25 * entertainMe.price; // 25 videos per week (100/month ÷ 4)
    const weekProfit = 25 * (entertainMe.profit || 0);
    
    // Add monthly packages on weeks 4, 8, 12 (end of each month)
    let monthlyBonus = 0;
    let monthlyProfitBonus = 0;
    if (week === 4 || week === 8 || week === 12) {
      monthlyBonus = trainingPkg.price + (2 * videoBundle.price);
      monthlyProfitBonus = (trainingPkg.profit || 0) + (2 * (videoBundle.profit || 0));
    }

    cumulativeRevenue += weekRevenue + monthlyBonus;
    cumulativeProfit += weekProfit + monthlyProfitBonus;

    weeklyData.push({
      week: `Week ${week}`,
      revenue: weekRevenue + monthlyBonus,
      profit: weekProfit + monthlyProfitBonus,
      cumulativeRevenue,
      cumulativeProfit,
      entertainMe: entertainMePerWeek,
      hasMonthly: monthlyBonus > 0
    });
  }

  // Package breakdown data
  const packageBreakdown = [
    {
      name: "Move Me",
      sales: totalEntertainMe,
      revenue: entertainMeRevenue,
      profit: entertainMeProfit,
      color: "#22c55e"
    },
    {
      name: "Training",
      sales: trainingCustomers,
      revenue: trainingRevenue,
      profit: trainingProfit,
      color: "#3b82f6"
    },
    {
      name: "Video Bundle",
      sales: bundleCustomers,
      revenue: bundleRevenue,
      profit: bundleProfit,
      color: "#a855f7"
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="text-center space-y-4 max-w-4xl mx-auto mb-8 p-6 border-2 border-primary/30 rounded-xl bg-gradient-to-br from-primary/5 to-background">
          <h1 className="text-4xl font-bold tracking-tight">Transform Your Agency with Measurable Digital Transformation</h1>
          <p className="text-xl text-muted-foreground">
            White-label training platform with built-in analytics, ROI tracking, and measurable business outcomes
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 border rounded-lg bg-background/50">
              <div className="text-3xl font-bold text-primary mb-1">85%</div>
              <p className="text-sm font-medium">Knowledge Retention</p>
              <p className="text-xs text-muted-foreground">vs 20% with traditional methods</p>
            </div>
            <div className="p-4 border rounded-lg bg-background/50">
              <div className="text-3xl font-bold text-primary mb-1">3.2x</div>
              <p className="text-sm font-medium">Engagement Rate</p>
              <p className="text-xs text-muted-foreground">Higher completion rates</p>
            </div>
            <div className="p-4 border rounded-lg bg-background/50">
              <div className="text-3xl font-bold text-primary mb-1">47%</div>
              <p className="text-sm font-medium">Cost Reduction</p>
              <p className="text-xs text-muted-foreground">In training delivery expenses</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground pt-4">
            These projections show real revenue scenarios from agencies delivering measurable digital transformation to their clients. Track engagement, measure learning outcomes, and prove ROI—all under your brand.
          </p>
        </div>
        <h2 className="text-3xl font-bold tracking-tight">90-Day Income Projection</h2>
        <p className="text-muted-foreground flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          December 1, 2025 - February 28, 2026 (13 weeks)
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Avg ${Math.round(totalRevenue / monthsInPeriod).toLocaleString()}/month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalProfit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((totalProfit / totalRevenue) * 100).toFixed(1)}% margin
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEntertainMe + trainingCustomers + bundleCustomers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalEntertainMe} seasonal + {trainingCustomers + bundleCustomers} premium
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Rate</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{entertainMePerMonth} videos</div>
            <p className="text-xs text-muted-foreground mt-1">
              Move Me (30-min avatar videos)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Revenue & Profit Tracking</CardTitle>
          <CardDescription>13-week projection with monthly package bonuses</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
              <Bar dataKey="profit" fill="#22c55e" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Cumulative Growth */}
      <Card>
        <CardHeader>
          <CardTitle>Cumulative Growth</CardTitle>
          <CardDescription>Running totals over 90-day period</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
              />
              <Legend />
              <Line type="monotone" dataKey="cumulativeRevenue" stroke="#3b82f6" strokeWidth={2} name="Cumulative Revenue" />
              <Line type="monotone" dataKey="cumulativeProfit" stroke="#22c55e" strokeWidth={2} name="Cumulative Profit" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Package Breakdown */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Package</CardTitle>
            <CardDescription>90-day breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={packageBreakdown} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip 
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                />
                <Bar dataKey="revenue" name="Revenue">
                  {packageBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Package Details</CardTitle>
            <CardDescription>Sales volume and profitability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {packageBreakdown.map((pkg) => (
                <div key={pkg.name} className="flex items-center justify-between pb-3 border-b last:border-0">
                  <div>
                    <div className="font-semibold">{pkg.name}</div>
                    <div className="text-sm text-muted-foreground">{pkg.sales} {pkg.sales === 1 ? 'customer' : 'sales'}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${pkg.revenue.toLocaleString()}</div>
                    <div className="text-sm text-green-600">${pkg.profit.toLocaleString()} profit</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Insights */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            90-Day Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Video className="w-4 h-4" />
                Production Schedule
              </h4>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Move Me:</strong> {entertainMePerMonth} 30-min avatar videos/month for {monthsForEntertainMe} months = {totalEntertainMe} total ({(totalEntertainMe * entertainMe.laborHours).toFixed(1)} hours)</li>
                <li>• <strong>Full Service Training Video:</strong> {trainingCustomers} customer{trainingCustomers !== 1 ? 's' : ''} (1 per month) ({trainingCustomers * trainingPkg.laborHours} hours)</li>
                <li>• <strong>Video Bundle:</strong> {bundleCustomers} customer{bundleCustomers !== 1 ? 's' : ''} (2 per month) ({bundleCustomers * videoBundle.laborHours} hours)</li>
                <li>• <strong>Total Production:</strong> {totalEntertainMe * 1.5 + trainingCustomers * 10 + bundleCustomers * 24} video minutes</li>
                <li>• <strong>Total Hours Worked:</strong> {(totalEntertainMe * entertainMe.laborHours + trainingCustomers * trainingPkg.laborHours + bundleCustomers * videoBundle.laborHours).toFixed(1)} hours</li>
                <li>• <strong>Estimated Total Hours Worked Weekly:</strong> {((totalEntertainMe * entertainMe.laborHours + trainingCustomers * trainingPkg.laborHours + bundleCustomers * videoBundle.laborHours) / weeksInPeriod).toFixed(1)} hours/week</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Financial Highlights
              </h4>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Total Revenue:</strong> ${totalRevenue.toLocaleString()} over 90 days</li>
                <li>• <strong>Total Profit:</strong> ${totalProfit.toLocaleString()} ({((totalProfit / totalRevenue) * 100).toFixed(1)}% margin)</li>
                <li>• <strong>Average Weekly:</strong> ${Math.round(totalRevenue / weeksInPeriod).toLocaleString()} revenue</li>
                <li>• <strong>Average Monthly:</strong> ${Math.round(totalRevenue / monthsInPeriod).toLocaleString()} revenue</li>
                <li>• <strong>Best Performer:</strong> Move Me (${entertainMeRevenue.toLocaleString()}, {totalEntertainMe} sales)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="border-primary bg-gradient-to-br from-primary/10 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Repeat className="w-6 h-6 text-primary" />
            Deliver Measurable Digital Transformation to Your Clients
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-lg">
              Partner agencies use our white-label platform to drive measurable business outcomes for their clients. Track every metric that matters—from engagement to knowledge retention to bottom-line ROI.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">📊 Measurable Outcomes</h4>
                <div className="space-y-2 text-sm">
                  <div className="p-3 border rounded-lg bg-background">
                    <p className="font-medium">Real-Time Analytics Dashboard</p>
                    <p className="text-xs text-muted-foreground">Track completion rates, engagement time, quiz scores, and behavior change</p>
                  </div>
                  <div className="p-3 border rounded-lg bg-background">
                    <p className="font-medium">Learning Impact Reports</p>
                    <p className="text-xs text-muted-foreground">Before/after assessments, knowledge retention curves, skill progression</p>
                  </div>
                  <div className="p-3 border rounded-lg bg-background">
                    <p className="font-medium">ROI Calculation Engine</p>
                    <p className="text-xs text-muted-foreground">Automated reporting on cost savings, productivity gains, error reduction</p>
                  </div>
                  <div className="p-3 border rounded-lg bg-background">
                    <p className="font-medium">Feedback Loop Integration</p>
                    <p className="text-xs text-muted-foreground">Voice-of-customer data, sentiment analysis, continuous improvement tracking</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">🚀 Your Transformation Platform</h4>
                <div className="space-y-2 text-sm">
                  <div className="p-3 border rounded-lg bg-background">
                    <p className="font-medium">White-Label Branding</p>
                    <p className="text-xs text-muted-foreground">Your logo, domain, and brand identity throughout the entire platform</p>
                  </div>
                  <div className="p-3 border rounded-lg bg-background">
                    <p className="font-medium">AI-Powered Training Creation</p>
                    <p className="text-xs text-muted-foreground">Generate personalized training content at scale with AI avatars</p>
                  </div>
                  <div className="p-3 border rounded-lg bg-background">
                    <p className="font-medium">Multi-Client Management</p>
                    <p className="text-xs text-muted-foreground">Manage unlimited clients with isolated data and custom reporting</p>
                  </div>
                  <div className="p-3 border rounded-lg bg-background">
                    <p className="font-medium">Agency-Grade Support</p>
                    <p className="text-xs text-muted-foreground">Dedicated success manager, white-label documentation, co-marketing</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6 mt-6">
              <h4 className="font-semibold mb-4 text-center">Transformation Services You Can Offer</h4>
              <div className="grid md:grid-cols-4 gap-3">
                <div className="p-3 border rounded-lg bg-background text-center">
                  <p className="font-medium text-sm">Employee Onboarding</p>
                  <p className="text-xs text-muted-foreground mt-1">Reduce time-to-productivity by 40%</p>
                </div>
                <div className="p-3 border rounded-lg bg-background text-center">
                  <p className="font-medium text-sm">Compliance Training</p>
                  <p className="text-xs text-muted-foreground mt-1">100% completion tracking & certification</p>
                </div>
                <div className="p-3 border rounded-lg bg-background text-center">
                  <p className="font-medium text-sm">Sales Enablement</p>
                  <p className="text-xs text-muted-foreground mt-1">Measure impact on conversion rates</p>
                </div>
                <div className="p-3 border rounded-lg bg-background text-center">
                  <p className="font-medium text-sm">Change Management</p>
                  <p className="text-xs text-muted-foreground mt-1">Track adoption & behavior shifts</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-lg">
                See Platform Demo
              </button>
              <button className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors text-lg">
                Download ROI Calculator
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Breakdown</CardTitle>
          <CardDescription>Revenue and profit by month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Month</th>
                  <th className="text-right py-3 px-4">Move Me</th>
                  <th className="text-right py-3 px-4">Premium Packages</th>
                  <th className="text-right py-3 px-4">Total Revenue</th>
                  <th className="text-right py-3 px-4">Total Profit</th>
                </tr>
              </thead>
              <tbody>
                {['December', 'January', 'February'].map((month, idx) => {
                  const entertainMeMonthRevenue = entertainMePerMonth * entertainMe.price; // 100 videos per month
                  const entertainMeMonthProfit = entertainMePerMonth * (entertainMe.profit || 0);
                  const premiumMonthRevenue = trainingPkg.price + (2 * videoBundle.price);
                  const premiumMonthProfit = (trainingPkg.profit || 0) + (2 * (videoBundle.profit || 0));
                  const monthRevenue = entertainMeMonthRevenue + premiumMonthRevenue;
                  const monthProfit = entertainMeMonthProfit + premiumMonthProfit;

                  return (
                    <tr key={month} className="border-b last:border-0">
                      <td className="py-3 px-4 font-medium">{month}</td>
                      <td className="text-right py-3 px-4">${entertainMeMonthRevenue.toLocaleString()}</td>
                      <td className="text-right py-3 px-4">${premiumMonthRevenue.toLocaleString()}</td>
                      <td className="text-right py-3 px-4 font-semibold">${monthRevenue.toLocaleString()}</td>
                      <td className="text-right py-3 px-4 font-semibold text-green-600">${monthProfit.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
