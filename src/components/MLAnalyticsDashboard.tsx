import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, TrendingUp, MousePointerClick, Eye, AlertCircle, Clock, Activity } from 'lucide-react';
import { getMLAnalytics, getEngagementTrends } from '../utils/mlTracking';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MLAnalyticsDashboardProps {
  onBack: () => void;
}

export function MLAnalyticsDashboard({ onBack }: MLAnalyticsDashboardProps) {
  const [analytics, setAnalytics] = useState<any>(null);
  const [engagementData, setEngagementData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [trendDays, setTrendDays] = useState(30);

  useEffect(() => {
    loadAnalytics();
  }, [trendDays]);

  const loadAnalytics = async () => {
    setLoading(true);
    const [analyticsData, trendsData] = await Promise.all([
      getMLAnalytics(),
      getEngagementTrends(trendDays)
    ]);
    setAnalytics(analyticsData);
    setEngagementData(trendsData);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-16 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Button variant="ghost" onClick={onBack} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-muted-foreground">Loading analytics...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Machine Learning Analytics</h1>
          <p className="text-muted-foreground">
            Vendor-agnostic insights from user interactions to continuously improve learning outcomes through ML and human feedback
          </p>
        </div>

        <div className="grid gap-6">
          {/* Most Wrong Questions */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <CardTitle>Most Challenging Questions</CardTitle>
              </div>
              <CardDescription>
                Questions with the highest error rates - prioritize these for content improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analytics?.mostWrongQuestions?.length > 0 ? (
                <div className="space-y-4">
                  {analytics.mostWrongQuestions.map((question: any, index: number) => (
                    <div key={question.questionId} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <p className="font-medium text-sm mb-1">
                            Question {index + 1}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {question.questionText}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-2xl font-bold text-red-500">
                            {question.errorRate.toFixed(1)}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            error rate
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4 text-xs text-muted-foreground mt-2">
                        <span>{question.wrongCount} wrong answers</span>
                        <span>•</span>
                        <span>{question.totalAttempts} total attempts</span>
                      </div>
                      <div className="mt-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded">
                        <p className="text-xs font-medium text-orange-700 dark:text-orange-300">
                          💡 Recommendation: Review this question's wording, add more context, or provide additional learning resources.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No quiz data yet. Data will appear as users complete quizzes.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Most Clicked Content */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MousePointerClick className="w-5 h-5 text-blue-500" />
                <CardTitle>Most Clicked Content</CardTitle>
              </div>
              <CardDescription>
                Content that attracts the most user engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analytics?.mostClickedContent?.length > 0 ? (
                <div className="space-y-3">
                  {analytics.mostClickedContent.map((content: any, index: number) => (
                    <div key={content.contentId} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="text-2xl font-bold text-muted-foreground">
                          #{index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{content.contentTitle}</p>
                          <p className="text-xs text-muted-foreground capitalize">{content.contentType}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-500">
                          {content.clickCount}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          clicks
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No click data yet. Data will appear as users interact with content.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Most Visited Content */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-green-500" />
                <CardTitle>Most Visited Content</CardTitle>
              </div>
              <CardDescription>
                Content with the highest view counts and engagement time
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analytics?.mostVisitedContent?.length > 0 ? (
                <div className="space-y-3">
                  {analytics.mostVisitedContent.map((content: any, index: number) => (
                    <div key={content.contentId} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="text-2xl font-bold text-muted-foreground">
                            #{index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{content.contentTitle}</p>
                            <p className="text-xs text-muted-foreground capitalize">{content.contentType}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-500">
                            {content.visitCount}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            visits
                          </div>
                        </div>
                      </div>
                      {content.avgDuration > 0 && (
                        <div className="text-xs text-muted-foreground mt-2">
                          Avg. time: {Math.floor(content.avgDuration / 60)}m {content.avgDuration % 60}s
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No visit data yet. Data will appear as users view content.
                </p>
              )}
            </CardContent>
          </Card>

          {/* User Engagement Trends - Long-term tracking */}
          <Card className="border-2 border-blue-500/30">
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  <CardTitle>Long-Term Engagement Trends</CardTitle>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={trendDays === 7 ? "default" : "outline"}
                    onClick={() => setTrendDays(7)}
                  >
                    7 Days
                  </Button>
                  <Button
                    size="sm"
                    variant={trendDays === 30 ? "default" : "outline"}
                    onClick={() => setTrendDays(30)}
                  >
                    30 Days
                  </Button>
                  <Button
                    size="sm"
                    variant={trendDays === 90 ? "default" : "outline"}
                    onClick={() => setTrendDays(90)}
                  >
                    90 Days
                  </Button>
                </div>
              </div>
              <CardDescription>
                Tracking session duration and interaction frequency - users must interact at least once every 10 minutes to be counted as engaged
              </CardDescription>
            </CardHeader>
            <CardContent>
              {engagementData && engagementData.trends && engagementData.trends.length > 0 ? (
                <>
                  {/* Summary Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <p className="text-sm font-medium">Avg. Session Duration</p>
                      </div>
                      <p className="text-2xl font-bold">
                        {Math.floor(engagementData.avgSessionDuration / 60)}m {engagementData.avgSessionDuration % 60}s
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Per engaged session
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-green-500" />
                        <p className="text-sm font-medium">Engagement Rate</p>
                      </div>
                      <p className="text-2xl font-bold">
                        {engagementData.engagementRate.toFixed(1)}%
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Sessions with 15-min activity
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-950/20">
                      <div className="flex items-center gap-2 mb-2">
                        <MousePointerClick className="w-4 h-4 text-purple-500" />
                        <p className="text-sm font-medium">Avg. Interactions</p>
                      </div>
                      <p className="text-2xl font-bold">
                        {engagementData.avgInteractions}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Per session (15-min window)
                      </p>
                    </div>
                  </div>

                  {/* Trend Chart */}
                  <div className="w-full h-80 mt-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={engagementData.trends}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12 }}
                          className="text-muted-foreground"
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          className="text-muted-foreground"
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="avgSessionDuration" 
                          name="Avg Session (min)"
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="engagedSessions" 
                          name="Engaged Sessions"
                          stroke="#10b981" 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="totalInteractions" 
                          name="Total Interactions"
                          stroke="#8b5cf6" 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Explanation */}
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      How Engagement is Measured
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1 ml-6">
                      <li>• <strong>Engaged Session:</strong> User must interact (click, scroll, type) at least once every 15 minutes</li>
                      <li>• <strong>Session Duration:</strong> Total time from page load to last interaction</li>
                      <li>• <strong>Interactions:</strong> All user actions (clicks, scrolls, keypresses, touches) within 15-minute windows</li>
                      <li>• <strong>Trend Analysis:</strong> Shows patterns in user behavior over time to identify engagement drops or improvements</li>
                    </ul>
                  </div>

                  {/* Additional Analytics - Most Active Pages */}
                  {engagementData.mostActivePages && engagementData.mostActivePages.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium mb-3">Most Active Pages</h4>
                      <div className="space-y-2">
                        {engagementData.mostActivePages.map((page: any, idx: number) => (
                          <div key={idx} className="flex items-center justify-between p-2 border rounded">
                            <span className="text-sm font-mono">{page.page}</span>
                            <span className="text-sm font-bold text-blue-500">{page.activityCount} activities</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Activity Type Distribution */}
                  {engagementData.activityTypeDistribution && Object.keys(engagementData.activityTypeDistribution).length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium mb-3">Activity Type Distribution</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Object.entries(engagementData.activityTypeDistribution).map(([type, count]: [string, any]) => (
                          <div key={type} className="p-3 border rounded-lg text-center">
                            <p className="text-2xl font-bold text-primary">{count}</p>
                            <p className="text-xs text-muted-foreground capitalize">{type}s</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Total Activities Badge */}
                  {engagementData.totalActivitiesTracked > 0 && (
                    <div className="mt-6 text-center p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                      <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        {engagementData.totalActivitiesTracked.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Total Activities Tracked Across All Sessions
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Every click, scroll, keypress, and touch is captured for comprehensive ML analysis
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-sm text-muted-foreground mb-2">
                    No engagement data yet
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Data will appear as users interact with the platform. Tracking includes ALL user activities: clicks, scrolls, keypresses, touches, focus changes, and page visibility - captured every 30 seconds.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ML Insights */}
          <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <CardTitle>Machine Learning Insights</CardTitle>
              </div>
              <CardDescription>
                How this data powers continuous improvement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">Identify Learning Gaps</p>
                    <p className="text-xs text-muted-foreground">
                      Questions with high error rates indicate areas where learners need additional support or clearer explanations.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">Optimize Content Placement</p>
                    <p className="text-xs text-muted-foreground">
                      Click and visit data reveals which content formats resonate most with learners, guiding content strategy.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">Personalize Learning Paths</p>
                    <p className="text-xs text-muted-foreground">
                      Usage patterns help create adaptive learning experiences tailored to individual learner needs and preferences.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold">
                    4
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">Continuous Improvement</p>
                    <p className="text-xs text-muted-foreground">
                      Machine learning algorithms analyze patterns over time to automatically suggest content improvements and updates.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button onClick={loadAnalytics} variant="outline" className="w-full">
                  Refresh Analytics Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}