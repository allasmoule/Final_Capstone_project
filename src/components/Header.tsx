import React, { useState, useEffect } from "react";
import { Menu, X, Phone, MessageCircle, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface HeaderProps {
  onAdvocateRegister?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAdvocateRegister }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("home");
  const { toggleLanguage, t } = useLanguage();

  // Track active route based on hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") || "home";
      setActiveRoute(hash);
    };

    // Set initial route
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navLinkClass = (route: string) => {
    const isActive = activeRoute === route;
    return `font-medium transition-colors ${
      isActive
        ? "text-blue-600 border-b-2 border-blue-600 pb-1"
        : "text-gray-700 hover:text-blue-600"
    }`;
  };

  const mobileNavLinkClass = (route: string) => {
    const isActive = activeRoute === route;
    return `font-medium transition-colors ${
      isActive
        ? "text-blue-600 bg-blue-50 px-3 py-2 rounded-lg"
        : "text-gray-700 hover:text-blue-600"
    }`;
  };

  const handleNavClick = (route: string) => {
    setActiveRoute(route);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-3 rounded-xl mr-3 shadow-lg">
              <div className="flex items-center">
                <MessageCircle className="h-6 w-6 mr-1" />
                <span className="text-lg font-bold">২৪</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t("app.name")}
              </h1>
              <p className="text-xs text-gray-600">{t("app.tagline")}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <a
              href="#home"
              onClick={() => handleNavClick("home")}
              className={navLinkClass("home")}
            >
              {t("nav.home")}
            </a>
            <a
              href="#advocates"
              onClick={() => handleNavClick("advocates")}
              className={navLinkClass("advocates")}
            >
              {t("nav.advocates")}
            </a>
            <a
              href="#education"
              onClick={() => handleNavClick("education")}
              className={navLinkClass("education")}
            >
              {t("nav.education")}
            </a>
            <a
              href="#somjhota"
              onClick={() => handleNavClick("somjhota")}
              className={navLinkClass("somjhota")}
            >
              {t("nav.somjhota")}
            </a>
            <a
              href="#guidelines"
              onClick={() => handleNavClick("guidelines")}
              className={navLinkClass("guidelines")}
            >
              {t("nav.guidelines")}
            </a>
            <a
              href="#contact"
              onClick={() => handleNavClick("contact")}
              className={navLinkClass("contact")}
            >
              {t("nav.contact")}
            </a>
            <button
              onClick={onAdvocateRegister}
              className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
            >
              {t("nav.registration")}
            </button>

            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
            >
              <Globe className="h-4 w-4 mr-1" />
              {t("language.switch")}
            </button>

            <div className="flex items-center text-red-600 ml-4">
              <Phone className="h-4 w-4 mr-1" />
              <span className="text-xs font-semibold">
                {t("emergency.999")}
              </span>
            </div>
            <button className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium text-sm">
              {t("nav.emergency")}
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center bg-purple-600 text-white px-2 py-1 rounded-lg hover:bg-purple-700 transition-colors font-medium text-xs"
            >
              <Globe className="h-3 w-3 mr-1" />
              {t("language.label")}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              <a
                href="#home"
                onClick={() => handleNavClick("home")}
                className={mobileNavLinkClass("home")}
              >
                {t("nav.home")}
              </a>
              <a
                href="#advocates"
                onClick={() => handleNavClick("advocates")}
                className={mobileNavLinkClass("advocates")}
              >
                {t("nav.advocates")}
              </a>
              <a
                href="#education"
                onClick={() => handleNavClick("education")}
                className={mobileNavLinkClass("education")}
              >
                {t("nav.education")}
              </a>
              <a
                href="#somjhota"
                onClick={() => handleNavClick("somjhota")}
                className={mobileNavLinkClass("somjhota")}
              >
                {t("nav.somjhota")}
              </a>
              <a
                href="#guidelines"
                onClick={() => handleNavClick("guidelines")}
                className={mobileNavLinkClass("guidelines")}
              >
                {t("nav.guidelines")}
              </a>
              <a
                href="#contact"
                onClick={() => handleNavClick("contact")}
                className={mobileNavLinkClass("contact")}
              >
                {t("nav.contact")}
              </a>
              <button
                onClick={() => {
                  onAdvocateRegister?.();
                  setIsMenuOpen(false);
                }}
                className="text-left text-gray-700 hover:text-blue-600 font-medium"
              >
                {t("nav.advocateRegistration")}
              </button>
              <div className="pt-2 border-t">
                <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                  {t("nav.emergency")}
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
