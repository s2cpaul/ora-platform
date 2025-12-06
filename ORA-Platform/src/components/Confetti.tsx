import { useEffect, useState } from 'react';

interface ConfettiProps {
  onComplete?: () => void;
}

export function Confetti({ onComplete }: ConfettiProps) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    left: number;
    animationDelay: number;
    backgroundColor: string;
  }>>([]);

  useEffect(() => {
    // Generate confetti particles
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff1493'];
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 0.5,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)]
    }));
    
    setParticles(newParticles);

    // Clean up after animation
    const timer = setTimeout(() => {
      onComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 animate-confetti-fall"
          style={{
            left: `${particle.left}%`,
            top: '-10px',
            backgroundColor: particle.backgroundColor,
            animationDelay: `${particle.animationDelay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti-fall {
          animation: confetti-fall 3s linear forwards;
        }
      `}</style>
    </div>
  );
}
