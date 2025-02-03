"use client";

import { useState, useEffect } from "react";
import { Linkedin } from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaHeart, FaPaperPlane } from "react-icons/fa";

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

  const [isSending, setIsSending] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSending(false);
  };

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="cube-loader">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="cube-block" />
          ))}
        </div>
      </div>
    );
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
        <div className="w-full px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center pl-2">
              <span className="text-2xl font-bold text-navy">Portfolio</span>
            </div>
            <div className="flex space-x-6 pr-2">
              {["about", "projects", "blog", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`nav-link inline-flex items-center px-2 pt-1 text-sm font-medium border-b-2 transition-all duration-300 hover:scale-110 ${activeSection === section
                    ? "border-navy text-navy"
                    : "border-transparent text-gray-500 hover:text-navy hover:border-navy"
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
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-navy shadow-xl">
                  <Image
                    src="/ayushi.jpg"
                    alt="Ayushi Lathiya"
                    width={192}
                    height={192}
                    className="object-cover"
                  />
                </div>

                <div className="typewriter-container">
                  <h1 className="text-3xl font-bold text-left typewriter">
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
              <div className="space-y-6">
                {[
                  {
                    title: "Team Member",
                    org: "Google Developer Student Club - LDCE",
                    period: "Nov 2023 - Oct 2024",
                    desc: "Contributed to technical writing and organizing workshops.",
                    skills: ["Technical Writing", "Android Studio", "Open Source", "Google Cloud"]
                  },
                  {
                    title: "Content Writer",
                    org: "Wizdom",
                    period: "Apr 2024 - Jul 2024",
                    desc: "Creating technical content and documentation.",
                    skills: ["Technical Writing", "Content Strategy", "Documentation", "Research"]
                  },
                  {
                    title: "Teaching Assistant",
                    org: "Mastermind Education",
                    period: "Jun 2022 - Feb 2024",
                    desc: "Assisting students with technical concepts and projects.",
                    skills: ["Teaching", "Mentoring", "Problem Solving", "Communication"]
                  }
                ].map((pos, idx) => (
                  <div key={idx} className="p-6 rounded-lg bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <h3 className="font-semibold text-lg">{pos.title}</h3>
                    <p className="text-gray-600">{pos.org} • {pos.period}</p>
                    <p className="mt-2">{pos.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {pos.skills.map((skill, skillIdx) => (
                        <span key={skillIdx} className="skill-box text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="section-box">
              <h2 className="text-2xl font-semibold text-navy mb-6 text-left">
                Education
              </h2>
              <div className="space-y-6">
                <div className="p-6 rounded-lg bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-2xl">Lalbhai Dalpatbhai College of Engineering</h3>
                      <p className="text-xl text-navy mt-2">Bachelor of Engineering in Electronics & Communications</p>
                    </div>
                    <p className="text-gray-600">2021-2025</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["VLSI Design", "Digital Electronics", "Embedded Systems", "Circuit Theory", "Internet of Things", "Computer Networks", "Microcontrollers", "Machine Learning", "Signal Processing"].map((skill, idx) => (
                      <span key={idx} className="skill-box text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-2xl">The H. B. Kapadia New High School</h3>
                      <p className="text-xl text-navy mt-2">Higher Secondary Education</p>
                    </div>
                    <p className="text-gray-600">2021-2022</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Physics", "Mathematics", "Chemistry", "Computer Science"].map((skill, idx) => (
                      <span key={idx} className="skill-box text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy mb-8">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* WiFi-Controlled Car */}
              <div className="section-box hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/95">
                <Image
                  src="/wifi.jpg" // Replace with actual image
                  alt="WiFi-Controlled Car"
                  width={500}
                  height={300}
                  className="rounded-t-lg w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">WiFi-Controlled Car</h3>
                  <p className="text-gray-600 mb-4">
                    A smart car that can be controlled wirelessly using ESP8266 NodeMCU and a mobile app.
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["ESP8266", "L298N", "JavaScript", "HTML", "CSS", "IoT"].map((tech, techIdx) => (
                      <span key={techIdx} className="skill-box text-sm">{tech}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 mt-3 items-center">
                    <a href="https://github.com/ayushilathiya/WiFi-Controlled-Car" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-navy hover:translate-y-1 transition-all duration-300">
                      <SiGithub className="w-5 h-5 text-[#002b59]" />
                      <span className="text-sm">Code</span>
                    </a>
                    <a href="https://youtu.be/vaGgphrMhso" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-navy hover:translate-y-1 transition-all duration-300">
                      <img
                        src="https://simpleicons.org/icons/youtube.svg"
                        alt="Demo"
                        className="w-5 h-5"
                        style={{ filter: 'invert(15%) sepia(64%) saturate(1486%) hue-rotate(182deg) brightness(97%) contrast(102%)' }}
                      />
                      <span className="text-sm">Demo</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* 3D Modeling Using Sensors */}
              <div className="section-box hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/95">
                <Image
                  src="/3dmodel.jpg" // Replace with actual image
                  alt="Sensor-Driven 3D Modeling"
                  width={500}
                  height={300}
                  className="rounded-t-lg w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">3D Modeling Using Sensor-Driven 3D Visualization</h3>
                  <p className="text-gray-600 mb-4">
                    Developed a system that captures sensor data to generate dynamic 3D models, providing a visual representation of
                    environmental parameters.
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["MPU6050", "WebGL", "Three.js", "Data Visualization"].map((tech, techIdx) => (
                      <span key={techIdx} className="skill-box text-sm">{tech}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 mt-3 items-center">
                    <a href="https://github.com/ayushilathiya/MPU6050-3D-Visualization" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-navy hover:translate-y-1 transition-all duration-300">
                      <SiGithub className="w-5 h-5 text-[#002b59]" />
                      <span className="text-sm">Code</span>
                    </a>
                    <a href="https://ayushilathiya.hashnode.dev/3d-modeling-sensors" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-navy hover:translate-y-1 transition-all duration-300">
                      <img
                        src="https://simpleicons.org/icons/youtube.svg"
                        alt="Demo"
                        className="w-5 h-5"
                        style={{ filter: 'invert(15%) sepia(64%) saturate(1486%) hue-rotate(182deg) brightness(97%) contrast(102%)' }}
                      />
                      <span className="text-sm">Demo</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* DSCH & Microwind Logic Gates */}
              <div className="section-box hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/95">
                <Image
                  src="/dsch.jpg" // Replace with actual image
                  alt="Logic Gates in DSCH & Microwind"
                  width={500}
                  height={300}
                  className="rounded-t-lg w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Designing & Simulating in DSCH & Microwind</h3>
                  <p className="text-gray-600 mb-4">
                    Hands-on Logic Gate Simulation and Verilog Implementation Using DSCH and Microwind.
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["DSCH", "Microwind", "Verilog", "Logic Gates", "Digital Design"].map((tech, techIdx) => (
                      <span key={techIdx} className="skill-box text-sm">{tech}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 mt-3 items-center">
                    <a href="https://github.com/ayushilathiya/DSCH-MW" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-navy hover:translate-y-1 transition-all duration-300">
                      <SiGithub className="w-5 h-5 text-[#002b59]" />
                      <span className="text-sm">Code</span>
                    </a>
                    <a href="https://ayushilathiya.hashnode.dev/3d-modeling-sensors" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-navy hover:translate-y-1 transition-all duration-300">
                      <img
                        src="https://simpleicons.org/icons/youtube.svg"
                        alt="Demo"
                        className="w-5 h-5"
                        style={{ filter: 'invert(15%) sepia(64%) saturate(1486%) hue-rotate(182deg) brightness(97%) contrast(102%)' }}
                      />
                      <span className="text-sm">Demo</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* ESP-NOW Communication */}
              <div className="section-box hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/95">
                <Image
                  src="/espnow.jpg" // Replace with actual image
                  alt="ESP-NOW Protocol"
                  width={500}
                  height={300}
                  className="rounded-t-lg w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">ESP-NOW Protocol</h3>
                  <p className="text-gray-600 mb-4">
                    An implementation of ESP-NOW for seamless unidirectional wireless communication.
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["C++", "ESP-NOW", "Wireless Communication"].map((tech, techIdx) => (
                      <span key={techIdx} className="skill-box text-sm">{tech}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 mt-3 items-center">
                    <a href="https://github.com/ayushilathiya/ESP-NOW-Protocol" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-navy hover:translate-y-1 transition-all duration-300">
                      <SiGithub className="w-5 h-5 text-[#002b59]" />
                      <span className="text-sm">Code</span>
                    </a>
                    <a href="https://youtu.be/NGjMKT3Scls" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-navy hover:translate-y-1 transition-all duration-300">
                      <img
                        src="https://simpleicons.org/icons/youtube.svg"
                        alt="Demo"
                        className="w-5 h-5"
                        style={{ filter: 'invert(15%) sepia(64%) saturate(1486%) hue-rotate(182deg) brightness(97%) contrast(102%)' }}
                      />
                      <span className="text-sm">Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy mb-8">Blog</h2>
            <a
              href="https://ayushilathiya.hashnode.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="section-box hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/95">
                {/* Header with Profile */}
                <div className="p-8 border-b">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="https://cdn.hashnode.com/res/hashnode/image/upload/v1611902473383/CDyAuTy75.png"
                      alt="Hashnode"
                      className="w-8 h-8"
                    />
                    <div>
                      <h3 className="font-bold text-xl">Ayushi Lathiya</h3>
                      <p className="text-gray-600">@ayushilathiya</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Exploring the intersections of VLSI,IoT, Embedded Systems, and Innovation. Join me on my technical journey!
                  </p>
                </div>

                {/* Featured Posts Preview */}
                <div className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Image
                        src="/3dblog.png" // Add your blog cover image
                        alt="3D Visualization Blog Cover"
                        width={64}
                        height={64}
                        className="rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">Sensor-Driven 3D Visualization</h4>
                        <p className="text-gray-600 text-sm">Creating 3D models using ultrasonic sensors and DC motors...</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Image
                        src="/wifiblog.png" // Add your blog cover image
                        alt="WiFi Car Blog Cover"
                        width={64}
                        height={64}
                        className="rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">WiFi-Controlled Car</h4>
                        <p className="text-gray-600 text-sm">Building a remote-controlled car using ESP8266...</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-8 bg-gray-50 rounded-b-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-navy font-medium">Read more on Hashnode</span>
                      <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600">
                      <span>4 Articles</span>
                      <span>•</span>
                      <span>Technical Blog</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="section-box">
              <h2 className="text-3xl font-bold text-navy mb-8">Contact Me</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input type="text" placeholder="Your name" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" placeholder="your.email@example.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea placeholder="Your message" className="min-h-[150px]" required />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-navy hover:bg-navy-light transition-all duration-300 text-white"
                  disabled={isSending}
                >
                  {isSending ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin mr-2">
                        <FaPaperPlane className="h-4 w-4" />
                      </div>
                      <span className="text-white">Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <FaPaperPlane className="mr-2 h-4 w-4" />
                      <span className="text-white">Send Message</span>
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-navy">
          <p className="flex items-center justify-center gap-2">
            Made with <FaHeart className="text-navy animate-pulse" /> by Ayushi ;)
          </p>
        </footer>
      </main>

      <style jsx global>{`
        .section-box {
          @apply bg-white/80 rounded-3xl shadow-xl p-6 backdrop-blur-lg mb-6 
                 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/95;
        }
      `}</style>
    </div>
  );
}