"use client";

import { useState, useEffect, useRef } from "react";

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

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
      <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-6 sm:mb-8">
        Blog
      </h2>

      {isLoadingPosts ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-navy"></div>
        </div>
      ) : blogPosts.length > 0 ? (
        <>
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg transform -translate-y-1/2 sm:hover:bg-navy/10 transition-colors"
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
            {blogPosts.slice(0, 4).map((post, index) => (
              <a
                key={post.slug}
                href={`https://ayushilathiya.hashnode.dev/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="section-box group block overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 min-w-[340px] sm:min-w-[520px] snap-start"
              >
                {post.coverImage && (
                  <div className="w-full h-48 sm:h-64 mb-3 overflow-hidden rounded-lg">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 text-navy group-hover:text-navy/80 transition-colors duration-300 line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                    {post.subtitle}
                  </p>
                  <div className="text-xs sm:text-sm text-gray-500 space-y-2">
                    <div>{new Date(post.dateAdded).toLocaleDateString()}</div>
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      <span>
                        {post.views ? `${post.views} views` : "0 views"}
                      </span>
                      <span className="mx-1.5">·</span>
                      <div className="flex items-center text-navy">
                        <span className="group-hover:underline">View Blog</span>
                        <svg
                          className="w-3.5 h-3.5 ml-1"
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
                  </div>
                </div>
              </a>
            ))}

            <a
              href="https://ayushilathiya.hashnode.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="section-box group flex flex-col justify-center items-center min-w-[340px] sm:min-w-[520px] snap-start hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-8"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg sm:text-xl font-semibold text-navy">
                  View All Posts
                </span>
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-navy"
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
              <span className="text-sm sm:text-base text-gray-600 mt-2">
                on Hashnode
              </span>
            </a>
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
        </>
      ) : (
        <div className="text-center text-gray-500 py-10">
          <p>No blog posts found</p>
        </div>
      )}
    </div>
  );
}
