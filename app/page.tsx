"use client";

import { useState, useEffect } from "react";
import { Linkedin } from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";
import Link from "next/link";

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [scrollY, setScrollY] = useState(0);
  const [floatingElements, setFloatingElements] = useState<
    Array<{
      width: number;
      height: number;
      left: number;
      top: number;
      delay: number;
      duration: number;
    }>
  >([]);

  useEffect(() => {
    // Generate floating elements on the client side
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
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Pattern Background */}
        <div className="absolute inset-0 bg-pattern"></div>

        {/* Floating Elements */}
        <div className="absolute w-full h-full">
          {floatingElements.map((element, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-navy/5 animate-float"
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

        {/* Wave Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-10">
          <div className="absolute inset-0 bg-navy"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              {["about", "projects", "blog", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${activeSection === section
                      ? "border-navy text-navy"
                      : "border-transparent text-gray-500 hover:text-navy hover:border-navy"
                    } transition-colors duration-200`}>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 relative z-10">
        {/* About Section - Horizontal Layout */}
        <section id="about" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/90 rounded-2xl shadow-xl p-8 backdrop-blur-lg">
              <div className="flex flex-col gap-12">
                {/* Introduction and Social Links */}
                <div className="space-y-6">
                  <h1 className="text-4xl font-bold text-navy">About Me</h1>
                  <p className="text-lg max-w-2xl">
                    Hi, I'm a passionate Embedded Systems Developer and VLSI Enthusiast dedicated to crafting innovative and efficient solutions. With expertise in embedded hardware-software integration and a keen interest in VLSI design and verification, I thrive on solving complex challenges that blend technology and creativity.
                  </p>
                  <div className="flex space-x-4">
                    <Link
                      href="https://github.com/ayushilathiya"
                      className="text-navy hover:text-navy/80 transition-colors">
                      <SiGithub className="w-6 h-6" />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/ayushilathiya/"
                      className="text-navy hover:text-navy/80 transition-colors">
                      <Linkedin className="w-6 h-6" />
                    </Link>
                    <Link
                      href="https://twitter.com"
                      className="text-navy hover:text-navy/80 transition-colors">
                      <SiX className="w-6 h-6" />
                    </Link>
                    {/* <Link
                      href="/resume.pdf"
                      className="text-navy hover:text-navy/80 transition-colors">
                      <FileText className="w-6 h-6" />
                    </Link> */}
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-navy">Skills & Technologies</h2>
                  <div className="flex flex-wrap gap-2">
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
                      <span
                        key={skill}
                        className="px-3 py-1 bg-navy/10 text-navy rounded-full shadow-inner-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-navy">
                    Positions of Responsibility
                  </h2>
                  <div className="space-y-4">
                    <div className="border-l-2 border-navy pl-4">
                      <h3 className="font-semibold">Team Member</h3>
                      <p className="text-gray-600">
                        Google Developer Student Club - LDCE • Nov 2023 - Oct 2024
                      </p>
                    </div>
                    <div className="space-y-4">
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
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-navy">
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
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/90 rounded-2xl shadow-xl p-8 backdrop-blur-lg">
              <h2 className="text-4xl font-bold text-navy mb-8">Projects</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((project) => (
                  <div
                    key={project}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="h-48 bg-navy/10 rounded-lg mb-4"></div>
                    <h3 className="text-xl font-semibold text-navy mb-2">
                      Project {project}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      A beautiful and functional project showcasing modern web
                      development techniques.
                    </p>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-navy/10 text-navy rounded-full text-sm">
                        React
                      </span>
                      <span className="px-2 py-1 bg-navy/10 text-navy rounded-full text-sm">
                        TypeScript
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/90 rounded-2xl shadow-xl p-8 backdrop-blur-lg">
              <h2 className="text-4xl font-bold text-navy mb-8">Blog</h2>
              <div className="space-y-8">
                {[1, 2, 3].map((post) => (
                  <article
                    key={post}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-navy">
                        Modern Web Development Techniques
                      </h3>
                      <span className="text-sm text-gray-500">
                        March {post}, 2024
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Exploring the latest trends and best practices in modern
                      web development...
                    </p>
                    <Link
                      href="#"
                      className="text-navy hover:text-navy/80 transition-colors">
                      Read more →
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/90 rounded-2xl shadow-xl p-8 backdrop-blur-lg">
              <h2 className="text-4xl font-bold text-navy mb-8">Contact</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-lg mb-6">
                    I'm always open to new opportunities and collaborations.
                    Feel free to reach out!
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-navy">
                      <span className="font-semibold">Email:</span>
                      <a
                        href="mailto:contact@example.com"
                        className="hover:text-navy/80 transition-colors">
                        contact@example.com
                      </a>
                    </div>
                    <div className="flex items-center space-x-2 text-navy">
                      <span className="font-semibold">Location:</span>
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                </div>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-navy focus:border-navy"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-navy focus:border-navy"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-navy focus:border-navy"></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-navy text-white py-2 px-4 rounded-lg hover:bg-navy/90 transition-colors">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
