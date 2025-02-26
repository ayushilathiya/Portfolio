import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Ayushi Lathiya's Portfolio",
  description: "Explore Ayushi Lathiya's portfolio showcasing projects and technical skills.",
  icons: {
    icon: {
      url: '/favicon.jpeg',
      type: 'image/jpeg',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
