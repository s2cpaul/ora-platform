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

export function IncomeProjection90to180Day() {
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

  // 90-180 day projection (March 1 - May 31, 2026)
  // Promotion special ends Mar 14th
  // March 1 - March 14 = 0.5 months with Move Me (50 videos)
  // March 15 - May 31 = 2.5 months without Move Me
  const weeksInPeriod = 13; // Approximately 13 weeks
  const entertainMePerMonth = 100; // 100 30-minute avatar videos per month
  const marchEntertainMe = 50; // Half month (Mar 1-14)
  const totalEntertainMe = marchEntertainMe; // 50 videos total in this period

  // 3 months = 3 customers for training, 6 for video bundle (2 per month)
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
    // Move Me only for first 2 weeks (March 1-14)
    const hasEntertainMe = week <= 2;
    const weekRevenue = hasEntertainMe ? (25 * entertainMe.price) : 0; // 25 videos per week (100/month ÷ 4)
    const weekProfit = hasEntertainMe ? (25 * (entertainMe.profit || 0)) : 0;
    
    // Add monthly packages on weeks 4, 8, 13 (end of each month: March, April, May)
    let monthlyBonus = 0;
    let monthlyProfitBonus = 0;
    if (week === 4 || week === 8 || week === 13) {
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
      entertainMe: hasEntertainMe ? entertainMePerWeek : 0,
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
      <div className="space-y-4 border-t pt-12 mt-12">
        <div className="text-center space-y-4 max-w-4xl mx-auto mb-8 p-6 border-2 border-primary/30 rounded-xl bg-gradient-to-br from-primary/5 to-background">
          <h2 className="text-3xl font-bold tracking-tight">Scale Your Impact: Months 4-6</h2>
          <p className="text-lg text-muted-foreground">
            Your clients are seeing results. Now scale with enterprise transformation engagements.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="p-3 border rounded-lg bg-background/50">
              <div className="text-2xl font-bold text-primary mb-1">$24K-$96K</div>
              <p className="text-sm font-medium">Enterprise Engagement Value</p>
              <p className="text-xs text-muted-foreground">Typical 6-12 month contracts</p>
            </div>
            <div className="p-3 border rounded-lg bg-background/50">
              <div className="text-2xl font-bold text-primary mb-1">92%</div>
              <p className="text-sm font-medium">Client Retention</p>
              <p className="text-xs text-muted-foreground">When ROI is measurable</p>
            </div>
            <div className="p-3 border rounded-lg bg-background/50">
              <div className="text-2xl font-bold text-primary mb-1">5.4x</div>
              <p className="text-sm font-medium">Average Client ROI</p>
              <p className="text-xs text-muted-foreground">Proven by platform analytics</p>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold tracking-tight">90-180 Day Income Projection</h2>
        <p className="text-muted-foreground flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          March 1, 2026 - May 31, 2026 (13 weeks)
        </p>
        <p className="text-sm text-muted-foreground">
          Note: Promotion special ended Feb 14th - No Move Me sales in this period
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
            <CardTitle className="text-sm font-medium">Weekly Rate</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{entertainMePerWeek} videos</div>
            <p className="text-xs text-muted-foreground mt-1">
              Move Me (March only)
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
              <Line type="monotone" dataKey="cumulativeRevenue" stroke="#3b82f6" strokeWidth={2} name="Total Revenue" />
              <Line type="monotone" dataKey="cumulativeProfit" stroke="#22c55e" strokeWidth={2} name="Total Profit" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Package Performance */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Package</CardTitle>
            <CardDescription>Breakdown of income sources</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={packageBreakdown} layout="vertical">
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
            <CardDescription>Sales and profitability metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {packageBreakdown.map((pkg) => (
                <div key={pkg.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{pkg.name}</p>
                    <p className="text-xs text-muted-foreground">{pkg.sales} sale{pkg.sales !== 1 ? 's' : ''}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${pkg.revenue.toLocaleString()}</p>
                    <p className="text-xs text-green-600">${pkg.profit.toLocaleString()} profit</p>
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
            90-180 Day Summary
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
                <li>• <strong>Move Me:</strong> {entertainMePerWeek} videos/week for {entertainMeWeeks.toFixed(1)} weeks = {totalEntertainMe} total ({(totalEntertainMe * entertainMe.laborHours).toFixed(1)} hours)</li>
                <li className="text-muted-foreground text-xs ml-4">Promotion special ended Feb 14th</li>
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
                <li>• <strong>Best Performer:</strong> {bundleRevenue > entertainMeRevenue ? `Video Bundle ($${bundleRevenue.toLocaleString()}, ${bundleCustomers} sales)` : `Move Me ($${entertainMeRevenue.toLocaleString()}, ${totalEntertainMe} sales)`}</li>
                <li className="text-amber-600">• <strong>Note:</strong> Revenue decreased after Feb 14th when promotion special ended</li>
              </ul>
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
                  <th className="text-left p-2">Month</th>
                  <th className="text-right p-2">Move Me</th>
                  <th className="text-right p-2">Premium Packages</th>
                  <th className="text-right p-2">Total Revenue</th>
                  <th className="text-right p-2">Total Profit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">March 2026</td>
                  <td className="text-right p-2">${(marchEntertainMe * entertainMe.price).toLocaleString()}</td>
                  <td className="text-right p-2">${(trainingPkg.price + 2 * videoBundle.price).toLocaleString()}</td>
                  <td className="text-right p-2 font-semibold">${(marchEntertainMe * entertainMe.price + trainingPkg.price + 2 * videoBundle.price).toLocaleString()}</td>
                  <td className="text-right p-2 text-green-600">${(marchEntertainMe * (entertainMe.profit || 0) + (trainingPkg.profit || 0) + 2 * (videoBundle.profit || 0)).toLocaleString()}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">April 2026</td>
                  <td className="text-right p-2">$0</td>
                  <td className="text-right p-2">${(trainingPkg.price + 2 * videoBundle.price).toLocaleString()}</td>
                  <td className="text-right p-2 font-semibold">${(trainingPkg.price + 2 * videoBundle.price).toLocaleString()}</td>
                  <td className="text-right p-2 text-green-600">${((trainingPkg.profit || 0) + 2 * (videoBundle.profit || 0)).toLocaleString()}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">May 2026</td>
                  <td className="text-right p-2">$0</td>
                  <td className="text-right p-2">${(trainingPkg.price + 2 * videoBundle.price).toLocaleString()}</td>
                  <td className="text-right p-2 font-semibold">${(trainingPkg.price + 2 * videoBundle.price).toLocaleString()}</td>
                  <td className="text-right p-2 text-green-600">${((trainingPkg.profit || 0) + 2 * (videoBundle.profit || 0)).toLocaleString()}</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="p-2 font-bold">Total</td>
                  <td className="text-right p-2 font-bold">${entertainMeRevenue.toLocaleString()}</td>
                  <td className="text-right p-2 font-bold">${(trainingRevenue + bundleRevenue).toLocaleString()}</td>
                  <td className="text-right p-2 font-bold">${totalRevenue.toLocaleString()}</td>
                  <td className="text-right p-2 font-bold text-green-600">${totalProfit.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Success Story Positioning */}
      <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <TrendingUp className="w-6 h-6 text-primary" />
            The Complete Digital Transformation Stack
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-lg">🎯 Training & Content Delivery</h4>
                <ul className="space-y-2 text-sm">
                  <li className="p-2 border rounded bg-background">
                    <span className="font-medium">✓ AI Avatar Training Studio</span>
                    <p className="text-xs text-muted-foreground ml-4">Create personalized training at scale with lifelike AI presenters</p>
                  </li>
                  <li className="p-2 border rounded bg-background">
                    <span className="font-medium">✓ Interactive Learning Modules</span>
                    <p className="text-xs text-muted-foreground ml-4">Quizzes, assessments, scenario-based learning, branching logic</p>
                  </li>
                  <li className="p-2 border rounded bg-background">
                    <span className="font-medium">✓ Multi-Format Content</span>
                    <p className="text-xs text-muted-foreground ml-4">Video, microlearning, mobile-first, offline capability</p>
                  </li>
                  <li className="p-2 border rounded bg-background">
                    <span className="font-medium">✓ Personalization Engine</span>
                    <p className="text-xs text-muted-foreground ml-4">Adaptive learning paths based on role, performance, preferences</p>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-lg">📊 Analytics & Measurement</h4>
                <ul className="space-y-2 text-sm">
                  <li className="p-2 border rounded bg-background">
                    <span className="font-medium">✓ Real-Time Engagement Tracking</span>
                    <p className="text-xs text-muted-foreground ml-4">Watch time, replay patterns, dropout points, interaction rates</p>
                  </li>
                  <li className="p-2 border rounded bg-background">
                    <span className="font-medium">✓ Learning Outcome Metrics</span>
                    <p className="text-xs text-muted-foreground ml-4">Knowledge gain, skill mastery, certification tracking, competency maps</p>
                  </li>
                  <li className="p-2 border rounded bg-background">
                    <span className="font-medium">✓ Business Impact Analysis</span>
                    <p className="text-xs text-muted-foreground ml-4">Performance improvement, error reduction, time savings, cost avoidance</p>
                  </li>
                  <li className="p-2 border rounded bg-background">
                    <span className="font-medium">✓ Executive Dashboards</span>
                    <p className="text-xs text-muted-foreground ml-4">C-suite reporting with ROI calculations and trend analysis</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t pt-6 mt-6">
              <h4 className="font-semibold mb-3 text-lg">💬 Feedback & Continuous Improvement</h4>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="p-3 border rounded-lg bg-background">
                  <p className="font-medium text-sm">Voice of Customer Collection</p>
                  <p className="text-xs text-muted-foreground mt-1">In-platform surveys, voice feedback, video responses, sentiment analysis</p>
                </div>
                <div className="p-3 border rounded-lg bg-background">
                  <p className="font-medium text-sm">AI-Powered Insights</p>
                  <p className="text-xs text-muted-foreground mt-1">Pattern recognition, theme extraction, predictive analytics, recommendations</p>
                </div>
                <div className="p-3 border rounded-lg bg-background">
                  <p className="font-medium text-sm">Action Management</p>
                  <p className="text-xs text-muted-foreground mt-1">Automated workflows, task assignment, progress tracking, closed-loop follow-up</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6 mt-6">
              <h4 className="font-semibold mb-3 text-lg">🏢 Enterprise Transformation Packages</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border-2 border-primary/30 rounded-lg bg-background">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-lg">Digital Transformation Starter</p>
                      <p className="text-sm text-muted-foreground">For organizations with 100-500 employees</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">$24K</p>
                      <p className="text-xs text-muted-foreground">6-month engagement</p>
                    </div>
                  </div>
                  <ul className="text-xs space-y-1 mt-3 text-muted-foreground">
                    <li>• 1 custom AI avatar + 20 training modules</li>
                    <li>• Full analytics dashboard + quarterly business reviews</li>
                    <li>• Voice of employee feedback system</li>
                    <li>• ROI tracking & impact reporting</li>
                  </ul>
                </div>
                <div className="p-4 border-2 border-primary/30 rounded-lg bg-background">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-lg">Enterprise Transformation Suite</p>
                      <p className="text-sm text-muted-foreground">For organizations with 500+ employees</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">$96K</p>
                      <p className="text-xs text-muted-foreground">12-month engagement</p>
                    </div>
                  </div>
                  <ul className="text-xs space-y-1 mt-3 text-muted-foreground">
                    <li>• 5 custom AI avatars + unlimited training modules</li>
                    <li>• Advanced predictive analytics + monthly executive briefings</li>
                    <li>• Multi-channel feedback integration (video, voice, text)</li>
                    <li>• Strategic transformation advisory + change management support</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6 mt-6">
              <h4 className="font-semibold mb-4 text-center text-lg">Your Partnership Investment</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg bg-background">
                  <div className="text-3xl font-bold text-primary mb-2">$7,995</div>
                  <p className="text-sm font-medium">One-Time Setup</p>
                  <p className="text-xs text-muted-foreground mt-1">White-label platform, training portal, analytics integration, agency onboarding</p>
                </div>
                <div className="text-center p-4 border rounded-lg bg-background">
                  <div className="text-3xl font-bold text-primary mb-2">$1,499/mo</div>
                  <p className="text-sm font-medium">Platform License</p>
                  <p className="text-xs text-muted-foreground mt-1">Full stack access, unlimited clients, dedicated support, co-marketing</p>
                </div>
                <div className="text-center p-4 border rounded-lg bg-green-600/10 border-green-600/30">
                  <div className="text-3xl font-bold text-green-600 mb-2">$120K+</div>
                  <p className="text-sm font-medium">Year 1 Revenue Potential</p>
                  <p className="text-xs text-muted-foreground mt-1">5 enterprise clients @ $24K average</p>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Your clients pay for measurable transformation. You deliver it with our platform. We handle the technology.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-lg shadow-lg">
                Schedule Partnership Call
              </button>
              <button className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors text-lg">
                Download Partnership Guide
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
