import type { ProjectDomain } from '@/data/projects';

interface DomainIconProps {
  domain: ProjectDomain;
  className?: string;
}

export default function DomainIcon({ domain, className = 'w-5 h-5' }: DomainIconProps) {
  const props = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1,
    'aria-hidden': true as const,
  };

  switch (domain) {
    case 'EMBEDDED':
      return (
        <svg {...props}>
          <path d="M4 12h4l2-4 4 8 2-4h4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="4" cy="12" r="1" fill="currentColor" stroke="none" />
          <circle cx="20" cy="12" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'VLSI':
      return (
        <svg {...props}>
          <rect x="5" y="5" width="14" height="14" rx="1" />
          <path d="M9 9h2v2H9zM13 9h2v2h-2zM9 13h2v2H9zM13 13h2v2h-2z" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'IoT':
      return (
        <svg {...props}>
          <circle cx="6" cy="12" r="2" fill="currentColor" stroke="none" />
          <circle cx="18" cy="6" r="2" fill="currentColor" stroke="none" />
          <circle cx="18" cy="18" r="2" fill="currentColor" stroke="none" />
          <line x1="8" y1="11" x2="16" y2="7" />
          <line x1="8" y1="13" x2="16" y2="17" />
        </svg>
      );
    case 'SPACE':
      return (
        <svg {...props}>
          <path
            d="M4 16a10 10 0 0 1 16-8"
            strokeDasharray="2 3"
            strokeLinecap="round"
          />
          <circle cx="20" cy="6" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'HEALTH':
      return (
        <svg {...props}>
          <path d="M3 12h3l2-5 3 10 2-5h8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}
