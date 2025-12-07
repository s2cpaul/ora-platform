# HeyGen Video Integration Guide

## Overview
This guide shows you how to integrate HeyGen videos into your ORA AI Assistant, enabling the AI to recommend relevant video content based on user questions and keyword topics.

---

## STEP 1: Understand HeyGen Integration Options

### 1.1 HeyGen API Options
- **Option A**: HeyGen API (requires HeyGen account)
- **Option B**: Embed pre-generated HeyGen videos (simpler, recommended to start)
- **Option C**: HeyGen Streaming Avatar API (advanced, real-time)

**Recommended for your use case**: Option B (Embed videos) with keyword matching

---

## STEP 2: Prepare Your HeyGen Videos

### 2.1 Create HeyGen Account
1. Go to [HeyGen.com](https://www.heygen.com/)
2. Sign up for an account
3. Choose a plan (Free tier available to start)

### 2.2 Create Training Videos
Create videos for your key topics:
- AI Governance & Ethics
- AI Implementation Strategies
- Career Transition for Veterans
- AI Tools & Technologies
- Organizational Blind Spots
- Leadership in AI Era

### 2.3 Get Video URLs
1. After creating each video in HeyGen
2. Click **Share** or **Export**
3. Get the embed code or direct video URL
4. Copy the video ID or full URL

---

## STEP 3: Create Video Knowledge Base

### 3.1 Create Video Configuration File

Create a new file: `/data/heygenVideos.ts`

```typescript
export interface HeyGenVideo {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  videoUrl: string;
  embedCode?: string;
  duration: string;
  thumbnail?: string;
  category: string;
}

export const heygenVideos: HeyGenVideo[] = [
  {
    id: "video-001",
    title: "AI Governance Fundamentals",
    description: "Understanding AI governance frameworks and best practices for organizations",
    keywords: [
      "governance", 
      "ethics", 
      "ai governance", 
      "compliance", 
      "policy",
      "framework",
      "regulations"
    ],
    videoUrl: "https://app.heygen.com/share/YOUR_VIDEO_ID_1",
    embedCode: '<iframe src="https://app.heygen.com/embeds/YOUR_VIDEO_ID_1"></iframe>',
    duration: "5:30",
    thumbnail: "https://your-thumbnail-url.com/video-001.jpg",
    category: "AI Governance"
  },
  {
    id: "video-002",
    title: "Career Transition with AI",
    description: "How veterans can leverage AI skills for career advancement",
    keywords: [
      "career", 
      "transition", 
      "veterans", 
      "job search", 
      "military",
      "employment",
      "skills"
    ],
    videoUrl: "https://app.heygen.com/share/YOUR_VIDEO_ID_2",
    embedCode: '<iframe src="https://app.heygen.com/embeds/YOUR_VIDEO_ID_2"></iframe>',
    duration: "7:15",
    thumbnail: "https://your-thumbnail-url.com/video-002.jpg",
    category: "Career Development"
  },
  {
    id: "video-003",
    title: "AI Implementation Strategy",
    description: "Step-by-step guide to implementing AI in your organization",
    keywords: [
      "implementation", 
      "strategy", 
      "deployment", 
      "adoption",
      "integration",
      "planning",
      "roadmap"
    ],
    videoUrl: "https://app.heygen.com/share/YOUR_VIDEO_ID_3",
    embedCode: '<iframe src="https://app.heygen.com/embeds/YOUR_VIDEO_ID_3"></iframe>',
    duration: "6:45",
    thumbnail: "https://your-thumbnail-url.com/video-003.jpg",
    category: "AI Strategy"
  },
  {
    id: "video-004",
    title: "Organizational Blind Spots in AI",
    description: "Identifying and addressing common organizational blind spots when adopting AI",
    keywords: [
      "blind spots", 
      "organization", 
      "challenges", 
      "risks",
      "pitfalls",
      "mistakes",
      "awareness"
    ],
    videoUrl: "https://app.heygen.com/share/YOUR_VIDEO_ID_4",
    embedCode: '<iframe src="https://app.heygen.com/embeds/YOUR_VIDEO_ID_4"></iframe>',
    duration: "8:20",
    thumbnail: "https://your-thumbnail-url.com/video-004.jpg",
    category: "AI Governance"
  },
  {
    id: "video-005",
    title: "AI Tools for Beginners",
    description: "Essential AI tools every professional should know",
    keywords: [
      "tools", 
      "beginner", 
      "chatgpt", 
      "software",
      "applications",
      "getting started",
      "basics"
    ],
    videoUrl: "https://app.heygen.com/share/YOUR_VIDEO_ID_5",
    embedCode: '<iframe src="https://app.heygen.com/embeds/YOUR_VIDEO_ID_5"></iframe>',
    duration: "4:50",
    thumbnail: "https://your-thumbnail-url.com/video-005.jpg",
    category: "AI Tools"
  }
];
```

---

## STEP 4: Create Video Matching Service

### 4.1 Create Video Matcher Utility

Create a new file: `/utils/videoMatcher.ts`

```typescript
import { heygenVideos, HeyGenVideo } from '../data/heygenVideos';

/**
 * Match user query to relevant HeyGen videos based on keywords
 */
export function findRelevantVideos(query: string, limit: number = 3): HeyGenVideo[] {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(' ').filter(word => word.length > 3);
  
  // Score each video based on keyword matches
  const scoredVideos = heygenVideos.map(video => {
    let score = 0;
    
    // Check title match
    if (video.title.toLowerCase().includes(queryLower)) {
      score += 10;
    }
    
    // Check description match
    if (video.description.toLowerCase().includes(queryLower)) {
      score += 5;
    }
    
    // Check keyword matches
    video.keywords.forEach(keyword => {
      if (queryLower.includes(keyword.toLowerCase())) {
        score += 3;
      }
      
      // Check partial word matches
      queryWords.forEach(word => {
        if (keyword.toLowerCase().includes(word)) {
          score += 1;
        }
      });
    });
    
    return { video, score };
  });
  
  // Sort by score and return top matches
  return scoredVideos
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.video);
}

/**
 * Get videos by category
 */
export function getVideosByCategory(category: string): HeyGenVideo[] {
  return heygenVideos.filter(video => 
    video.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  return [...new Set(heygenVideos.map(video => video.category))];
}

/**
 * Get video by ID
 */
export function getVideoById(id: string): HeyGenVideo | undefined {
  return heygenVideos.find(video => video.id === id);
}
```

---

## STEP 5: Create Video Player Component

### 5.1 Create HeyGen Video Component

Create a new file: `/components/HeyGenVideoPlayer.tsx`

```typescript
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Play, ExternalLink, Clock } from "lucide-react";
import { HeyGenVideo } from "../data/heygenVideos";

interface HeyGenVideoPlayerProps {
  video: HeyGenVideo;
  autoPlay?: boolean;
}

export function HeyGenVideoPlayer({ video, autoPlay = false }: HeyGenVideoPlayerProps) {
  return (
    <Card className="border-primary/20 bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-base lg:text-lg mb-1">{video.title}</CardTitle>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              {video.duration}
              <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                {video.category}
              </span>
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Video Embed */}
        <div className="relative w-full aspect-video bg-black/5 rounded-lg overflow-hidden">
          {video.embedCode ? (
            <div 
              dangerouslySetInnerHTML={{ __html: video.embedCode }}
              className="w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.open(video.videoUrl, '_blank')}
                className="gap-2"
              >
                <Play className="h-5 w-5" />
                Watch Video
              </Button>
            </div>
          )}
        </div>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground">
          {video.description}
        </p>
        
        {/* Action Button */}
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full gap-2"
          onClick={() => window.open(video.videoUrl, '_blank')}
        >
          <ExternalLink className="h-4 w-4" />
          Open in HeyGen
        </Button>
      </CardContent>
    </Card>
  );
}
```

---

## STEP 6: Update AI Agent with Video Integration

The AIAgent component needs to be updated to:
1. Detect when to recommend videos
2. Use keyword matching to find relevant videos
3. Display video recommendations in chat

See the updated AIAgent.tsx component that includes video integration.

---

## STEP 7: Add Video Recommendations to Chat

### 7.1 Video Recommendation Logic

When the AI detects certain keywords or questions, it will:
1. Search the video knowledge base
2. Find top 1-3 relevant videos
3. Display them as interactive cards in the chat
4. Provide context about why each video is relevant

---

## STEP 8: Environment Variables for HeyGen

### 8.1 Add to .env File (Optional for HeyGen API)

```env
# HeyGen API Configuration (only if using HeyGen API)
VITE_HEYGEN_API_KEY=your-heygen-api-key-here
VITE_HEYGEN_API_URL=https://api.heygen.com/v1
```

### 8.2 For Embedded Videos (Recommended)
No API key needed - videos are embedded directly using share URLs from HeyGen

---

## STEP 9: Testing Video Integration

### 9.1 Test Keyword Matching
Test phrases that should trigger videos:
- "Tell me about AI governance" → Shows governance video
- "How do I transition my career?" → Shows career transition video
- "What AI tools should I use?" → Shows AI tools video
- "Organizational blind spots" → Shows blind spots video

### 9.2 Test Video Playback
1. Verify videos load in iframe
2. Check mobile responsiveness
3. Test external link opens correctly
4. Verify multiple video recommendations work

---

## STEP 10: Content Strategy

### 10.1 Video Topic Coverage
Ensure you have videos for:
- ✅ All 6 lesson topics
- ✅ Common user questions
- ✅ Career transition guidance
- ✅ Tool tutorials
- ✅ Case studies

### 10.2 Update Videos Regularly
1. Create new videos monthly
2. Update video knowledge base
3. Refine keywords based on user queries
4. Monitor which videos are most requested

---

## Advanced: HeyGen Streaming Avatar (Future)

For real-time AI avatars:

```typescript
// Future implementation
import HeyGenStreamingAvatar from '@heygen/streaming-avatar';

const avatar = new HeyGenStreamingAvatar({
  apiKey: import.meta.env.VITE_HEYGEN_API_KEY,
  avatarId: 'your-avatar-id'
});

// Real-time avatar responses
avatar.speak(aiResponse);
```

---

## Troubleshooting

### Problem: Videos not loading
**Solution**:
1. Check video URLs are correct
2. Verify HeyGen share settings are public
3. Test video URL directly in browser

### Problem: Wrong videos recommended
**Solution**:
1. Review and refine keywords in heygenVideos.ts
2. Add more specific keywords
3. Test query variations

### Problem: Iframe blocked
**Solution**:
1. Check Content Security Policy settings
2. Ensure HeyGen domain is allowed
3. Use direct links as fallback

---

## Deployment Checklist

- [ ] Created HeyGen account
- [ ] Generated all training videos
- [ ] Video URLs added to heygenVideos.ts
- [ ] Keywords configured for each video
- [ ] Video matcher service tested
- [ ] AIAgent updated with video integration
- [ ] Mobile responsiveness verified
- [ ] Video playback tested on all devices
- [ ] Analytics tracking for video views
- [ ] Fallback for blocked iframes

---

**Status**: HeyGen Video Integration Ready
**Next**: Deploy to production and monitor video engagement
