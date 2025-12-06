import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Calendar, TrendingUp, DollarSign, Package, Heart, Video, BookOpen, Repeat } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart } from 'recharts';

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

export function IncomeProjection6Month() {
  // Package definitions with costs
  const packages: PackageData[] = [
    {
      name: "Move Me",
      price: 24,
      videoMinutes: 1.5,
      avatarSetup: false,
      laborHours: 0.33,
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

  const entertainMePerMonth = 100; // 100 30-minute avatar videos per month
  const totalEntertainMeVideos = 350; // 3.5 months ending March 14 (Dec: 100 + Jan: 100 + Feb: 100 + Mar: 50)

  // Monthly breakdown
  const monthlyData = [
    {
      month: "December 2025",
      weeks: 4,
      entertainMeVideos: 100,
      hasEntertainMe: true,
      trainingCustomers: 1,
      bundleCustomers: 2
    },
    {
      month: "January 2026",
      weeks: 4,
      entertainMeVideos: 100,
      hasEntertainMe: true,
      trainingCustomers: 1,
      bundleCustomers: 2
    },
    {
      month: "February 2026",
      weeks: 4,
      entertainMeVideos: 100,
      hasEntertainMe: true,
      trainingCustomers: 1,
      bundleCustomers: 2
    },
    {
      month: "March 2026",
      weeks: 2.1,
      entertainMeVideos: 50,
      hasEntertainMe: true,
      entertainMeNote: "Ends March 14 (half month)",
      trainingCustomers: 1,
      bundleCustomers: 2
    },
    {
      month: "April 2026",
      weeks: 4,
      entertainMeVideos: 0,
      hasEntertainMe: false,
      trainingCustomers: 1,
      bundleCustomers: 2
    },
    {
      month: "May 2026",
      weeks: 5,
      entertainMeVideos: 0,
      hasEntertainMe: false,
      trainingCustomers: 1,
      bundleCustomers: 2
    }
  ];

  // Calculate detailed metrics for each month
  const monthlyMetrics = monthlyData.map(month => {
    const entertainMeRevenue = month.entertainMeVideos * entertainMe.price;
    const entertainMeProfit = month.entertainMeVideos * (entertainMe.profit || 0);
    const entertainMeHours = month.entertainMeVideos * entertainMe.laborHours;

    const trainingRevenue = month.trainingCustomers * trainingPkg.price;
    const trainingProfit = month.trainingCustomers * (trainingPkg.profit || 0);
    const trainingHours = month.trainingCustomers * trainingPkg.laborHours;

    const bundleRevenue = month.bundleCustomers * videoBundle.price;
    const bundleProfit = month.bundleCustomers * (videoBundle.profit || 0);
    const bundleHours = month.bundleCustomers * videoBundle.laborHours;

    const totalRevenue = entertainMeRevenue + trainingRevenue + bundleRevenue;
    const totalProfit = entertainMeProfit + trainingProfit + bundleProfit;
    const totalHours = entertainMeHours + trainingHours + bundleHours;
    const totalCustomers = month.entertainMeVideos + month.trainingCustomers + month.bundleCustomers;

    return {
      ...month,
      entertainMeRevenue,
      entertainMeProfit,
      entertainMeHours,
      trainingRevenue,
      trainingProfit,
      trainingHours,
      bundleRevenue,
      bundleProfit,
      bundleHours,
      totalRevenue,
      totalProfit,
      totalHours,
      totalCustomers,
      avgWeeklyRevenue: totalRevenue / month.weeks,
      avgWeeklyHours: totalHours / month.weeks,
      profitMargin: (totalProfit / totalRevenue) * 100
    };
  });

  // Cumulative tracking
  let cumulativeRevenue = 0;
  let cumulativeProfit = 0;
  let cumulativeHours = 0;

  const cumulativeData = monthlyMetrics.map(month => {
    cumulativeRevenue += month.totalRevenue;
    cumulativeProfit += month.totalProfit;
    cumulativeHours += month.totalHours;

    return {
      month: month.month.split(' ')[0],
      revenue: month.totalRevenue,
      profit: month.totalProfit,
      cumulativeRevenue,
      cumulativeProfit,
      hours: month.totalHours,
      entertainMe: month.entertainMeRevenue,
      premium: month.trainingRevenue + month.bundleRevenue
    };
  });

  // Totals
  const totals = {
    revenue: monthlyMetrics.reduce((sum, m) => sum + m.totalRevenue, 0),
    profit: monthlyMetrics.reduce((sum, m) => sum + m.totalProfit, 0),
    hours: monthlyMetrics.reduce((sum, m) => sum + m.totalHours, 0),
    customers: monthlyMetrics.reduce((sum, m) => sum + m.totalCustomers, 0),
    entertainMeVideos: monthlyMetrics.reduce((sum, m) => sum + m.entertainMeVideos, 0)
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="text-center space-y-4 max-w-4xl mx-auto mb-8 p-6 border-2 border-primary/30 rounded-xl bg-gradient-to-br from-primary/5 to-background">
          <h1 className="text-4xl font-bold tracking-tight">6-Month Revenue Roadmap</h1>
          <p className="text-xl text-muted-foreground">
            Month-by-month projection showing how your white-label transformation business scales
          </p>
          <p className="text-sm text-muted-foreground">
            Includes PWA white-label platform + free mobile app with ads for maximum reach
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 border rounded-lg bg-background/50">
              <div className="text-3xl font-bold text-primary mb-1">${totals.revenue.toLocaleString()}</div>
              <p className="text-sm font-medium">Total Revenue (6 Months)</p>
              <p className="text-xs text-muted-foreground">Avg ${Math.round(totals.revenue / 6).toLocaleString()}/month</p>
            </div>
            <div className="p-4 border rounded-lg bg-background/50">
              <div className="text-3xl font-bold text-primary mb-1">${totals.profit.toLocaleString()}</div>
              <p className="text-sm font-medium">Total Profit (6 Months)</p>
              <p className="text-xs text-muted-foreground">{((totals.profit / totals.revenue) * 100).toFixed(1)}% margin</p>
            </div>
            <div className="p-4 border rounded-lg bg-background/50">
              <div className="text-3xl font-bold text-primary mb-1">{totals.hours.toFixed(0)} hrs</div>
              <p className="text-sm font-medium">Total Production Time</p>
              <p className="text-xs text-muted-foreground">Avg {Math.round(totals.hours / 26)} hrs/week</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Monthly Performance Breakdown</h2>
            <p className="text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              December 2025 - May 2026 • Move Me: 100 30-min avatar videos/month through March 14 (350 total)
            </p>
          </div>
        </div>
      </div>

      {/* Monthly Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue by Package Type</CardTitle>
          <CardDescription>Revenue composition month over month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={cumulativeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
              />
              <Legend />
              <Bar dataKey="entertainMe" stackId="a" fill="#22c55e" name="Move Me" />
              <Bar dataKey="premium" stackId="a" fill="#3b82f6" name="Premium Packages" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Cumulative Growth */}
      <Card>
        <CardHeader>
          <CardTitle>Cumulative Revenue & Profit Growth</CardTitle>
          <CardDescription>Running totals over 6-month period</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={cumulativeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
              />
              <Legend />
              <Line type="monotone" dataKey="cumulativeRevenue" stroke="#3b82f6" strokeWidth={3} name="Cumulative Revenue" />
              <Line type="monotone" dataKey="cumulativeProfit" stroke="#22c55e" strokeWidth={3} name="Cumulative Profit" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Monthly Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Monthly Breakdown</CardTitle>
          <CardDescription>Complete metrics for each month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Month</th>
                  <th className="text-right p-3 font-semibold">Move Me</th>
                  <th className="text-right p-3 font-semibold">Training</th>
                  <th className="text-right p-3 font-semibold">Video Bundle</th>
                  <th className="text-right p-3 font-semibold bg-muted">Total Revenue</th>
                  <th className="text-right p-3 font-semibold bg-green-600/10">Total Profit</th>
                  <th className="text-right p-3 font-semibold">Hours</th>
                </tr>
              </thead>
              <tbody>
                {monthlyMetrics.map((month, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-3 font-medium">{month.month}</td>
                    <td className="text-right p-3">
                      <div>${month.entertainMeRevenue.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{month.entertainMeVideos} videos</div>
                    </td>
                    <td className="text-right p-3">
                      <div>${month.trainingRevenue.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{month.trainingCustomers} client{month.trainingCustomers !== 1 ? 's' : ''}</div>
                    </td>
                    <td className="text-right p-3">
                      <div>${month.bundleRevenue.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{month.bundleCustomers} client{month.bundleCustomers !== 1 ? 's' : ''}</div>
                    </td>
                    <td className="text-right p-3 font-bold bg-muted">
                      ${month.totalRevenue.toLocaleString()}
                    </td>
                    <td className="text-right p-3 font-bold text-green-600 bg-green-600/10">
                      ${month.totalProfit.toLocaleString()}
                    </td>
                    <td className="text-right p-3">
                      <div>{month.totalHours.toFixed(1)}</div>
                      <div className="text-xs text-muted-foreground">{month.avgWeeklyHours.toFixed(1)}/wk</div>
                    </td>
                  </tr>
                ))}
                <tr className="bg-primary/10 font-bold">
                  <td className="p-3">TOTAL (6 Months)</td>
                  <td className="text-right p-3">
                    ${monthlyMetrics.reduce((sum, m) => sum + m.entertainMeRevenue, 0).toLocaleString()}
                  </td>
                  <td className="text-right p-3">
                    ${monthlyMetrics.reduce((sum, m) => sum + m.trainingRevenue, 0).toLocaleString()}
                  </td>
                  <td className="text-right p-3">
                    ${monthlyMetrics.reduce((sum, m) => sum + m.bundleRevenue, 0).toLocaleString()}
                  </td>
                  <td className="text-right p-3 bg-muted">${totals.revenue.toLocaleString()}</td>
                  <td className="text-right p-3 text-green-600 bg-green-600/10">${totals.profit.toLocaleString()}</td>
                  <td className="text-right p-3">{totals.hours.toFixed(0)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Month-by-Month Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {monthlyMetrics.map((month, idx) => (
          <Card key={idx} className={month.hasEntertainMe ? "border-primary/30" : "border-muted"}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{month.month}</CardTitle>
              <CardDescription>{month.weeks} weeks • {month.totalCustomers} total deliverables</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Revenue</span>
                <span className="font-bold text-lg">${month.totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Profit</span>
                <span className="font-bold text-green-600">${month.totalProfit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Margin</span>
                <span className="font-semibold">{month.profitMargin.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Hours</span>
                <span className="font-semibold">{month.totalHours.toFixed(1)} hrs</span>
              </div>
              <div className="border-t pt-3 mt-3 space-y-1 text-xs">
                {month.hasEntertainMe && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Move Me</span>
                    <span>{month.entertainMeVideos} videos</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Full Service Training Video</span>
                  <span>{month.trainingCustomers} client</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Video Bundle</span>
                  <span>{month.bundleCustomers} clients</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Platform Delivery Options */}
      <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Multi-Platform Deployment Strategy
          </CardTitle>
          <CardDescription>Reach your clients' employees wherever they are</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 border-2 border-primary/30 rounded-lg bg-background">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-bold text-lg">🌐 White-Label PWA</h4>
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Premium Option</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Progressive Web App fully branded with your client's identity. Works across all devices without app store approval.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span><strong>Custom domain:</strong> training.yourclient.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span><strong>Full branding:</strong> Logo, colors, typography, custom UI</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span><strong>Offline capability:</strong> Download content for offline access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span><strong>No app store fees:</strong> Deploy instantly, update anytime</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span><strong>Enterprise SSO:</strong> SAML, OAuth, Active Directory integration</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-muted-foreground">Best for: Enterprise clients, corporate training, compliance programs</p>
              </div>
            </div>

            <div className="p-5 border-2 border-green-600/30 rounded-lg bg-background">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-bold text-lg">📱 Free Mobile App (Ad-Supported)</h4>
                <span className="text-xs bg-green-600/20 text-green-600 px-2 py-1 rounded">Volume Play</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Native mobile experience with ad-based monetization. Perfect for reaching wider audiences and generating passive revenue.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span><strong>Free to users:</strong> Lower barrier to entry, higher adoption</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span><strong>Ad revenue sharing:</strong> Generate passive income from impressions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span><strong>App store presence:</strong> Discovery on iOS App Store & Google Play</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span><strong>Push notifications:</strong> Re-engage users with reminders & updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span><strong>Freemium upsell:</strong> Convert free users to premium subscriptions</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-muted-foreground">Best for: B2C training, certification courses, large-scale employee programs</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 border rounded-lg bg-muted/50">
            <h5 className="font-semibold mb-2 text-sm">💡 Hybrid Strategy Recommendation</h5>
            <p className="text-sm text-muted-foreground">
              Offer both options to clients. Premium PWA for their core workforce (better analytics, no ads, enterprise features) + free mobile app for contractors, partners, or public training programs (broader reach, ad revenue). This creates two revenue streams from the same content.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            6-Month Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Revenue Trends
              </h4>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Q1 Avg:</strong> ${Math.round((monthlyMetrics[0].totalRevenue + monthlyMetrics[1].totalRevenue + monthlyMetrics[2].totalRevenue) / 3).toLocaleString()}/month</li>
                <li>• <strong>Q2 Avg:</strong> ${Math.round((monthlyMetrics[3].totalRevenue + monthlyMetrics[4].totalRevenue + monthlyMetrics[5].totalRevenue) / 3).toLocaleString()}/month</li>
                <li>• <strong>Peak Month:</strong> {monthlyMetrics.reduce((max, m) => m.totalRevenue > max.totalRevenue ? m : max).month}</li>
                <li>• <strong>Total Growth:</strong> From ${monthlyMetrics[0].totalRevenue.toLocaleString()} to ${monthlyMetrics[5].totalRevenue.toLocaleString()}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Package className="w-4 h-4" />
                Customer Mix
              </h4>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Move Me:</strong> 350 30-minute avatar videos (100/month during promotion)</li>
                <li>• <strong>Full Service Training Video:</strong> 6 clients (1/month)</li>
                <li>• <strong>Video Bundle:</strong> 12 clients (2/month)</li>
                <li className="text-muted-foreground text-xs pt-1">Promotion special: Available for a limited time!<br />Dec 17 - Mar 17</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Video className="w-4 h-4" />
                Production Metrics
              </h4>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Total Hours:</strong> {totals.hours.toFixed(0)} hours over 6 months</li>
                <li>• <strong>Avg Weekly:</strong> {Math.round(totals.hours / 26)} hours/week</li>
                <li>• <strong>Effective Rate:</strong> ${Math.round(totals.revenue / totals.hours)}/hour</li>
                <li>• <strong>Profit/Hour:</strong> ${Math.round(totals.profit / totals.hours)}/hour</li>
                <li className="text-green-600 font-medium pt-1">Strong margins on premium packages</li>
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
            Ready to Build Your Transformation Business?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-lg">
              This projection shows real, achievable revenue using our white-label platform. Start with quick wins (Move Me), build recurring revenue (subscriptions), and scale into enterprise transformation engagements.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 my-6">
              <div className="p-4 border rounded-lg bg-background">
                <h4 className="font-semibold mb-2">📊 Full Analytics</h4>
                <p className="text-sm text-muted-foreground">Track every metric your clients care about</p>
              </div>
              <div className="p-4 border rounded-lg bg-background">
                <h4 className="font-semibold mb-2">🎯 Proven ROI</h4>
                <p className="text-sm text-muted-foreground">Show measurable business impact</p>
              </div>
              <div className="p-4 border rounded-lg bg-background">
                <h4 className="font-semibold mb-2">🏷️ White-Label PWA</h4>
                <p className="text-sm text-muted-foreground">Your brand, your domain, your platform</p>
              </div>
              <div className="p-4 border rounded-lg bg-background">
                <h4 className="font-semibold mb-2">📱 Free Mobile App</h4>
                <p className="text-sm text-muted-foreground">Ad-supported for maximum user reach</p>
              </div>
              <div className="p-4 border rounded-lg bg-background">
                <h4 className="font-semibold mb-2">⚡ Fast Launch</h4>
                <p className="text-sm text-muted-foreground">Go live in under 2 weeks</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-lg">
                Schedule Your Demo
              </button>
              <button className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors text-lg">
                Get Partnership Details
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}