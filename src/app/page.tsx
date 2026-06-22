import React from 'react';
import { Header } from '../components/dom/Header';
import { Hero } from '../components/dom/Hero';
import { IdentityLock } from '../components/dom/IdentityLock';
import { ProofStrip } from '../components/dom/ProofStrip';
import { ArchitectureAssembly } from '../components/dom/ArchitectureAssembly';
import { SelectedProjects } from '../components/dom/SelectedProjects';
import { CaseStudyBridge } from '../components/dom/CaseStudyBridge';
import { StackEngine } from '../components/dom/StackEngine';
import { WorkflowPipeline } from '../components/dom/WorkflowPipeline';
import { ExperienceTimeline } from '../components/dom/ExperienceTimeline';
import { ContactPortal } from '../components/dom/ContactPortal';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <IdentityLock />
      <ProofStrip />
      <ArchitectureAssembly />
      <SelectedProjects />
      <CaseStudyBridge />
      <StackEngine />
      <WorkflowPipeline />
      <ExperienceTimeline />
      <ContactPortal />
      
      {/* Spacer content to enable scroll validation for the ScrollStateContext tracker [0.0 - 1.0] */}
      <div className="h-[200vh] w-full bg-gradient-to-b from-transparent to-[#16181c] border-t border-[#242830]" aria-hidden="true">
        <div className="max-w-[1200px] mx-auto px-6 py-20 text-[#9097a2] font-mono text-sm">
          {"// WEBGL PERSPECTIVE CAMERA BINDINGS ACTIVE - SCROLL PROGRESS RECORDING ENGINE ONLINE"}
        </div>
      </div>
    </>
  );
}
