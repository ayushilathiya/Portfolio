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
    articles: number;
    views: number;
  };
}

export function SocialLinks() {
  const [stats, setStats] = useState<Stats>({
    github: { repos: 15, followers: 10, stars: 5 },
    linkedin: { followers: 85, connections: 150 },
    hashnode: { articles: 2, views: 827 },
  });

  useEffect(() => {
    const fetchStats = async () => {
      setStats({
        github: { repos: 15, followers: 10, stars: 5 },
        linkedin: { followers: 2192, connections: 2011 },
        hashnode: { articles: 6, views: 150 },
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-lg mx-auto">
      {[
        {
          icon: SiGithub,
          href: "https://github.com/ayushilathiya",
          label: "GitHub",
          stats: [
            { label: "Repositories", value: stats.github.repos },
            { label: "Followers", value: stats.github.followers },
            { label: "Stars", value: stats.github.stars },
          ],
        },
        {
          icon: Linkedin,
          href: "https://www.linkedin.com/in/ayushilathiya/",
          label: "LinkedIn",
          target: "_blank",
          stats: [
            { label: "Followers", value: stats.linkedin.followers },
            { label: "Connections", value: stats.linkedin.connections },
          ],
        },
        {
          icon: ({ className }: { className: string }) => (
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 -ml-0.3"
              fill="currentColor"
            >
              <path d="M22.351 8.019l-6.37-6.37a5.63 5.63 0 0 0-7.962 0l-6.37 6.37a5.63 5.63 0 0 0 0 7.962l6.37 6.37a5.63 5.63 0 0 0 7.962 0l6.37-6.37a5.63 5.63 0 0 0 0-7.962zM12 15.953a3.953 3.953 0 1 1 0-7.906 3.953 3.953 0 0 1 0 7.906z" />
            </svg>
          ),
          href: "https://ayushilathiya.hashnode.dev",
          label: "Hashnode",
          stats: [
            { label: "Blog Posts", value: stats.hashnode.articles },
            { label: "Total Views", value: stats.hashnode.views },
          ],
        },
        {
          icon: ({ className }: { className: string }) => (
            <svg viewBox="0 0 24 24" className={className} fill="currentColor">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
            </svg>
          ),
          href: "/docs/Ayushi_Lathiya_CV.pdf",
          label: "Resume",
          download: true,
          stats: [{ label: "Format", value: "PDF" }],
        },
      ].map((social, index) => (
        <a
          key={index}
          href={social.href}
          target={social.target || "_blank"}
          rel="noopener noreferrer"
          download={social.download}
          className="aspect-square p-3 bg-navy/5 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col justify-between items-center hover:bg-navy hover:text-white group"
        >
          <div className="flex items-center gap-1 w-full justify-center">
            {social.label === "Hashnode" ? (
              <social.icon className="" />
            ) : (
              <social.icon className="w-5 h-5" />
            )}
            <span className="font-medium text-sm">{social.label}</span>
          </div>
          <div className="flex flex-col gap-1 w-full">
            {social.stats.map((stat, i) => (
              <div key={i} className="flex justify-between items-center w-full">
                <span className="text-[10px] text-gray-600 group-hover:text-gray-300">
                  {stat.label}
                </span>
                <span className="font-semibold text-xs">{stat.value}</span>
              </div>
            ))}
          </div>
        </a>
      ))}
    </div>
  );
}
