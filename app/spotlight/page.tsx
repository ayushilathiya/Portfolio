"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const spotlights = [
  {
    title: "Healthathon’25 | Digital Health for Transplant Survivors",
    description:
      "Recognized among the top solutions at the IAmAPatient.org Healthathon 2025, organized in collaboration with MSBC Group. Contributed to a multidisciplinary team developing an AI-powered platform to support post-transplant patient care, combining clinical insight with intelligent automation.",
    image: "/hackathon.jpg",
    link: "https://www.linkedin.com/posts/ayushilathiya_healthathon25-msbcgroup-iamapatient-activity-7311730105838440448-xLfs?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEh_BiUBi8YD7gc5H6xB5Xq1d11SbaKNlz8",
  },
  {
    title: "SSIP 2.0 Innovator | Student-Led Innovation and Startups",
    description:
      "Received financial support under the Student Startup and Innovation Policy (SSIP 2.0) for my innovation, recognized at the Proof of Concept (PoC) stage. This support acknowledges the potential and feasibility of the proposed solution along with the real-world implementation of the same.",
    image: "/ssip.png",
    link: "https://www.linkedin.com/posts/ayushilathiya_infinityai-artificialintelligence-aicommunity-activity-7281526689388466176-MBuq?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEh_BiUBi8YD7gc5H6xB5Xq1d11SbaKNlz8",
  },
  {
    title: "Semiconductor Manufacturing Workshop | IIT Gandhinagar",
    description:
      "Participated in an advanced workshop hosted by SEMI, ESSCI, and IESA focused on semiconductor packaging, vacuum systems, and display technology. The event featured expert sessions from academia and industry leaders such as STMicroelectronics, IIT Guwahati, and IESA, exploring critical domains of India’s semiconductor ecosystem.",
    image: "/iitgn.jpg",
    link: "https://your-link-here.com/spotlight2",
  },
  {
    title: "Infinity AI | Community Meetup",
    description:
      "Engaged with fellow AI enthusiasts and industry professionals at an Infinity AI meetup focused on the future of generative models and artificial intelligence. The session featured expert insights, open discussions, and peer learning on cutting-edge developments in AI.",
    image: "/meetup.jpg",
    link: "https://www.linkedin.com/posts/ayushilathiya_infinityai-artificialintelligence-aicommunity-activity-7281526689388466176-MBuq?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEh_BiUBi8YD7gc5H6xB5Xq1d11SbaKNlz8",
  },
];

export default function SpotlightSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount =
      direction === "left" ? -container.offsetWidth : container.offsetWidth;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  return (
    <div className="max-w-6xl mx-auto relative">
      <h2 className="text-3xl font-bold text-navy mb-8 sm:mb-12">Spotlight</h2>

      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg transform -translate-y-1/2 hover:bg-white transition-colors"
        >
          <svg
            className="w-6 h-6 text-navy"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto hide-scrollbar gap-6 sm:gap-8 snap-x snap-mandatory"
      >
        {spotlights.slice(0, 4).map((spotlight, index) => (
          <a
            key={index}
            href={spotlight.link}
            target="_blank"
            rel="noopener noreferrer"
            className="section-box group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/95 flex flex-col min-w-[340px] sm:min-w-[520px] snap-start"
          >
            <div className="w-full h-48 sm:h-64 overflow-hidden rounded-lg">
              <Image
                src={spotlight.image}
                alt={spotlight.title}
                width={800}
                height={600}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
            </div>
            <div className="p-4 sm:p-6 flex flex-col flex-grow">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-navy group-hover:text-navy/80 transition-colors duration-300">
                {spotlight.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                {spotlight.description}
              </p>

              <div className="flex items-center justify-end text-navy mt-auto">
                <span className="text-sm group-hover:underline">Explore</span>
                <svg
                  className="w-4 h-4 ml-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>

      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg transform -translate-y-1/2 hover:bg-white transition-colors"
        >
          <svg
            className="w-6 h-6 text-navy"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
