import React from 'react';

interface ImpactCardProps {
  value: string;
  description: string;
  accentColor?: 'purple' | 'green' | 'blue';
}

export function ImpactCard({ value, description, accentColor = 'purple' }: ImpactCardProps) {
  const colorClasses = {
    purple: {
      gradient: 'from-purple-600 to-purple-900',
      glow: 'shadow-purple-500/50',
      text: 'text-purple-400',
      border: 'border-purple-500/30',
    },
    green: {
      gradient: 'from-green-600 to-green-900',
      glow: 'shadow-green-500/50',
      text: 'text-green-400',
      border: 'border-green-500/30',
    },
    blue: {
      gradient: 'from-blue-600 to-blue-900',
      glow: 'shadow-blue-500/50',
      text: 'text-blue-400',
      border: 'border-blue-500/30',
    },
  };

  const colors = colorClasses[accentColor];

  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      <div
        className={`
          relative
          bg-gradient-to-br ${colors.gradient}
          rounded-2xl
          p-12
          shadow-2xl ${colors.glow}
          border ${colors.border}
          backdrop-blur-sm
          transform transition-all duration-300
          hover:scale-105
          hover:shadow-3xl
          hover:${colors.glow}
        `}
      >
        {/* Glow effect overlay */}
        <div
          className={`
            absolute inset-0
            bg-gradient-to-br ${colors.gradient}
            opacity-20
            blur-2xl
            rounded-2xl
            -z-10
          `}
        />

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Large number */}
          <div
            className="
              text-white
              text-7xl md:text-8xl lg:text-9xl
              font-black
              tracking-[0.15em]
              drop-shadow-2xl
              mb-4
              bg-gradient-to-b from-white to-gray-200
              bg-clip-text text-transparent
            "
            style={{
              textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(168, 85, 247, 0.4)',
            }}
          >
            {value}
          </div>

          {/* Description */}
          <div
            className={`
              ${colors.text}
              text-xl md:text-2xl lg:text-3xl
              tracking-[0.2em]
              uppercase
              leading-relaxed
              drop-shadow-lg
              max-w-xl mx-auto
            `}
            style={{
              textShadow: '0 0 20px rgba(168, 85, 247, 0.5)',
            }}
          >
            {description}
          </div>
        </div>

        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-white/20 rounded-tl-2xl" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-white/20 rounded-br-2xl" />
      </div>
    </div>
  );
}
