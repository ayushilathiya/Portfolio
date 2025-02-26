import { Linkedin } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Link from "next/link";

export function SocialLinks() {
  return (
    <div className="flex space-x-3 sm:space-x-4">
      {[
        {
          icon: SiGithub,
          href: "https://github.com/ayushilathiya",
          target: "_blank",
          rel: "noopener noreferrer",
          label: "GitHub",
        },
        {
          icon: Linkedin,
          href: "https://www.linkedin.com/in/ayushilathiya/",
          target: "_blank",
          rel: "noopener noreferrer",
          label: "LinkedIn",
        },
        {
          icon: ({ className }: { className: string }) => (
            <svg viewBox="0 0 24 24" className={className} fill="currentColor">
              <path d="M22.351 8.019l-6.37-6.37a5.63 5.63 0 0 0-7.962 0l-6.37 6.37a5.63 5.63 0 0 0 0 7.962l6.37 6.37a5.63 5.63 0 0 0 7.962 0l6.37-6.37a5.63 5.63 0 0 0 0-7.962zM12 15.953a3.953 3.953 0 1 1 0-7.906 3.953 3.953 0 0 1 0 7.906z" />
            </svg>
          ),
          href: "https://ayushilathiya.hashnode.dev",
          target: "_blank",
          rel: "noopener noreferrer",
          label: "Hashnode",
        },
        {
          icon: ({ className }: { className: string }) => (
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                className={className}
                fill="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
              </svg>
              <span>Download CV</span>
            </div>
          ),
          href: "/docs/Ayushi_Lathiya_CV.pdf",
          download: true,
          target: "_blank",
          rel: "noopener noreferrer",
        },
      ].map((social, index) => (
        <a
          key={index}
          href={social.href}
          target={social.target}
          rel={social.rel}
          download={social.download}
          className="social-link"
          aria-label={social.label}>
          <social.icon className="w-6 h-6" />
        </a>
      ))}
    </div>
  );
}
