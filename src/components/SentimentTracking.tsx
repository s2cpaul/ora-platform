import { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Heart, BarChart3, ArrowLeft } from 'lucide-react';

interface SentimentEntry {
  sentiment: string;
  timestamp: number;
}

interface SentimentTrackingProps {
  onBack?: () => void;
}

const sentimentEmojis: { [key: string]: string } = {
  'Afraid': '😨',
  'Acceptance': '🤝',
  'Alone': '😔',
  'Angry': '😈',
  'Anxious': '🥺',
  'Appreciated': '🥰',
  'Ashamed': '😳',
  'Calm': '😌',
  'Confused': '😕',
  'Courageous': '🦁',
  'Curious': '🤔',
  'Depleted': '😣',
  'Depressed': '😞',
  'Disappointed': '☹️',
  'Embarrassed': '😅',
  'Empowered': '💪',
  'Excited': '😃',
  'Frustrated': '😤',
  'Grateful': '🙏',
  'Guilty': '😰',
  'Happy': '😊',
  'Hopeful': '🌟',
  'Hopeless': '😩',
  'Inspired': '✨',
  'Joy': '😄',
  'Lost': '🤷',
  'Loved': '💕',
  'Meh': '😑',
  'Nervous': '😬',
  'Neutral': '😐',
  'Overloaded': '🤯',
  'Painful': '😖',
  'Peaceful': '☮️',
  'Proud': '🏆',
  'Restless': '😫',
  'Sad': '😢',
  'Satisfied': '😊',
  'Supported': '🧩',
  'Tense': '😣',
  'Trapped': '🔒',
  'Unloved': '💔',
  'Unsafe': '⚠️',
  'Unsupported': '😔',
  'Valued': '💎',
};

const positiveSentiments = [
  'Acceptance', 'Appreciated', 'Calm', 'Courageous', 'Curious', 'Empowered',
  'Excited', 'Grateful', 'Happy', 'Hopeful', 'Inspired', 'Joy', 'Loved',
  'Peaceful', 'Proud', 'Satisfied', 'Supported', 'Valued'
];

const negativeSentiments = [
  'Afraid', 'Alone', 'Angry', 'Anxious', 'Ashamed', 'Depleted', 'Depressed',
  'Disappointed', 'Embarrassed', 'Frustrated', 'Guilty', 'Hopeless', 'Lost',
  'Nervous', 'Overloaded', 'Painful', 'Restless', 'Sad', 'Tense', 'Trapped',
  'Unloved', 'Unsafe', 'Unsupported'
];

export function SentimentTracking({ onBack }: SentimentTrackingProps) {
  const [sentiments, setSentiments] = useState<SentimentEntry[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
    mostCommon: '',
  });

  useEffect(() => {
    // Load sentiment data from localStorage
    const data = localStorage.getItem('userSentiments');
    if (data) {
      const parsed: SentimentEntry[] = JSON.parse(data);
      // Sort by timestamp descending (most recent first)
      const sorted = parsed.sort((a, b) => b.timestamp - a.timestamp);
      setSentiments(sorted);

      // Calculate stats
      const total = sorted.length;
      let positive = 0;
      let negative = 0;
      let neutral = 0;
      const sentimentCounts: { [key: string]: number } = {};

      sorted.forEach(entry => {
        if (positiveSentiments.includes(entry.sentiment)) {
          positive++;
        } else if (negativeSentiments.includes(entry.sentiment)) {
          negative++;
        } else {
          neutral++;
        }

        sentimentCounts[entry.sentiment] = (sentimentCounts[entry.sentiment] || 0) + 1;
      });

      const mostCommon = Object.entries(sentimentCounts).reduce((a, b) => 
        a[1] > b[1] ? a : b
      , ['', 0])[0];

      setStats({
        total,
        positive,
        negative,
        neutral,
        mostCommon,
      });
    }
  }, []);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      });
    }
  };

  const getPositivePercentage = () => {
    if (stats.total === 0) return 0;
    return Math.round((stats.positive / stats.total) * 100);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-primary" />
            <h1 className="tracking-wider">Sentiment Tracking</h1>
          </div>
          <p className="text-muted-foreground">
            Change can be hard. Your emotional journey and wellness insights matter. We are all in this together.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        {stats.total > 0 ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {/* Total Check-ins */}
              <div className="bg-background border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Total</span>
                </div>
                <div className="text-3xl">{stats.total}</div>
              </div>

              {/* Positive */}
              <div className="bg-background border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-muted-foreground">Positive</span>
                </div>
                <div className="text-3xl text-green-500">{stats.positive}</div>
              </div>

              {/* Negative */}
              <div className="bg-background border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-orange-500" />
                  <span className="text-muted-foreground">Negative</span>
                </div>
                <div className="text-3xl text-orange-500">{stats.negative}</div>
              </div>

              {/* Neutral */}
              <div className="bg-background border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full bg-gray-500" />
                  <span className="text-muted-foreground">Neutral</span>
                </div>
                <div className="text-3xl text-gray-500">{stats.neutral}</div>
              </div>
            </div>

            {/* Wellness Score */}
            <div className="bg-gradient-to-br from-primary/5 to-transparent border border-border rounded-lg p-6 mb-6">
              <h2 className="tracking-wider mb-4">Wellness Score</h2>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-primary transition-all duration-500"
                      style={{ width: `${getPositivePercentage()}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-muted-foreground">0%</span>
                    <span className="text-muted-foreground">100%</span>
                  </div>
                </div>
                <div className="text-4xl">{getPositivePercentage()}%</div>
              </div>
              <p className="text-muted-foreground mt-3">
                Based on {stats.positive} positive check-ins out of {stats.total} total
              </p>
            </div>

            {/* Most Common Sentiment */}
            {stats.mostCommon && (
              <div className="bg-background border border-border rounded-lg p-6 mb-6">
                <h2 className="tracking-wider mb-4">Most Common Feeling</h2>
                <div className="flex items-center gap-4">
                  <div className="text-6xl">{sentimentEmojis[stats.mostCommon]}</div>
                  <div>
                    <div className="text-2xl">{stats.mostCommon}</div>
                    <p className="text-muted-foreground">
                      You've felt this way {Object.values(sentiments).filter(s => s.sentiment === stats.mostCommon).length} times
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h2 className="tracking-wider mb-4">Recent Check-ins</h2>
              <div className="space-y-3">
                {sentiments.map((entry, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
                  >
                    <div className="text-3xl">{sentimentEmojis[entry.sentiment]}</div>
                    <div className="flex-1">
                      <div className="">{entry.sentiment}</div>
                      <div className="text-muted-foreground">{formatDate(entry.timestamp)}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs ${
                      positiveSentiments.includes(entry.sentiment) 
                        ? 'bg-green-500/20 text-green-500'
                        : negativeSentiments.includes(entry.sentiment)
                        ? 'bg-orange-500/20 text-orange-500'
                        : 'bg-gray-500/20 text-gray-500'
                    }`}>
                      {positiveSentiments.includes(entry.sentiment) 
                        ? 'Positive'
                        : negativeSentiments.includes(entry.sentiment)
                        ? 'Negative'
                        : 'Neutral'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="tracking-wider mb-2">No Check-ins Yet</h2>
            <p className="text-muted-foreground mb-6">
              Start tracking your emotional journey by completing your first sentiment check-in.
            </p>
            <p className="text-muted-foreground">
              Check-ins appear automatically every 24 hours, or you can manually trigger one anytime.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}