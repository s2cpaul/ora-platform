import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-2 lg:py-3 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 rounded-full bg-muted/50 border border-border" style={{ marginBottom: '-8px', marginTop: '4px', paddingTop: '2px', paddingBottom: '2px' }}>
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs text-muted-foreground">Empowering the Future of Applied AI</span>
          </div>

          {/* Headline */}
          <h1 className="font-bold" style={{ marginBottom: '-8px' }}>
            <div className="text-5xl md:text-7xl lg:text-8xl">
              <span 
                className="text-black dark:text-white tracking-widest font-black"
                style={{ textShadow: '0 0 20px rgba(0, 0, 0, 0.15)' }}
              >
                O R A
              </span>
            </div>
            <div className="text-sm md:text-base lg:text-lg font-normal tracking-widest text-muted-foreground mt-1">
              Observe &nbsp; Respond &nbsp; Act
            </div>
          </h1>

          {/* Mission Section */}
          <div className="mb-2">
            {/* Mission Pill */}
            <div className="flex justify-center mb-1" style={{ paddingTop: '16px' }}>
              <div className="inline-flex items-center px-4 py-1 rounded-full bg-muted/50 border border-border" style={{ transform: 'scale(0.8)' }}>
                <span className="text-xs tracking-widest">MISSION</span>
              </div>
            </div>
            
            {/* Main mission statement */}
            <h2 className="text-base sm:text-xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-1.5 leading-tight md:leading-normal text-center px-2 md:px-4 [transform:none] md:[transform:scale(0.78)]" style={{ marginTop: '10px' }}>
              <span className="block md:inline">Transforming challenges into</span>
              <span className="block md:inline"> measurable change — with confidence!</span>
            </h2>
            
            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-tight md:leading-snug mb-1 md:mb-0.5 text-center px-2 md:px-4" style={{ transform: 'scale(0.897)' }}>
              ORA is a human-centered, mobile-friendly agile leadership framework and micro-learning experience designed to help you achieve your goals while making the world better — one, rewarding micro-lesson at a time!
            </p>
            
            {/* Applied AI statement */}
            <h3 className="text-base sm:text-xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-0.5 text-center w-full px-2 md:px-4 leading-tight md:leading-normal max-w-4xl mx-auto" style={{ transform: 'scale(0.897)' }}>
              {/* Mobile: 4 lines */}
              <span className="block md:hidden">
                Applied AI for Measurable<br />
                Organizational Transformation<br />
                Customizable Services &<br />
                Learning Support
              </span>
              {/* Desktop: 2 lines */}
              <span className="hidden md:block [transform:none] md:[transform:scale(0.78)]">
                <span className="whitespace-nowrap">Applied AI for Measurable Organizational Transformation</span><br />
                <span className="whitespace-nowrap">Customizable Services & Learning Support</span>
              </span>
            </h3>
            
            {/* Explore statement */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-tight md:leading-snug pb-[6px] text-center px-2 md:px-4" style={{ transform: 'scale(0.897)' }}>
              We’re supporting the modern workforce with fast, free, mobile micro‑learning that makes teams truly ready to apply AI!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}