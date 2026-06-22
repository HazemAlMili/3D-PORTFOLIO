'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';

interface ScrollState {
  // A raw reference pointer containing high-frequency progress values to prevent component re-renders
  progressRef: React.MutableRefObject<number>;
}

const ScrollStateContext = createContext<ScrollState | null>(null);

export const ScrollStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const progressRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight <= 0) return;
      
      // Calculate normal floating-point progress scale matrix [0.0 - 1.0]
      const currentProgress = scrollTop / docHeight;
      progressRef.current = Math.min(Math.max(currentProgress, 0), 1);
    };

    // Attach passive listener to optimize mobile main-thread scrolling pathways natively
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ScrollStateContext.Provider value={{ progressRef }}>
      {children}
    </ScrollStateContext.Provider>
  );
};

export const useScrollState = () => {
  const context = useContext(ScrollStateContext);
  if (!context) {
    throw new Error('useScrollState must be executed within an active ScrollStateProvider container node.');
  }
  return context;
};
