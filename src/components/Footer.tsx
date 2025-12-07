import { Github, Twitter, Linkedin, Mail } from "lucide-react";

interface FooterProps {
  onNavigateToProjections?: () => void;
  onNavigateToDonate?: () => void;
  onNavigateToMLAnalytics?: () => void;
}

export function Footer({ onNavigateToProjections, onNavigateToDonate, onNavigateToMLAnalytics }: FooterProps) {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-widest">ORA</h3>
            <p className="text-muted-foreground text-sm">
              Supporting the modern workforce with fast, free, mobile micro‑learning that makes them AI‑enabled. AI literacy is now essential for career success. We drive innovation, efficiency, and measurable organizational change while fostering community, unexpected collaboration, positive energy, and partnerships that accelerate transformation. Currently available in English and Spanish.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/cara-johnson-z007" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=Cara@oratf.info" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h4 className="font-medium">Community</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Forums</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Discord</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Events</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Meetups</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-medium">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Research Papers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Best Practices</a></li>
              <li>
                {onNavigateToMLAnalytics ? (
                  <button 
                    onClick={onNavigateToMLAnalytics}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    ML Data
                  </button>
                ) : (
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">ML Data</a>
                )}
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-medium">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">About</a></li>
              <li>
                {onNavigateToProjections ? (
                  <button 
                    onClick={onNavigateToProjections}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Projections
                  </button>
                ) : (
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Projections</a>
                )}
              </li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Investors</a></li>
              <li>
                {onNavigateToDonate ? (
                  <button 
                    onClick={onNavigateToDonate}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Donate
                  </button>
                ) : (
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Donate</a>
                )}
              </li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 ORA Community. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Code of Conduct</a>
          </div>
        </div>
      </div>
    </footer>
  );
}