// ML Tracking System for ORA Learning Platform
// Tracks user interactions for machine learning analysis

import * as kv from "./kv_store.tsx";

export interface QuizAnswer {
  userId: string;
  lessonId: string;
  lessonTitle: string;
  questionId: string;
  questionText: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timestamp: string;
}

export interface ContentInteraction {
  userId: string;
  contentId: string;
  contentType: 'lesson' | 'video' | 'pdf' | 'activity' | 'quiz';
  contentTitle: string;
  interactionType: 'click' | 'view' | 'complete';
  timestamp: string;
  duration?: number; // in seconds
}

export interface MLAnalytics {
  mostWrongQuestions: Array<{
    questionId: string;
    questionText: string;
    wrongCount: number;
    totalAttempts: number;
    errorRate: number;
  }>;
  mostClickedContent: Array<{
    contentId: string;
    contentTitle: string;
    contentType: string;
    clickCount: number;
  }>;
  mostVisitedContent: Array<{
    contentId: string;
    contentTitle: string;
    contentType: string;
    visitCount: number;
    avgDuration: number;
  }>;
}

export interface EngagementData {
  userId: string;
  sessionId: string;
  sessionDuration: number; // in seconds
  interactionCount: number;
  isEngaged: boolean; // true if user interacted at least once every 15 minutes
  timestamp: string;
  activityBreakdown?: any; // breakdown by interaction type
  recentActivityCount?: number;
}

export interface UserActivity {
  sessionId: string;
  userId: string;
  type: string; // click, scroll, keypress, etc.
  timestamp: string;
  sessionDuration: number;
  details: any; // url, page, element clicked, etc.
}

export interface EngagementTrends {
  trends: Array<{
    date: string;
    avgSessionDuration: number; // in minutes
    engagedSessions: number;
    totalInteractions: number;
    totalActivities: number;
    uniqueUsers: number;
    activityBreakdown: any; // clicks, scrolls, etc.
  }>;
  avgSessionDuration: number; // overall average in seconds
  engagementRate: number; // percentage of engaged sessions
  avgInteractions: number; // average interactions per engaged session
  totalActivitiesTracked: number;
  mostActivePages: Array<{ page: string; activityCount: number }>;
  activityTypeDistribution: any;
}

// Track quiz answer
export async function trackQuizAnswer(answer: QuizAnswer): Promise<void> {
  const key = `ml:quiz:${answer.userId}:${Date.now()}`;
  await kv.set(key, answer);
  
  // Also track aggregated wrong answers by question
  if (!answer.isCorrect) {
    const wrongKey = `ml:wrong:${answer.questionId}`;
    const existing = await kv.get(wrongKey);
    const wrongData = existing ? JSON.parse(existing) : {
      questionId: answer.questionId,
      questionText: answer.questionText,
      wrongCount: 0,
      totalAttempts: 0,
      userIds: []
    };
    
    wrongData.wrongCount += 1;
    wrongData.totalAttempts += 1;
    if (!wrongData.userIds.includes(answer.userId)) {
      wrongData.userIds.push(answer.userId);
    }
    
    await kv.set(wrongKey, JSON.stringify(wrongData));
  }
  
  // Track total attempts
  const attemptsKey = `ml:attempts:${answer.questionId}`;
  const attempts = await kv.get(attemptsKey);
  const attemptsCount = attempts ? parseInt(attempts) : 0;
  await kv.set(attemptsKey, String(attemptsCount + 1));
}

// Track content interaction
export async function trackContentInteraction(interaction: ContentInteraction): Promise<void> {
  const key = `ml:interaction:${interaction.userId}:${Date.now()}`;
  await kv.set(key, interaction);
  
  // Track aggregated clicks
  if (interaction.interactionType === 'click') {
    const clickKey = `ml:clicks:${interaction.contentId}`;
    const existing = await kv.get(clickKey);
    const clickData = existing ? JSON.parse(existing) : {
      contentId: interaction.contentId,
      contentTitle: interaction.contentTitle,
      contentType: interaction.contentType,
      clickCount: 0
    };
    
    clickData.clickCount += 1;
    await kv.set(clickKey, JSON.stringify(clickData));
  }
  
  // Track aggregated visits
  if (interaction.interactionType === 'view') {
    const visitKey = `ml:visits:${interaction.contentId}`;
    const existing = await kv.get(visitKey);
    const visitData = existing ? JSON.parse(existing) : {
      contentId: interaction.contentId,
      contentTitle: interaction.contentTitle,
      contentType: interaction.contentType,
      visitCount: 0,
      totalDuration: 0
    };
    
    visitData.visitCount += 1;
    if (interaction.duration) {
      visitData.totalDuration += interaction.duration;
    }
    await kv.set(visitKey, JSON.stringify(visitData));
  }
}

// Get ML analytics
export async function getMLAnalytics(): Promise<MLAnalytics> {
  // Get most wrong questions
  const wrongKeys = await kv.getByPrefix('ml:wrong:');
  const wrongQuestions = wrongKeys
    .map(item => {
      try {
        const data = JSON.parse(item.value);
        return {
          questionId: data.questionId,
          questionText: data.questionText,
          wrongCount: data.wrongCount,
          totalAttempts: data.totalAttempts,
          errorRate: (data.wrongCount / data.totalAttempts) * 100
        };
      } catch {
        return null;
      }
    })
    .filter(item => item !== null)
    .sort((a, b) => b!.wrongCount - a!.wrongCount)
    .slice(0, 10) as MLAnalytics['mostWrongQuestions'];
  
  // Get most clicked content
  const clickKeys = await kv.getByPrefix('ml:clicks:');
  const clickedContent = clickKeys
    .map(item => {
      try {
        return JSON.parse(item.value);
      } catch {
        return null;
      }
    })
    .filter(item => item !== null)
    .sort((a, b) => b!.clickCount - a!.clickCount)
    .slice(0, 10);
  
  // Get most visited content
  const visitKeys = await kv.getByPrefix('ml:visits:');
  const visitedContent = visitKeys
    .map(item => {
      try {
        const data = JSON.parse(item.value);
        return {
          contentId: data.contentId,
          contentTitle: data.contentTitle,
          contentType: data.contentType,
          visitCount: data.visitCount,
          avgDuration: data.visitCount > 0 ? data.totalDuration / data.visitCount : 0
        };
      } catch {
        return null;
      }
    })
    .filter(item => item !== null)
    .sort((a, b) => b!.visitCount - a!.visitCount)
    .slice(0, 10) as MLAnalytics['mostVisitedContent'];
  
  return {
    mostWrongQuestions: wrongQuestions,
    mostClickedContent: clickedContent,
    mostVisitedContent: visitedContent
  };
}

// Get user's content progress (for quiz locking)
export async function getUserContentProgress(userId: string, lessonId: string): Promise<{
  clickedItems: string[];
  viewedItems: string[];
  completedItems: string[];
}> {
  const interactionKeys = await kv.getByPrefix(`ml:interaction:${userId}:`);
  const interactions = interactionKeys
    .map(item => {
      try {
        return JSON.parse(item.value) as ContentInteraction;
      } catch {
        return null;
      }
    })
    .filter(item => item !== null && item!.contentId.startsWith(lessonId));
  
  const clickedItems = [...new Set(
    interactions
      .filter(i => i!.interactionType === 'click')
      .map(i => i!.contentId)
  )];
  
  const viewedItems = [...new Set(
    interactions
      .filter(i => i!.interactionType === 'view')
      .map(i => i!.contentId)
  )];
  
  const completedItems = [...new Set(
    interactions
      .filter(i => i!.interactionType === 'complete')
      .map(i => i!.contentId)
  )];
  
  return {
    clickedItems,
    viewedItems,
    completedItems
  };
}

// Track user engagement data
export async function trackEngagement(engagement: EngagementData): Promise<void> {
  const key = `ml:engagement:${engagement.userId}:${engagement.sessionId}`;
  await kv.set(key, JSON.stringify(engagement));
  
  // Also store by date for trend analysis
  const date = new Date(engagement.timestamp).toISOString().split('T')[0];
  const dateKey = `ml:engagement:date:${date}:${engagement.sessionId}`;
  await kv.set(dateKey, JSON.stringify(engagement));
}

// Get engagement trends over time
export async function getEngagementTrends(days: number = 30): Promise<EngagementTrends> {
  // Get all engagement data for the specified time period
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  // Collect all engagement data
  const allEngagementKeys = await kv.getByPrefix('ml:engagement:date:');
  const engagementData = allEngagementKeys
    .map(item => {
      try {
        return JSON.parse(item.value) as EngagementData;
      } catch {
        return null;
      }
    })
    .filter(item => {
      if (!item) return false;
      const itemDate = new Date(item.timestamp);
      return itemDate >= startDate && itemDate <= endDate;
    }) as EngagementData[];
  
  if (engagementData.length === 0) {
    return {
      trends: [],
      avgSessionDuration: 0,
      engagementRate: 0,
      avgInteractions: 0,
      totalActivitiesTracked: 0,
      mostActivePages: [],
      activityTypeDistribution: {}
    };
  }
  
  // Group by date
  const dateGroups: { [date: string]: EngagementData[] } = {};
  engagementData.forEach(item => {
    const date = new Date(item.timestamp).toISOString().split('T')[0];
    if (!dateGroups[date]) {
      dateGroups[date] = [];
    }
    dateGroups[date].push(item);
  });
  
  // Calculate trends for each date
  const trends = Object.entries(dateGroups)
    .map(([date, sessions]) => {
      const engagedSessions = sessions.filter(s => s.isEngaged);
      const avgDuration = sessions.length > 0
        ? sessions.reduce((sum, s) => sum + s.sessionDuration, 0) / sessions.length
        : 0;
      const totalInteractions = sessions.reduce((sum, s) => sum + s.interactionCount, 0);
      
      // Calculate total activities and unique users
      const totalActivities = sessions.reduce((sum, s) => sum + (s.activityBreakdown ? Object.values(s.activityBreakdown).reduce((a, b) => a + b, 0) : 0), 0);
      const uniqueUsers = new Set(sessions.map(s => s.userId)).size;
      
      return {
        date,
        avgSessionDuration: Math.round(avgDuration / 60), // convert to minutes
        engagedSessions: engagedSessions.length,
        totalInteractions,
        totalActivities,
        uniqueUsers,
        activityBreakdown: sessions.reduce((acc, s) => {
          if (s.activityBreakdown) {
            Object.keys(s.activityBreakdown).forEach(key => {
              if (!acc[key]) acc[key] = 0;
              acc[key] += s.activityBreakdown[key];
            });
          }
          return acc;
        }, {} as any)
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
  
  // Calculate overall statistics
  const engagedSessions = engagementData.filter(s => s.isEngaged);
  const avgSessionDuration = engagedSessions.length > 0
    ? Math.round(engagedSessions.reduce((sum, s) => sum + s.sessionDuration, 0) / engagedSessions.length)
    : 0;
  
  const engagementRate = engagementData.length > 0
    ? (engagedSessions.length / engagementData.length) * 100
    : 0;
  
  const avgInteractions = engagedSessions.length > 0
    ? Math.round(engagedSessions.reduce((sum, s) => sum + s.interactionCount, 0) / engagedSessions.length)
    : 0;
  
  // Calculate total activities tracked
  const totalActivitiesTracked = engagementData.reduce((sum, s) => sum + (s.activityBreakdown ? Object.values(s.activityBreakdown).reduce((a, b) => a + b, 0) : 0), 0);
  
  // Calculate most active pages
  const activityKeys = await kv.getByPrefix('ml:activity:');
  const activities = activityKeys
    .map(item => {
      try {
        return JSON.parse(item.value) as UserActivity;
      } catch {
        return null;
      }
    })
    .filter(item => item !== null && new Date(item.timestamp) >= startDate && new Date(item.timestamp) <= endDate) as UserActivity[];
  
  const pageActivityCount: { [page: string]: number } = {};
  activities.forEach(activity => {
    if (activity.details && activity.details.url) {
      const page = new URL(activity.details.url).pathname;
      if (!pageActivityCount[page]) {
        pageActivityCount[page] = 0;
      }
      pageActivityCount[page] += 1;
    }
  });
  
  const mostActivePages = Object.entries(pageActivityCount)
    .map(([page, count]) => ({ page, activityCount: count }))
    .sort((a, b) => b.activityCount - a.activityCount)
    .slice(0, 10);
  
  // Calculate activity type distribution
  const activityTypeDistribution: { [type: string]: number } = {};
  activities.forEach(activity => {
    if (!activityTypeDistribution[activity.type]) {
      activityTypeDistribution[activity.type] = 0;
    }
    activityTypeDistribution[activity.type] += 1;
  });
  
  return {
    trends,
    avgSessionDuration,
    engagementRate,
    avgInteractions,
    totalActivitiesTracked,
    mostActivePages,
    activityTypeDistribution
  };
}

// Circuit breaker state to prevent database overload
let circuitBreakerOpen = false;
let circuitBreakerResetTime = 0;
let consecutiveFailures = 0;
const MAX_CONSECUTIVE_FAILURES = 3;
const CIRCUIT_BREAKER_RESET_MS = 60000; // 1 minute

// EMERGENCY KILL SWITCH - Set to true to completely disable activity tracking
const EMERGENCY_DISABLE_TRACKING = true;

// Track all user activities in batch
export async function trackAllActivity(activities: UserActivity[]): Promise<void> {
  // EMERGENCY KILL SWITCH - Completely disable tracking to protect database
  if (EMERGENCY_DISABLE_TRACKING) {
    return; // Silent return - no logging to reduce noise
  }
  
  // Check if circuit breaker should be reset
  if (circuitBreakerOpen && Date.now() >= circuitBreakerResetTime) {
    circuitBreakerOpen = false;
    consecutiveFailures = 0;
    console.log('Circuit breaker CLOSED - resuming activity tracking');
  }
  
  // EMERGENCY CIRCUIT BREAKER: Skip tracking if circuit is open
  if (circuitBreakerOpen) {
    console.log('Circuit breaker open - skipping activity tracking to protect database');
    return;
  }
  
  try {
    // ULTRA AGGRESSIVE LIMITS to prevent database overload
    const MAX_ACTIVITIES = 5; // Further reduced from 10 to 5
    if (activities.length > MAX_ACTIVITIES) {
      console.log(`Emergency throttling: Received ${activities.length} activities, processing only first ${MAX_ACTIVITIES}`);
      activities = activities.slice(0, MAX_ACTIVITIES);
    }
    
    // Helper function to add delay between batches
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    
    // ONLY STORE AGGREGATED DATA - DO NOT store individual activities
    // This reduces database writes by ~95%
    const dateActivityCounts: { [dateType: string]: number } = {};
    
    activities.forEach(activity => {
      const date = new Date(activity.timestamp).toISOString().split('T')[0];
      const dateType = `${date}:${activity.type}`;
      
      if (!dateActivityCounts[dateType]) {
        dateActivityCounts[dateType] = 0;
      }
      dateActivityCounts[dateType] += 1;
    });
    
    // Update ONLY aggregated counts - one DB write per activity type per day instead of per activity
    const aggregateEntries = Object.entries(dateActivityCounts);
    
    // Process ONE at a time with 1 SECOND delays (ultra ultra conservative)
    for (const [dateType, count] of aggregateEntries) {
      try {
        const key = `ml:activity:agg:${dateType}`;
        const existing = await kv.get(key);
        const currentCount = existing ? parseInt(existing) : 0;
        await kv.set(key, String(currentCount + count));
        
        // Wait 1 FULL SECOND between each write to avoid overwhelming database
        await delay(1000);
      } catch (error) {
        // Track failures for circuit breaker
        consecutiveFailures++;
        
        if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
          // Open circuit breaker
          circuitBreakerOpen = true;
          circuitBreakerResetTime = Date.now() + CIRCUIT_BREAKER_RESET_MS;
          console.log(`Circuit breaker OPENED after ${consecutiveFailures} consecutive failures`);
        }
        
        throw error; // Re-throw to trigger outer catch
      }
    }
    
    // Reset failure counter on success
    consecutiveFailures = 0;
    
  } catch (error) {
    // Silently fail - activity tracking should NEVER break the user experience
    console.log('Activity tracking failed - system protecting database');
  }
}