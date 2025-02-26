"use client";

import { useState, useEffect } from "react";

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

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

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-navy mb-8">Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoadingPosts ? (
          <div className="col-span-2 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy"></div>
          </div>
        ) : blogPosts.length > 0 ? (
          blogPosts.map((post, index) => (
            <a
              key={post.slug}
              href={`https://ayushilathiya.hashnode.dev/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="section-box group block overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}>
              {post.coverImage && (
                <div className="w-full h-48 mb-4 overflow-hidden rounded-xl">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-navy group-hover:text-navy/80 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
                  {post.subtitle}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{new Date(post.dateAdded).toLocaleDateString()}</span>
                  <div className="flex items-center gap-2 text-navy opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Read more</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
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
            </a>
          ))
        ) : (
          <div className="col-span-2 text-center text-gray-500">
            <p>No blog posts found</p>
          </div>
        )}
      </div>
      <div className="mt-8 text-center">
        <a
          href="https://ayushilathiya.hashnode.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy/10 hover:bg-navy/20 text-navy transition-all duration-300 hover:scale-105">
          <span>View all posts on Hashnode</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
