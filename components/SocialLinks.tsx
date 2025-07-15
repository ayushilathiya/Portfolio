import { Linkedin } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Stats {
  github: {
    repos: number;
    stars: number;
  };
  linkedin: {
    connections: string;
    certifications: number;
  };
  hashnode: {
    articles: number;
    views: string;
  };
}

export function SocialLinks() {
  const [stats, setStats] = useState<Stats>({
    github: { repos: 13, stars: 5 },
    linkedin: { connections: "2K+", certifications: 7 },
    hashnode: { articles: 10, views: "1K+" },
  });

  useEffect(() => {
    const fetchStats = async () => {
      setStats({
        github: { repos: 13, stars: 5 },
        linkedin: { connections: "2K+", certifications: 7 },
        hashnode: { articles: 10, views: "1K+" },
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-4 justify-around sm:gap-3 w-full max-w-lg mx-auto px-4 sm:px-0">
      {[
        {
          icon: SiGithub,
          href: "https://github.com/ayushilathiya",
          label: "GitHub",
          stats: [
            { label: "Repositories", value: stats.github.repos },
            { label: "Stars", value: stats.github.stars },
          ],
        },
        {
          icon: Linkedin,
          href: "https://www.linkedin.com/in/ayushilathiya/",
          label: "LinkedIn",
          target: "_blank",
          stats: [
            { label: "Connections", value: stats.linkedin.connections },
            { label: "Certifications", value: stats.linkedin.certifications },
          ],
        },
        {
          icon: ({ className }: { className: string }) => (
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 -ml-0.3"
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
          stats: [{ type: "spacer" }, { label: "Format", value: "PDF" }],
        },
      ].map((social, index) => (
        <a
          key={index}
          href={social.href}
          target={social.target || "_blank"}
          rel="noopener noreferrer"
          download={social.download}
          className="p-1.5 sm:bg-navy/10 sm:rounded-xl sm:shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col gap-1 items-center hover:text-navy sm:hover:bg-navy/20"
        >
          <div className="flex items-center gap-0.5 justify-center sm:w-full sm:mt-0 sm:mb-2">
            {social.label === "Hashnode" ? (
              <social.icon className="w-6 h-6 sm:w-5 sm:h-5" />
            ) : (
              <social.icon className="w-6 h-6 sm:w-5 sm:h-5" />
            )}
            <span className="font-medium text-xs sm:text-sm hidden sm:inline">
              {social.label}
            </span>
          </div>

          <div className="hidden sm:flex flex-col gap-0.5 w-full">
            {social.stats.map((stat, i) => {
              if ("type" in stat && stat.type === "spacer") {
                return <div key={i} className="h-2" />; // blank space here
              }
              return (
                <div
                  key={i}
                  className="flex justify-between items-center w-full"
                >
                  <span className="text-[10px] align-right text-gray-800 group-hover:text-gray-300">
                    {stat.label}
                  </span>
                  <span className="font-semibold text-xs">{stat.value}</span>
                </div>
              );
            })}
          </div>
        </a>
      ))}
    </div>
  );
}
