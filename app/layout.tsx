// @ts-nocheck
import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '700'], style: ['normal', 'italic'], variable: '--font-playfair' });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-dm' });

export const metadata: Metadata = {
  title: 'Motion Dance Studio | Los Angeles',
  description: 'Premier dance studio in Los Angeles. Contemporary, Hip-Hop, Ballet, Afrobeats and more. Move. Express. Transform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable}`}>{children}</body>
    </html>
  );
}
