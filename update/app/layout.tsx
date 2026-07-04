import './globals.css';
import type { Metadata } from 'next';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '600'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'TRACE // KERNEL | Ayushi Lathiya',
  description:
    'From circuit design to AI-powered health tech, explore Ayushi Lathiya\'s journey through engineering and innovation.',
  openGraph: {
    title: 'TRACE // KERNEL | Ayushi Lathiya',
    description: 'Embedded Systems // VLSI // IoT Engineer',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TRACE // KERNEL | Ayushi Lathiya',
    description: 'Embedded Systems // VLSI // IoT Engineer',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${jetbrains.variable} ${spaceGrotesk.variable} font-mono bg-base text-text-primary`}>
        {children}
      </body>
    </html>
  );
}
