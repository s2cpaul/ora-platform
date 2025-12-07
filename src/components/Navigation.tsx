import { Button } from "./ui/button";
import { Menu, Moon, Sun, Bot, ShoppingCart, Home, TrendingUp, Lock, X, BookOpen, Heart, FileText, Info, Video } from "lucide-react";
import { useState } from "react";
import { AmericanFlag } from "./icons/AmericanFlag";

interface NavigationProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  onAgentToggle: () => void;
  onNavigateToPurchase: () => void;
  onNavigateToHome?: () => void;
  onNavigateToProjections?: () => void;
  onNavigateTo90Day?: () => void;
  onNavigateToSocial?: () => void;
  onNavigateToVeterans?: () => void;
  onNavigateToB2B?: () => void;
  onNavigateToProgress?: () => void;
  onNavigateToNotebook?: () => void;
  onNavigateToSentiment?: () => void;
  onNavigateToLibrary?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToDonate?: () => void;
  currentPage: string;
}

export function Navigation({ theme, toggleTheme, onAgentToggle, onNavigateToPurchase, onNavigateToHome, onNavigateToProjections, onNavigateTo90Day, onNavigateToSocial, onNavigateToVeterans, onNavigateToB2B, onNavigateToProgress, onNavigateToNotebook, onNavigateToSentiment, onNavigateToLibrary, onNavigateToAbout, onNavigateToDonate, currentPage }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold tracking-widest bg-gradient-to-r from-primary to-muted-foreground bg-clip-text text-transparent">
                ORA
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {onNavigateToHome && (
                <button 
                  onClick={onNavigateToHome}
                  className={`hover:text-primary px-3 py-2 transition-colors flex items-center gap-2 ${
                    currentPage === "home" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Home className="h-4 w-4" />
                  Home
                </button>
              )}
              {onNavigateToAbout && (
                <button 
                  onClick={onNavigateToAbout}
                  className={`hover:text-primary px-3 py-2 transition-colors flex items-center gap-2 ${
                    currentPage === "about" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <AmericanFlag className="h-4 w-4" />
                  About
                </button>
              )}
              <button 
                onClick={onNavigateToPurchase}
                className={`hover:text-primary px-3 py-2 transition-colors ${
                  currentPage === "purchase" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Purchase
              </button>
              {onNavigateToProgress && (
                <button 
                  onClick={onNavigateToProgress}
                  className={`hover:text-primary px-3 py-2 transition-colors flex items-center gap-2 ${
                    currentPage === "progress" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <TrendingUp className="h-4 w-4" />
                  Progress
                </button>
              )}
              {onNavigateToNotebook && (
                <button 
                  onClick={onNavigateToNotebook}
                  className={`hover:text-primary px-3 py-2 transition-colors flex items-center gap-2 ${
                    currentPage === "notebook" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  Notebook
                </button>
              )}
              {onNavigateToSentiment && (
                <button 
                  onClick={onNavigateToSentiment}
                  className={`hover:text-primary px-3 py-2 transition-colors flex items-center gap-2 ${
                    currentPage === "sentiment" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Heart className="h-4 w-4" />
                  Sentiment
                </button>
              )}
              {onNavigateToLibrary && (
                <button 
                  onClick={onNavigateToLibrary}
                  className={`hover:text-primary px-3 py-2 transition-colors flex items-center gap-2 ${
                    currentPage === "library" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  Library
                </button>
              )}
              {onNavigateToDonate && (
                <button 
                  onClick={onNavigateToDonate}
                  className={`hover:text-primary px-3 py-2 transition-colors flex items-center gap-2 ${
                    currentPage === "donate" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Heart className="h-4 w-4" fill={currentPage === "donate" ? "currentColor" : "none"} />
                  Donate
                </button>
              )}
              {/* Hidden in desktop: Projections, B2B, Veterans */}
              <a href="#faq-section" className="text-muted-foreground hover:text-primary px-3 py-2 transition-colors">
                FAQs
              </a>
            </div>
          </div>

          {/* CTA Button & Theme Toggle & AI Agent */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onAgentToggle}
              className="hover:bg-muted bg-transparent"
            >
              <Bot className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onNavigateToPurchase}
              className="hover:bg-muted"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-muted"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <div className="relative group">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90" disabled>
                <Lock className="h-4 w-4 mr-2" />
                Join Community
              </Button>
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-3 py-1.5 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg border">
                Coming Soon
              </div>
            </div>
          </div>

          {/* Mobile menu button & theme toggle & AI Agent */}
          <div className="md:hidden flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onAgentToggle}
              className="hover:bg-muted bg-transparent"
            >
              <Bot className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onNavigateToPurchase}
              className="hover:bg-muted"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-muted"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border mt-2">
            <div className="flex flex-col space-y-2 pt-4">
              {onNavigateToHome && (
                <button 
                  onClick={() => {
                    onNavigateToHome();
                    setMobileMenuOpen(false);
                  }}
                  className={`hover:text-primary px-3 py-2 transition-colors text-left flex items-center gap-2 ${
                    currentPage === "home" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Home className="h-4 w-4" />
                  Home
                </button>
              )}
              <button 
                onClick={() => {
                  onNavigateToPurchase();
                  setMobileMenuOpen(false);
                }}
                className={`hover:text-primary px-3 py-2 transition-colors text-left ${
                  currentPage === "purchase" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Purchase
              </button>
              {onNavigateToProgress && (
                <button 
                  onClick={() => {
                    onNavigateToProgress();
                    setMobileMenuOpen(false);
                  }}
                  className={`hover:text-primary px-3 py-2 transition-colors text-left flex items-center gap-2 ${
                    currentPage === "progress" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <TrendingUp className="h-4 w-4" />
                  Progress
                </button>
              )}
              {onNavigateToNotebook && (
                <button 
                  onClick={() => {
                    onNavigateToNotebook();
                    setMobileMenuOpen(false);
                  }}
                  className={`hover:text-primary px-3 py-2 transition-colors text-left flex items-center gap-2 ${
                    currentPage === "notebook" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  Notebook
                </button>
              )}
              {onNavigateToSentiment && (
                <button 
                  onClick={() => {
                    onNavigateToSentiment();
                    setMobileMenuOpen(false);
                  }}
                  className={`hover:text-primary px-3 py-2 transition-colors text-left flex items-center gap-2 ${
                    currentPage === "sentiment" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Heart className="h-4 w-4" />
                  Sentiment
                </button>
              )}
              {onNavigateToLibrary && (
                <button 
                  onClick={() => {
                    onNavigateToLibrary();
                    setMobileMenuOpen(false);
                  }}
                  className={`hover:text-primary px-3 py-2 transition-colors text-left flex items-center gap-2 ${
                    currentPage === "library" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  Library
                </button>
              )}
              {onNavigateToDonate && (
                <button 
                  onClick={() => {
                    onNavigateToDonate();
                    setMobileMenuOpen(false);
                  }}
                  className={`hover:text-primary px-3 py-2 transition-colors text-left flex items-center gap-2 ${
                    currentPage === "donate" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Heart className="h-4 w-4" fill={currentPage === "donate" ? "currentColor" : "none"} />
                  Donate
                </button>
              )}
              {onNavigateToAbout && (
                <button 
                  onClick={() => {
                    onNavigateToAbout();
                    setMobileMenuOpen(false);
                  }}
                  className={`hover:text-primary px-3 py-2 transition-colors text-left flex items-center gap-2 ${
                    currentPage === "about" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <AmericanFlag className="h-4 w-4" />
                  About
                </button>
              )}
              <a 
                href="#faq-section" 
                className="text-muted-foreground hover:text-primary px-3 py-2 transition-colors text-left"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQs
              </a>
              <div className="px-3 py-2">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled>
                  <Lock className="h-4 w-4 mr-2" />
                  Join Community (Coming Soon)
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}