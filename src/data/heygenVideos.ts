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
      "regulations",
      "blind spots",
      "organizational"
    ],
    videoUrl: "https://app.heygen.com/share/YOUR_VIDEO_ID_1",
    embedCode: '<iframe src="https://app.heygen.com/embeds/YOUR_VIDEO_ID_1" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen"></iframe>',
    duration: "5:30",
    thumbnail: "",
    category: "AI Governance"
  },
  {
    id: "video-002",
    title: "Career Transition with AI",
    description: "How veterans can leverage AI skills for career advancement and transition",
    keywords: [
      "career", 
      "transition", 
      "veterans", 
      "job search", 
      "military",
      "employment",
      "skills",
      "service members",
      "civilian"
    ],
    videoUrl: "https://app.heygen.com/share/YOUR_VIDEO_ID_2",
    embedCode: '<iframe src="https://app.heygen.com/embeds/YOUR_VIDEO_ID_2" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen"></iframe>',
    duration: "7:15",
    thumbnail: "",
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
      "roadmap",
      "enterprise",
      "business"
    ],
    videoUrl: "https://app.heygen.com/share/YOUR_VIDEO_ID_3",
    embedCode: '<iframe src="https://app.heygen.com/embeds/YOUR_VIDEO_ID_3" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen"></iframe>',
    duration: "6:45",
    thumbnail: "",
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
      "awareness",
      "governance",
      "culture"
    ],
    videoUrl: "https://app.heygen.com/share/YOUR_VIDEO_ID_4",
    embedCode: '<iframe src="https://app.heygen.com/embeds/YOUR_VIDEO_ID_4" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen"></iframe>',
    duration: "8:20",
    thumbnail: "",
    category: "AI Governance"
  },
  {
    id: "video-005",
    title: "AI Tools for Beginners",
    description: "Essential AI tools every professional should know - ChatGPT, NotebookLM, and more",
    keywords: [
      "tools", 
      "beginner", 
      "chatgpt", 
      "software",
      "applications",
      "getting started",
      "basics",
      "notebooklm",
      "ai tools"
    ],
    videoUrl: "https://app.heygen.com/share/YOUR_VIDEO_ID_5",
    embedCode: '<iframe src="https://app.heygen.com/embeds/YOUR_VIDEO_ID_5" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen"></iframe>',
    duration: "4:50",
    thumbnail: "",
    category: "AI Tools"
  },
  {
    id: "video-006",
    title: "Leadership in the AI Era",
    description: "How leaders can effectively guide their teams through AI transformation",
    keywords: [
      "leadership",
      "management",
      "team",
      "transformation",
      "change management",
      "executives",
      "decision making",
      "strategy"
    ],
    videoUrl: "https://app.heygen.com/share/YOUR_VIDEO_ID_6",
    embedCode: '<iframe src="https://app.heygen.com/embeds/YOUR_VIDEO_ID_6" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen"></iframe>',
    duration: "6:00",
    thumbnail: "",
    category: "Leadership"
  }
];

/**
 * TODO: Replace YOUR_VIDEO_ID_X with actual HeyGen video IDs
 * 
 * Steps to get your video IDs:
 * 1. Create videos in HeyGen for each topic
 * 2. Click "Share" on each video
 * 3. Copy the share URL or embed code
 * 4. Replace the placeholder URLs above
 * 
 * Example:
 * If your HeyGen share URL is: https://app.heygen.com/share/abc123def456
 * Replace YOUR_VIDEO_ID_1 with: abc123def456
 */
