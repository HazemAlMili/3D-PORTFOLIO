'use client';

import React from 'react';

interface ArchitectureLayer {
  index: string;
  title: string;
  scope: string;
  technologies: string[];
}

const assemblyLayers: ArchitectureLayer[] = [
  {
    index: '01',
    title: 'Frontend Component Matrix',
    scope: 'Engineering highly decoupled UI component trees utilizing strict TypeScript definitions, custom execution hooks, and atomic state design.',
    technologies: ['React', 'Next.js App Router', 'TypeScript', 'Tailwind CSS'],
  },
  {
    index: '02',
    title: 'API Path Configurations',
    scope: 'Structuring unified client-server communication channels via route handlers, data-fetching caches, and client query layers.',
    technologies: ['Next.js Route Handlers', 'REST APIs', 'State Fetchers'],
  },
  {
    index: '03',
    title: 'Relational Database Core',
    scope: 'Designing normalized schemas, relational database layouts, and transactional queries to maximize application data consistency.',
    technologies: ['Supabase', 'PostgreSQL', 'SQL Schema Layouts'],
  },
  {
    index: '04',
    title: 'Production Deployment Infrastructure',
    scope: 'Optimizing static page generation paths, hydration baselines, and asset content caching networks to protect web speed metrics.',
    technologies: ['Vercel Edge Platform', 'CDN Caching', 'Core Web Vitals Engine'],
  },
];

export const ArchitectureAssembly: React.FC = () => {
  return (
    <section 
      id="process" 
      className="w-full py-24 bg-[#0e0f11] border-b border-[#242830]"
      aria-label="Application Layer Assembly Matrix"
    >
      <div className="max-w-[1200px] w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Segment Matrix: Technical Architecture Layer Panels (Columns 1-6) */}
        <div className="md:col-span-6 flex flex-col items-start justify-center space-y-6 z-20">
          
          {/* Section Sub-Label */}
          <div 
            className="font-mono text-xs font-medium tracking-widest text-[#9097a2] uppercase px-3 py-1 bg-[#16181c] border border-[#242830]"
            role="status"
            aria-label="Context identifier: Architecture Assembly"
          >
            ARCHITECTURE ASSEMBLY
          </div>

          {/* Section Main Title Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f4f5f6] tracking-tight leading-snug">
            Orchestrating the Application Layer
          </h2>
          
          <p className="text-sm font-normal text-[#9097a2] leading-relaxed max-w-[50ch] pb-4">
            Building resilient systems requires architectural granularity. I dissect product builds into structured, testable stack layers to secure absolute logic isolation.
          </p>

          {/* Vertical Layers Panels Stack */}
          <div className="w-full space-y-4" role="list" aria-label="System architecture layers breakdown">
            {assemblyLayers.map((layer) => (
              <div
                key={layer.index}
                className="w-full p-5 bg-[#16181c] border border-[#242830] transition-all duration-300 hover:border-[#00e5ff] flex items-start space-x-4 group focus-within:ring-2 focus-within:ring-[#00e5ff]"
                role="listitem"
              >
                {/* Layer Index Vector */}
                <span className="font-mono text-xs font-bold text-[#00e5ff] bg-[#0e0f11] px-2 py-1 border border-[#242830] shrink-0">
                  {layer.index}
                </span>

                {/* Layer Content Matrix */}
                <div className="flex-1 space-y-2 text-left">
                  <h3 className="text-base font-bold text-[#f4f5f6] tracking-tight group-hover:text-[#00e5ff] transition-colors duration-300">
                    {layer.title}
                  </h3>
                  <p className="text-xs font-normal text-[#9097a2] leading-relaxed">
                    {layer.scope}
                  </p>
                  
                  {/* Layer Technology Tags Chips Row */}
                  <div className="flex flex-wrap gap-2 pt-1" aria-label={`Technologies applied in ${layer.title}`}>
                    {layer.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] text-[#f4f5f6] bg-[#0e0f11] px-2 py-0.5 border border-[#242830]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Segment Quadrant: Empty Spatial Cushion Panel (Columns 7-12) */}
        {/* Reserved strictly for background React Three Fiber isometric stacking plates visual assets */}
        <div 
          className="hidden md:block md:col-span-6 h-[550px] w-full sticky top-24" 
          aria-hidden="true"
          role="presentation"
        />

      </div>
    </section>
  );
};
