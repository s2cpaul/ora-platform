import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { 
  Target, 
  Heart, 
  Zap, 
  Smartphone, 
  GraduationCap,
  Shield,
  Users,
  Sparkles,
  ArrowRight,
  Lightbulb,
  Mail,
  Linkedin,
  FileText
} from "lucide-react";

interface AboutProps {
  onGetStarted?: () => void;
}

export function About({ onGetStarted }: AboutProps) {
  return (
    <div className="min-h-screen bg-background pt-2 lg:pt-3 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6" style={{ marginTop: '4px' }}>
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">About ORA</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-wide">
            <span 
              className="text-black dark:text-white tracking-widest font-black"
              style={{ textShadow: '0 0 20px rgba(0, 0, 0, 0.15)' }}
            >
              ORA
            </span>
          </h1>
          <div className="text-sm md:text-base lg:text-lg font-normal tracking-widest text-muted-foreground mb-8">
            Observe &nbsp; Respond &nbsp; Act
          </div>

          {/* Mission Section */}
          <div className="mb-8">
            {/* Mission Pill */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center px-4 py-1 rounded-full bg-muted/50 border border-border" style={{ transform: 'scale(0.8)' }}>
                <span className="text-xs tracking-widest">MISSION</span>
              </div>
            </div>
            
            {/* Main mission statement */}
            <h2 className="text-base sm:text-xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight md:leading-normal text-center px-2 md:px-4">
              <span className="block md:inline">Transforming challenges into</span>
              <span className="block md:inline"> measurable change.</span>
            </h2>
            
            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-tight md:leading-snug mb-4 text-center px-2 md:px-4">
              ORA is a human-centered, mobile-friendly agile leadership framework and micro-learning experience designed to help you achieve your goals while making the world better!
            </p>
            
            {/* Platform Description */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4 text-center px-2 md:px-4">
              <strong>ORA is designed to support anyone entering the modern workforce who wants to become AI-enabled through fast, free, mobile micro-learning.</strong> We believe that artificial intelligence literacy is no longer optional—it's essential for career success in today's rapidly evolving job market. We support innovation, efficiency and measurable organizational change. We promote unexpected collaboration, positive vibes, and partnerships for accelerating innovation. <strong>Currently supporting lessons in English and Spanish by default.</strong>
            </p>
          </div>
        </div>

        {/* Core Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center bg-orange-50 dark:bg-orange-950/20 border-2 border-orange-500/40" style={{ boxShadow: '0 4px 6px rgba(249, 115, 22, 0.15)' }}>
            <CardContent className="pt-4 pb-4">
              <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="font-bold mb-1">Fast</h3>
              <p className="text-sm text-muted-foreground">
                Micro-learning modules you can complete in minutes
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-green-50 dark:bg-green-950/20 border-2 border-green-500/40" style={{ boxShadow: '0 4px 6px rgba(34, 197, 94, 0.15)' }}>
            <CardContent className="pt-4 pb-4">
              <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Heart className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="font-bold mb-1">Free</h3>
              <p className="text-sm text-muted-foreground">
                Core AI education accessible to everyone
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-500/40" style={{ boxShadow: '0 4px 6px rgba(59, 130, 246, 0.15)' }}>
            <CardContent className="pt-4 pb-4">
              <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Smartphone className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="font-bold mb-1">Mobile</h3>
              <p className="text-sm text-muted-foreground">
                Learn anywhere, on any device
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-purple-50 dark:bg-purple-950/20 border-2 border-purple-500/40" style={{ boxShadow: '0 4px 6px rgba(168, 85, 247, 0.15)' }}>
            <CardContent className="pt-4 pb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold mb-1">AI-Enabled</h3>
              <p className="text-sm text-muted-foreground">
                Turn AI into a career superpower
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Veteran Commitment */}
        <Card className="mb-12 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <strong>Our Mission & Commitment</strong>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-lg leading-relaxed">
            <p>
              <strong>ORA</strong> is designed to support anyone entering the modern workforce who wants to become <strong>AI-enabled</strong> through <strong>fast, free, mobile micro-learning</strong>. We believe that artificial intelligence literacy is no longer optional—it's essential for career success in today's rapidly evolving job market. We support innovation, efficiency and measurable organizational change.
            </p>
            <p>
              Our platform is driven by ML insight, to deliver bite-sized, practical AI training that fits into your busy life, accessible anywhere, anytime, on any device. Content is delivered for a wide range in learning styles including audio, video, text and hands on learning. Plus a 'Battle Buddy' support system.
            </p>
            <div className="mt-6">
              <div className="mb-6 p-6 bg-gradient-to-br from-purple-700 via-purple-600 to-blue-700 dark:from-purple-800 dark:via-purple-700 dark:to-blue-800 rounded-lg border-2 border-purple-500 dark:border-purple-600">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-3xl flex-shrink-0 mt-1">🏅</span>
                  <div>
                    <h3 className="font-bold text-xl text-white">Special Support for Veterans</h3>
                  </div>
                </div>
                
                <p className="text-base text-purple-50 leading-relaxed">
                  <strong className="text-white font-bold text-lg">Our Core Commitment:</strong> One of our fundamental goals is to <strong className="text-white">continue providing free learning opportunities to all American Military Veterans</strong>. This isn't just a feature—it's a commitment that drives our platform development and business model. Every veteran deserves access to world-class AI education at no cost.
                </p>
              </div>

              <p className="text-muted-foreground mb-4">
                We're especially proud to offer dedicated support options for <strong>service members and military veterans</strong>. Having served our country with honor and dedication, these individuals deserve every advantage as they transition to civilian careers or advance in their professional journeys.
              </p>
              
              <p className="text-primary font-semibold mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-purple-500 fill-purple-500" />
                We support those who served.
              </p>
              
              <p className="text-muted-foreground">
                Whether you're on active duty, transitioning out of service, or a veteran building your second career, ORA provides specialized resources, career transition packages, and a supportive community designed specifically for your unique needs and experiences.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Become a Collaboration Partner */}
        <Card className="mb-12 border-2 border-blue-500/40 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <strong>Become a Collaboration Partner</strong>
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Help us promote AI literacy and micro-learning! We're seeking unexpected collaborations and partnerships to accelerate innovation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg leading-relaxed">
              Join us in our mission to democratize AI education and create measurable organizational transformation. Whether you're an educational institution, corporate partner, nonprofit organization, or technology provider, we welcome collaboration opportunities.
            </p>

            <div className="bg-white dark:bg-gray-900/50 rounded-lg p-6 border-2 border-blue-500/30">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                3 Ways to Connect with Us:
              </h4>
              
              <div className="space-y-4">
                {/* Option 1: Email */}
                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Send an Email Proposal
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Click the email link and send us your collaboration proposal
                    </p>
                    <a 
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=Cara@oratf.info&su=Collaboration Partnership Proposal" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      <Mail className="w-4 h-4" />
                      Email: Cara@oratf.info
                    </a>
                  </div>
                </div>

                {/* Option 2: Custom Request Form */}
                <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Custom Request Form
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Use our Custom Request form located under the Purchases section
                    </p>
                    <button 
                      onClick={() => {
                        const event = new CustomEvent('navigateToPurchase');
                        window.dispatchEvent(event);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      <ArrowRight className="w-4 h-4" />
                      Go to Purchases
                    </button>
                  </div>
                </div>

                {/* Option 3: LinkedIn */}
                <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold mb-2 flex items-center gap-2">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn Message
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Connect and message directly on LinkedIn
                    </p>
                    <a 
                      href="https://www.linkedin.com/in/cara-johnson-z007" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      <Linkedin className="w-4 h-4" />
                      Message: cara-johnson-z007
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-bold mb-3">Partnership Opportunities Include:</h4>
              <ul className="grid md:grid-cols-2 gap-3">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-sm">Content curation partnerships</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-sm">Technology integration collaborations</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-sm">Educational institution alliances</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-sm">Corporate training programs</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-sm">Nonprofit organization partnerships</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-sm">Research and development initiatives</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Partnership & Support Resources */}
        <Card className="mb-6 border-2 border-primary/30 bg-purple-50 dark:bg-purple-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-primary" />
              <strong>Partnership & Support Resources</strong>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Surviving Spouses - MOVED TO TOP */}
            <div>
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5 text-purple-500 fill-purple-500" />
                Special Support for Surviving Spouse & Caretakers
              </h4>
              <p className="text-sm mb-4 text-muted-foreground">
                Awareness support, compassion, innovation, mental health and emotional wellness
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-sm">Micro-learning modules:</strong>
                    <span className="text-sm"> Coping strategies, resilience, and navigating grief in secure environments</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-sm">Practical guides:</strong>
                    <span className="text-sm"> Checklists for navigating benefits, community resources, and peer support groups</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-sm">Story-driven podcasts or short videos:</strong>
                    <span className="text-sm"> Emotionally resonant narratives that normalize grief and highlight recovery pathways</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* AI Literacy Training */}
            <div className="pt-4 border-t">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                AI Literacy Training
              </h4>
              <ul className="space-y-2 ml-7">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span className="text-sm">Help staff understand how agentic AI can streamline scheduling, automate routine processes, resource matching, and effectiveness tracking</span>
                </li>
              </ul>
            </div>

            {/* Governance Frameworks */}
            <div>
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Governance Frameworks
              </h4>
              <ul className="space-y-2 ml-7">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span className="text-sm">Provide templates: Prompt Engineering, RACI matrices and Minimum Viable Governance (MVG) so staff can adopt AI responsibly</span>
                </li>
              </ul>
            </div>

            {/* Professional Development */}
            <div>
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                Professional Development Modules
              </h4>
              <ul className="space-y-2 ml-7">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span className="text-sm">Short courses on trauma-informed care, digital tools for survivor support, and readiness dashboards</span>
                </li>
              </ul>
            </div>

            {/* Engagement Strategy */}
            <div className="pt-4 border-t">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                How to Engage AFSP NC & NAMI Wake County
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-sm">Start with pilot resources:</strong>
                    <span className="text-sm"> Offer a small set of free modules (spouse-focused and teen-focused) to demonstrate value</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-sm">In Kind Partnership model:</strong>
                    <span className="text-sm"> Framing contributions as both financial and intellectual — donating content, governance frameworks, and training modules</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-sm">Donation pathway:</strong>
                    <span className="text-sm"> Once resources are established, funds can be earmarked for expanding survivor education and AI readiness integration</span>
                  </div>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Who We Serve - Military and General Workforce */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-6 h-6 fill-yellow-500 stroke-black dark:stroke-white" strokeWidth={1.5} />
                Military Community
                <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                  Special Support
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Active duty service members preparing for transition</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Veterans building civilian careers</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Workforce center affiliation for a modern career edge</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                General Workforce
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Career changers entering AI-enabled industries</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Early-career professionals upskilling</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Job seekers gaining competitive advantages</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Lifelong learners staying relevant</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="inline-block bg-gradient-to-r from-primary/10 to-purple-500/10 border-2 border-primary/20">
            <CardContent className="py-8 px-12">
              <h2 className="text-2xl font-bold mb-4">
                Ready to become AI-enabled?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Join thousands of learners building their AI skills and advancing their careers
              </p>
              {onGetStarted && (
                <Button size="lg" onClick={onGetStarted}>
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer Tagline */}
        <p className="text-center text-muted-foreground mt-12 italic">
          ORA - Observe &gt; Respond &gt; Act &gt; Empowering the modern workforce, one learner at a time.
        </p>
      </div>
    </div>
  );
}