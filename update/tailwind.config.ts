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
        // TRACE // KERNEL color palette
        base: {
          DEFAULT: '#0a0a0a',
          50: '#1a1a1a',
          100: '#141414',
          200: '#0f0f0f',
        },
        panel: '#141414',
        border: '#262626',
        amber: {
          DEFAULT: '#ffb020',
          dim: '#cc6a00',
          glow: 'rgba(255, 176, 32, 0.3)',
        },
        verified: '#39ff14',
        text: {
          primary: '#e8e6e1',
          muted: '#7a7a78',
        },
      },
      fontFamily: {
        mono: ['var(--font-jetbrains)', 'IBM Plex Mono', 'monospace'],
        display: ['var(--font-space)', 'Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(rgba(38, 38, 38, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(38, 38, 38, 0.04) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid': '24px 24px',
      },
      boxShadow: {
        'amber-glow': '0 0 20px rgba(255, 176, 32, 0.3)',
        'amber-glow-sm': '0 0 10px rgba(255, 176, 32, 0.25)',
        'verified-glow': '0 0 15px rgba(57, 255, 20, 0.3)',
      },
      animation: {
        'blink': 'blink 1.2s step-end infinite',
        'trace-draw': 'trace-draw 0.8s ease-out forwards',
        'wave-flow': 'wave-flow 3s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'type-cursor': 'type-cursor 0.8s steps(40) forwards',
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
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'type-cursor': {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
