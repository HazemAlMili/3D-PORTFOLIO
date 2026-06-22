'use client';

import React from 'react';

interface ExperienceMilestone {
  id: string;
  period: string;
  title: string;
  organization: string;
  description: string;
  highlights: string[];
}

const careerMilestones: ExperienceMilestone[] = [
  {
    id: 'exp-enactus',
    period: '2025 - Present',
    title: 'Head of IT Department',
    organization: 'Enactus CIC',
    description: 'Governing cross-functional technical tracks encompassing Frontend, Backend, and UI/UX engineering. Spearheading architectural roadmaps, core release lifecycles, and database infrastructure overhauls.',
    highlights: [
      'Orchestrated the engineering and migration framework for Enactus Portal v4.0 to Supabase.',
      'Institutionalized clean code documentation protocols and decoupled component matrix systems.',
      'Aligned technical sprint deliverables with overarching organizational strategy metrics.'
    ],
  },
  {
    id: 'exp-freelance',
    period: '2024 - 2025',
    title: 'Freelance Frontend UI/UX Developer',
    organization: 'Independent Engineering Contracts',
    description: 'Delivered high-performance, responsive web applications and static localized showcase platforms for corporate clients and professional profiles.',
    highlights: [
      'Engineered localized semantic static layouts with native right-to-left (RTL) Arabic engine support.',
      'Optimized client-side rendering caching rules to protect core web vitals speed boundaries.',
      'Translated wireframe specifications into production-grade, fully accessible TypeScript trees.'
    ],
  },
  {
    id: 'exp-nahdetmasr',
    period: '2024',
    title: 'Client Engagement Representative',
    organization: 'Nahdet Masr (Cairo International Book Fair)',
    description: 'Managed corporate client interactions, product sales tracks, and localized consumer engagement parameters under high-volume public constraint environments.',
    highlights: [
      'Facilitated real-time client requirement parsing and accelerated product onboarding pathways.',
      'Optimized point-of-sale engagement workflows to maximize transactional pipeline values.',
      'Leveraged structured communications to drive high-performance conversion metrics.'
    ],
  },
];

export const ExperienceTimeline: React.FC = () => {
  return (
    <section 
      id="experience" 
      className="w-full py-24 bg-[#0e0f11] border-b border-[#242830]"
      aria-label="Professional Career Landmarks & Experience Timeline"
    >
      <div className="max-w-[1200px] w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Segment Matrix: Chronological Milestone Stream Array (Columns 1-7) */}
        <div className="md:col-span-7 flex flex-col items-start justify-center space-y-12 z-20">
          
          {/* Section Sub-Label Indicator */}
          <div 
            className="font-mono text-xs font-medium tracking-widest text-[#00e5ff] uppercase px-3 py-1 bg-[#16181c] border border-[#242830]"
            role="status"
            aria-label="Context identifier: Experience Timeline"
          >
            CAREER LANDMARKS
          </div>

          {/* Section Heading Titles */}
          <div className="space-y-3 text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f4f5f6] tracking-tight leading-tight">
              Professional Milestones
            </h2>
            <p className="text-sm font-normal text-[#9097a2] leading-relaxed max-w-[50ch]">
              A timeline tracking technical leadership execution, system deployments, and commercial client engagement tracks across production environments.
            </p>
          </div>

          {/* Vertical Branch Tracker Stream Unordered List Array */}
          <ul 
            className="relative border-l border-[#242830] pl-6 space-y-12 text-left w-full"
            aria-label="Chronological career milestones log stream"
          >
            {careerMilestones.map((milestone) => (
              <li 
                key={milestone.id}
                className="relative flex flex-col items-start justify-start space-y-3 group"
              >
                {/* Branch Node Point Vector Indicator */}
                <div 
                  className="absolute -left-[31px] top-1.5 w-4 h-4 bg-[#0e0f11] border-2 border-[#242830] group-hover:border-[#00e5ff] transition-colors duration-300 pointer-events-none rounded-none" 
                  aria-hidden="true"
                />

                {/* Period Landmark Tag */}
                <span className="font-mono text-xs font-bold text-[#00e5ff] tracking-tight bg-[#16181c] px-2 py-0.5 border border-[#242830]">
                  {milestone.period}
                </span>

                {/* Role Title and Organization Cluster */}
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#f4f5f6] tracking-tight group-hover:text-[#00e5ff] transition-colors duration-300">
                    {milestone.title}
                  </h3>
                  <div className="text-xs font-mono font-medium text-[#9097a2]/80">
                    {milestone.organization}
                  </div>
                </div>

                {/* Strategic Narrative Description Copy */}
                <p className="text-sm font-normal text-[#9097a2] leading-relaxed max-w-[60ch]">
                  {milestone.description}
                </p>

                {/* Highlights Structural Bullets Nested Sub-Grid */}
                <ul 
                  className="space-y-2 pt-2"
                  aria-label={`Key contributions at ${milestone.organization}`}
                >
                  {milestone.highlights.map((highlight, index) => (
                    <li 
                      key={index}
                      className="text-xs font-normal text-[#9097a2] leading-relaxed flex items-start max-w-[55ch]"
                    >
                      <span className="font-mono text-[#00e5ff] mr-3 select-none" aria-hidden="true">&gt;</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

              </li>
            ))}
          </ul>

        </div>

        {/* Right Segment Quadrant: Empty Spatial Cushion Frame (Columns 8-12) */}
        {/* Reserved strictly for background React Three Fiber chronological commit tracking mesh assets */}
        <div 
          className="hidden md:block md:col-span-5 h-[550px] w-full" 
          aria-hidden="true"
          role="presentation"
        />

      </div>
    </section>
  );
};
