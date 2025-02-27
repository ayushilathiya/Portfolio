"use client";

import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "@/components/SocialLinks";
import { skills } from "@/data/skills";
import { responsibilities } from "@/data/responsibilities";
import { education } from "@/data/education";
import { TypeAnimation } from "react-type-animation";

export default function AboutSection() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="section-box">
        <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-8">
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-xl">
            <Image
              src="/ayushi.jpg"
              alt="Ayushi Lathiya"
              width={192}
              height={192}
              className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="typewriter-container">
            {/* <h1 className="text-2xl sm:text-3xl font-bold text-left typewriter mb-4">
              Hi, I'm Ayushi Lathiya
            </h1> */}
            <TypeAnimation
              sequence={["Hi, I'm Ayushi Lathiya", 1000, "", 100]}
              wrapper="h1"
              cursor={true}
              repeat={Infinity}
              style={{
                display: "inline-block",
                lineHeight: "1.2",
              }}
              className="text-2xl sm:text-3xl font-bold text-left mb-4"
            />
          </div>

          <p className="text-base sm:text-lg text-left">
            As an Embedded Systems Developer and VLSI Enthusiast, I specialize
            in developing cutting-edge solutions at the intersection of hardware
            and software. With a strong foundation in embedded systems
            architecture and VLSI design principles, I focus on creating
            efficient, scalable solutions for complex technical challenges. My
            expertise spans hardware-software integration, digital design, and
            system optimization, complemented by a passion for emerging
            technologies in IoT and machine learning.
          </p>

          <div className="pt-2 w-full flex justify-center">
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* Skills & Technologies */}
      <div className="section-box">
        <h2 className="text-xl sm:text-2xl font-semibold text-navy mb-4 sm:mb-8 text-left">
          Skills & Technologies
        </h2>
        <div className="flex flex-wrap justify-start gap-1.5 sm:gap-2 md:gap-3">
          {skills.map((skill) => (
            <Link
              key={skill.name}
              href={skill.url}
              target="_blank"
              rel="noopener noreferrer"
              className="skill-box text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 hover:text-navy active:scale-95 transition-all duration-200"
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
          {responsibilities.map((pos, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-6 rounded-lg bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <a
                href={pos.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:text-navy transition-colors duration-300"
              >
                <h3 className="font-semibold text-lg sm:text-xl md:text-2xl hover:underline">
                  {pos.title}
                </h3>
              </a>
              <p className="text-md sm:text-lg md:text-xl text-gray-600">
                {pos.org} • {pos.period}
              </p>
              <p className="mt-2 text-sm sm:text-base">{pos.desc}</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3">
                {pos.skills.map((skill, skillIdx) => (
                  <span
                    key={skillIdx}
                    className="skill-box text-xs sm:text-sm py-0.5 px-2 sm:py-1 sm:px-2.5"
                  >
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
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-6 rounded-lg bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-1 sm:gap-0">
                <div>
                  <h3 className="font-semibold text-lg sm:text-xl md:text-2xl">
                    <a
                      href={edu.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-navy transition-colors duration-300 hover:underline"
                    >
                      {edu.institution}
                    </a>
                  </h3>
                  <p className="text-md sm:text-lg text-navy mt-2">
                    {edu.degree}
                  </p>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">
                  {edu.period}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {edu.skills.map((skill, skillIdx) => (
                  <span
                    key={skillIdx}
                    className="skill-box text-xs sm:text-sm py-0.5 px-2 sm:py-1 sm:px-2.5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
