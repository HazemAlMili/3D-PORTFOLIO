'use client';

import React from 'react';

export const CaseStudyBridge: React.FC = () => {
  return (
    <section 
      id="case-study-bridge" 
      className="w-full py-32 bg-[#16181c] border-b border-[#242830] flex items-center justify-center text-center"
      aria-label="Technical Case Studies Transition Bridge"
    >
      <div className="max-w-[1200px] w-full mx-auto px-6 flex flex-col items-center justify-center space-y-6">
        
        {/* Mono-Label Section Framework Identifier */}
        <div 
          className="font-mono text-xs font-medium tracking-widest text-[#9097a2] uppercase px-3 py-1 bg-[#0e0f11] border border-[#242830]"
          role="status"
          aria-label="Context identifier: Case Study Bridge"
        >
          ENGINEERING ANALYSIS
        </div>

        {/* High-Contrast Centered Heading Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-[#f4f5f6] tracking-tight max-w-[25ch] leading-tight">
          De-Constructing the Engineering Decisions
        </h2>

        {/* Detailed Invitation Paragraph Body Content */}
        <p className="text-sm font-normal text-[#9097a2] leading-relaxed max-w-[65ch]">
          Resilient systems aren&apos;t built on guesswork. Dive into the deep technical case studies to analyze comprehensive schema blueprints, performance audit tracking lines, routing architectures, and structural failure-mode preventions compiled across production application lifecycles.
        </p>

        {/* Core Conversion Call-To-Action Routing Control Area */}
        <div className="w-full sm:w-auto pt-4 flex justify-center">
          <a
            href="#projects"
            className="h-12 px-8 bg-[#f4f5f6] text-[#0e0f11] font-bold text-xs flex items-center justify-center transition-colors duration-200 hover:bg-[#00e5ff] hover:text-[#0e0f11] text-center min-w-[220px] focus-ring"
            aria-label="Access comprehensive technical case studies and system documentation logs"
          >
            Access Technical Case Studies
          </a>
        </div>

      </div>
    </section>
  );
};
