'use client';

import React from 'react';

export const IdentityLock: React.FC = () => {
  return (
    <section 
      id="identity" 
      className="w-full min-h-screen py-24 flex items-center justify-center bg-[#0e0f11] border-b border-[#242830]"
      aria-label="Developer Methodology & Executive Leadership Context"
    >
      <div className="max-w-[1200px] w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Column Quadrant: Intentionally Empty Spatial Asset Frame (Columns 1-4) */}
        {/* Reserved strictly for background React Three Fiber layer camera orbit mesh animations */}
        <div 
          className="hidden md:block md:col-span-4 h-[300px] w-full" 
          aria-hidden="true"
          role="presentation"
        />

        {/* Right Column Block: Narrative Executive Content Matrix (Columns 5-12) */}
        <div className="md:col-span-8 flex flex-col items-start justify-center space-y-6 text-left z-20">
          
          {/* Mono-Label Technical Module Tag */}
          <div 
            className="font-mono text-xs font-medium tracking-widest text-[#9097a2] uppercase px-3 py-1 bg-[#16181c] border border-[#242830]"
            role="status"
            aria-label="Context layer identifier: Developer Methodology"
          >
            DEVELOPER METHODOLOGY
          </div>

          {/* Secondary Structural Heading Section Title */}
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f4f5f6] tracking-tight leading-snug pl-4 border-l-2 border-[#00e5ff]">
            The Intersection of System Logic <br />
            &amp; Management Frameworks
          </h2>

          {/* Core Leadership Narrative Body Block */}
          <div className="space-y-4 text-base font-normal text-[#9097a2] leading-relaxed max-w-[65ch]">
            <p>
              Sustainable engineering operations demand more than isolated syntactical expertise. 
              My dual-track profile bridges high-performance web development with disciplined organizational governance. 
              Holding a formal background in{' '}
              <span className="text-[#f4f5f6] font-medium">Business Administration</span>,{' '}
              I design engineering roadmaps through a lens of resource optimization, lifecycle efficiency, and corporate utility alignment.
            </p>
            <p>
              As the{' '}
              <span className="text-[#f4f5f6] font-medium">Head of the IT Department at Enactus CIC</span>,{' '}
              I govern cross-functional technical tracks encompassing Frontend, Backend, and UI/UX disciplines. 
              By institutionalizing strict deployment safety matrices, performance testing boundaries, and uniform coding protocols, 
              I transform strategic product briefs into production-grade systems while optimizing developer delivery cycles.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
