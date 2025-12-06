// Progress System Utilities

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface LessonCompletion {
  lessonId: string;
  lessonTitle: string;
  completedAt: string;
  score: number;
  pointsEarned: number;
}

export interface UserProgress {
  totalPoints: number;
  badges: Badge[];
  completedLessons: LessonCompletion[];
}

const STORAGE_KEY = 'ora_user_progress';
const POINTS_PER_LESSON = 100;

// Initialize or get user progress
export function getUserProgress(): UserProgress {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse user progress:', e);
    }
  }
  return {
    totalPoints: 0,
    badges: [],
    completedLessons: []
  };
}

// Save user progress
function saveUserProgress(progress: UserProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// Award points and badge for lesson completion
export function awardLessonCompletion(
  lessonId: string,
  lessonTitle: string,
  score: number
): { pointsEarned: number; newBadge: Badge | null; newProgress: UserProgress } {
  const progress = getUserProgress();
  
  // Check if lesson already completed
  const alreadyCompleted = progress.completedLessons.some(
    completion => completion.lessonId === lessonId
  );
  
  if (alreadyCompleted) {
    return { pointsEarned: 0, newBadge: null, newProgress: progress };
  }
  
  // Award points
  const pointsEarned = POINTS_PER_LESSON;
  progress.totalPoints += pointsEarned;
  
  // Record completion
  const completion: LessonCompletion = {
    lessonId,
    lessonTitle,
    completedAt: new Date().toISOString(),
    score,
    pointsEarned
  };
  progress.completedLessons.push(completion);
  
  // Check for new badges
  const newBadge = checkForNewBadges(progress);
  if (newBadge) {
    progress.badges.push(newBadge);
  }
  
  saveUserProgress(progress);
  
  return { pointsEarned, newBadge, newProgress: progress };
}

// Check if user earned any new badges
function checkForNewBadges(progress: UserProgress): Badge | null {
  const completedCount = progress.completedLessons.length;
  
  // First lesson badge
  if (completedCount === 1 && !hasBadge(progress, 'first-lesson')) {
    return {
      id: 'first-lesson',
      name: 'First Steps',
      description: 'Completed your first lesson',
      icon: '🎯',
      earnedAt: new Date().toISOString()
    };
  }
  
  // Three lessons badge
  if (completedCount === 3 && !hasBadge(progress, 'three-lessons')) {
    return {
      id: 'three-lessons',
      name: 'Getting Started',
      description: 'Completed 3 lessons',
      icon: '🌟',
      earnedAt: new Date().toISOString()
    };
  }
  
  // Five lessons badge
  if (completedCount === 5 && !hasBadge(progress, 'five-lessons')) {
    return {
      id: 'five-lessons',
      name: 'Halfway There',
      description: 'Completed 5 lessons',
      icon: '🚀',
      earnedAt: new Date().toISOString()
    };
  }
  
  // All lessons badge
  if (completedCount === 11 && !hasBadge(progress, 'all-lessons')) {
    return {
      id: 'all-lessons',
      name: 'AI Master',
      description: 'Completed all lessons',
      icon: '🏆',
      earnedAt: new Date().toISOString()
    };
  }
  
  // Perfect score badge
  const hasPerfectScore = progress.completedLessons.some(c => c.score >= 100);
  if (hasPerfectScore && !hasBadge(progress, 'perfect-score')) {
    return {
      id: 'perfect-score',
      name: 'Perfect Score',
      description: 'Achieved a perfect score on a lesson',
      icon: '💯',
      earnedAt: new Date().toISOString()
    };
  }
  
  return null;
}

// Check if user has a specific badge
function hasBadge(progress: UserProgress, badgeId: string): boolean {
  return progress.badges.some(badge => badge.id === badgeId);
}

// Check if lesson is completed
export function isLessonCompleted(lessonId: string): boolean {
  const progress = getUserProgress();
  return progress.completedLessons.some(
    completion => completion.lessonId === lessonId
  );
}

// Get lesson completion details
export function getLessonCompletion(lessonId: string): LessonCompletion | null {
  const progress = getUserProgress();
  return progress.completedLessons.find(
    completion => completion.lessonId === lessonId
  ) || null;
}
