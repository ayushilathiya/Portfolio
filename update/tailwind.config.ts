import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: 'var(--bg-base)',
        panel: 'var(--bg-panel)',
        border: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          dim: 'var(--accent-dim)',
        },
        verified: 'var(--status-verified)',
        text: {
          primary: 'var(--text-primary)',
          muted: 'var(--text-muted)',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        input: 'var(--input)',
        ring: 'var(--ring)',
        amber: {
          DEFAULT: 'var(--accent)',
          dim: 'var(--accent-dim)',
        },
      },
      fontFamily: {
        mono: ['var(--font-jetbrains)', 'IBM Plex Mono', 'monospace'],
        display: ['var(--font-space)', 'Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(color-mix(in srgb, var(--border) 40%, transparent) 1px, transparent 1px),
          linear-gradient(90deg, color-mix(in srgb, var(--border) 40%, transparent) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        grid: '24px 24px',
      },
      boxShadow: {
        'amber-glow': '0 0 20px color-mix(in srgb, var(--accent) 30%, transparent)',
        'amber-glow-sm': '0 0 10px color-mix(in srgb, var(--accent) 25%, transparent)',
        'verified-glow': '0 0 15px color-mix(in srgb, var(--status-verified) 30%, transparent)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      animation: {
        blink: 'blink 1.2s step-end infinite',
        'trace-draw': 'trace-draw 0.8s ease-out forwards',
        'wave-flow': 'wave-flow 3s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'slide-up': 'slide-up 0.3s ease-out forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'trace-draw': {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
        'wave-flow': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
