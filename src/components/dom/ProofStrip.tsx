'use client';

import React from 'react';

interface MetricItem {
  id: string;
  value: string;
  label: string;
  description: string;
}

const metricsData: MetricItem[] = [
  {
    id: 'metric-01',
    value: '4+',
    label: 'Production Architectures',
    description: 'Structured and shipped natively across diverse client ecosystem frameworks.',
  },
  {
    id: 'metric-02',
    value: 'IT Head',
    label: 'Department Governance',
    description: 'Leading multi-cohort development tracks, UI/UX pipelines, and release cycles.',
  },
  {
    id: 'metric-03',
    value: '100%',
    label: 'Hydration Stability',
    description: 'Engineered clean components guarding strict Core Web Vitals benchmarks.',
  },
];

export const ProofStrip: React.FC = () => {
  return (
    <section 
      id="proof-strip" 
      className="w-full py-16 bg-[#0e0f11] border-b border-[#242830]"
      aria-label="Verified Operational Metrics Summary"
    >
      <div className="max-w-[1200px] w-full mx-auto px-6">
        
        {/* Symmetrical 3-Column Layout Matrix Row Grid Array */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {metricsData.map((metric) => (
            <div
              key={metric.id}
              className="flex flex-col items-start justify-between p-6 bg-[#16181c]/60 backdrop-blur-md border border-[#242830] transition-colors duration-300 hover:border-[#9097a2] group"
              role="group"
              aria-labelledby={`${metric.id}-title`}
            >
              {/* Metric Content Fields Stack */}
              <div className="w-full space-y-2">
                
                {/* Numeric Counter Vector Highlight */}
                <div 
                  className="font-mono text-3xl sm:text-4xl font-extrabold text-[#00e5ff] tracking-tight group-hover:text-[#f4f5f6] transition-colors duration-300"
                  aria-hidden="true"
                >
                  {metric.value}
                </div>

                {/* Metric Descriptive Landmark Label */}
                <h3 
                  id={`${metric.id}-title`}
                  className="text-base font-bold text-[#f4f5f6] tracking-tight font-sans"
                >
                  {metric.label}
                </h3>

                {/* Technical Metric Definition Copy */}
                <p className="text-sm font-normal text-[#9097a2] leading-relaxed max-w-[35ch]">
                  {metric.description}
                </p>

              </div>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
