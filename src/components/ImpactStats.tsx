import React from 'react';
import { ImpactCard } from './ImpactCard';

export function ImpactStats() {
  return (
    <div className="min-h-screen bg-black py-16 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h1 
          className="text-5xl md:text-7xl font-black text-white mb-6 tracking-[0.15em]"
          style={{
            textShadow: '0 0 40px rgba(168, 85, 247, 0.5)',
          }}
        >
          ORA IMPACT
        </h1>
        <p className="text-xl md:text-2xl text-purple-300 tracking-[0.15em]">
          SUPPORTING THOSE WHO SERVE
        </p>
      </div>

      {/* Impact Cards Grid */}
      <div className="space-y-16 max-w-7xl mx-auto">
        {/* Military Caregivers */}
        <ImpactCard 
          value="5.5M"
          description="Military caregivers providing support across the U.S"
          accentColor="purple"
        />

        {/* Veterans */}
        <ImpactCard 
          value="18M"
          description="American Veterans who have served our nation"
          accentColor="blue"
        />

        {/* Free Training */}
        <ImpactCard 
          value="100%"
          description="Free AI training for all U.S. Military Veterans"
          accentColor="green"
        />
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto mt-24 text-center">
        <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/30 rounded-2xl p-12 backdrop-blur-sm shadow-2xl shadow-purple-500/20">
          <h2 
            className="text-4xl md:text-5xl font-black text-white mb-6 tracking-[0.15em]"
            style={{
              textShadow: '0 0 30px rgba(168, 85, 247, 0.5)',
            }}
          >
            JOIN THE MISSION
          </h2>
          <p className="text-xl text-purple-200 mb-8 tracking-wider leading-relaxed">
            Support military families and veterans through AI education and mental health resources
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 transition-all duration-300 hover:scale-105 tracking-widest uppercase">
              Start Learning
            </button>
            <button className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg shadow-green-500/50 hover:shadow-green-500/80 transition-all duration-300 hover:scale-105 tracking-widest uppercase">
              Support Veterans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
