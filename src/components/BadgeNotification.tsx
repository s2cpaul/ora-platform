import { useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { X, Award } from 'lucide-react';
import { Button } from './ui/button';
import type { Badge } from '../utils/progressSystem';

interface BadgeNotificationProps {
  badge: Badge;
  pointsEarned: number;
  onClose: () => void;
}

export function BadgeNotification({ badge, pointsEarned, onClose }: BadgeNotificationProps) {
  useEffect(() => {
    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-20 right-4 z-[9998] animate-in slide-in-from-top-5 duration-500">
      <Card className="w-80 border-primary/50 bg-gradient-to-br from-primary/10 to-background shadow-xl">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">New Achievement!</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 -mt-1 -mr-1"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-5xl">{badge.icon}</div>
            <div className="flex-1">
              <p className="font-medium text-lg">{badge.name}</p>
              <p className="text-sm text-muted-foreground">{badge.description}</p>
              <p className="text-sm text-primary mt-1">+{pointsEarned} points earned</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
