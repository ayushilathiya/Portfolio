"use client";

import { useState, useEffect } from "react";
import { Linkedin } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaHeart, FaPaperPlane } from "react-icons/fa";
import { Menu, X } from "lucide-react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');

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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/meoebdvd', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('submitted');
        form.reset();
        // Reset form status after 5 seconds
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setFormStatus('idle');
    }
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

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6 pr-2">
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

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-navy p-2"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {["about", "projects", "blog", "contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => {
                      scrollToSection(section);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${activeSection === section
                        ? "bg-navy/10 text-navy"
                        : "text-gray-500 hover:bg-navy/5 hover:text-navy"
                      }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 relative z-10">
        {/* About Section */}
        <section id="about" className="min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="section-box">
              <div className="flex flex-col items-center gap-4 sm:gap-8">
                <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-xl">
                  <Image
                    src="/ayushi.jpg"
                    alt="Ayushi Lathiya"
                    width={192}
                    height={192}
                    className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="typewriter-container">
                  <h1 className="text-3xl font-bold text-left typewriter">
                    Hi, I'm Ayushi Lathiya
                  </h1>
                </div>

                <p className="text-lg text-left">
                  As an Embedded Systems Developer and VLSI Enthusiast, I specialize in developing cutting-edge solutions at the intersection of hardware and software. With a strong foundation in embedded systems architecture and VLSI design principles, I focus on creating efficient, scalable solutions for complex technical challenges. My expertise spans hardware-software integration, digital design, and system optimization, complemented by a passion for emerging technologies in IoT and machine learning.
                </p>

                <div className="flex space-x-4">
                  {[
                    {
                      icon: SiGithub,
                      href: "https://github.com/ayushilathiya",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      label: "GitHub"
                    },
                    {
                      icon: Linkedin,
                      href: "https://www.linkedin.com/in/ayushilathiya/",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      label: "LinkedIn"
                    },
                    {
                      icon: ({ className }: { className: string }) => (
                        <svg
                          viewBox="0 0 24 24"
                          className={className}
                          fill="currentColor"
                        >
                          <path d="M22.351 8.019l-6.37-6.37a5.63 5.63 0 0 0-7.962 0l-6.37 6.37a5.63 5.63 0 0 0 0 7.962l6.37 6.37a5.63 5.63 0 0 0 7.962 0l6.37-6.37a5.63 5.63 0 0 0 0-7.962zM12 15.953a3.953 3.953 0 1 1 0-7.906 3.953 3.953 0 0 1 0 7.906z" />
                        </svg>
                      ),
                      href: "https://ayushilathiya.hashnode.dev",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      label: "Hashnode"
                    },
                    {
                      icon: ({ className }: { className: string }) => (
                        <div className="flex items-center gap-2">
                          <svg
                            viewBox="0 0 24 24"
                            className={className}
                            fill="currentColor"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
                          </svg>
                          <span>Download CV</span>
                        </div>
                      ),
                      href: "/docs/Ayushi_Lathiya_CV.pdf",
                      download: true,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target={social.target}
                      rel={social.rel}
                      download={social.download}
                      className="social-link"
                      aria-label={social.label}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills & Technologies */}
            <div className="section-box">
              <h2 className="text-2xl font-semibold text-navy mb-8 text-left">
                Skills & Technologies
              </h2>
              <div className="flex flex-wrap justify-start gap-4">
                {[
                  { name: "MOSFETs", url: "https://learn.sparkfun.com/tutorials/transistors/all" },
                  { name: "Python", url: "https://www.python.org/doc/" },
                  { name: "Verilog", url: "https://www.chipverify.com/verilog/verilog-tutorial" },
                  { name: "IoT", url: "https://www.arduino.cc/education/courses/learning-iot" },
                  { name: "Xilinx", url: "https://www.xilinx.com/products/design-tools/vivado.html" },
                  { name: "Machine Learning", url: "https://developers.google.com/machine-learning" },
                  { name: "NumPy", url: "https://numpy.org/doc/stable/" },
                  { name: "MicroPython", url: "https://micropython.org/documentation" },
                  { name: "C", url: "https://devdocs.io/c/" },
                  { name: "C++", url: "https://cplusplus.com/doc/tutorial/" },
                  { name: "Embedded C", url: "https://www.embedded.com/collection/programming-languages/" },
                  { name: "Vercel", url: "https://vercel.com/docs" },
                  { name: "TensorFlow", url: "https://www.tensorflow.org/learn" },
                  { name: "Proteus", url: "https://www.labcenter.com/documentation/" },
                  { name: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
                  { name: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
                  { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
                  { name: "TypeScript", url: "https://www.typescriptlang.org/docs/" },
                  { name: "Tailwind CSS", url: "https://tailwindcss.com/docs" },
                  { name: "Matplotlib", url: "https://matplotlib.org/stable/tutorials/index.html" },
                  { name: "Raspberry Pi", url: "https://www.raspberrypi.com/documentation/" },
                  { name: "Firebase", url: "https://firebase.google.com/docs" },
                  { name: "FPGA", url: "https://www.intel.com/content/www/us/en/products/details/fpga/development-tools.html" },
                  { name: "Signal Processing", url: "https://www.analog.com/en/design-center/landing-pages/001/beginners-guide-to-dsp.html" },
                  { name: "LTSpice", url: "https://www.analog.com/en/design-center/design-tools-and-calculators/ltspice-simulator.html" },
                  { name: "Computer Networks", url: "https://www.cisco.com/c/en/us/solutions/enterprise-networks/what-is-computer-networking.html" },
                ].map((skill) => (
                  <Link
                    key={skill.name}
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="skill-box text-base px-4 py-2 hover:text-navy"
                  >
                    {skill.name}
                  </Link>
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
                    title: "Google Developer Student Club - LDCE",
                    org: "Team Member",
                    period: "Nov 2023 - Oct 2024",
                    desc: "Curated technical content for various GDSC events, ensuring engaging and informative sessions for attendees. Gained hands-on experience with Android Studio, Open Source Contributions, and Machine Learning Basics through TensorFlow events and the Google Cloud campaign. Actively participated in organizing and hosting tech workshops, fostering a learning environment for peers.",
                    skills: ["Technical Writing", "Android Studio", "Open Source", "Google Cloud"],
                    link: "https://in.linkedin.com/company/gdsc-ldce"
                  }
                ].map((pos, idx) => (
                  <div key={idx} className="p-6 rounded-lg bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <a
                      href={pos.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block hover:text-navy transition-colors duration-300"
                    >
                      <h3 className="font-semibold text-2xl hover:underline">{pos.title}</h3>
                    </a>
                    <p className="text-xl text-gray-600">{pos.org} • {pos.period}</p>
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
                      <h3 className="font-semibold text-2xl">
                        <a
                          href="https://ldce.ac.in"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-navy transition-colors duration-300 hover:underline"
                        >
                          Lalbhai Dalpatbhai College of Engineering
                        </a>
                      </h3>
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
                      <h3 className="font-semibold text-2xl">
                        <a
                          href="https://hbkapadia.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-navy transition-colors duration-300 hover:underline"
                        >
                          The H. B. Kapadia New High School
                        </a>
                      </h3>
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
              {[
                {
                  title: "Gesture-Controlled Car",
                  image: "/gesture.gif",
                  description: "Developed a gesture-controlled system interpreting real-time hand gestures to wirelessly command the car's movements via ESP-NOW protocol, ensuring low-latency communication. This project represents the second phase of the Wi-Fi car series, enhancing control capabilities through gesture recognition.",
                  techStack: ["IoT", "Wireless Communication", "Embedded Systems"],
                  githubLink: "https://github.com/ayushilathiya/Gesture_Controlled_Car",
                  demoLink: "https://youtu.be/n70FIHps4CA"
                },
                {
                  title: "Live ECG Monitoring System",
                  image: "/ecgmoni.gif",
                  description: "ESP-based IoT ECG monitoring system utilizing the ECG sensor for real-time cardiac signal acquisition and wireless transmission. Implements signal filtering for noise reduction and cloud integration for remote monitoring via ThingSpeak. Ensures low-latency data transfer and precise ECG waveform analysis",
                  techStack: ["Real-time Data Acquisition", "Thingspeak API", "MIT App Inventor"],
                  githubLink: "https://github.com/ayushilathiya/ECG-Monitoring",
                  demoLink: "https://youtu.be/EAjrd2bCG9A"
                },
                {
                  title: "WiFi-Controlled Car",
                  image: "/wifi.gif",
                  description: "Engineered a wireless-controlled vehicle using ESP8266 NodeMCU, featuring real-time control through a custom mobile interface. Implemented smooth motion control and responsive directional changes with L298N motor driver integration.",
                  techStack: ["ESP8266", "JavaScript", "HTML", "CSS", "IoT"],
                  githubLink: "https://github.com/ayushilathiya/WiFi-Controlled-Car",
                  demoLink: "https://youtu.be/vaGgphrMhso"
                },
                {
                  title: "3D Modeling Using Sensor-Driven 3D Visualization",
                  image: "/mpu6050.gif",
                  description: "Created an innovative system that transforms real-time sensor data into dynamic 3D visualizations. Integrated MPU6050 sensor data with WebGL rendering to achieve precise spatial mapping and interactive model manipulation.",
                  techStack: ["MPU6050", "WebGL", "Three.js", "Data Visualization"],
                  githubLink: "https://github.com/ayushilathiya/MPU6050-3D-Visualization",
                  demoLink: "https://ayushilathiya.hashnode.dev/3d-modeling-sensors"
                },
                {
                  title: "ESP-NOW Protocol",
                  image: "/espnow.gif",
                  description: "Implemented a robust wireless communication system using ESP-NOW protocol, achieving low-latency data transfer between multiple ESP8266 modules. Optimized for reliable peer-to-peer communication with minimal power consumption.",
                  techStack: ["C++", "ESP-NOW", "Wireless Communication"],
                  githubLink: "https://github.com/ayushilathiya/ESP-NOW-Protocol",
                  demoLink: "https://youtu.be/NGjMKT3Scls"
                }
              ].map((project, index) => (
                <div key={index} className="section-box hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/95 flex flex-col">
                  <div className="relative w-full pt-[56.25%] overflow-hidden rounded-t-lg">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, techIdx) => (
                        <span key={techIdx} className="skill-box text-sm">{tech}</span>
                      ))}
                    </div>

                    <div className="flex gap-4 mt-auto items-center">
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-navy hover:translate-y-1 transition-all duration-300"
                      >
                        <SiGithub className="w-5 h-5 text-[#002b59]" />
                        <span className="text-sm">Code</span>
                      </a>
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-navy hover:translate-y-1 transition-all duration-300"
                      >
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
              ))}
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
                    <svg
                      viewBox="0 0 24 24"
                      className="w-12 h-12 text-navy"
                      fill="currentColor"
                    >
                      <path d="M22.351 8.019l-6.37-6.37a5.63 5.63 0 0 0-7.962 0l-6.37 6.37a5.63 5.63 0 0 0 0 7.962l6.37 6.37a5.63 5.63 0 0 0 7.962 0l6.37-6.37a5.63 5.63 0 0 0 0-7.962zM12 15.953a3.953 3.953 0 1 1 0-7.906 3.953 3.953 0 0 1 0 7.906z" />
                    </svg>
                    <div>
                      <h3 className="font-bold text-xl">Ayushi Lathiya</h3>
                      <p className="text-gray-600">@ayushilathiya</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Exploring the intersections of VLSI, IoT, Embedded Systems, and Innovation. Join me on my technical journey!
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
                      <span className="text-navy font-medium hover:text-navy/70 transition-colors duration-300">Read more on Hashnode</span>
                      <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600">
                      <span>6 Articles</span>
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
              <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-4 sm:mb-8">Let's Connect!</h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input type="text" name="name" placeholder="Your name" required />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" name="email" placeholder="your.email@example.com" required />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea name="message" placeholder="Your message" className="min-h-[150px]" required />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-navy hover:bg-navy-light transition-all duration-300 text-white"
                  disabled={formStatus !== 'idle'}
                >
                  <div className="flex items-center justify-center">
                    {formStatus === 'submitting' ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span className="text-white">Sending...</span>
                      </>
                    ) : formStatus === 'submitted' ? (
                      <>
                        <svg
                          className="mr-2 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-white">Sent Successfully!</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2 h-4 w-4" />
                        <span className="text-white">Send Message</span>
                      </>
                    )}
                  </div>
                </Button>
              </form>
            </div>
          </div>
        </section>


        {/* Footer */}
        <footer className="py-8 text-center text-navy">
          <p className="flex items-center justify-center gap-2">
            Made with <FaHeart className="text-navy animate-pulse" /> by Ayushi
          </p>
          <p>© 2025 Ayushi Lathiya. All Rights Reserved.</p>
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