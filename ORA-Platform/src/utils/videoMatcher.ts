import { heygenVideos, HeyGenVideo } from '../data/heygenVideos';

/**
 * Match user query to relevant HeyGen videos based on keywords
 * @param query - User's question or search term
 * @param limit - Maximum number of videos to return (default: 3)
 * @returns Array of matching videos sorted by relevance
 */
export function findRelevantVideos(query: string, limit: number = 3): HeyGenVideo[] {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(' ').filter(word => word.length > 3);
  
  // Score each video based on keyword matches
  const scoredVideos = heygenVideos.map(video => {
    let score = 0;
    
    // Check exact title match (highest weight)
    if (video.title.toLowerCase().includes(queryLower)) {
      score += 10;
    }
    
    // Check description match (medium weight)
    if (video.description.toLowerCase().includes(queryLower)) {
      score += 5;
    }
    
    // Check category match
    if (video.category.toLowerCase().includes(queryLower)) {
      score += 7;
    }
    
    // Check keyword matches (lower weight but comprehensive)
    video.keywords.forEach(keyword => {
      const keywordLower = keyword.toLowerCase();
      
      // Exact keyword match in query
      if (queryLower.includes(keywordLower)) {
        score += 3;
      }
      
      // Partial word matches
      queryWords.forEach(word => {
        if (keywordLower.includes(word) || word.includes(keywordLower)) {
          score += 1;
        }
      });
    });
    
    return { video, score };
  });
  
  // Sort by score (highest first) and return top matches
  return scoredVideos
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.video);
}

/**
 * Get videos by category
 * @param category - Category name to filter by
 * @returns Array of videos in that category
 */
export function getVideosByCategory(category: string): HeyGenVideo[] {
  return heygenVideos.filter(video => 
    video.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get all unique categories from videos
 * @returns Array of category names
 */
export function getAllCategories(): string[] {
  return [...new Set(heygenVideos.map(video => video.category))];
}

/**
 * Get video by ID
 * @param id - Video ID to find
 * @returns Video object or undefined if not found
 */
export function getVideoById(id: string): HeyGenVideo | undefined {
  return heygenVideos.find(video => video.id === id);
}

/**
 * Get random videos for suggestions
 * @param count - Number of random videos to return
 * @returns Array of random videos
 */
export function getRandomVideos(count: number = 3): HeyGenVideo[] {
  const shuffled = [...heygenVideos].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Check if query should trigger video recommendations
 * Common patterns that suggest user wants video content
 * @param query - User's message
 * @returns Boolean indicating if videos should be shown
 */
export function shouldShowVideos(query: string): boolean {
  const videoTriggers = [
    'video',
    'watch',
    'show me',
    'tutorial',
    'learn',
    'how to',
    'what is',
    'explain',
    'guide',
    'help',
    'teach'
  ];
  
  const queryLower = query.toLowerCase();
  return videoTriggers.some(trigger => queryLower.includes(trigger));
}
