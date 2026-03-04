import React from "react";
import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AdvocateSuggestion from "./components/AdvocateSuggestion";
import LegalGuidelines from "./components/LegalGuidelines";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import AdvocateRegistration from "./components/AdvocateRegistration";
import ContactPage from "./components/ContactPage";
import EducationPage from "./components/EducationPage";
import SomjhotaPage from "./components/SomjhotaPage";
import { LanguageProvider } from "./context/LanguageContext";

interface Advocate {
  id: number;
  name: string;
  specialization: string;
  rating: number;
  experience: string;
  location: string;
  phone: string;
  image: string;
  cases: number;
  available: boolean;
  description?: string;
  barCouncilId?: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "advocate-registration" | "contact" | "education" | "somjhota"
  >("home");
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Handle navigation
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#contact") {
        setCurrentPage("contact");
      } else if (hash === "#advocate-registration") {
        setCurrentPage("advocate-registration");
      } else if (hash === "#education") {
        setCurrentPage("education");
      } else if (hash === "#somjhota") {
        setCurrentPage("somjhota");
      } else {
        setCurrentPage("home");
      }
      // Scroll to top when route changes
      window.scrollTo(0, 0);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Check initial hash

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Load registered advocates from localStorage
  const getRegisteredAdvocates = (): Advocate[] => {
    try {
      return JSON.parse(localStorage.getItem("registeredAdvocates") || "[]");
    } catch {
      return [];
    }
  };

  const handleAdvocateSuggestion = () => {
    // Scroll to advocates section
    const advocatesSection = document.getElementById("advocates");
    if (advocatesSection) {
      advocatesSection.scrollIntoView({ behavior: "smooth" });
    }
    setIsChatbotOpen(false);
  };

  const handleChatbotOpen = () => {
    setIsChatbotOpen(true);
  };
  if (currentPage === "advocate-registration") {
    return (
      <LanguageProvider>
        <div className="min-h-screen bg-white">
          <Header
            onAdvocateRegister={() => {
              setCurrentPage("advocate-registration");
              window.location.hash = "#advocate-registration";
            }}
          />
          <AdvocateRegistration onChatbotOpen={handleChatbotOpen} />
          <Chatbot
            isOpen={isChatbotOpen}
            onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
            onAdvocateSuggestion={handleAdvocateSuggestion}
          />
        </div>
      </LanguageProvider>
    );
  }

  if (currentPage === "education") {
    return (
      <LanguageProvider>
        <div className="min-h-screen bg-white">
          <Header
            onAdvocateRegister={() => {
              setCurrentPage("advocate-registration");
              window.location.hash = "#advocate-registration";
            }}
          />
          <EducationPage onAdvocateSuggestion={handleAdvocateSuggestion} />
        </div>
      </LanguageProvider>
    );
  }

  if (currentPage === "somjhota") {
    return (
      <LanguageProvider>
        <div className="min-h-screen bg-white">
          <Header
            onAdvocateRegister={() => {
              setCurrentPage("advocate-registration");
              window.location.hash = "#advocate-registration";
            }}
          />
          <SomjhotaPage />
          <Chatbot
            isOpen={isChatbotOpen}
            onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
            onAdvocateSuggestion={handleAdvocateSuggestion}
          />
        </div>
      </LanguageProvider>
    );
  }

  if (currentPage === "contact") {
    return (
      <LanguageProvider>
        <div className="min-h-screen bg-white">
          <Header
            onAdvocateRegister={() => {
              setCurrentPage("advocate-registration");
              window.location.hash = "#advocate-registration";
            }}
          />
          <ContactPage />
          <Chatbot
            isOpen={isChatbotOpen}
            onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
            onAdvocateSuggestion={handleAdvocateSuggestion}
          />
        </div>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Header
          onAdvocateRegister={() => {
            setCurrentPage("advocate-registration");
            window.location.hash = "#advocate-registration";
          }}
        />
        <Hero onChatbotOpen={handleChatbotOpen} />
        <AdvocateSuggestion customAdvocates={getRegisteredAdvocates()} />
        <LegalGuidelines onChatbotOpen={handleChatbotOpen} />
        <Footer />
        <Chatbot
          isOpen={isChatbotOpen}
          onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
          onAdvocateSuggestion={handleAdvocateSuggestion}
        />
      </div>
    </LanguageProvider>
  );
}

export default App;
