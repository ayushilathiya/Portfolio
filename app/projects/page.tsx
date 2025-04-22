"use client";

import Image from "next/image";
import { SiGithub } from "react-icons/si";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-navy mb-8 sm:mb-12">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="section-box hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/95 flex flex-col h-full"
          >
            <div className="relative w-full pt-[56.25%] overflow-hidden rounded-t-lg">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="absolute top-0 left-0 w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div className="p-4 sm:p-6 flex flex-col flex-grow space-y-2 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold">
                {project.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.techStack.map((tech, techIdx) => (
                  <span
                    key={techIdx}
                    className="skill-box text-xs sm:text-sm py-0.5 px-2 sm:py-1 sm:px-2.5"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 items-center pt-3 sm:pt-4">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 sm:gap-2 text-navy hover:translate-y-1 transition-all duration-300"
                >
                  <SiGithub className="w-4 h-4 sm:w-5 sm:h-5 text-[#002b59]" />
                  <span className="text-xs sm:text-sm">Code</span>
                </a>
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 sm:gap-2 text-navy hover:translate-y-1 transition-all duration-300"
                >
                  <img
                    src="https://simpleicons.org/icons/youtube.svg"
                    alt="Demo"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    style={{
                      filter:
                        "invert(15%) sepia(64%) saturate(1486%) hue-rotate(182deg) brightness(97%) contrast(102%)",
                    }}
                  />
                  <span className="text-xs sm:text-sm">Demo</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
