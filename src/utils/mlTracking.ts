// Frontend ML Tracking Utilities
import { projectId, publicAnonKey } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-3504d096`;

// 🔴 EMERGENCY KILL SWITCH - Set to true to completely disable all ML tracking
// This prevents ANY tracking requests from reaching the backend
const EMERGENCY_DISABLE_ALL_TRACKING = true;

// Get or create a unique user ID
export function getUserId(): string {
  let userId = localStorage.getItem('ora_user_id');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('ora_user_id', userId);
  }
  return userId;
}

// Track quiz answer for ML analysis
export async function trackQuizAnswer(
  lessonId: string,
  lessonTitle: string,
  questionId: string,
  questionText: string,
  userAnswer: string,
  correctAnswer: string,
  isCorrect: boolean
): Promise<void> {
  if (EMERGENCY_DISABLE_ALL_TRACKING) return;
  
  try {
    const userId = getUserId();
    await fetch(`${API_BASE}/ml/track-quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify({
        userId,
        lessonId,
        lessonTitle,
        questionId,
        questionText,
        userAnswer,
        correctAnswer,
        isCorrect,
        timestamp: new Date().toISOString()
      })
    });
  } catch (error) {
    console.error('Failed to track quiz answer:', error);
  }
}

// Track content interaction (click, view, complete)
export async function trackContentInteraction(
  contentId: string,
  contentType: 'lesson' | 'video' | 'pdf' | 'activity' | 'quiz',
  contentTitle: string,
  interactionType: 'click' | 'view' | 'complete',
  duration?: number
): Promise<void> {
  if (EMERGENCY_DISABLE_ALL_TRACKING) return;
  
  try {
    const userId = getUserId();
    await fetch(`${API_BASE}/ml/track-interaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify({
        userId,
        contentId,
        contentType,
        contentTitle,
        interactionType,
        timestamp: new Date().toISOString(),
        duration
      })
    });
  } catch (error) {
    console.error('Failed to track content interaction:', error);
  }
}

// Get ML analytics (admin use)
export async function getMLAnalytics() {
  try {
    const response = await fetch(`${API_BASE}/ml/analytics`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch analytics');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get ML analytics:', error);
    return null;
  }
}

// Check if user can access quiz (has completed all required content)
export async function canAccessQuiz(
  lessonId: string,
  requiredContentIds: string[]
): Promise<{ canAccess: boolean; missingContent: string[] }> {
  try {
    const userId = getUserId();
    const response = await fetch(`${API_BASE}/ml/progress/${userId}/${lessonId}`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch progress');
    }
    
    const progress = await response.json();
    const viewedAndCompleted = [...new Set([...progress.viewedItems, ...progress.completedItems])];
    
    // Check which required content is missing
    const missingContent = requiredContentIds.filter(
      contentId => !viewedAndCompleted.includes(contentId)
    );
    
    return {
      canAccess: missingContent.length === 0,
      missingContent
    };
  } catch (error) {
    console.error('Failed to check quiz access:', error);
    // Default to allowing access if there's an error
    return { canAccess: true, missingContent: [] };
  }
}

// Track lesson section view with duration tracking
export class ContentViewTracker {
  private contentId: string;
  private contentType: 'lesson' | 'video' | 'pdf' | 'activity' | 'quiz';
  private contentTitle: string;
  private startTime: number;

  constructor(contentId: string, contentType: 'lesson' | 'video' | 'pdf' | 'activity' | 'quiz', contentTitle: string) {
    this.contentId = contentId;
    this.contentType = contentType;
    this.contentTitle = contentTitle;
    this.startTime = Date.now();
    
    // Track initial view
    trackContentInteraction(contentId, contentType, contentTitle, 'view');
  }

  // Call this when user completes the content
  complete(): void {
    const duration = Math.floor((Date.now() - this.startTime) / 1000); // in seconds
    trackContentInteraction(
      this.contentId,
      this.contentType,
      this.contentTitle,
      'complete',
      duration
    );
  }

  // Call this when user leaves without completing
  end(): void {
    const duration = Math.floor((Date.now() - this.startTime) / 1000);
    trackContentInteraction(
      this.contentId,
      this.contentType,
      this.contentTitle,
      'view',
      duration
    );
  }
}

// User Engagement Tracker - tracks active sessions and interaction frequency
// Users must interact at least once every 10 minutes per page visit to be counted as engaged
export class EngagementTracker {
  private sessionId: string;
  private startTime: number;
  private lastInteraction: number;
  private interactionCount: number;
  private checkInterval: NodeJS.Timeout | null;
  private activityLog: Array<{ type: string; timestamp: number }>;
  private batchQueue: Array<any>;
  private batchInterval: NodeJS.Timeout | null;
  
  constructor() {
    this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.startTime = Date.now();
    this.lastInteraction = Date.now();
    this.interactionCount = 0;
    this.checkInterval = null;
    this.activityLog = [];
    this.batchQueue = [];
    this.batchInterval = null;
    
    this.startTracking();
  }
  
  private startTracking(): void {
    // Check every 10 minutes if user has interacted
    this.checkInterval = setInterval(() => {
      this.checkEngagement();
    }, 10 * 60 * 1000); // 10 minutes
    
    // Batch send activity data every 30 seconds to avoid overwhelming the server
    this.batchInterval = setInterval(() => {
      this.sendBatchedActivity();
    }, 30 * 1000); // 30 seconds
    
    // Track all user interactions
    this.attachEventListeners();
  }
  
  private attachEventListeners(): void {
    // Track all interaction types
    const interactionEvents = [
      { event: 'click', type: 'click' },
      { event: 'scroll', type: 'scroll' },
      { event: 'keypress', type: 'keypress' },
      { event: 'mousemove', type: 'mousemove' },
      { event: 'touchstart', type: 'touch' },
      { event: 'touchmove', type: 'touch' },
      { event: 'focus', type: 'focus' },
      { event: 'blur', type: 'blur' }
    ];
    
    interactionEvents.forEach(({ event, type }) => {
      document.addEventListener(event, (e) => this.recordInteraction(type, e), { passive: true });
    });
    
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      this.recordInteraction('visibility', { hidden: document.hidden });
    });
  }
  
  recordInteraction(type: string = 'generic', eventData?: any): void {
    const now = Date.now();
    this.lastInteraction = now;
    this.interactionCount++;
    
    // Log the activity with details
    const activity = {
      sessionId: this.sessionId,
      userId: getUserId(),
      type,
      timestamp: new Date(now).toISOString(),
      sessionDuration: Math.floor((now - this.startTime) / 1000),
      // Capture additional context for certain events
      details: this.getEventDetails(type, eventData)
    };
    
    this.activityLog.push({ type, timestamp: now });
    this.batchQueue.push(activity);
    
    // Keep activity log manageable (last 1000 interactions)
    if (this.activityLog.length > 1000) {
      this.activityLog.shift();
    }
  }
  
  private getEventDetails(type: string, eventData?: any): any {
    const details: any = {
      url: window.location.pathname,
      pageTitle: document.title
    };
    
    if (type === 'click' && eventData?.target) {
      const target = eventData.target as HTMLElement;
      details.element = target.tagName;
      details.id = target.id || null;
      details.className = target.className || null;
      details.text = target.innerText?.substring(0, 50) || null;
    }
    
    if (type === 'visibility') {
      details.hidden = eventData?.hidden;
    }
    
    return details;
  }
  
  private async sendBatchedActivity(): Promise<void> {
    // 🔴 EMERGENCY KILL SWITCH - Do not send any tracking data
    if (EMERGENCY_DISABLE_ALL_TRACKING) {
      this.batchQueue = []; // Clear the queue
      return;
    }
    
    if (this.batchQueue.length === 0) return;
    
    const activitiesToSend = [...this.batchQueue];
    this.batchQueue = [];
    
    try {
      await fetch(`${API_BASE}/ml/track-all-activity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          activities: activitiesToSend
        })
      });
    } catch (error) {
      console.error('Failed to send batched activity:', error);
      // Re-queue failed items (up to a limit)
      if (this.batchQueue.length < 500) {
        this.batchQueue = [...activitiesToSend.slice(-100), ...this.batchQueue];
      }
    }
  }
  
  private async checkEngagement(): Promise<void> {
    const now = Date.now();
    const timeSinceLastInteraction = now - this.lastInteraction;
    const sessionDuration = Math.floor((now - this.startTime) / 1000); // in seconds
    
    // If user has interacted in the last 10 minutes
    if (timeSinceLastInteraction < 10 * 60 * 1000) {
      await this.trackEngagement(sessionDuration, true);
    } else {
      await this.trackEngagement(sessionDuration, false);
    }
  }
  
  private async trackEngagement(sessionDuration: number, isEngaged: boolean): Promise<void> {
    // 🔴 EMERGENCY KILL SWITCH - Do not send any tracking data
    if (EMERGENCY_DISABLE_ALL_TRACKING) return;
    
    try {
      const userId = getUserId();
      
      // Calculate activity metrics - tracking interactions within the last 10 minutes
      const recentActivity = this.activityLog.filter(
        a => Date.now() - a.timestamp < 10 * 60 * 1000
      );
      
      const activityBreakdown = this.getActivityBreakdown(recentActivity);
      
      await fetch(`${API_BASE}/ml/track-engagement`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          userId,
          sessionId: this.sessionId,
          sessionDuration,
          interactionCount: this.interactionCount,
          isEngaged,
          timestamp: new Date().toISOString(),
          activityBreakdown,
          recentActivityCount: recentActivity.length
        })
      });
    } catch (error) {
      console.error('Failed to track engagement:', error);
    }
  }
  
  private getActivityBreakdown(activities: Array<{ type: string; timestamp: number }>): any {
    const breakdown: any = {};
    activities.forEach(a => {
      breakdown[a.type] = (breakdown[a.type] || 0) + 1;
    });
    return breakdown;
  }
  
  // Call this when the session ends (page unload)
  async endSession(): Promise<void> {
    // Send any remaining batched activity
    await this.sendBatchedActivity();
    
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
    
    if (this.batchInterval) {
      clearInterval(this.batchInterval);
    }
    
    const sessionDuration = Math.floor((Date.now() - this.startTime) / 1000);
    const timeSinceLastInteraction = Date.now() - this.lastInteraction;
    const isEngaged = timeSinceLastInteraction < 10 * 60 * 1000;
    
    await this.trackEngagement(sessionDuration, isEngaged);
  }
  
  // Get current session stats
  getSessionStats() {
    return {
      sessionId: this.sessionId,
      duration: Math.floor((Date.now() - this.startTime) / 1000),
      totalInteractions: this.interactionCount,
      recentActivityLog: this.activityLog.slice(-50)
    };
  }
}

// Get engagement trends for analytics
export async function getEngagementTrends(days: number = 30) {
  try {
    const response = await fetch(`${API_BASE}/ml/engagement-trends?days=${days}`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch engagement trends');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get engagement trends:', error);
    return null;
  }
}

// Initialize global engagement tracker
let globalEngagementTracker: EngagementTracker | null = null;

export function initEngagementTracking(): EngagementTracker {
  if (!globalEngagementTracker) {
    globalEngagementTracker = new EngagementTracker();
    
    // Track session end on page unload
    window.addEventListener('beforeunload', () => {
      if (globalEngagementTracker) {
        globalEngagementTracker.endSession();
      }
    });
  }
  
  return globalEngagementTracker;
}