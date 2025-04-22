"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

type HeaderProps = {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
};

export function Header({ activeSection, scrollToSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-lg">
      <div className="w-full px-2 sm:px-4">
        <div className="flex justify-between h-14 sm:h-16">
          <div className="flex items-center pl-1 sm:pl-2">
            <span className="text-xl sm:text-2xl font-bold text-navy">
              Portfolio
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 pr-2">
            {["about", "spotlight", "projects", "blog", "contact"].map(
              (section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`nav-link inline-flex items-center px-2 pt-1 text-sm font-medium border-b-2 transition-all duration-300 hover:scale-110 ${
                    activeSection === section
                      ? "border-navy text-navy"
                      : "border-transparent text-gray-500 hover:text-navy hover:border-navy"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              )
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-navy p-1.5 sm:p-2 rounded-lg hover:bg-navy/5 active:bg-navy/10 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-14 sm:top-16 bg-white/95 backdrop-blur-md shadow-lg z-50 border-t border-gray-100">
            <div className="px-2 py-1.5 space-y-0.5 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {["about", "spotlight", "projects", "blog", "contact"].map(
                (section) => (
                  <button
                    key={section}
                    onClick={() => {
                      scrollToSection(section);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 active:scale-98 touch-manipulation ${
                      activeSection === section
                        ? "bg-navy/10 text-navy"
                        : "text-gray-600 hover:bg-navy/5 hover:text-navy active:bg-navy/10"
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
