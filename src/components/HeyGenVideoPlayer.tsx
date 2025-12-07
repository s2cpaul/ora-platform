import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Play, ExternalLink, Clock, Video } from "lucide-react";
import { HeyGenVideo } from "../data/heygenVideos";

interface HeyGenVideoPlayerProps {
  video: HeyGenVideo;
  autoPlay?: boolean;
  compact?: boolean;
}

export function HeyGenVideoPlayer({ video, autoPlay = false, compact = false }: HeyGenVideoPlayerProps) {
  const handleOpenVideo = () => {
    window.open(video.videoUrl, '_blank', 'noopener,noreferrer');
  };

  if (compact) {
    return (
      <Card className="border-primary/20 bg-card hover:border-primary/40 transition-colors">
        <CardContent className="p-3">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
              <Video className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm mb-1 line-clamp-2">{video.title}</h4>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {video.description}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {video.duration}
                </span>
                <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                  {video.category}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleOpenVideo}
              className="flex-shrink-0"
            >
              <Play className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20 bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-base lg:text-lg mb-1">{video.title}</CardTitle>
            <p className="text-xs text-muted-foreground flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {video.duration}
              </span>
              <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                {video.category}
              </span>
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Video Embed or Thumbnail */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-black/5 to-primary/5 rounded-lg overflow-hidden border border-border">
          {video.embedCode && !video.embedCode.includes('YOUR_VIDEO_ID') ? (
            // Real HeyGen embed
            <div 
              dangerouslySetInnerHTML={{ __html: video.embedCode }}
              className="w-full h-full"
            />
          ) : (
            // Placeholder with play button
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <Video className="h-8 w-8 text-primary" />
              </div>
              <Button 
                variant="default" 
                size="lg"
                onClick={handleOpenVideo}
                className="gap-2"
              >
                <Play className="h-5 w-5" />
                Watch Video
              </Button>
              <p className="text-xs text-muted-foreground">
                Click to open in HeyGen
              </p>
            </div>
          )}
        </div>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground">
          {video.description}
        </p>
        
        {/* Keywords */}
        <div className="flex flex-wrap gap-1.5">
          {video.keywords.slice(0, 5).map((keyword, idx) => (
            <span 
              key={idx}
              className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-md"
            >
              {keyword}
            </span>
          ))}
        </div>
        
        {/* Action Button */}
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full gap-2"
          onClick={handleOpenVideo}
        >
          <ExternalLink className="h-4 w-4" />
          Open in HeyGen
        </Button>
      </CardContent>
    </Card>
  );
}

/**
 * Component to display multiple video recommendations
 */
interface VideoRecommendationsProps {
  videos: HeyGenVideo[];
  title?: string;
  compact?: boolean;
}

export function VideoRecommendations({ 
  videos, 
  title = "📺 Recommended Videos",
  compact = false 
}: VideoRecommendationsProps) {
  if (videos.length === 0) return null;

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-sm flex items-center gap-2">
        {title}
        <span className="text-xs text-muted-foreground font-normal">
          ({videos.length} video{videos.length !== 1 ? 's' : ''})
        </span>
      </h4>
      <div className="space-y-3">
        {videos.map((video) => (
          <HeyGenVideoPlayer 
            key={video.id} 
            video={video} 
            compact={compact}
          />
        ))}
      </div>
    </div>
  );
}
