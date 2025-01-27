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
        <div className="loading-container">
          <div className="loading-block"></div>
          <div className="loading-block"></div>
          <div className="loading-block"></div>
          <div className="loading-block"></div>
        </div>
      </div>
    );
  }

  const projects = [
    {
      title: "Project 1",
      description: "A sophisticated web application leveraging modern technologies for optimal performance.",
      image: "/project1.jpg",
      techs: ["React", "Node.js", "TypeScript"],
      link: "#"
    },
    {
      title: "Project 2",
      description: "Innovative embedded system solution for real-time data processing.",
      image: "/project2.jpg",
      techs: ["C++", "Python", "Embedded Systems"],
      link: "#"
    },
    {
      title: "Project 3",
      description: "VLSI design implementation for high-performance computing.",
      image: "/project3.jpg",
      techs: ["Verilog", "FPGA", "SystemVerilog"],
      link: "#"
    },
    {
      title: "Project 4",
      description: "Machine learning model for predictive analytics in IoT devices.",
      image: "/project4.jpg",
      techs: ["Python", "TensorFlow", "IoT"],
      link: "#"
    }
  ];

  const blogs = [
    {
      title: "Understanding VLSI Design",
      description: "Deep dive into modern VLSI design principles and practices.",
      image: "/blog1.jpg",
      date: "2024-03-20"
    },
    {
      title: "Embedded Systems in IoT",
      description: "Exploring the intersection of embedded systems and IoT.",
      image: "/blog2.jpg",
      date: "2024-03-15"
    },
    {
      title: "Machine Learning on Edge Devices",
      description: "Implementing ML models on resource-constrained devices.",
      image: "/blog3.jpg",
      date: "2024-03-10"
    },
    {
      title: "Future of Hardware Design",
      description: "Trends and predictions in hardware design and development.",
      image: "/blog4.jpg",
      date: "2024-03-05"
    }
  ];

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
                  className={`nav-link inline-flex items-center px-3 pt-1 text-sm font-medium border-b-2 transition-all duration-300 hover:scale-110 ${
                    activeSection === section
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
                    src="/your-photo.jpg"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Team Member",
                    org: "Google Developer Student Club - LDCE",
                    period: "Nov 2023 - Oct 2024",
                    desc: "Contributing to technical projects and organizing workshops.",
                    skills: ["Event Management", "Technical Writing", "Team Leadership", "Workshop Facilitation"]
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
                        <span key={skillIdx} className="skill-box text-xs">
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
                  <h3 className="font-semibold text-lg">B.E. in Electronics & Communication</h3>
                  <p className="text-gray-600">L.D. College of Engineering • 2021 - 2025</p>
                  <p className="mt-2">Relevant coursework: Digital Electronics, VLSI Design, Embedded Systems</p>
                  <ul className="mt-2 list-disc list-inside mb-3">
                    <li>CGPA: 9.23/10</li>
                    <li>Member of IEEE Student Branch</li>
                    <li>Technical Team Lead for College Projects</li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {["VLSI Design", "Digital Electronics", "Embedded Systems", "Circuit Theory", "Signal Processing"].map((skill, idx) => (
                      <span key={idx} className="skill-box text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <h3 className="font-semibold text-lg">Higher Secondary Education</h3>
                  <p className="text-gray-600">Shree Swaminarayan Gurukul • 2019 - 2021</p>
                  <p className="mt-2">Science Stream with Mathematics</p>
                  <ul className="mt-2 list-disc list-inside mb-3">
                    <li>Percentage: 95%</li>
                    <li>Mathematics Club Member</li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {["Physics", "Mathematics", "Chemistry", "Computer Science"].map((skill, idx) => (
                      <span key={idx} className="skill-box text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <h3 className="font-semibold text-lg">Primary Education</h3>
                  <p className="text-gray-600">Delhi Public School • 2007 - 2019</p>
                  <p className="mt-2">Strong foundation in sciences and mathematics</p>
                  <ul className="mt-2 list-disc list-inside mb-3">
                    <li>Percentage: 94%</li>
                    <li>Science Club Member</li>
                    <li>Participated in various inter-school competitions</li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {["Science", "Mathematics", "English", "Computer Basics"].map((skill, idx) => (
                      <span key={idx} className="skill-box text-xs">
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
              {projects.map((project, idx) => (
                <div key={idx} className="section-box hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/95">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="rounded-t-lg w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techs.map((tech, techIdx) => (
                        <span key={techIdx} className="skill-box">{tech}</span>
                      ))}
                    </div>
                    <Link href={project.link} className="text-navy hover:underline">View Project →</Link>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogs.map((blog, idx) => (
                <div key={idx} className="section-box hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/95">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={500}
                    height={300}
                    className="rounded-t-lg w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                    <p className="text-gray-600 mb-2">{blog.description}</p>
                    <p className="text-sm text-gray-500">{new Date(blog.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
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