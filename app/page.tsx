"use client";

import { useState, useEffect } from "react";
import { Linkedin } from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [scrollY, setScrollY] = useState(0);
  const [loading, setLoading] = useState(true);
  const [floatingElements, setFloatingElements] = useState<Array<{
    width: number;
    height: number;
    left: number;
    top: number;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    setMounted(true);
    setFloatingElements(
      Array.from({ length: 20 }, () => ({
        width: Math.random() * 250 + 50,
        height: Math.random() * 250 + 50,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10,
      }))
    );

    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ["about", "projects", "blog", "contact"];
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

  // Don't render anything until client-side hydration is complete
  if (!mounted) return null;

  if (loading) {
    return <div className="loading-screen" />;
  }

  return (
    <div className="min-h-screen bg-white text-navy relative overflow-x-hidden">
      {/* Background Graphics */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-pattern"></div>
        <div className="absolute w-full h-full">
          {floatingElements.map((element, i) => (
            <div
              key={i}
              className="navy-circle"
              style={{
                width: `${element.width}px`,
                height: `${element.height}px`,
                left: `${element.left}%`,
                top: `${element.top}%`,
                animationDelay: `${element.delay}s`,
                animationDuration: `${element.duration}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-navy">Portfolio</span>
            </div>
            <div className="flex space-x-8">
              {["about", "projects", "blog", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`nav-link inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                    activeSection === section
                      ? "border-navy text-navy"
                      : "border-transparent text-gray-500"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 relative z-10">
        {/* About Section */}
        <section id="about" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="section-box">
              <div className="flex flex-col items-center gap-8">
                {/* Profile Image */}
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-navy shadow-xl">
                  <Image
                    src="/your-photo.jpg"
                    alt="Ayushi Lathiya"
                    width={192}
                    height={192}
                    className="object-cover"
                  />
                </div>

                {/* Typewriter Effect */}
                <div className="typewriter-container">
                  <h1 className="typewriter text-3xl font-bold text-left">
                    Hi, I'm Ayushi Lathiya
                  </h1>
                </div>

                <p className="text-lg text-left">
                  I'm a passionate Embedded Systems Developer and VLSI Enthusiast dedicated to crafting innovative and efficient solutions. With expertise in embedded hardware-software integration and a keen interest in VLSI design and verification, I thrive on solving complex challenges that blend technology and creativity.
                </p>

                <div className="flex space-x-4">
                  {[
                    { icon: SiGithub, href: "https://github.com/ayushilathiya", label: "GitHub" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/ayushilathiya/", label: "LinkedIn" },
                    { icon: SiX, href: "https://twitter.com", label: "Twitter" },
                  ].map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      className="social-link"
                      aria-label={social.label}
                    >
                      <social.icon className="w-6 h-6" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills & Technologies */}
            <div className="section-box">
              <h2 className="text-2xl font-semibold text-navy mb-6 text-left">
                Skills & Technologies
              </h2>
              <div className="flex flex-wrap justify-start gap-3">
                {[
                  "MOSFETs",
                  "Python",
                  "C",
                  "Verilog",
                  "Xilinx",
                  "Machine Learning",
                  "NumPy",
                  "MicroPython",
                  "C++",
                  "TensorFlow",
                  "Proteus",
                  "HTML",
                  "Embedded C",
                  "CSS",
                  "JavaScript",
                  "TypeScript",
                  "Tailwind CSS",
                  "Matplotlib",
                  "Vercel",
                ].map((skill) => (
                  <span key={skill} className="skill-box">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Positions of Responsibility */}
            <div className="section-box">
              <h2 className="text-2xl font-semibold text-navy mb-6 text-left">
                Positions of Responsibility
              </h2>
              <div className="space-y-4">
                <div className="border-l-2 border-navy pl-4">
                  <h3 className="font-semibold">Team Member</h3>
                  <p className="text-gray-600">
                    Google Developer Student Club - LDCE • Nov 2023 - Oct 2024
                  </p>
                  <p className="mt-2">
                    Contributing to technical projects and organizing workshops.
                  </p>
                </div>
                <div className="border-l-2 border-navy pl-4">
                  <h3 className="font-semibold">Content Writer</h3>
                  <p className="text-gray-600">
                    Wizdom • Apr 2024 - Jul 2024
                  </p>
                  <p className="mt-2">
                    Creating technical content and documentation.
                  </p>
                </div>
                <div className="border-l-2 border-navy pl-4">
                  <h3 className="font-semibold">Teaching Assistant</h3>
                  <p className="text-gray-600">
                    Mastermind Education • Jun 2022 - Feb 2024
                  </p>
                  <p className="mt-2">
                    Assisting students with technical concepts and projects.
                  </p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="section-box">
              <h2 className="text-2xl font-semibold text-navy mb-6 text-left">
                Education
              </h2>
              <div className="border-l-2 border-navy pl-4">
                <h3 className="font-semibold">B.E. in Electronics & Communication</h3>
                <p className="text-gray-600">
                  L.D. College of Engineering • 2021 - 2025
                </p>
                <p className="mt-2">
                  Relevant coursework: Digital Electronics, VLSI Design, Embedded Systems
                </p>
                <ul className="mt-2 list-disc list-inside">
                  <li>CGPA: 9.23/10</li>
                  <li>Member of IEEE Student Branch</li>
                  <li>Technical Team Lead for College Projects</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy mb-8">Projects</h2>
            {/* Add your projects content here */}
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy mb-8">Blog</h2>
            {/* Add your blog content here */}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy mb-8">Contact</h2>
            {/* Add your contact content here */}
          </div>
        </section>
      </main>
    </div>
  );
}