import './globals.css';
import type { Metadata } from 'next';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '600'],
  display: 'swap',
  fallback: ['Consolas', 'Courier New', 'monospace'],
  adjustFontFallback: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'sans-serif'],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: 'portfolio.sys | Ayushi Lathiya',
  description:
    'Embedded systems, VLSI, IoT, and health tech — Ayushi Lathiya\'s engineering portfolio.',
  openGraph: {
    title: 'portfolio.sys | Ayushi Lathiya',
    description: 'Embedded Systems // VLSI // IoT Engineer',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'portfolio.sys | Ayushi Lathiya',
    description: 'Embedded Systems // VLSI // IoT Engineer',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full overflow-hidden">
      <body className={`${jetbrains.variable} ${spaceGrotesk.variable} font-mono bg-base text-text-primary h-full overflow-hidden`}>
        {children}
      </body>
    </html>
  );
}
