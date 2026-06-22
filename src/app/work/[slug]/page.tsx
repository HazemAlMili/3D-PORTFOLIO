import React from 'react';
import { notFound } from 'next/navigation';
import { getCaseStudyBySlug, getAllCaseStudySlugs } from '../../../lib/mdxLoader';

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static routes explicitly during build cycles to lock down 100% SSG compliance
export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({
    slug: slug,
  }));
}

export default function CaseStudyPage({ params }: PageProps) {
  const currentProject = getCaseStudyBySlug(params.slug);

  // Enforce zero placeholder error protection boundaries natively
  if (!currentProject) {
    notFound();
  }

  const { frontmatter, content } = currentProject;

  return (
    <article className="w-full min-h-screen bg-[#0e0f11] pt-32 pb-24 text-[#f4f5f6]">
      <div className="max-w-[800px] mx-auto px-6 space-y-10">
        
        {/* Header Metadata Meta Section Block */}
        <div className="space-y-4 text-left border-b border-[#242830] pb-8">
          <span className="font-mono text-xs font-bold text-[#00e5ff] tracking-widest bg-[#16181c] px-3 py-1 border border-[#242830]">
            CASE STUDY ANALYSIS
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#f4f5f6] pt-2">
            {frontmatter.title}
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-[#9097a2] pt-1">
            <div><span className="text-[#00e5ff]">{"// ROLE:"}</span> {frontmatter.role}</div>
            <div><span className="text-[#00e5ff]">{"// CLIENT:"}</span> {frontmatter.client}</div>
            <div><span className="text-[#00e5ff]">{"// PERIOD:"}</span> {frontmatter.period}</div>
          </div>
        </div>

        {/* Operational Metrics Display Summary Panel Sub-Grid Row Array */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full" role="region" aria-label="Project operational data highlights">
          {frontmatter.metrics.map((metric: any, idx: any) => (
            <div key={idx} className="p-4 bg-[#16181c] border border-[#242830] flex flex-col space-y-1 text-left">
              <span className="font-mono text-xl font-bold text-[#00e5ff]">{metric.value}</span>
              <span className="text-xs font-medium text-[#9097a2] font-sans">{metric.label}</span>
            </div>
          ))}
        </div>

        {/* Structured Stack Badge Caps Row Array */}
        <div className="flex flex-wrap gap-2 text-left" aria-label="Technology tools stack matrix">
          {frontmatter.stack.map((tech: any) => (
            <span key={tech} className="font-mono text-[10px] font-medium text-[#f4f5f6] bg-[#16181c] px-2.5 py-1 border border-[#242830]">
              {tech}
            </span>
          ))}
        </div>

        {/* Narrative System Content Core Grid */}
        <div className="text-left pt-6 border-t border-[#242830]/40">
          <p className="text-base font-normal text-[#9097a2] leading-relaxed max-w-[65ch]">
            {content}
          </p>
        </div>

        {/* Return Control Link Target satisfy strict 48px tactile heights */}
        <div className="pt-12 flex justify-start">
          <a
            href="/#"
            className="h-12 px-6 bg-transparent text-[#9097a2] border border-[#242830] font-medium text-xs rounded-none flex items-center justify-center hover:text-[#f4f5f6] hover:border-[#9097a2] transition-colors focus-ring"
            aria-label="Return back to central hub index dashboard layout viewport"
          >
            &lt; Return to Control Index
          </a>
        </div>

      </div>
    </article>
  );
}
