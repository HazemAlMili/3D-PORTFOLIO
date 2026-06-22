'use client';

import React, { useState, useEffect } from 'react';

interface NavItem {
  label: string;
  hash: string;
  ariaLabel: string;
}

const navItems: NavItem[] = [
  { label: 'Work', hash: '#projects', ariaLabel: 'Navigate to Selected Product Architectures section' },
  { label: 'Stack', hash: '#stack', ariaLabel: 'Navigate to Engineered Capabilities Matrix section' },
  { label: 'Process', hash: '#process', ariaLabel: 'Navigate to The Discovery-to-Ship Protocol section' },
  { label: 'About', hash: '#identity', ariaLabel: 'Navigate to Developer Methodology section' },
  { label: 'Contact', hash: '#contact', ariaLabel: 'Navigate to Terminal Contact Phase section' },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Monitor keyboard paths to dismiss full-screen overlay state on Escape trigger natively
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };

    if (isMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Freeze body scrolling layer when overlay menu is active to preserve touch ergonomics
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full h-20 z-50 border-b border-[#242830] bg-[#0e0f11]/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-[1200px] h-full mx-auto px-6 flex items-center justify-between">
        
        {/* Left Anchor: Personal Branding Identity Logo */}
        <a 
          href="#" 
          onClick={closeMenu}
          className="text-base font-mono font-bold tracking-tight text-[#f4f5f6] hover:text-[#00e5ff] transition-colors h-12 flex items-center focus-ring"
          aria-label="Hazem Mahmoud Al-Melli: Return to root top baseline viewport"
        >
          HAZEM.M_
        </a>

        {/* Desktop Interface Core: 12-Column Responsive Spatial Linking Grid */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Global desktop site directory navigation">
          {navItems.map((item) => (
            <a
              key={item.hash}
              href={item.hash}
              className="text-sm font-medium text-[#9097a2] hover:text-[#00e5ff] transition-colors h-12 flex items-center focus-ring"
              aria-label={item.ariaLabel}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Anchor Target Area: Mobile Toggle Control Trigger Trigger */}
        <button
          onClick={toggleMenu}
          className="flex md:hidden flex-col items-center justify-center w-12 h-12 rounded-none border border-[#242830] bg-[#16181c] focus-ring"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-overlay-drawer"
          aria-label={isMenuOpen ? "Close mobile directory navigation menu" : "Open mobile directory navigation menu"}
        >
          <span className={`w-5 h-0.5 bg-[#f4f5f6] transition-transform duration-200 ${isMenuOpen ? 'transform rotate-45 translate-y-1' : ''}`} />
          <span className={`w-5 h-0.5 bg-[#f4f5f6] mt-1.5 transition-transform duration-200 ${isMenuOpen ? 'transform -rotate-45 -translate-y-1' : ''}`} />
        </button>

      </div>

      {/* Responsive Mobile Overlay Menu Drawer Infrastructure Shell */}
      <div
        id="mobile-overlay-drawer"
        className={`fixed top-20 left-0 w-screen h-[calc(100vh-5rem)] bg-[#0e0f11] border-t border-[#242830] z-40 transition-transform duration-300 md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        aria-hidden={!isMenuOpen}
      >
        <nav className="flex flex-col items-start justify-start p-8 space-y-6 w-full h-full" aria-label="Global mobile site directory navigation">
          {navItems.map((item) => (
            <a
              key={item.hash}
              href={item.hash}
              onClick={closeMenu}
              className="text-2xl font-semibold text-[#f4f5f6] hover:text-[#00e5ff] transition-colors w-full py-3 border-b border-[#16181c] flex items-center focus-ring"
              aria-label={item.ariaLabel}
            >
              <span className="font-mono text-xs text-[#00e5ff] mr-4">{"//"}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};
