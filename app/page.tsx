"use client";

import { useState } from 'react';
import { Menu, Github, Linkedin, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

const sections = ['About', 'Projects', 'Blog', 'Experience', 'Resume', 'Contact'];
const pastelColors = [
  'bg-gradient-to-b from-pink-100 to-blue-100',
  'bg-gradient-to-b from-purple-100 to-green-100',
  'bg-gradient-to-b from-yellow-100 to-blue-100',
  'bg-gradient-to-b from-red-100 to-purple-100',
  'bg-gradient-to-b from-green-100 to-pink-100',
  'bg-gradient-to-b from-blue-100 to-yellow-100'
];

const projects = [
  { title: 'E-commerce Platform', description: 'A full-stack e-commerce solution built with Next.js and Stripe', tech: ['Next.js', 'TypeScript', 'Stripe'] },
  { title: 'AI Chat Application', description: 'Real-time chat app with AI-powered responses', tech: ['React', 'Socket.io', 'OpenAI'] },
  { title: 'Portfolio Website', description: 'A modern portfolio website with smooth animations', tech: ['Next.js', 'Tailwind CSS', 'Framer Motion'] }
];

const blogPosts = [
  { title: 'The Future of Web Development', date: '2024-03-15', preview: 'Exploring upcoming trends in web development...' },
  { title: 'Mastering TypeScript', date: '2024-03-01', preview: 'Essential TypeScript features every developer should know...' },
  { title: 'Building with Next.js', date: '2024-02-15', preview: 'A comprehensive guide to Next.js 14...' }
];

const experience = [
  { company: 'Tech Corp', role: 'Senior Developer', period: '2022-Present', description: 'Leading frontend development team...' },
  { company: 'StartupX', role: 'Full Stack Developer', period: '2020-2022', description: 'Developed and maintained multiple web applications...' },
  { company: 'Digital Agency', role: 'Frontend Developer', period: '2018-2020', description: 'Created responsive web interfaces...' }
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="relative pt-16">
      <Navigation />
      
      {/* Background Animation */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-navy-blue/10">
          <div className="animate-wave absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI1MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IHJnYmEoMCwwLDI1NSwwLjEpOyIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdHlsZT0ic3RvcC1jb2xvcjogcmdiYSgwLDAsMjU1LDAuMyk7Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjogcmdiYSgwLDAsMjU1LDAuMSk7Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHBhdGggZD0iTTAgMjUwYzI0MCA4MCA0ODAgODAgNzIwIDAgMjQwLTgwIDQ4MC04MCA3MjAgMHY1MDBIMFYyNTB6IiBmaWxsPSJ1cmwoI2dyYWQpIi8+PC9zdmc+')]"></div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 skeuomorphic bg-white/80 backdrop-blur-sm"
        >
          <Menu className="w-6 h-6 text-navy-600" />
        </button>
        {isMenuOpen && (
          <div className="absolute top-12 right-0 skeuomorphic bg-white/80 backdrop-blur-sm w-48">
            {sections.map((section) => (
              <a
                key={section}
                href={`#${section.toLowerCase()}`}
                className="block py-2 px-4 hover:bg-navy-100 rounded transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {section}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Sections */}
      <div className="snap-y snap-mandatory h-screen overflow-y-auto">
        {/* About Section */}
        <section id="about" className={`${pastelColors[0]} min-h-screen flex items-center justify-center snap-start relative`}>
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto skeuomorphic bg-white/80 backdrop-blur-sm">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-navy-900">
                Hello, I'm Ayushi Lathiya
              </h1>
              <p className="text-lg md:text-xl text-navy-700 mb-8">
                A passionate full-stack developer specializing in creating beautiful and functional web experiences. With expertise in modern web technologies, I bring ideas to life through clean code and intuitive design.
              </p>
              <div className="flex gap-4">
                <Link href="https://github.com/ayushilathiya" target="_blank" className="p-2 skeuomorphic hover:scale-105 transition-transform">
                  <Github className="w-6 h-6 text-navy-600" />
                </Link>
                <Link href="https://linkedin.com/in/ayushilathiya" target="_blank" className="p-2 skeuomorphic hover:scale-105 transition-transform">
                  <Linkedin className="w-6 h-6 text-navy-600" />
                </Link>
                <Link href="https://x.com" target="_blank" className="p-2 skeuomorphic hover:scale-105 transition-transform">
                  <X className="w-6 h-6 text-navy-600" />
                </Link>
              </div>
            </div>
          </div>
          <ChevronDown className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-8 text-navy-600 animate-float" />
        </section>

        {/* Projects Section */}
        <section id="projects" className={`${pastelColors[1]} min-h-screen flex items-center justify-center snap-start relative`}>
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-6xl mx-auto skeuomorphic bg-white/80 backdrop-blur-sm">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-navy-900">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <div key={index} className="skeuomorphic hover:scale-105 transition-transform">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-navy-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-navy-100 rounded-full text-sm text-navy-600">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ChevronDown className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-8 text-navy-600 animate-float" />
        </section>

        {/* Blog Section */}
        <section id="blog" className={`${pastelColors[2]} min-h-screen flex items-center justify-center snap-start relative`}>
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto skeuomorphic bg-white/80 backdrop-blur-sm">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-navy-900">Blog</h2>
              <div className="space-y-6">
                {blogPosts.map((post, index) => (
                  <div key={index} className="skeuomorphic hover:scale-105 transition-transform">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold">{post.title}</h3>
                      <span className="text-sm text-navy-500">{post.date}</span>
                    </div>
                    <p className="text-navy-600">{post.preview}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ChevronDown className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-8 text-navy-600 animate-float" />
        </section>

        {/* Experience Section */}
        <section id="experience" className={`${pastelColors[3]} min-h-screen flex items-center justify-center snap-start relative`}>
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto skeuomorphic bg-white/80 backdrop-blur-sm">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-navy-900">Experience</h2>
              <div className="space-y-8">
                {experience.map((job, index) => (
                  <div key={index} className="skeuomorphic hover:scale-105 transition-transform">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold">{job.company}</h3>
                      <span className="text-sm text-navy-500">{job.period}</span>
                    </div>
                    <h4 className="text-lg text-navy-600 mb-2">{job.role}</h4>
                    <p className="text-navy-500">{job.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ChevronDown className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-8 text-navy-600 animate-float" />
        </section>

        {/* Resume Section */}
        <section id="resume" className={`${pastelColors[4]} min-h-screen flex items-center justify-center snap-start relative`}>
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto skeuomorphic bg-white/80 backdrop-blur-sm">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-navy-900">Resume</h2>
              <div className="space-y-8">
                <div className="skeuomorphic">
                  <h3 className="text-2xl font-semibold mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'AWS'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-navy-100 rounded-full text-navy-600">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="skeuomorphic">
                  <h3 className="text-2xl font-semibold mb-4">Education</h3>
                  <div>
                    <h4 className="text-lg font-medium">Bachelor of Science in Computer Science</h4>
                    <p className="text-navy-600">University Name • 2018-2022</p>
                  </div>
                </div>
                <a
                  href="/resume.pdf"
                  className="inline-block px-6 py-3 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors skeuomorphic"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
          <ChevronDown className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-8 text-navy-600 animate-float" />
        </section>

        {/* Contact Section */}
        <section id="contact" className={`${pastelColors[5]} min-h-screen flex items-center justify-center snap-start relative`}>
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto skeuomorphic bg-white/80 backdrop-blur-sm">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-navy-900">Contact</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-navy-700 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-navy-200 focus:outline-none focus:ring-2 focus:ring-navy-500"
                  />
                </div>
                <div>
                  <label className="block text-navy-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-navy-200 focus:outline-none focus:ring-2 focus:ring-navy-500"
                  />
                </div>
                <div>
                  <label className="block text-navy-700 mb-2">Message</label>
                  <textarea
                    className="w-full px-4 py-2 rounded-lg border border-navy-200 focus:outline-none focus:ring-2 focus:ring-navy-500 h-32"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors skeuomorphic"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}