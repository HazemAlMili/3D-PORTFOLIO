'use client';

import React from 'react';

interface StackDomain {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
}

const stackEngineDomains: StackDomain[] = [
  {
    id: 'domain-frontend',
    name: 'Frontend Layers & Component Frameworks',
    description: 'Engineering highly scannable, performance-optimized interface matrix systems.',
    capabilities: ['React', 'Next.js App Router', 'TypeScript', 'Tailwind CSS', 'Atomic Components', 'Core Web Vitals Engine'],
  },
  {
    id: 'domain-data',
    name: 'Data Infrastructure & Relational Storage',
    description: 'Structuring transactional storage logic, schema layouts, and database migration channels.',
    capabilities: ['Supabase', 'PostgreSQL', 'SQL Schema Layouts', 'Relational Schemas', 'Query Compilation Caching'],
  },
  {
    id: 'domain-leadership',
    name: 'Product Governance & Track Management',
    description: 'Directing cross-functional engineering processes, lifecycle optimization, and delivery protocols.',
    capabilities: ['Technical Track Management', 'Resource Lifecycle Optimization', 'UI/UX Pipeline Governance', 'Cross-Functional Leadership'],
  },
];

export const StackEngine: React.FC = () => {
  return (
    <section
      id="stack"
      className="w-full py-24 bg-[#0e0f11] border-b border-[#242830]"
      aria-label="Engineered Capabilities and Technical Stack Matrix"
    >
      <div className="max-w-[1200px] w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

        {/* Left Segment Matrix: Stratified Capabilities Index Rows (Columns 1-7) */}
        <div className="md:col-span-7 flex flex-col items-start justify-center space-y-8 z-20">

          {/* Section Context Sub-Label */}
          <div
            className="font-mono text-xs font-medium tracking-widest text-[#00e5ff] uppercase px-3 py-1 bg-[#16181c] border border-[#242830]"
            role="status"
            aria-label="Context identifier: Stack Engine Matrix"
          >
            ENGINE CAPACITY
          </div>

          {/* Section Heading Title */}
          <div className="space-y-3 text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f4f5f6] tracking-tight leading-tight">
              Engineered Capabilities Matrix
            </h2>
            <p className="text-sm font-normal text-[#9097a2] leading-relaxed max-w-[55ch]">
              A disciplined index of framework competencies and organizational governance fields. Structured horizontally by expertise layer to secure absolute programmatic clarity.
            </p>
          </div>

          {/* Vertically Stratified Expertise Domains Container */}
          <div className="w-full space-y-6" role="list" aria-label="Expertise domains breakdown matrix">
            {stackEngineDomains.map((domain) => (
              <div
                key={domain.id}
                className="w-full pb-6 border-b border-[#242830]/40 last:border-0 flex flex-col items-start space-y-3 group"
                role="listitem"
              >
                {/* Domain Header Identity Stack */}
                <div className="space-y-1 text-left">
                  <h3 className="text-base font-bold text-[#f4f5f6] tracking-tight group-hover:text-[#00e5ff] transition-colors duration-300">
                    {domain.name}
                  </h3>
                  <p className="text-xs font-normal text-[#9097a2] leading-relaxed">
                    {domain.description}
                  </p>
                </div>

                {/* Technology Matrix Capsule Chips Sub-Grid Row Array */}
                <div className="flex flex-wrap gap-2 pt-1" aria-label={`Capabilities within ${domain.name}`}>
                  {domain.capabilities.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] font-medium text-[#f4f5f6] bg-[#16181c] px-3 py-1 border border-[#242830] transition-colors duration-300 hover:border-[#9097a2] focus:outline-none focus:ring-1 focus:ring-[#00e5ff]"
                      tabIndex={0}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Segment Quadrant: Empty Spatial Padding Cushion Panel (Columns 8-12) */}
        {/* Reserved strictly for background React Three Fiber network node mesh assets */}
        <div
          className="hidden md:block md:col-span-5 h-[480px] w-full"
          aria-hidden="true"
          role="presentation"
        />

      </div>
    </section>
  );
};
