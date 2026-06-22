'use client';

import React from 'react';

interface ProjectItem {
  id: string;
  title: string;
  role: string;
  challenge: string;
  outcome: string;
  stack: string[];
  liveUrl?: string;
  codeUrl?: string;
}

const portfolioProjects: ProjectItem[] = [
  {
    id: 'proj-enactus',
    title: 'Enactus Portal v4.0',
    role: 'Head of IT & Lead Architecture Engineer',
    challenge: 'Migrating legacy unstructured MongoDB models to a relational Supabase cloud engine while establishing granular role-based access control rules for large multi-cohort management frameworks.',
    outcome: 'Successfully decoupled database querying workflows, deployed stable Vercel production layers, and achieved zero credential bypass incidents.',
    stack: ['React', 'Next.js App Router', 'TypeScript', 'Supabase', 'SQL Schemas'],
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 'proj-jobboard',
    title: 'AI Job Board Platform',
    role: 'Solo Software Engineer',
    challenge: 'Optimizing high-frequency real-time database query frequencies and client-side server caching boundaries to maintain ultra-low latency response vectors.',
    outcome: 'Built a high-performance query compilation cache layer on Supabase, guaranteeing immediate data updates under heavy transactional strains.',
    stack: ['React', 'Next.js App Router', 'TypeScript', 'Supabase', 'Server Caching'],
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 'proj-gdg',
    title: 'GDG Real Estate Module',
    role: 'Collaborative Component Developer',
    challenge: 'Engineering highly complex property listing filtering logics and multi-parameter search structures without causing main-thread ui lag on constrained mobile hardware.',
    outcome: 'Codified thread-optimized listing filter arrays, eliminating redundant recalculation loops to secure smooth mobile viewport rendering cycles.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Mobile Filter Optimization'],
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 'proj-lawyer',
    title: 'Lawyer Static Showcase',
    role: 'Frontend UI/UX Architect',
    challenge: 'Constructing an ultra-fast, static, right-to-left (RTL) Arabic showcase engine that maintains mathematical layout symmetry and zero hydration mismatches.',
    outcome: 'Delivered a fully compliant semantic layout infrastructure with perfect Core Web Vitals performance benchmarks and native RTL layout protection.',
    stack: ['Next.js App Router', 'TypeScript', 'Tailwind CSS', 'RTL Arabic Engine'],
    liveUrl: '#',
    codeUrl: '#',
  },
];

export const SelectedProjects: React.FC = () => {
  return (
    <section
      id="projects"
      className="w-full py-24 bg-[#0e0f11] border-b border-[#242830]"
      aria-label="Selected Product Architectures & Engineering Projects"
    >
      <div className="max-w-[1200px] w-full mx-auto px-6 space-y-12">

        {/* Section Context Header Block */}
        <div className="flex flex-col items-start justify-center space-y-4 text-left max-w-[65ch]">
          <div
            className="font-mono text-xs font-medium tracking-widest text-[#00e5ff] uppercase px-3 py-1 bg-[#16181c] border border-[#242830]"
            role="status"
            aria-label="Context identifier: Selected Projects Grid"
          >
            SELECTED ARCHITECTURES
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f4f5f6] tracking-tight leading-tight">
            Production Applications &amp; Shipped Core Wires
          </h2>
          <p className="text-sm font-normal text-[#9097a2] leading-relaxed">
            Real systems validated under production constraints. Each project represents a targeted solution combining strict frontend performance metrics with clean database governance frameworks.
          </p>
        </div>

        {/* 2x2 Symmetrical Masonry Grid Workspace Framework */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 auto-rows-fr">
          {portfolioProjects.map((project) => (
            <article
              key={project.id}
              className="relative flex flex-col items-start justify-between p-6 bg-[#16181c]/60 backdrop-blur-md border border-[#242830] transition-all duration-300 hover:border-[#9097a2] overflow-hidden group
                before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-[#00e5ff] before:scale-y-0 before:group-hover:scale-y-100 before:transition-transform before:duration-300 before:origin-top"
              aria-labelledby={`${project.id}-title`}
            >
              {/* Card Meta Content Fields Block */}
              <div className="w-full space-y-4 text-left">

                {/* Project Title and Role Tracking Rows */}
                <div className="space-y-1">
                  <h3
                    id={`${project.id}-title`}
                    className="text-xl font-bold text-[#f4f5f6] tracking-tight group-hover:text-[#00e5ff] transition-colors duration-300"
                  >
                    {project.title}
                  </h3>
                  <div className="font-mono text-xs font-medium text-[#00e5ff]/80">
                    {project.role}
                  </div>
                </div>

                {/* Challenge & Outcome Segments Breakdown Matrix */}
                <div className="space-y-3 text-sm leading-relaxed">
                  <p className="font-normal text-[#9097a2]">
                    <strong className="block text-xs font-mono uppercase tracking-wider mb-1 font-medium text-[#9097a2]/60">
                      The Core Challenge:
                    </strong>
                    {project.challenge}
                  </p>
                  <p className="font-normal text-[#9097a2]">
                    <strong className="block text-xs font-mono uppercase tracking-wider mb-1 font-medium text-[#9097a2]/60">
                      The System Outcome:
                    </strong>
                    {project.outcome}
                  </p>
                </div>

                {/* Technology Matrix Capsule Chips Sub-Grid */}
                <div className="flex flex-wrap gap-2 pt-2" aria-label={`Technology stack utilized in ${project.title}`}>
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] font-medium text-[#f4f5f6] bg-[#0e0f11] px-2.5 py-1 border border-[#242830]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>

              {/* Action Anchors Layer Array — strict 48px tactile height targets */}
              <div className="flex items-center space-x-4 w-full pt-6 mt-6 border-t border-[#242830]/60">
                <a
                  href={project.liveUrl}
                  className="h-12 px-4 bg-[#0e0f11] text-[#f4f5f6] hover:bg-[#f4f5f6] hover:text-[#0e0f11] font-medium text-xs border border-[#242830] flex items-center justify-center transition-colors duration-200 flex-1 focus-ring"
                  aria-label={`Launch dynamic application instance for ${project.title}`}
                >
                  Launch System
                </a>
                <a
                  href={project.codeUrl}
                  className="h-12 px-4 bg-transparent text-[#9097a2] hover:text-[#f4f5f6] font-medium text-xs flex items-center justify-center transition-colors duration-200 flex-1 focus-ring"
                  aria-label={`Verify production code wires and source grids for ${project.title}`}
                >
                  Verify Source Wires
                </a>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
