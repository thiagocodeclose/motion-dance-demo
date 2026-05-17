// @ts-nocheck
import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import { getGarrison365Config, buildCssVars } from '@/lib/garrison365-config';

import { Garrison365LivePreview } from '@/components/Garrison365LivePreview';
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '700'], style: ['normal', 'italic'], variable: '--font-playfair' });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-dm' });

export const metadata: Metadata = {
  title: 'Motion Dance Studio | Los Angeles',
  description: 'Premier dance studio in Los Angeles. Contemporary, Hip-Hop, Ballet, Afrobeats and more. Move. Express. Transform.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cfg = await getGarrison365Config();
  const vars = buildCssVars(cfg?.brand);
  return (
    <html lang="en" style={vars as React.CSSProperties}>
      <body className={`${playfair.variable} ${dmSans.variable}`}>{children}<Garrison365LivePreview /></body>
    </html>
  );
}
