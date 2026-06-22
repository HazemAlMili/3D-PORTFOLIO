'use client';

import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section 
      id="hero" 
      className="w-full min-h-screen pt-32 pb-20 flex items-center justify-center border-b border-[#242830]"
      aria-label="System Initial Viewport: Architectural Boot and Introduction"
    >
      <div className="max-w-[1200px] w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Column Block: High-Contrast Technical Text Stream Matrix (Columns 1-7) */}
        <div className="md:col-span-7 flex flex-col items-start justify-center space-y-6 text-left z-20">
          
          {/* Mono-Label Log Indicator */}
          <div 
            className="font-mono text-xs font-medium tracking-widest text-[#00e5ff] uppercase px-3 py-1 bg-[#16181c] border border-[#242830]"
            role="status"
            aria-label="System status log baseline initialization profile"
          >
            SYSTEM: INITIALIZATION
          </div>

          {/* Primary Header Landmark Element */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#f4f5f6] tracking-tight leading-[1.15]">
            Engineering High-Performance <br className="hidden lg:inline" />
            Digital Product Systems.
          </h1>

          {/* Structural Copy Paragraph Content Field */}
          <p className="text-base font-normal text-[#9097a2] leading-relaxed max-w-[65ch]">
            Hi, I am <span className="text-[#f4f5f6] font-semibold">Hazem Mahmoud Al-Melli</span>. 
            A Web Developer specializing in enterprise frontend architectures built with React, Next.js, and TypeScript. 
            By merging high-performance component engineering with disciplined technical management frameworks, I build resilient, fluid digital solutions that maximize operational value.
          </p>

          {/* Primary & Secondary Conversion Action Target Containers Array */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto pt-4">
            
            {/* Primary Action Call-To-Action Target Anchor */}
            <a
              href="#contact"
              className="h-12 px-6 bg-[#f4f5f6] text-[#0e0f11] font-medium text-sm rounded-none flex items-center justify-center transition-colors duration-200 hover:bg-[#00e5ff] hover:text-[#0e0f11] text-center min-w-[160px] focus-ring"
              aria-label="Initiate connection protocol and move focus to contact container fields"
            >
              Connect Protocol
            </a>

            {/* Secondary Technical Bridge Anchor */}
            <a
              href="#projects"
              className="h-12 px-6 bg-transparent text-[#9097a2] border border-[#242830] font-medium text-sm rounded-none flex items-center justify-center transition-colors duration-200 hover:border-[#9097a2] hover:text-[#f4f5f6] text-center min-w-[160px] focus-ring"
              aria-label="Analyze core portfolio architectures and skip directly to selected projects matrix"
            >
              Analyze Shipped Core
            </a>

          </div>

        </div>

        {/* Right Column Quadrant: Empty Spatial Padding Tracker Panel (Columns 8-12) */}
        {/* Reserved strictly for background React Three Fiber concentric ring sweeps */}
        <div 
          className="hidden md:block md:col-span-5 h-[400px] w-full" 
          aria-hidden="true"
          role="presentation"
        />

      </div>
    </section>
  );
};
