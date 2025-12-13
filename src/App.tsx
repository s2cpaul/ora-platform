import { useState, useEffect, useRef } from "react";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { WebAppsShowcase } from "./components/WebAppsShowcase";
import { LessonContent } from "./components/LessonContent";
import { PurchasePage } from "./components/PurchasePage";
import { ExpressCheckout } from "./components/ExpressCheckout";
import { ProfitProjections } from "./components/ProfitProjections";
import { IncomeProjection90Day } from "./components/IncomeProjection90Day";
import { IncomeProjection90to180Day } from "./components/IncomeProjection90to180Day";
import { IncomeProjection6Month } from "./components/IncomeProjection6Month";
import { SocialMediaStrategy } from "./components/SocialMediaStrategy";
import VeteransIAPRevenue from "./components/VeteransIAPRevenue";
import B2BWhiteLabelDashboard from "./components/B2BWhiteLabelDashboard";
import { ProgressPage } from "./components/ProgressPage";
import { AINotebook } from "./components/AINotebook";
import { SentimentTracking } from "./components/SentimentTracking";
import { Library } from "./components/Library";
import { Footer } from "./components/Footer";
import { AIAgent } from "./components/AIAgent";
import { SentimentCheckIn } from "./components/SentimentCheckIn";
import { About } from "./components/About";
import { FAQ } from "./components/FAQ";
import { DonationSection } from "./components/DonationSection";
import { ImpactCard } from "./components/ImpactCard";
import { ImpactStats } from "./components/ImpactStats";
import { FiveYearConservative } from "./components/FiveYearConservative";
import { MLAnalyticsDashboard } from "./components/MLAnalyticsDashboard";
import { LessonViewer } from "./components/LessonViewer";
import { initEngagementTracking } from "./utils/mlTracking";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    // Check localStorage first, then system preference, default to dark
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    // Default to dark mode
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "dark";
  });

  const [currentPage, setCurrentPage] = useState<"home" | "lessons" | "purchase" | "express-checkout" | "projections" | "90day" | "social" | "veterans" | "b2b" | "progress" | "notebook" | "sentiment" | "library" | "about" | "donate" | "impact" | "5year" | "ml-analytics" | "pagecopy1">("home");
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [isSentimentCheckInOpen, setIsSentimentCheckInOpen] = useState(false);
  const [autoPlayAgentVideo, setAutoPlayAgentVideo] = useState(false);
  const [lastVideoEndedAt, setLastVideoEndedAt] = useState<number | null>(null);
  const sentimentTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Global handler for when any video finishes
  const handleAnyVideoEnded = () => {
    setLastVideoEndedAt(Date.now());
  };

  // Sentiment check-in logic with 10s delay after video ends
  useEffect(() => {
    // Clear any previous timer
    if (sentimentTimerRef.current) {
      clearTimeout(sentimentTimerRef.current);
    }
    const lastCheckIn = localStorage.getItem('lastSentimentCheckIn');
    const now = new Date().getTime();
    const oneHourInMs = 60 * 60 * 1000; // 60 minutes
    
    // Show sentiment check-in if never shown or if it's been more than 60 minutes
    if (!lastCheckIn || now - parseInt(lastCheckIn) > oneHourInMs) {
      // Wait 6 minutes (360,000 ms) before showing the modal, but also check video timing
      const timer = setTimeout(() => {
        // If a video ended less than 10s ago, delay further
        const sinceVideo = lastVideoEndedAt ? Date.now() - lastVideoEndedAt : null;
        if (sinceVideo !== null && sinceVideo < 10000) {
          // Wait the remaining time
          sentimentTimerRef.current = setTimeout(() => setIsSentimentCheckInOpen(true), 10000 - sinceVideo);
        } else {
          setIsSentimentCheckInOpen(true);
        }
      }, 6 * 60 * 1000); // 6 minutes
      sentimentTimerRef.current = timer;
      return () => clearTimeout(timer);
    }
  }, [currentPage, lastVideoEndedAt]); // Re-run when page changes to reset the 6-minute timer

  useEffect(() => {
    // Apply theme class to document element
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Listen for custom navigation events
  useEffect(() => {
    const handleNavigateToPurchase = () => {
      setCurrentPage("purchase");
      window.scrollTo(0, 0);
    };

    window.addEventListener('navigateToPurchase', handleNavigateToPurchase);
    return () => window.removeEventListener('navigateToPurchase', handleNavigateToPurchase);
  }, []);

  // 🔴 EMERGENCY: Engagement tracking COMPLETELY DISABLED to allow database recovery
  // Initialize engagement tracking
  // useEffect(() => {
  //   initEngagementTracking();
  // }, []);

  // Auto-open agent and play video for new users after 7 seconds on home
  useEffect(() => {
    if (currentPage === "home") {
      const hasVisited = localStorage.getItem("ora_first_visit_done");
      if (!hasVisited) {
        const timer = setTimeout(() => {
          setIsAgentOpen(true);
          setAutoPlayAgentVideo(true);
          localStorage.setItem("ora_first_visit_done", "true");
        }, 7000);
        return () => clearTimeout(timer);
      }
    }
  }, [currentPage]); 

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const navigateToLessons = () => {
    setCurrentPage("lessons");
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setCurrentPage("home");
    window.scrollTo(0, 0);
  };

  const navigateToPurchase = () => {
    setCurrentPage("purchase");
    window.scrollTo(0, 0);
  };

  const navigateToExpressCheckout = () => {
    setCurrentPage("express-checkout");
    window.scrollTo(0, 0);
  };

  const navigateToProjections = () => {
    setCurrentPage("projections");
    window.scrollTo(0, 0);
  };

  const navigateTo90Day = () => {
    setCurrentPage("90day");
    window.scrollTo(0, 0);
  };

  const navigateToSocial = () => {
    setCurrentPage("social");
    window.scrollTo(0, 0);
  };

  const navigateToVeterans = () => {
    setCurrentPage("veterans");
    window.scrollTo(0, 0);
  };

  const navigateToB2B = () => {
    setCurrentPage("b2b");
    window.scrollTo(0, 0);
  };

  const navigateToProgress = () => {
    setCurrentPage("progress");
    window.scrollTo(0, 0);
  };

  const navigateToNotebook = () => {
    setCurrentPage("notebook");
    window.scrollTo(0, 0);
  };

  const navigateToSentiment = () => {
    setCurrentPage("sentiment");
    window.scrollTo(0, 0);
  };

  const navigateToLibrary = () => {
    setCurrentPage("library");
    window.scrollTo(0, 0);
  };

  const navigateToAbout = () => {
    setCurrentPage("about");
    window.scrollTo(0, 0);
  };

  const navigateToDonate = () => {
    setCurrentPage("donate");
    window.scrollTo(0, 0);
  };

  const navigateToImpact = () => {
    setCurrentPage("impact");
    window.scrollTo(0, 0);
  };

  const navigateTo5Year = () => {
    setCurrentPage("5year");
    window.scrollTo(0, 0);
  };

  const navigateToMLAnalytics = () => {
    setCurrentPage("ml-analytics");
    window.scrollTo(0, 0);
  };

  const navigateToPageCopy1 = () => {
    setCurrentPage("pagecopy1");
    window.scrollTo(0, 0);
  };

  const toggleAgent = () => {
    setIsAgentOpen(prev => !prev);
  };

  const handleSentimentSave = (sentiment: string) => {
    // Save sentiment to localStorage with timestamp
    const sentimentData = {
      sentiment,
      timestamp: new Date().getTime(),
    };
    
    const existingSentiments = localStorage.getItem('userSentiments');
    const sentiments = existingSentiments ? JSON.parse(existingSentiments) : [];
    sentiments.push(sentimentData);
    localStorage.setItem('userSentiments', JSON.stringify(sentiments));
    
    // Update last check-in time
    localStorage.setItem('lastSentimentCheckIn', new Date().getTime().toString());
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onAgentToggle={toggleAgent}
        onNavigateToHome={navigateToHome}
        onNavigateToPurchase={navigateToPurchase}
        onNavigateToProjections={navigateToProjections}
        onNavigateTo90Day={navigateTo90Day}
        onNavigateToSocial={navigateToSocial}
        onNavigateToVeterans={navigateToVeterans}
        onNavigateToB2B={navigateToB2B}
        onNavigateToProgress={navigateToProgress}
        onNavigateToNotebook={navigateToNotebook}
        onNavigateToSentiment={navigateToSentiment}
        onNavigateToLibrary={navigateToLibrary}
        onNavigateToAbout={navigateToAbout}
        onNavigateToDonate={navigateToDonate}
        onNavigateToPageCopy1={navigateToPageCopy1}
        currentPage={currentPage}
      />
      
      {currentPage === "home" && (
        <main>
          <HeroSection />
          <WebAppsShowcase onNavigateToLessons={navigateToLessons} />
          <FAQ />
        </main>
      )}
      
      {currentPage === "lessons" && (
        <main>
          <LessonContent 
            onBack={navigateToHome}
            onVideoWatched={handleAnyVideoEnded}
          />
        </main>
      )}
      
      {currentPage === "purchase" && (
        <main>
          <PurchasePage 
            onBack={navigateToHome}
            onExpressCheckout={navigateToExpressCheckout}
          />
        </main>
      )}
      
      {currentPage === "express-checkout" && (
        <main>
          <ExpressCheckout onBack={navigateToHome} />
        </main>
      )}
      
      {currentPage === "projections" && (
        <main>
          <ProfitProjections />
        </main>
      )}
      
      {currentPage === "90day" && (
        <main>
          <IncomeProjection90Day />
        </main>
      )}

      {currentPage === "social" && (
        <main>
          <SocialMediaStrategy />
        </main>
      )}

      {currentPage === "veterans" && (
        <main>
          <VeteransIAPRevenue />
        </main>
      )}

      {currentPage === "b2b" && (
        <main>
          <B2BWhiteLabelDashboard />
        </main>
      )}

      {currentPage === "progress" && (
        <main>
          <ProgressPage onBack={navigateToHome} onNavigateToMLAnalytics={navigateToMLAnalytics} />
        </main>
      )}
      
      {currentPage === "notebook" && (
        <main>
          <AINotebook onBack={navigateToHome} />
        </main>
      )}
      
      {currentPage === "sentiment" && (
        <main>
          <SentimentTracking
            onSave={handleSentimentSave}
            onClose={() => setIsSentimentCheckInOpen(false)}
          />
        </main>
      )}
      
      {currentPage === "library" && (
        <main>
          <Library />
        </main>
      )}
      
      {currentPage === "about" && (
        <main>
          <About />
        </main>
      )}
      
      {currentPage === "donate" && (
        <main className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <DonationSection />
          </div>
        </main>
      )}
      
      {currentPage === "impact" && (
        <main className="min-h-screen">
          <ImpactCard value={1000000} description="Lives impacted through our programs" />
        </main>
      )}
      
      {currentPage === "5year" && (
        <main className="min-h-screen">
          <FiveYearConservative />
        </main>
      )}
      
      {currentPage === "ml-analytics" && (
        <main className="min-h-screen">
          <MLAnalyticsDashboard onBack={navigateToHome} />
        </main>
      )}
      
      {currentPage === "pagecopy1" && (
        <main>
          <LessonViewer
            lessonTitle="Applied AI Governance & Organizational Blind Spots"
            onBack={navigateToHome}
            onVideoWatched={handleAnyVideoEnded}
          />
        </main>
      )}
      
      <Footer 
        onNavigateToProjections={navigateToProjections} 
        onNavigateToDonate={navigateToDonate}
        onNavigateToMLAnalytics={navigateToMLAnalytics}
      />
      
      {/* AI Agent */}
      {isAgentOpen && <AIAgent onClose={() => setIsAgentOpen(false)} autoPlayVideo={autoPlayAgentVideo} onVideoPlayed={() => setAutoPlayAgentVideo(false)} onVideoEnded={handleAnyVideoEnded} />}
      
      {/* Sentiment Check-In */}
      <SentimentCheckIn 
        isOpen={isSentimentCheckInOpen} 
        onClose={() => setIsSentimentCheckInOpen(false)} 
        onSave={handleSentimentSave} 
      />
      
      {/* Floating Sentiment Check-In Button */}
      <button
        onClick={() => setIsSentimentCheckInOpen(true)}
        className="fixed bottom-20 right-6 z-40 bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
        aria-label="Check-in"
        title="How are you feeling?"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
}