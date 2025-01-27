"use client";

import { useState, useEffect } from "react";
import { Linkedin } from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [scrollY, setScrollY] = useState(0);
  const [floatingElements, setFloatingElements] = useState<Array<{
    width: number;
    height: number;
    left: number;
    top: number;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    setFloatingElements(
      Array.from({ length: 15 }, () => ({
        width: Math.random() * 200 + 50,
        height: Math.random() * 200 + 50,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10,
      }))
    );
  }, []);

  useEffect(() => {
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
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-navy relative overflow-hidden">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-navy">Portfolio</span>
            </div>
            <div className="flex space-x-8">
              {["about", "projects", "blog", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                    activeSection === section
                      ? "border-navy text-navy"
                      : "border-transparent text-gray-500 hover:text-navy hover:border-navy"
                  } transition-colors duration-200`}
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
          <div className="max-w-7xl mx-auto text-center">
            <div className="section-box">
              <div className="flex flex-col items-center gap-8">
                {/* Profile Image */}
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-navy shadow-xl">
                  <Image
                    src="/your-photo.jpg" // Replace with your photo path
                    alt="Ayushi Lathiya"
                    width={192}
                    height={192}
                    className="object-cover"
                  />
                </div>

                {/* Typewriter Effect */}
                <div className="typewriter-container">
                  <h1 className="typewriter text-3xl font-bold">
                    Hi, I'm Ayushi Lathiya
                  </h1>
                </div>

                <p className="text-lg max-w-2xl mx-auto">
                  I'm a passionate Embedded Systems Developer and VLSI Enthusiast dedicated to crafting innovative and efficient solutions. With expertise in embedded hardware-software integration and a keen interest in VLSI design and verification, I thrive on solving complex challenges that blend technology and creativity.
                </p>

                <div className="flex space-x-4">
                  <Link
                    href="https://github.com/ayushilathiya"
                    className="text-navy hover:text-navy/80 transition-colors"
                  >
                    <SiGithub className="w-6 h-6" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/ayushilathiya/"
                    className="text-navy hover:text-navy/80 transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                  </Link>
                  <Link
                    href="https://twitter.com"
                    className="text-navy hover:text-navy/80 transition-colors"
                  >
                    <SiX className="w-6 h-6" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Skills & Technologies */}
            <div className="section-box">
              <h2 className="text-2xl font-semibold text-navy mb-6">
                Skills & Technologies
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { name: "MOSFETs", link: "https://example.com/mosfets" },
                  { name: "Python", link: "https://python.org" },
                  { name: "C", link: "https://example.com/c" },
                  { name: "Verilog", link: "https://example.com/verilog" },
                  { name: "Xilinx", link: "https://www.xilinx.com" },
                  { name: "Machine Learning", link: "https://example.com/ml" },
                  { name: "NumPy", link: "https://numpy.org" },
                  { name: "MicroPython", link: "https://micropython.org" },
                  { name: "C++", link: "https://example.com/cpp" },
                  { name: "TensorFlow", link: "https://tensorflow.org" },
                  { name: "Proteus", link: "https://example.com/proteus" },
                  { name: "HTML", link: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
                  { name: "Embedded C", link: "https://example.com/embedded-c" },
                  { name: "CSS", link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
                  { name: "JavaScript", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
                  { name: "TypeScript", link: "https://www.typescriptlang.org" },
                  { name: "Tailwind CSS", link: "https://tailwindcss.com" },
                  { name: "Matplotlib", link: "https://matplotlib.org" },
                  { name: "Vercel", link: "https://vercel.com" },
                ].map((skill) => (
                  <Link key={skill.name} href={skill.link} target="_blank">
                    <span className="skill-box">{skill.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Positions of Responsibility */}
            <div className="section-box">
              <h2 className="text-2xl font-semibold text-navy mb-6">
                Positions of Responsibility
              </h2>
              <div className="space-y-4">
                <div className="border-l-2 border-navy pl-4">
                  <h3 className="font-semibold">Team Member</h3>
                  <p className="text-gray-600">
                    Google Developer Student Club - LDCE • Nov 2023 - Oct 2024
                  </p>
                </div>
                <div className="border-l-2 border-navy pl-4">
                  <h3 className="font-semibold">Content Writer</h3>
                  <p className="text-gray-600">
                    Wizdom • Apr 2024 - Jul 2024
                  </p>
                </div>
                <div className="border-l-2 border-navy pl-4">
                  <h3 className="font-semibold">Teaching Assistant</h3>
                  <p className="text-gray-600">
                    Mastermind Education • Jun 2022 - Feb 2024
                  </p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="section-box">
              <h2 className="text-2xl font-semibold text-navy mb-6">
                Education
              </h2>
              <div className="border-l-2 border-navy pl-4">
                <h3 className="font-semibold">Computer Science, BSc</h3>
                <p className="text-gray-600">
                  Tech University • 2014 - 2018
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Keep other sections (projects, blog, contact) as they were */}
        {/* ... */}
      </main>
    </div>
  );
}