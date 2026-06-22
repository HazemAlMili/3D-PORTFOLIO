import React from 'react';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { ScrollStateProvider } from '../context/ScrollStateContext';
import { SceneContainer } from '../components/canvas/SceneContainer';
import '@/styles/globals.css';

// Optimize and preload custom font parameters natively to lock the visual system spec
const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Hazem Mahmoud Al-Melli | Lead Web Developer Portfolio',
  description: 'Engineering high-performance digital product systems and frontend software frameworks.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${sansFont.variable} ${monoFont.variable}`}>
      <body className="bg-[#0e0f11] text-[#f4f5f6] antialiased select-text selection:bg-[#00e5ff] selection:text-[#0e0f11]">
        <ScrollStateProvider>
          {/* Fixed full-screen background WebGL container shell */}
          <SceneContainer>
            {/* R3F asset nodes will populate dynamically inside active sub-components */}
            <ambientLight intensity={0.25} />
          </SceneContainer>

          {/* Foreground semantic HTML reading content layers */}
          <main className="relative z-10 w-full min-h-screen">
            {children}
          </main>
        </ScrollStateProvider>
      </body>
    </html>
  );
}
