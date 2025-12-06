import { ChevronLeft, Award, Trophy, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { getUserProgress } from "../utils/progressSystem";
import { useEffect, useState } from "react";

interface ProgressPageProps {
  onBack: () => void;
  onNavigateToMLAnalytics?: () => void;
}

export function ProgressPage({ onBack, onNavigateToMLAnalytics }: ProgressPageProps) {
  const [progress, setProgress] = useState(getUserProgress());
  
  useEffect(() => {
    // Refresh progress data when component mounts
    setProgress(getUserProgress());
  }, []);
  
  const totalLessons = 11;
  const completedLessons = progress.completedLessons.length;
  const progressPercentage = (completedLessons / totalLessons) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <div className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 -ml-2"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl mb-2">Your Progress</h1>
          <p className="text-muted-foreground">Track your learning journey and achievements</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Progress Overview Card */}
        <Card className="mb-8 border-border bg-card">
          <CardHeader className="pb-4 pt-6 px-6">
            <CardTitle className="text-2xl mb-2">Overall Progress</CardTitle>
            <CardDescription className="text-sm">
              Complete lessons to unlock new content and achievements
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 pb-6 px-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
                <span className="text-lg font-medium whitespace-nowrap">
                  {completedLessons} of {totalLessons} completed
                </span>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl mb-2">{completedLessons}</div>
                      <div className="text-sm text-muted-foreground">Lessons Completed</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl mb-2 flex items-center justify-center gap-2">
                        <Trophy className="h-8 w-8 text-primary" />
                        {progress.totalPoints}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Points</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl mb-2">{progressPercentage.toFixed(0)}%</div>
                      <div className="text-sm text-muted-foreground">Completion Rate</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges Section */}
        <Card className="mb-8 border-border bg-card">
          <CardHeader className="pb-4 pt-6 px-6">
            <CardTitle className="text-xl mb-2 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Badges Earned
            </CardTitle>
            <CardDescription className="text-sm">
              Your achievements and milestones
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 pb-6 px-6">
            {progress.badges.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {progress.badges.map((badge) => (
                  <Card key={badge.id} className="bg-gradient-to-br from-primary/10 to-background border-primary/30">
                    <CardContent className="p-4 text-center">
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <div className="font-medium text-sm mb-1">{badge.name}</div>
                      <div className="text-xs text-muted-foreground">{badge.description}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Award className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No badges earned yet. Complete lessons to earn your first badge!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-border bg-card mb-8">
          <CardHeader className="pb-4 pt-6 px-6">
            <CardTitle className="text-xl mb-2 flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-sm">
              Your latest learning activities and milestones
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 pb-6 px-6">
            {progress.completedLessons.length > 0 ? (
              <div className="space-y-3">
                {progress.completedLessons.slice().reverse().map((completion, index) => (
                  <Card key={index} className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{completion.lessonTitle}</h4>
                          <p className="text-sm text-muted-foreground">
                            Score: {completion.score}/100 • +{completion.pointsEarned} points
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(completion.completedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        {completion.score >= 70 && (
                          <div className="ml-4">
                            <div className="bg-green-500/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                              Passed
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>No activity yet. Start your first lesson to begin tracking your progress!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ML Analytics Link - Admin Access */}
        {onNavigateToMLAnalytics && (
          <Card className="border-primary/30 bg-gradient-to-br from-purple-500/10 to-blue-500/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium mb-1">Machine Learning Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    View insights on content engagement and learning patterns
                  </p>
                </div>
                <Button onClick={onNavigateToMLAnalytics} variant="outline">
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}