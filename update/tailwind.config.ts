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
        'accent-amber': 'var(--accent-amber)',
        accent: {
          DEFAULT: 'var(--accent-amber)',
        },
        verified: 'var(--status-verified)',
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
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
      },
      fontFamily: {
        mono: ['var(--font-jetbrains)', 'IBM Plex Mono', 'monospace'],
        display: ['var(--font-space)', 'Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'amber-glow-sm': '0 0 8px color-mix(in srgb, var(--accent-amber) 20%, transparent)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      animation: {
        blink: 'blink 1.2s step-end infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
