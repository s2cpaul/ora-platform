import { useState } from 'react';
import { X } from 'lucide-react';

interface SentimentCheckInProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (sentiment: string) => void;
}

const sentiments = [
  { emoji: '🤝', label: 'Acceptance' },
  { emoji: '😨', label: 'Afraid' },
  { emoji: '😔', label: 'Alone' },
  { emoji: '😈', label: 'Angry' },
  { emoji: '🥺', label: 'Anxious' },
  { emoji: '🥰', label: 'Appreciated' },
  { emoji: '😳', label: 'Ashamed' },
  { emoji: '😌', label: 'Calm' },
  { emoji: '😕', label: 'Confused' },
  { emoji: '🦁', label: 'Courageous' },
  { emoji: '🤔', label: 'Curious' },
  { emoji: '😣', label: 'Depleted' },
  { emoji: '😞', label: 'Depressed' },
  { emoji: '☹️', label: 'Disappointed' },
  { emoji: '😅', label: 'Embarrassed' },
  { emoji: '💪', label: 'Empowered' },
  { emoji: '🙌', label: 'Encouraged' },
  { emoji: '😃', label: 'Excited' },
  { emoji: '😤', label: 'Frustrated' },
  { emoji: '🙏', label: 'Grateful' },
  { emoji: '😰', label: 'Guilty' },
  { emoji: '😊', label: 'Happy' },
  { emoji: '🌟', label: 'Hopeful' },
  { emoji: '😩', label: 'Hopeless' },
  { emoji: '✨', label: 'Inspired' },
  { emoji: '😄', label: 'Joy' },
  { emoji: '🤷', label: 'Lost' },
  { emoji: '💕', label: 'Loved' },
  { emoji: '😑', label: 'Meh' },
  { emoji: '😬', label: 'Nervous' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '🤯', label: 'Overloaded' },
  { emoji: '😖', label: 'Painful' },
  { emoji: '☮️', label: 'Peaceful' },
  { emoji: '🏆', label: 'Proud' },
  { emoji: '😫', label: 'Restless' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😊', label: 'Satisfied' },
  { emoji: '🧩', label: 'Supported' },
  { emoji: '😣', label: 'Tense' },
  { emoji: '💔', label: 'Unloved' },
  { emoji: '⚠️', label: 'Unsafe' },
  { emoji: '😔', label: 'Unsupported' },
  { emoji: '🗑️', label: 'Useless' },
  { emoji: '💎', label: 'Valued' },
];

export function SentimentCheckIn({ isOpen, onClose, onSave }: SentimentCheckInProps) {
  const [selectedSentiment, setSelectedSentiment] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (selectedSentiment) {
      onSave(selectedSentiment);
      setSelectedSentiment(null);
      setNotes('');
      onClose();
    }
  };

  const handleCancel = () => {
    setSelectedSentiment(null);
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-background border border-border rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
          <h2 className="tracking-wider">Checking-in</h2>
          <button
            onClick={handleCancel}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-6 pt-2">
          <p className="text-muted-foreground mb-4">
            Tap a sentiment to tell us how you feel about Applied AI micro-learning. <span className="text-red-500">*</span>
          </p>

          {/* Sentiment Grid */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(60px,1fr))] gap-2 mb-6">
            {sentiments.map((sentiment) => (
              <button
                key={sentiment.label}
                onClick={() => setSelectedSentiment(sentiment.label)}
                className={`
                  flex flex-col items-center justify-center gap-[1px] p-1 rounded-lg border-2 transition-all min-w-[60px]
                  ${
                    selectedSentiment === sentiment.label
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50 hover:bg-accent'
                  }
                `}
              >
                <span className="text-2xl">{sentiment.emoji}</span>
                <span className="text-[8px] text-center leading-tight">{sentiment.label}</span>
              </button>
            ))}
          </div>

          {/* Optional Notes */}
          <div className="mb-4">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value.slice(0, 256))}
              placeholder="Care to tell us more? 256 characters or less."
              maxLength={256}
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              rows={3}
            />
            <div className="flex items-center justify-between mt-1">
              <div className="text-muted-foreground">
                {notes.length}/256
              </div>
              <button
                onClick={handleSave}
                disabled={!selectedSentiment}
                className="px-8 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}