import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ExternalLink, Brain, BarChart3, Zap, Lock } from "lucide-react";

interface WebAppsShowcaseProps {
  onNavigateToLessons?: () => void;
}

const webApps = [
  {
    id: 1,
    title: "AI Accelerator Learning",
    description: "Next-generation platform for power-users to experience rapid AI development, knowledge sharing, advanced applications using best practices.",
    image: "https://images.unsplash.com/photo-1758873268631-fa944fc5cad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcHJvZmVzc2lvbmFscyUyMHRlYW13b3JrfGVufDF8fHx8MTc2NDE2NzQyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Zap,
    features: ["Measurable Progress", "Digital Transformation", "Applied AI", "Agile Frameworks"],
    status: "Active"
  },
  {
    id: 2,
    title: "Mobile-friendly",
    description: "Gain actionable insights and lead decisively with a mobile platform built for smart, adaptive leadership on the go.",
    image: "https://images.unsplash.com/photo-1716436329836-208bea5a55e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1OTc4ODkzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Brain,
    features: ["Measurable Progress", "Real-time feedback", "Practical Strategies", "Accountability & Support", "Battle Buddies"],
    status: "Coming Soon"
  },
  {
    id: 3,
    title: "White-Label Application",
    description: "Fast data collection for seamless integration with existing systems like SharePoint and Google Workspace. White-label service offers custom branding options, on-site support by appointment, and domain-specific content integration for data scientists and researchers.",
    image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBhbmFseXRpY3N8ZW58MXx8fHwxNzU5ODg0MjYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: BarChart3,
    features: ["Measurable Progress", "Data visualization", "Statistical analysis", "Predictive modeling"],
    status: "Coming Soon"
  }
];

export function WebAppsShowcase({ onNavigateToLessons }: WebAppsShowcaseProps) {
  return (
    <section className="pt-0 pb-12 bg-muted/33 -mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6">
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-[20px]">
          {webApps.map((app) => {
            const IconComponent = app.icon;
            return (
              <Card key={app.id} className={`group shadow-lg hover:shadow-xl transition-all duration-300 border-border bg-card overflow-hidden ${app.id === 1 || app.id === 2 || app.id === 3 ? 'mt-[20px]' : ''}`}>
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {app.id === 2 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-black font-bold tracking-wider" style={{ fontSize: '19.44px', textShadow: '0 0 10px rgba(255, 255, 255, 0.8)', transform: 'translateY(-39px)' }}>
                        APPLIED
                      </span>
                    </div>
                  )}
                  <div className="absolute top-[136px] right-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                      app.status === 'Active' 
                        ? 'bg-green-500/55 border border-green-500/30' 
                        : 'bg-orange-500/55 border border-orange-500/30'
                    }`}>
                      {app.status}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 p-2 bg-background/80 backdrop-blur-sm rounded-lg">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                </div>

                <CardHeader className={`${app.id === 1 ? "max-[640px]:scale-[0.88] max-[640px]:origin-top-left" : ""}`} style={{ paddingBottom: '14px' }}>
                  <CardTitle className="flex items-center justify-between mb-1">
                    <strong>{app.title}</strong>
                  </CardTitle>
                  <CardDescription className="text-sm leading-tight">
                    {app.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className={`space-y-3 ${app.id === 1 ? "max-[640px]:scale-[0.88] max-[640px]:origin-top-left" : ""}`} style={{ paddingTop: '0', marginTop: '-16px' }}>
                  {/* Features */}
                  <div className="space-y-1">
                    <h4 className="font-medium text-xs text-muted-foreground mb-0.5">Key Features</h4>
                    <ul className="space-y-0.5">
                      {app.features.map((feature, index) => (
                        <li key={index} className="text-xs flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-1 flex justify-center">
                    <Button 
                      className="group/btn text-gray-800 hover:opacity-90 border border-gray-400/50" 
                      variant="outline"
                      disabled={app.status === 'Beta' || app.id === 2 || app.id === 3}
                      onClick={() => app.id === 1 && onNavigateToLessons?.()}
                      style={{ 
                        background: 'linear-gradient(180deg, #ffffff 0%, #e0e0e0 50%, #f5f5f5 100%)',
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.5) inset, 0 3px 0 0 rgba(0, 0, 0, 0.4)'
                      }}
                    >
                      {app.status === 'Beta' ? 'Coming Soon' : (app.id === 2 || app.id === 3) ? (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          Locked
                        </>
                      ) : 'Launch Learning path'}
                      {app.status !== 'Beta' && app.id !== 2 && app.id !== 3 && (
                        <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          {/* Agentic AI description - 20% smaller, same style as hero */}
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6" style={{ transform: 'scale(0.8)' }}>
            Agentic AI is Artificial Intelligence with a powerful twist. Applied Agentic AI doesn't just generate content—it systematically pursues goals. Imagine launching smart, branded mobile apps powered by AI and machine learning without writing a single line of code. With our Applied AI services and white‑label solutions, ORA creates intelligent ecosystems that empower everyone.
          </p>
          
          <p className="text-muted-foreground mb-3">
            Ready to contribute to the future of AI?
          </p>
          <div className="relative inline-block group">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" disabled>
              <Lock className="h-5 w-5 mr-2" />
              Join Our AI Enabled Community
            </Button>
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-3 py-1.5 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg border">
              Coming Soon
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}