import { useState, useEffect } from "react";
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

  const [currentPage, setCurrentPage] = useState<"home" | "lessons" | "purchase" | "express-checkout" | "projections" | "90day" | "social" | "veterans" | "b2b" | "progress" | "notebook" | "sentiment" | "library" | "about" | "donate" | "impact" | "5year" | "ml-analytics">("home");
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [isSentimentCheckInOpen, setIsSentimentCheckInOpen] = useState(false);

  // Check for sentiment check-in after 6 minutes on the same page
  useEffect(() => {
    const lastCheckIn = localStorage.getItem('lastSentimentCheckIn');
    const now = new Date().getTime();
    const oneHourInMs = 60 * 60 * 1000; // 60 minutes
    
    // Show sentiment check-in if never shown or if it's been more than 60 minutes
    if (!lastCheckIn || now - parseInt(lastCheckIn) > oneHourInMs) {
      // Wait 6 minutes (360,000 ms) before showing the modal
      const timer = setTimeout(() => {
        setIsSentimentCheckInOpen(true);
      }, 6 * 60 * 1000); // 6 minutes
      
      // Clear timer if page changes or component unmounts
      return () => clearTimeout(timer);
    }
  }, [currentPage]); // Re-run when page changes to reset the 6-minute timer

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
            onVideoWatched={() => setIsSentimentCheckInOpen(true)}
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
          <ExpressCheckout onBack={navigateToPurchase} />
        </main>
      )}
      
      {currentPage === "projections" && (
        <main>
          <ProfitProjections />
        </main>
      )}
      
      {currentPage === "90day" && (
        <main>
          <IncomeProjection6Month />
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
          <SentimentTracking onBack={navigateToHome} />
        </main>
      )}
      
      {currentPage === "library" && (
        <main>
          <Library onBack={navigateToHome} />
        </main>
      )}
      
      {currentPage === "about" && (
        <main>
          <About onGetStarted={navigateToLessons} />
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
          <ImpactStats />
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
      
      <Footer 
        onNavigateToProjections={navigateToProjections} 
        onNavigateToDonate={navigateToDonate}
        onNavigateToMLAnalytics={navigateToMLAnalytics}
      />
      
      {/* AI Agent */}
      {isAgentOpen && <AIAgent onClose={() => setIsAgentOpen(false)} />}
      
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