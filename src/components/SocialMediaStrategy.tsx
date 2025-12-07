import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, DollarSign, Users, Target, Video, Briefcase, Calendar } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

export function SocialMediaStrategy() {
  // TikTok growth projection (12 months to 100k followers - Starting from 1 follower, 10K by March)
  const tiktokGrowth = [
    { month: "Dec", followers: 500, videos: 60, avgViews: 200, sponsorRevenue: 0, creatorFund: 0, entertainMeVideos: 13 },
    { month: "Jan", followers: 2000, videos: 60, avgViews: 700, sponsorRevenue: 0, creatorFund: 0, entertainMeVideos: 13 },
    { month: "Feb", followers: 6000, videos: 56, avgViews: 2000, sponsorRevenue: 0, creatorFund: 180, entertainMeVideos: 13 },
    { month: "Mar", followers: 10000, videos: 60, avgViews: 3500, sponsorRevenue: 0, creatorFund: 350, entertainMeVideos: 13 },
    { month: "Apr", followers: 15000, videos: 60, avgViews: 5500, sponsorRevenue: 300, creatorFund: 550, entertainMeVideos: 0 },
    { month: "May", followers: 22000, videos: 62, avgViews: 8000, sponsorRevenue: 500, creatorFund: 800, entertainMeVideos: 0 },
    { month: "Jun", followers: 32000, videos: 60, avgViews: 11500, sponsorRevenue: 750, creatorFund: 1150, entertainMeVideos: 0 },
    { month: "Jul", followers: 45000, videos: 60, avgViews: 15000, sponsorRevenue: 1000, creatorFund: 1500, entertainMeVideos: 0 },
    { month: "Aug", followers: 60000, videos: 60, avgViews: 20000, sponsorRevenue: 1500, creatorFund: 2000, entertainMeVideos: 0 },
    { month: "Sep", followers: 75000, videos: 60, avgViews: 25000, sponsorRevenue: 2000, creatorFund: 2500, entertainMeVideos: 0 },
    { month: "Oct", followers: 88000, videos: 60, avgViews: 28000, sponsorRevenue: 2200, creatorFund: 2800, entertainMeVideos: 0 },
    { month: "Nov", followers: 100000, videos: 60, avgViews: 30000, sponsorRevenue: 2500, creatorFund: 3000, entertainMeVideos: 0 }
  ];

  // LinkedIn growth projection (slower, B2B focus - Starting from current following)
  const linkedinGrowth = [
    { month: "Dec", followers: 250, posts: 20, avgEngagement: 25, leads: 0 },
    { month: "Jan", followers: 500, posts: 20, avgEngagement: 50, leads: 1 },
    { month: "Feb", followers: 1000, posts: 20, avgEngagement: 100, leads: 2 },
    { month: "Mar", followers: 1500, posts: 20, avgEngagement: 150, leads: 3 },
    { month: "Apr", followers: 2200, posts: 20, avgEngagement: 220, leads: 4 },
    { month: "May", followers: 3000, posts: 20, avgEngagement: 300, leads: 6 },
    { month: "Jun", followers: 4000, posts: 20, avgEngagement: 400, leads: 8 },
    { month: "Jul", followers: 5200, posts: 20, avgEngagement: 520, leads: 10 },
    { month: "Aug", followers: 6500, posts: 20, avgEngagement: 650, leads: 12 },
    { month: "Sep", followers: 8000, posts: 20, avgEngagement: 800, leads: 15 },
    { month: "Oct", followers: 10000, posts: 20, avgEngagement: 1000, leads: 18 },
    { month: "Nov", followers: 12000, posts: 20, avgEngagement: 1200, leads: 22 }
  ];

  // Revenue calculations
  const totalTikTokRevenue = tiktokGrowth.reduce((sum, m) => sum + m.sponsorRevenue + m.creatorFund, 0);
  const totalVideos = tiktokGrowth.reduce((sum, m) => sum + m.videos, 0);
  const totalEntertainMeVideos = tiktokGrowth.reduce((sum, m) => sum + m.entertainMeVideos, 0);
  const totalLeads = linkedinGrowth.reduce((sum, m) => sum + m.leads, 0);
  const linkedInRevenueValue = totalLeads * 2000; // Conservative $2k per qualified lead
  const linkedInClosedRevenue = totalLeads * 2000 * 0.20; // 20% close rate

  // Combined growth for visualization
  const combinedGrowth = tiktokGrowth.map((tk, idx) => ({
    month: tk.month,
    tiktok: tk.followers,
    linkedin: linkedinGrowth[idx].followers,
    combined: tk.followers + linkedinGrowth[idx].followers
  }));

  const socialMediaRevenue = [
    { month: "Dec", tiktok: 0, linkedInValue: 0 },
    { month: "Jan", tiktok: 0, linkedInValue: 2000 },
    { month: "Feb", tiktok: 180, linkedInValue: 4000 },
    { month: "Mar", tiktok: 350, linkedInValue: 6000 },
    { month: "Apr", tiktok: 850, linkedInValue: 8000 },
    { month: "May", tiktok: 1300, linkedInValue: 12000 },
    { month: "Jun", tiktok: 1900, linkedInValue: 16000 },
    { month: "Jul", tiktok: 2500, linkedInValue: 20000 },
    { month: "Aug", tiktok: 3500, linkedInValue: 24000 },
    { month: "Sep", tiktok: 4500, linkedInValue: 30000 },
    { month: "Oct", tiktok: 5000, linkedInValue: 36000 },
    { month: "Nov", tiktok: 5500, linkedInValue: 44000 }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="text-center space-y-4 max-w-4xl mx-auto mb-8 p-6 border-2 border-primary/30 rounded-xl bg-gradient-to-br from-primary/5 to-background">
          <h1 className="text-4xl font-bold tracking-tight">Social Media Growth Strategy</h1>
          <p className="text-xl text-muted-foreground">
            Build authority, generate leads, and create additional revenue streams
          </p>
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <div className="p-4 border rounded-lg bg-background/50">
              <div className="text-3xl font-bold text-primary mb-1">1 → 750</div>
              <p className="text-sm font-medium">Month 1 Growth</p>
              <p className="text-xs text-muted-foreground">Starting from scratch (500 TT + 250 LI)</p>
            </div>
            <div className="p-4 border rounded-lg bg-background/50">
              <div className="text-3xl font-bold text-primary mb-1">112K</div>
              <p className="text-sm font-medium">12-Month Target</p>
              <p className="text-xs text-muted-foreground">100K TikTok + 12K LinkedIn</p>
            </div>
            <div className="p-4 border rounded-lg bg-background/50">
              <div className="text-3xl font-bold text-primary mb-1">${totalTikTokRevenue.toLocaleString()}</div>
              <p className="text-sm font-medium">TikTok Revenue</p>
              <p className="text-xs text-muted-foreground">12-month total</p>
            </div>
            <div className="p-4 border rounded-lg bg-background/50">
              <div className="text-3xl font-bold text-primary mb-1">{totalEntertainMeVideos}</div>
              <p className="text-sm font-medium">Move Me Videos</p>
              <p className="text-xs text-muted-foreground">Seasonal viral content</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold tracking-tight">Combined Social Media Growth (Starting from ~1 Follower)</h2>
        <p className="text-muted-foreground flex items-center gap-2">
          <Users className="w-4 h-4" />
          Building from ground zero to 750 followers in Month 1, hitting 10K by March, scaling to 112K in 12 months
        </p>
      </div>

      {/* Combined Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Combined Social Media Growth Projection</CardTitle>
          <CardDescription>Aggressive 12-month growth plan: 1 → 112,000 followers (starting from scratch)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={combinedGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => value.toLocaleString() + " followers"}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
              />
              <Legend />
              <Area type="monotone" dataKey="tiktok" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} name="TikTok" />
              <Area type="monotone" dataKey="linkedin" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.4} name="LinkedIn" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Move Me Viral Strategy */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Video className="w-6 h-6 text-purple-500" />
            "Move Me" Seasonal Content: Your Viral Growth Engine
          </CardTitle>
          <CardDescription>Leverage existing content creation to build massive audience Dec-Mar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="p-4 border-2 border-purple-500/30 rounded-lg bg-purple-500/5">
                <h5 className="font-bold mb-3 flex items-center gap-2">
                  🎬 Content Repurposing Strategy
                </h5>
                <p className="text-sm text-muted-foreground mb-3">
                  You're already creating 13 Move Me videos/week through March 19th (52 total). 
                  Each video becomes 5+ pieces of social content.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">1.</span>
                    <div>
                      <p className="font-medium">TikTok (60-90 sec version)</p>
                      <p className="text-xs text-muted-foreground">Hook in first 3 seconds, trending audio, hashtags</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">2.</span>
                    <div>
                      <p className="font-medium">Instagram Reels (same video)</p>
                      <p className="text-xs text-muted-foreground">Cross-post for dual algorithm exposure</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">3.</span>
                    <div>
                      <p className="font-medium">YouTube Shorts (same video)</p>
                      <p className="text-xs text-muted-foreground">Long-term SEO value, monetization potential</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">4.</span>
                    <div>
                      <p className="font-medium">LinkedIn (professional angle)</p>
                      <p className="text-xs text-muted-foreground">"How we use AI avatars in corporate training" spin</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">5.</span>
                    <div>
                      <p className="font-medium">Behind-the-scenes TikTok</p>
                      <p className="text-xs text-muted-foreground">"Making of" content showing the AI creation process</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-background">
                <h5 className="font-semibold mb-2">📊 Move Me Impact (Dec-Mar)</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Videos created:</span>
                    <span className="font-medium">52 videos (13/week × 4 weeks)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Repurposed pieces:</span>
                    <span className="font-medium">260+ social posts (5× multiplier)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Additional content needed:</span>
                    <span className="font-medium">~180 non-EntertainMe posts</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-semibold">Total Month 1-4 posts:</span>
                    <span className="font-bold text-purple-500">440 pieces</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 border-2 border-purple-500/30 rounded-lg bg-purple-500/5">
                <h5 className="font-bold mb-3">🎯 Entertainment → Education Funnel (Dec-Mar Push to 10K)</h5>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg bg-background">
                    <p className="font-medium text-sm mb-1">Phase 1: Hook with Entertainment (Dec-Jan)</p>
                    <p className="text-xs text-muted-foreground">
                      Move Me videos grab attention with fun, viral content. Starting from 1 follower.
                      People follow for entertainment value first. Goal: 1 → 2,000 followers.
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-2xl">↓</div>
                  </div>
                  <div className="p-3 border rounded-lg bg-background">
                    <p className="font-medium text-sm mb-1">Phase 2: Mix in Education (Feb)</p>
                    <p className="text-xs text-muted-foreground">
                      "Wait, this is made with AI avatars?" reveals. Show the technology behind the entertainment.
                      Goal: 2,000 → 6,000 followers.
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-2xl">↓</div>
                  </div>
                  <div className="p-3 border rounded-lg bg-primary/10 border-primary/30">
                    <p className="font-medium text-sm mb-1 text-primary">Phase 3: Hit 10K by March 🎯</p>
                    <p className="text-xs text-muted-foreground">
                      Final Move Me push (13 videos). Creator Fund unlocked. Credibility established.
                      Goal: 6,000 → 10,000 followers.
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-2xl">↓</div>
                  </div>
                  <div className="p-3 border rounded-lg bg-background">
                    <p className="font-medium text-sm mb-1">Phase 4: Business Transformation (Apr+)</p>
                    <p className="text-xs text-muted-foreground">
                      Move Me wraps 3/19. Shift to 70% business content: "Imagine this for your training" posts. 
                      Connect entertainment to enterprise value.
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-2xl">↓</div>
                  </div>
                  <div className="p-3 border rounded-lg bg-green-500/10 border-green-500/30">
                    <p className="font-medium text-sm mb-1 text-green-600">Phase 5: Conversion & Scale</p>
                    <p className="text-xs text-muted-foreground">
                      CTA to white-label platform, case studies, demo requests from engaged 10K+ audience. 
                      Scale to 100K by Nov.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg bg-muted/30">
              <h6 className="font-semibold text-sm mb-2">🔥 Viral Hooks to Test</h6>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• "This entire video was made by AI"</li>
                <li>• "Corporate training is about to get wild"</li>
                <li>• "POV: Your boring training videos in 2025"</li>
                <li>• "$39/month vs $50k video production"</li>
                <li>• "Your HR department needs to see this"</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg bg-muted/30">
              <h6 className="font-semibold text-sm mb-2">📈 Growth Accelerators</h6>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Duet/Stitch trending business content</li>
                <li>• Comment on L&D influencer posts daily</li>
                <li>• Use Move Me to reply to comments</li>
                <li>• Create "series" (Episode 1/52 of...)</li>
                <li>• Tag brands (HeyGen, AI tools) for exposure</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg bg-muted/30">
              <h6 className="font-semibold text-sm mb-2">💡 Content Calendar Mix</h6>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• 50% Move Me reposts (Dec-Mar)</li>
                <li>• 30% AI training tips & how-tos</li>
                <li>• 15% Business transformation stories</li>
                <li>• 5% Behind-the-scenes/personal</li>
                <li>• After Mar 19: shift to 70% business content</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TikTok Follower Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle>TikTok Follower Growth Projection</CardTitle>
          <CardDescription>Aggressive 12-month growth plan: 1 → 100,000 followers (10K by March = Creator Fund eligible)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={tiktokGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number, name: string) => {
                  if (name === "followers") return [value.toLocaleString() + " followers", "Followers"];
                  if (name === "avgViews") return [value.toLocaleString() + " views", "Avg Views"];
                  return [value, name];
                }}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
              />
              <Legend />
              <Area type="monotone" dataKey="followers" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Followers" />
              <Area type="monotone" dataKey="avgViews" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} name="Avg Views" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* TikTok Revenue Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>TikTok Revenue Streams</CardTitle>
          <CardDescription>Monetization through Creator Fund + Sponsorships</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={tiktokGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
              />
              <Legend />
              <Bar dataKey="creatorFund" stackId="a" fill="#22c55e" name="Creator Fund" />
              <Bar dataKey="sponsorRevenue" stackId="a" fill="#3b82f6" name="Sponsorships" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* TikTok Strategy Details */}
      <Card className="border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            TikTok Content & Growth Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-lg">📹 Content Pillars</h4>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg bg-background">
                  <p className="font-medium text-sm">AI Training Tips (40%)</p>
                  <p className="text-xs text-muted-foreground mt-1">Quick tips on using AI avatars, video creation hacks, training design best practices</p>
                </div>
                <div className="p-3 border rounded-lg bg-background">
                  <p className="font-medium text-sm">Business Transformation Stories (30%)</p>
                  <p className="text-xs text-muted-foreground mt-1">Before/after case studies, ROI reveals, client success transformations</p>
                </div>
                <div className="p-3 border rounded-lg bg-background">
                  <p className="font-medium text-sm">Behind-the-Scenes (20%)</p>
                  <p className="text-xs text-muted-foreground mt-1">Day in the life, how I built this, transparency content, work process</p>
                </div>
                <div className="p-3 border rounded-lg bg-background">
                  <p className="font-medium text-sm">Trending/Viral Plays (10%)</p>
                  <p className="text-xs text-muted-foreground mt-1">Riding trends, duets, stitches—applying trending formats to your niche</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-lg">💰 Monetization Timeline (Conservative)</h4>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg bg-background">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-sm">Months 1-2: Foundation (Starting from 1 follower!)</p>
                      <p className="text-xs text-muted-foreground">1 → 2,000 followers</p>
                    </div>
                    <span className="text-xs bg-muted px-2 py-1 rounded">$0</span>
                  </div>
                  <p className="text-xs">Ground zero to 500 by Dec 31, then 2K by Jan 31. Below Creator Fund threshold. Focus: viral Move Me content, finding hooks, building core audience from scratch.</p>
                </div>

                <div className="p-3 border rounded-lg bg-background border-primary/30">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-sm">Month 3: Creator Fund Eligible! 🎉</p>
                      <p className="text-xs text-muted-foreground">6,000 followers (Feb)</p>
                    </div>
                    <span className="text-xs bg-green-600/20 text-green-600 px-2 py-1 rounded">$180</span>
                  </div>
                  <p className="text-xs">Hit 10K threshold by March. First Creator Fund payouts begin. Credibility unlocked.</p>
                </div>

                <div className="p-3 border rounded-lg bg-background">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-sm">Months 4-6: Early Sponsorships</p>
                      <p className="text-xs text-muted-foreground">10K-32K followers</p>
                    </div>
                    <span className="text-xs bg-green-600/20 text-green-600 px-2 py-1 rounded">$2,650 total</span>
                  </div>
                  <p className="text-xs">First micro-sponsorships ($300-750). SaaS companies, course creators, AI tool brands seeking niche audiences.</p>
                </div>

                <div className="p-3 border rounded-lg bg-background">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-sm">Months 7-9: Growth & Brand Deals</p>
                      <p className="text-xs text-muted-foreground">45K-75K followers</p>
                    </div>
                    <span className="text-xs bg-green-600/20 text-green-600 px-2 py-1 rounded">$10,500 total</span>
                  </div>
                  <p className="text-xs">Established sponsorships ($1-2K/post). Multiple revenue streams active (Creator Fund, sponsors, affiliate).</p>
                </div>

                <div className="p-3 border rounded-lg bg-background">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-sm">Months 10-12: Scale to 100K</p>
                      <p className="text-xs text-muted-foreground">88K-100K followers</p>
                    </div>
                    <span className="text-xs bg-green-600/20 text-green-600 px-2 py-1 rounded">$13,700 total</span>
                  </div>
                  <p className="text-xs">Premium brand deals ($2-2.5K/post). Multiple revenue streams optimized.</p>
                </div>

                <div className="p-3 border rounded-lg bg-primary/10 border-primary/30">
                  <p className="font-semibold text-sm mb-1">Post-100K: $4K-8K/month</p>
                  <p className="text-xs text-muted-foreground">Conservative ongoing: brand deals, affiliate revenue, course sales, Creator Fund at scale</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 border-2 border-primary/30 rounded-lg bg-muted/30">
            <h5 className="font-semibold mb-2">🎯 Growth Tactics</h5>
            <div className="grid md:grid-cols-3 gap-3 text-sm">
              <div>
                <p className="font-medium">Hook Mastery</p>
                <p className="text-xs text-muted-foreground">First 1-2 seconds determine everything. Test 10+ hooks per video concept.</p>
              </div>
              <div>
                <p className="font-medium">Post Timing</p>
                <p className="text-xs text-muted-foreground">8am & 6pm daily. Analyze when your audience is most active.</p>
              </div>
              <div>
                <p className="font-medium">Engagement Loops</p>
                <p className="text-xs text-muted-foreground">Ask questions, create controversy, leave cliffhangers. Drive comments.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* LinkedIn Strategy */}
      <div className="border-t pt-12 mt-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">LinkedIn B2B Lead Generation (Conservative)</h2>
        <p className="text-muted-foreground flex items-center gap-2 mb-6">
          <Briefcase className="w-4 h-4" />
          Authority-building strategy: 1 post/day + repurposed Move Me content targeting L&D, HR, Operations decision-makers
        </p>
      </div>

      {/* LinkedIn Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle>LinkedIn Following & Lead Generation</CardTitle>
          <CardDescription>Conservative 12-month plan: 300 → 12,000 followers, quality over quantity</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={linkedinGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value: number, name: string) => {
                  if (name === "followers") return [value.toLocaleString() + " followers", "Followers"];
                  if (name === "leads") return [value + " leads", "Qualified Leads"];
                  return [value, name];
                }}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
              />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="followers" stroke="#3b82f6" strokeWidth={3} name="Followers" />
              <Line yAxisId="right" type="monotone" dataKey="leads" stroke="#22c55e" strokeWidth={3} name="Qualified Leads" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* LinkedIn Strategy Details */}
      <Card className="border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            LinkedIn Authority & Lead Gen Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-lg">📝 Content Strategy</h4>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg bg-background">
                  <p className="font-medium text-sm">Thought Leadership (50%)</p>
                  <p className="text-xs text-muted-foreground mt-1">Hot takes on digital transformation, future of work, AI in L&D. Polarizing but informed opinions.</p>
                </div>
                <div className="p-3 border rounded-lg bg-background">
                  <p className="font-medium text-sm">Case Studies & Results (30%)</p>
                  <p className="text-xs text-muted-foreground mt-1">Client wins with data. "How we helped X company achieve Y% improvement in Z weeks."</p>
                </div>
                <div className="p-3 border rounded-lg bg-background">
                  <p className="font-medium text-sm">Educational Content (10%)</p>
                  <p className="text-xs text-muted-foreground mt-1">Frameworks, templates, strategies. Actionable advice that demonstrates expertise.</p>
                </div>
                <div className="p-3 border rounded-lg bg-background">
                  <p className="font-medium text-sm">Repurposed Move Me (10%)</p>
                  <p className="text-xs text-muted-foreground mt-1">"AI in corporate training" angle. Show tech capabilities through entertainment content.</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-lg">🎯 Lead Generation Funnel</h4>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg bg-background">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-sm">Awareness (Top of Funnel)</p>
                      <p className="text-xs text-muted-foreground">12K followers by month 6</p>
                    </div>
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs">Viral posts, comments on trending topics, engaging with 20+ posts/day. Get in front of your ICP.</p>
                </div>

                <div className="p-3 border rounded-lg bg-background">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-sm">Consideration (Middle)</p>
                      <p className="text-xs text-muted-foreground">~1,200 profile views/month</p>
                    </div>
                    <Target className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs">Lead magnet in profile. Free ROI calculator, transformation framework, case study PDF.</p>
                </div>

                <div className="p-3 border rounded-lg bg-background">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-sm">Conversion (Bottom)</p>
                      <p className="text-xs text-muted-foreground">70 qualified leads (6 months)</p>
                    </div>
                    <DollarSign className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-xs">DM outreach, discovery calls, demo requests. 2-5 leads/month → $2K avg deal value.</p>
                </div>

                <div className="p-3 border rounded-lg bg-green-600/10 border-green-600/30">
                  <p className="font-semibold text-sm mb-1">Pipeline Value: $202K (12 months)</p>
                  <p className="text-xs text-muted-foreground">101 leads × $2,000 avg = $202K opportunity. Close rate of 20% = $40K actual revenue.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="p-4 border-2 border-primary/30 rounded-lg bg-muted/30">
              <h5 className="font-semibold mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Daily Activity Checklist
              </h5>
              <ul className="text-sm space-y-1">
                <li>✓ 1 original post (6am or 12pm EST)</li>
                <li>✓ Comment on 20 posts in feed (meaningful, not generic)</li>
                <li>✓ Respond to all comments on your posts within 1 hour</li>
                <li>✓ Send 5 connection requests to ICP targets with personal note</li>
                <li>✓ Review & respond to DMs (follow up on warm leads)</li>
              </ul>
            </div>

            <div className="p-4 border-2 border-primary/30 rounded-lg bg-muted/30">
              <h5 className="font-semibold mb-2">💡 LinkedIn Pro Tips</h5>
              <ul className="text-sm space-y-1">
                <li>• Use carousel posts—they get 3x more engagement</li>
                <li>• Tag 1-2 people per post (credit, collaboration, spark debate)</li>
                <li>• First comment with a question to boost algorithm</li>
                <li>• Post on weekdays (Tues-Thurs are peak)</li>
                <li>• Every post should have a clear CTA in comments</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Investment Analysis */}
      <Card className="border-orange-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Time Investment & ROI Analysis (@$50/hour)
          </CardTitle>
          <CardDescription>Leveraging existing Move Me content dramatically reduces time investment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-background">
                <h5 className="font-semibold mb-3">TikTok Time Investment</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Videos created from scratch:</span>
                    <span className="font-medium">{totalVideos - (totalEntertainMeVideos * 5)} videos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Repurposed Move Me:</span>
                    <span className="font-medium">{totalEntertainMeVideos * 5} posts (5 min each)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time savings:</span>
                    <span className="font-medium text-green-600">-{(totalEntertainMeVideos * 5 * 0.42).toFixed(0)} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total hours:</span>
                    <span className="font-medium">{((totalVideos - (totalEntertainMeVideos * 5)) * 0.5 + (totalEntertainMeVideos * 5 * 0.08)).toFixed(0)} hours</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-semibold">Time value:</span>
                    <span className="font-bold text-orange-600">${(((totalVideos - (totalEntertainMeVideos * 5)) * 0.5 + (totalEntertainMeVideos * 5 * 0.08)) * 50).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-background">
                <h5 className="font-semibold mb-3">LinkedIn Time Investment</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Original posts:</span>
                    <span className="font-medium">240 posts (12 mo)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Repurposed content:</span>
                    <span className="font-medium">~60 posts (5 min each)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Daily engagement:</span>
                    <span className="font-medium">30 min/day × 365</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total hours:</span>
                    <span className="font-medium">247 hours</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-semibold">Time value:</span>
                    <span className="font-bold text-orange-600">$12,350</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border-2 border-purple-500/30 rounded-lg bg-purple-500/5">
                <h5 className="font-semibold mb-2 text-sm">💡 Key Insight: Content Leverage</h5>
                <p className="text-xs text-muted-foreground">
                  By repurposing the 52 Move Me videos you're already creating, 
                  you save ~{(totalEntertainMeVideos * 5 * 0.42).toFixed(0)} hours of content creation time 
                  (${((totalEntertainMeVideos * 5 * 0.42) * 50).toLocaleString()} value). 
                  One piece of content = 5+ platform posts.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="p-6 border-2 border-primary/30 rounded-xl bg-gradient-to-br from-primary/10 to-background">
                <h5 className="font-bold text-lg mb-4 text-center">ROI Summary (12 Months)</h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-muted-foreground">Time Investment:</span>
                    <span className="font-bold text-orange-600">${(((totalVideos - (totalEntertainMeVideos * 5)) * 0.5 + (totalEntertainMeVideos * 5 * 0.08)) * 50 + 12350).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-muted-foreground">Revenue Generated:</span>
                    <span className="font-bold text-green-600">${(totalTikTokRevenue + linkedInClosedRevenue).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold text-lg">Net Profit:</span>
                    <span className="font-bold text-2xl text-green-600">${((totalTikTokRevenue + linkedInClosedRevenue) - (((totalVideos - (totalEntertainMeVideos * 5)) * 0.5 + (totalEntertainMeVideos * 5 * 0.08)) * 50 + 12350)).toLocaleString()}</span>
                  </div>
                  <div className="text-center pt-3 border-t">
                    <p className="text-sm text-muted-foreground mb-1">Return on Investment</p>
                    <p className="text-3xl font-bold text-primary">
                      {(((totalTikTokRevenue + linkedInClosedRevenue) / (((totalVideos - (totalEntertainMeVideos * 5)) * 0.5 + (totalEntertainMeVideos * 5 * 0.08)) * 50 + 12350) - 1) * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 border rounded-lg bg-muted/30">
                <p className="text-sm text-muted-foreground italic">
                  <strong>Note:</strong> This conservative estimate doesn't include:
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>• Brand authority multiplier effect on white-label sales</li>
                  <li>• Ongoing $4-8K/month revenue post-month 12</li>
                  <li>• ${(linkedInRevenueValue - linkedInClosedRevenue).toLocaleString()} LinkedIn pipeline still in progress</li>
                  <li>• Viral moments that could 10x these numbers</li>
                  <li>• YouTube Shorts, Instagram Reels monetization</li>
                </ul>
                <p className="text-sm font-semibold text-green-600 mt-3">
                  True ROI is likely 3-5× higher when factoring in long-term value.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Combined Social Revenue Impact */}
      <Card className="border-primary bg-gradient-to-br from-primary/10 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <TrendingUp className="w-6 h-6 text-primary" />
            Total Social Media Impact on Business
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 border rounded-lg bg-background">
              <div className="text-3xl font-bold text-primary mb-2">${totalTikTokRevenue.toLocaleString()}</div>
              <p className="text-sm font-medium">Direct TikTok Revenue</p>
              <p className="text-xs text-muted-foreground mt-1">Creator Fund + Sponsorships (12 months)</p>
            </div>
            <div className="text-center p-4 border rounded-lg bg-background">
              <div className="text-3xl font-bold text-primary mb-2">${linkedInClosedRevenue.toLocaleString()}</div>
              <p className="text-sm font-medium">LinkedIn Closed Deals</p>
              <p className="text-xs text-muted-foreground mt-1">{totalLeads} leads × 20% close × $2K avg (12 mo)</p>
            </div>
            <div className="text-center p-4 border rounded-lg bg-green-600/10 border-green-600/30">
              <div className="text-3xl font-bold text-green-600 mb-2">${(totalTikTokRevenue + linkedInClosedRevenue).toLocaleString()}</div>
              <p className="text-sm font-medium">Combined Social Revenue</p>
              <p className="text-xs text-muted-foreground mt-1">First 12 months total revenue (conservative)</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">🚀 Beyond Direct Revenue</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-background">
                <h5 className="font-semibold text-sm mb-2">Brand Authority Multiplier</h5>
                <p className="text-xs text-muted-foreground mb-2">Social proof accelerates sales cycles and justifies premium pricing.</p>
                <ul className="text-xs space-y-1">
                  <li>• "100K TikTok followers" = instant credibility</li>
                  <li>• LinkedIn thought leadership = enterprise trust</li>
                  <li>• Prospects pre-sold before first call</li>
                  <li>• Referral rates increase 3-5x</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg bg-background">
                <h5 className="font-semibold text-sm mb-2">Content Leverage</h5>
                <p className="text-xs text-muted-foreground mb-2">One piece of content works across multiple platforms.</p>
                <ul className="text-xs space-y-1">
                  <li>• TikTok video → LinkedIn carousel → Blog post</li>
                  <li>• Viral moments repurposed into case studies</li>
                  <li>• User testimonials become social proof assets</li>
                  <li>• Comments/questions become content ideas</li>
                </ul>
              </div>
            </div>

            <div className="p-5 border-2 border-primary/40 rounded-lg bg-primary/5 mt-6">
              <h5 className="font-bold mb-3 text-center">📊 12-Month Social Media Business Impact Summary (Conservative)</h5>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold mb-2">TikTok Outcomes (12 months):</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• 100,000 followers (started with 1!)</li>
                    <li>• {totalVideos} total videos created</li>
                    <li>• 52 Move Me videos repurposed 5× ways</li>
                    <li>• ~1.5B total impressions (aggressive but achievable)</li>
                    <li>• ${totalTikTokRevenue.toLocaleString()} direct revenue</li>
                    <li>• Foundation for $4-8K/month ongoing</li>
                    <li>• Mass-market brand awareness (100,000x growth!)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">LinkedIn Outcomes (12 months):</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• 12,000 targeted followers (started from current base)</li>
                    <li>• {totalLeads} qualified B2B leads</li>
                    <li>• ${linkedInClosedRevenue.toLocaleString()} closed revenue (20% close rate)</li>
                    <li>• ${(linkedInRevenueValue - linkedInClosedRevenue).toLocaleString()} additional pipeline in progress</li>
                    <li>• Executive-level credibility in L&D space</li>
                    <li>• Repurposed Move Me builds trust</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-lg">
                Download Social Media Playbook
              </button>
              <button className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors text-lg">
                See Full Business Plan
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Month 1 Action Plan */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Target className="w-6 h-6 text-green-500" />
            Month 1 Action Plan: 1 → 750 Followers (Ground Zero Start)
          </CardTitle>
          <CardDescription>Week-by-week roadmap starting from scratch (Target: 500 TikTok + 250 LinkedIn by Dec 31)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Week 1 */}
            <div className="p-4 border-2 border-green-500/30 rounded-lg bg-green-500/5">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-bold">Week 1: Foundation & First Posts (Starting from 1 follower)</h5>
                <span className="text-sm bg-green-600/20 text-green-600 px-3 py-1 rounded-full">Target: 1 → 100 followers</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold mb-2">TikTok Tasks (Starting from 1 follower!):</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>✓ Set up professional profile (bio, avatar, links)</li>
                    <li>✓ Post 3 best Move Me videos (repurposed)</li>
                    <li>✓ Create 10 original "AI tips" videos (30 sec hooks)</li>
                    <li>✓ Follow 100+ accounts in your niche (AI, L&D, business)</li>
                    <li>✓ Comment on 50+ posts daily (engagement is CRITICAL at 0)</li>
                    <li>✓ Test 5 different hooks, track which performs best</li>
                    <li>✓ DM top commenters: "Thanks for watching! Here's a tip..."</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">LinkedIn Tasks (Building from current base):</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>✓ Optimize profile for L&D decision-makers (headline, banner)</li>
                    <li>✓ Create 7 thought leadership posts (1/day)</li>
                    <li>✓ Repurpose 1 Move Me with business angle</li>
                    <li>✓ Send 50+ connection requests (7-10/day to ICP)</li>
                    <li>✓ Comment on 20+ posts/day in your feed</li>
                    <li>✓ Join 3 relevant L&D/AI groups, engage daily</li>
                    <li>✓ Personalize EVERY connection request message</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Week 2 */}
            <div className="p-4 border-2 border-green-500/30 rounded-lg bg-green-500/5">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-bold">Week 2: Consistency & Engagement</h5>
                <span className="text-sm bg-green-600/20 text-green-600 px-3 py-1 rounded-full">Target: 200 total</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold mb-2">TikTok Tasks:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>✓ Post 14 videos (2/day: 1 Move Me, 1 original)</li>
                    <li>✓ Duet/Stitch 2 trending videos in your niche</li>
                    <li>✓ Reply to every comment within 1 hour</li>
                    <li>✓ Analyze top video: what worked? Replicate format</li>
                    <li>✓ Test posting times: 8am vs 6pm performance</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">LinkedIn Tasks:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>✓ 7 posts (mix: 4 thought leadership, 2 case studies, 1 Move Me)</li>
                    <li>✓ Create first carousel post (AI training framework)</li>
                    <li>✓ Send 35 more connection requests</li>
                    <li>✓ Engage with all new connections via DM</li>
                    <li>✓ Track which post formats get most engagement</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Week 3 */}
            <div className="p-4 border-2 border-green-500/30 rounded-lg bg-green-500/5">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-bold">Week 3: Optimization & Scale</h5>
                <span className="text-sm bg-green-600/20 text-green-600 px-3 py-1 rounded-full">Target: 350 total</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold mb-2">TikTok Tasks:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>✓ Post 14 videos (double down on what's working)</li>
                    <li>✓ Create "series" format: "AI Tip of the Day #1-7"</li>
                    <li>✓ Go live once (Q&A about AI training)</li>
                    <li>✓ Collaborate: tag AI tool brands in relevant videos</li>
                    <li>✓ Experiment with longer videos (60-90 sec storytelling)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">LinkedIn Tasks:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>✓ 7 posts (focus on formats that performed well)</li>
                    <li>✓ Write first long-form article on AI in L&D</li>
                    <li>✓ Tag 2-3 industry leaders in posts (respectfully)</li>
                    <li>✓ Send 35 more connection requests</li>
                    <li>✓ Start DM conversations with warm leads</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Week 4 */}
            <div className="p-4 border-2 border-green-500/30 rounded-lg bg-green-500/5">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-bold">Week 4: Momentum & Lead Generation</h5>
                <span className="text-sm bg-green-600/20 text-green-600 px-3 py-1 rounded-full">Target: 500-750 total 🎯</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold mb-2">TikTok Tasks:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>✓ Post 14 videos (lean into viral winners)</li>
                    <li>✓ Launch first CTA: "Link in bio for free AI guide"</li>
                    <li>✓ Create 3 "behind the scenes" Move Me videos</li>
                    <li>✓ Analyze Month 1 analytics: followers, engagement, watch time</li>
                    <li>✓ Plan Month 2 content calendar based on learnings</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">LinkedIn Tasks:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>✓ 7 posts (include 1 results-focused case study)</li>
                    <li>✓ Create lead magnet: "ROI Calculator for AI Training"</li>
                    <li>✓ Add CTA to profile: "DM me for free consultation"</li>
                    <li>✓ Follow up with all engaged connections</li>
                    <li>✓ Document Month 1 wins: followers, engagement, leads</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Success Metrics */}
            <div className="p-5 border-2 border-primary/40 rounded-lg bg-primary/5">
              <h5 className="font-bold mb-3 text-center">✅ Month 1 Success Metrics (Starting from 1 follower!)</h5>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">750</div>
                  <p className="text-xs text-muted-foreground">Combined Followers</p>
                  <p className="text-xs font-medium mt-1">500 TikTok + 250 LinkedIn</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">55</div>
                  <p className="text-xs text-muted-foreground">Total Posts/Videos</p>
                  <p className="text-xs font-medium mt-1">~2 per day average</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">140</div>
                  <p className="text-xs text-muted-foreground">Connection Requests</p>
                  <p className="text-xs font-medium mt-1">LinkedIn ICP targeting</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">0-1</div>
                  <p className="text-xs text-muted-foreground">Qualified Leads</p>
                  <p className="text-xs font-medium mt-1">Pipeline starts Month 2</p>
                </div>
              </div>

              <div className="mt-4 p-3 border rounded-lg bg-background">
                <p className="text-sm font-semibold mb-2">🎯 Critical Success Factors (Starting from 1 follower):</p>
                <div className="grid md:grid-cols-3 gap-2 text-xs text-muted-foreground">
                  <div>
                    <strong>Consistency:</strong> 2 posts/day on TikTok, 1/day on LinkedIn. No skipping days. Algorithm rewards consistency.
                  </div>
                  <div>
                    <strong>Engagement = EVERYTHING:</strong> At 1 follower, spend 3× more time engaging than creating. Comments, DMs, follows drive initial growth.
                  </div>
                  <div>
                    <strong>Repurpose Ruthlessly:</strong> Every Move Me video = 5+ platform posts. Work smarter, not harder. You need volume to find what hits.
                  </div>
                </div>
              </div>

              <div className="mt-3 p-4 border-2 border-orange-500/30 rounded-lg bg-orange-500/5">
                <p className="text-sm font-bold mb-2">⚠️ Reality Check: Starting from 1 Follower</p>
                <p className="text-xs text-muted-foreground mb-2">
                  Growing from 1 → 10,000 followers in 4 months is extremely aggressive. Here's what will determine success:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• <strong>Viral potential:</strong> You need 3-5 videos to hit 100K+ views in first 3 months</li>
                  <li>• <strong>Hook mastery:</strong> First 0.5 seconds must stop the scroll. Test 20+ hook formats</li>
                  <li>• <strong>Move Me advantage:</strong> Your 52 videos are professional-quality content ready to deploy</li>
                  <li>• <strong>Posting velocity:</strong> 2-3 posts/day minimum. More attempts = more chances to go viral</li>
                  <li>• <strong>Trend-jacking:</strong> Jump on trending sounds/formats within hours, not days</li>
                  <li>• <strong>Community building:</strong> Reply to EVERY comment in first hour. Build loyal micro-audience first</li>
                </ul>
                <p className="text-xs font-semibold text-orange-600 mt-3">
                  If you hit these marks, 10K by March is achievable. If not, expect 3-5K, which is still solid growth.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
