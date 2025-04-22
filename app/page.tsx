"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { BackgroundElements } from "@/components/BackgroundElements";
import { Loading } from "@/components/Loading";
import { Footer } from "@/components/Footer";
import AboutSection from "./about/page";
import SpotlightSection from "./spotlight/page";
import ProjectsSection from "./projects/page";
import BlogSection from "./blog/page";
import ContactSection from "./contact/page";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const sections = ["about", "spotlight", "projects", "blog", "contact"];
      const sectionElements = sections.map((id) => document.getElementById(id));

      sectionElements.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  if (!mounted) return null;

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white text-navy relative overflow-x-hidden">
      {/* Background Graphics */}
      <BackgroundElements />

      {/* Navigation */}
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* Main Content */}
      <main className="pt-14 sm:pt-16 relative z-10">
        {/* About Section */}
        <section
          id="about"
          className="min-h-screen py-8 sm:py-12 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8"
        >
          <AboutSection />
        </section>

        {/* Spotlight Section */}
        <section
          id="spotlight"
          className="min-h-screen py-20 px-4 sm:px-6 lg:px-8"
        >
          <SpotlightSection />
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="min-h-screen py-20 px-4 sm:px-6 lg:px-8"
        >
          <ProjectsSection />
        </section>

        {/* Blog Section */}
        <section id="blog" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
          <BlogSection />
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen py-20 px-4 sm:px-6 lg:px-8"
        >
          <ContactSection />
        </section>

        {/* Footer */}
        <Footer />
      </main>

      <style jsx global>{`
        .section-box {
          @apply bg-white/80 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl 
                 p-4 sm:p-6 backdrop-blur-lg mb-4 sm:mb-6 
                 transition-all duration-300 active:scale-[0.995] sm:hover:-translate-y-2 
                 hover:shadow-xl sm:hover:shadow-2xl hover:bg-white/95;
        }

        .skill-box {
          @apply bg-white/50 rounded-lg border border-gray-200/50 
                 transition-all duration-200 active:scale-[0.98] 
                 touch-manipulation;
        }

        .social-link {
          @apply inline-flex items-center justify-center bg-white/80 
                 rounded-full shadow-md hover:shadow-lg p-2.5 sm:p-3.5
                 min-w-[40px] min-h-[40px] sm:min-w-[48px] sm:min-h-[48px]
                 hover:bg-navy hover:text-white 
                 active:scale-95 transition-all duration-200;
        }

        @media (max-width: 640px) {
          .social-link {
            @apply p-2 text-sm;
          }

          .nav-link {
            @apply py-1.5;
          }

          .typewriter {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
