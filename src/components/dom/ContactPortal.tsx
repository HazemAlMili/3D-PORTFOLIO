'use client';

import React, { FormEvent } from 'react';

export const ContactPortal: React.FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Native validation baseline placeholder. Phase 10 will attach the live transmission hook.
    console.log('SYSTEM: TRANSMISSION INITIALIZED');
  };

  return (
    <section 
      id="contact" 
      className="w-full py-24 bg-[#0e0f11]"
      aria-label="Terminal Contact Portal & Conversion Gateway"
    >
      <div className="max-w-[1200px] w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Segment Matrix: Form Shell and Professional Channels (Columns 1-7) */}
        <div className="md:col-span-7 flex flex-col items-start justify-center space-y-8 z-20">
          
          {/* Mono-Label Section Gateway Identifier */}
          <div 
            className="font-mono text-xs font-medium tracking-widest text-[#ffd700] uppercase px-3 py-1 bg-[#16181c] border border-[#242830]"
            role="status"
            aria-label="Context identifier: Contact Terminal Gateway"
          >
            CONNECT PROTOCOL
          </div>

          {/* Section Main Titles */}
          <div className="space-y-3 text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f4f5f6] tracking-tight leading-tight">
              Initialize Connection Protocol
            </h2>
            <p className="text-sm font-normal text-[#9097a2] leading-relaxed max-w-[50ch]">
              Let&apos;s map out your project constraints or evaluate engineering role matches. Submit a baseline transmission or bridge directly via professional handles.
            </p>
          </div>

          {/* Interactive Form Matrix Component Wrapper */}
          <form 
            onSubmit={handleSubmit}
            className="w-full space-y-6 text-left"
            aria-label="Direct message transmission form"
          >
            {/* Name Input Framework Row */}
            <div className="space-y-2 flex flex-col">
              <label 
                htmlFor="portal-name" 
                className="font-mono text-xs font-medium text-[#9097a2] uppercase tracking-wider"
              >
                Identification / Name
              </label>
              <input
                id="portal-name"
                type="text"
                required
                className="w-full h-12 px-4 bg-[#16181c] border border-[#242830] text-[#f4f5f6] text-sm rounded-none transition-colors duration-200 hover:border-[#9097a2] focus-ring"
                placeholder="Enter full name or corporate title"
              />
            </div>

            {/* Email Input Framework Row */}
            <div className="space-y-2 flex flex-col">
              <label 
                htmlFor="portal-email" 
                className="font-mono text-xs font-medium text-[#9097a2] uppercase tracking-wider"
              >
                Transmission Destination / Email
              </label>
              <input
                id="portal-email"
                type="email"
                required
                className="w-full h-12 px-4 bg-[#16181c] border border-[#242830] text-[#f4f5f6] text-sm rounded-none transition-colors duration-200 hover:border-[#9097a2] focus-ring"
                placeholder="name@company.com"
              />
            </div>

            {/* Message Textarea Framework Row */}
            <div className="space-y-2 flex flex-col">
              <label 
                htmlFor="portal-message" 
                className="font-mono text-xs font-medium text-[#9097a2] uppercase tracking-wider"
              >
                Project Parameters / Message
              </label>
              <textarea
                id="portal-message"
                required
                rows={5}
                className="w-full p-4 bg-[#16181c] border border-[#242830] text-[#f4f5f6] text-sm rounded-none transition-colors duration-200 hover:border-[#9097a2] focus-ring resize-none"
                placeholder="Outline core requirements, timeline targets, or role specifications..."
              />
            </div>

            {/* Submit Execution Action Button Area satisfying 48px tactile heights */}
            <button
              type="submit"
              className="h-12 w-full sm:w-auto px-8 bg-[#f4f5f6] text-[#0e0f11] font-bold text-xs rounded-none transition-colors duration-200 hover:bg-[#00e5ff] text-center uppercase tracking-wider focus-ring"
              aria-label="Transmit baseline message payload directly to engineering desk"
            >
              Ship Transmission
            </button>
          </form>

          {/* Social Conversion Bridges Sub-Grid Array Area */}
          <div className="w-full pt-6 border-t border-[#242830]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="font-mono text-xs font-medium text-[#9097a2]/60">
              {"// DIRECT SYNDICATION CHANNELS:"}
            </span>
            <div className="flex items-center space-x-6" aria-label="Professional syndication networks">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-medium text-[#9097a2] hover:text-[#00e5ff] transition-colors h-12 flex items-center focus-ring"
                aria-label="Syndicate and connect via official LinkedIn network profile"
              >
                LinkedIn_
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-medium text-[#9097a2] hover:text-[#00e5ff] transition-colors h-12 flex items-center focus-ring"
                aria-label="Audit open source core wires via official GitHub code ledger"
              >
                GitHub_
              </a>
            </div>
          </div>

        </div>

        {/* Right Segment Quadrant: Empty Spatial Cushion Panel (Columns 8-12) */}
        {/* Reserved strictly for background React Three Fiber wide-angle golden camera wide axis reset sweeps */}
        <div 
          className="hidden md:block md:col-span-5 h-[500px] w-full" 
          aria-hidden="true"
          role="presentation"
        />

      </div>
    </section>
  );
};
