'use client';

import React from 'react';

interface PipelineStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  metric: string;
}

const pipelineSteps: PipelineStep[] = [
  {
    id: 'step-01',
    stepNumber: '01',
    title: 'Strategic Briefing & Mapping',
    description: 'Deconstructing strategic briefs into precise architectural requirements, scoping component metrics, and locking data schema boundaries.',
    metric: 'Phase 0 - Phase 2 Compliance',
  },
  {
    id: 'step-02',
    stepNumber: '02',
    title: 'Logic Component Engineering',
    description: 'Constructing decoupled, type-safe frontend layers using strict TypeScript configurations, custom hooks, and isolated state controllers.',
    metric: 'Phase 5 - Phase 7 Production',
  },
  {
    id: 'step-03',
    stepNumber: '03',
    title: 'Performance Auditing & Launch',
    description: 'Executing strict hydration verification checks, core web vitals speed optimization testing, and freezing code assets against deployment drift.',
    metric: '100% Core Web Vitals Lock',
  },
];

export const WorkflowPipeline: React.FC = () => {
  return (
    <section
      id="workflow"
      className="w-full py-24 bg-[#0e0f11] border-b border-[#242830]"
      aria-label="The Discovery-to-Ship Product Engineering Protocol"
    >
      <div className="max-w-[1200px] w-full mx-auto px-6 space-y-12">

        {/* Section Context Header Block */}
        <div className="flex flex-col items-start justify-center space-y-4 text-left max-w-[65ch]">
          <div
            className="font-mono text-xs font-medium tracking-widest text-[#00e5ff] uppercase px-3 py-1 bg-[#16181c] border border-[#242830]"
            role="status"
            aria-label="Context identifier: Workflow Pipeline Timeline"
          >
            EXECUTION PROTOCOL
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f4f5f6] tracking-tight leading-tight">
            The Discovery-to-Ship Protocol
          </h2>
          <p className="text-sm font-normal text-[#9097a2] leading-relaxed">
            A mathematically rigid lifecycle mapping that eliminates development guesswork. Every application follows an unyielding execution track to guarantee production performance.
          </p>
        </div>

        {/* Semantic Ordered List Timeline Flow Element Array */}
        <ol
          className="flex flex-col md:flex-row items-stretch justify-between gap-6 md:gap-4 relative w-full"
          aria-label="Three-stage production lifecycle pipeline steps"
        >
          {pipelineSteps.map((step, index) => (
            <li
              key={step.id}
              className="flex-1 p-6 bg-[#16181c] border border-[#242830] transition-colors duration-300 hover:border-[#00e5ff] flex flex-col justify-between space-y-6 relative group"
            >
              {/* Content Matrix Block */}
              <div className="space-y-4 text-left">

                {/* Step Landmark Meta Indicator */}
                <div className="flex items-center justify-between w-full gap-2">
                  <span className="font-mono text-xs font-bold text-[#00e5ff] bg-[#0e0f11] px-2.5 py-1 border border-[#242830] shrink-0">
                    STAGE {step.stepNumber}
                  </span>
                  <span className="font-mono text-[10px] text-[#9097a2]/50 uppercase tracking-wider text-right">
                    {step.metric}
                  </span>
                </div>

                {/* Step Sub-Heading Title */}
                <h3 className="text-base font-bold text-[#f4f5f6] tracking-tight group-hover:text-[#00e5ff] transition-colors duration-300">
                  {step.title}
                </h3>

                {/* Protocol Context Narrative Copy */}
                <p className="text-xs font-normal text-[#9097a2] leading-relaxed">
                  {step.description}
                </p>

              </div>

              {/* Horizontal Connecting Vector Line — Desktop Only, Not on Last Item */}
              {index < pipelineSteps.length - 1 && (
                <div
                  className="hidden md:block absolute top-1/2 -right-3 w-6 h-[1px] bg-[#242830] z-30 pointer-events-none group-hover:bg-[#00e5ff] transition-colors duration-300"
                  aria-hidden="true"
                />
              )}

            </li>
          ))}
        </ol>

      </div>
    </section>
  );
};
