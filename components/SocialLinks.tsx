import { Linkedin } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Stats {
  github: {
    repos: number;
    followers: number;
    stars: number;
  };
  linkedin: {
    followers: number;
    connections: number;
  };
  hashnode: {
    posts: number;
    views: number;
  };
}

export function SocialLinks() {
  const [stats, setStats] = useState<Stats>({
    github: { repos: 0, followers: 0, stars: 0 },
    linkedin: { followers: 0, connections: 0 },
    hashnode: { posts: 0, views: 0 },
  });

  // Fetch stats when component mounts
  useEffect(() => {
    const fetchStats = async () => {
      // Add API calls here later
      setStats({
        github: { repos: 15, followers: 120, stars: 45 },
        linkedin: { followers: 500, connections: 1200 },
        hashnode: { posts: 8, views: 1500 },
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4">
      {[
        {
          icon: SiGithub,
          href: "https://github.com/ayushilathiya",
          stats: (
            <div className="absolute bottom-full mb-2 w-48 bg-white rounded-lg shadow-xl p-3 text-xs hidden group-hover:block">
              <div className="flex justify-between mb-1">
                <span>Repositories</span>
                <span className="font-semibold">{stats.github.repos}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Followers</span>
                <span className="font-semibold">{stats.github.followers}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Stars</span>
                <span className="font-semibold">{stats.github.stars}</span>
              </div>
            </div>
          ),
          label: "GitHub",
        },
        {
          icon: Linkedin,
          href: "https://www.linkedin.com/in/ayushilathiya/",
          stats: (
            <div className="absolute bottom-full mb-2 w-48 bg-white rounded-lg shadow-xl p-3 text-xs hidden group-hover:block">
              <div className="flex justify-between mb-1">
                <span>Followers</span>
                <span className="font-semibold">{stats.linkedin.followers}</span>
              </div>
              <div className="flex justify-between">
                <span>Connections</span>
                <span className="font-semibold">{stats.linkedin.connections}</span>
              </div>
            </div>
          ),
          label: "LinkedIn",
        },
        {
          icon: ({ className }: { className: string }) => (
            <svg viewBox="0 0 24 24" className={className} fill="currentColor">
              <path d="M22.351 8.019l-6.37-6.37a5.63 5.63 0 0 0-7.962 0l-6.37 6.37a5.63 5.63 0 0 0 0 7.962l6.37 6.37a5.63 5.63 0 0 0 7.962 0l6.37-6.37a5.63 5.63 0 0 0 0-7.962zM12 15.953a3.953 3.953 0 1 1 0-7.906 3.953 3.953 0 0 1 0 7.906z" />
            </svg>
          ),
          stats: (
            <div className="absolute bottom-full mb-2 w-48 bg-white rounded-lg shadow-xl p-3 text-xs hidden group-hover:block">
              <div className="flex justify-between mb-1">
                <span>Blog Posts</span>
                <span className="font-semibold">{stats.hashnode.posts}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Views</span>
                <span className="font-semibold">{stats.hashnode.views}</span>
              </div>
            </div>
          ),
          href: "https://ayushilathiya.hashnode.dev",
          label: "Hashnode",
        },
        {
          icon: ({ className }: { className: string }) => (
            <div className="flex items-center gap-1 xs:gap-2">
              <svg viewBox="0 0 24 24" className={className} fill="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
              </svg>
              <span className="hidden xs:inline text-xs sm:text-sm whitespace-nowrap">
                Download CV
              </span>
            </div>
          ),
          stats: (
            <div className="absolute bottom-full mb-2 w-48 bg-white rounded-lg shadow-xl p-3 text-xs hidden group-hover:block">
              <div className="flex justify-between mb-1">
                <span>Format</span>
                <span className="font-semibold">PDF</span>
              </div>
              <div className="flex justify-between">
                <span>Last Updated</span>
                <span className="font-semibold">March 2024</span>
              </div>
            </div>
          ),
          href: "/docs/Ayushi_Lathiya_CV.pdf",
          download: true,
          label: "Download Resume",
          className: "px-3 xs:px-4",
        },
      ].map((social, index) => (
        <div key={index} className="relative group">
          <a
            href={social.href}
            target={social.target}
            rel={social.rel}
            download={social.download}
            className={`social-link ${social.className || ""}`}
            aria-label={social.label}
          >
            <social.icon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
          </a>
          {social.stats}
        </div>
      ))}
    </div>
  );
}
