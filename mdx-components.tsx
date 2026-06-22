import React from 'react';
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override semantic elements to lock down our visual design typography parameters
    h1: ({ children }) => (
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#f4f5f6] tracking-tight mt-8 mb-4 font-sans border-b border-[#242830] pb-2">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-[#f4f5f6] tracking-tight mt-6 mb-3 font-sans">
        {children}
      </h2>
    ),
    p: ({ children }) => (
      <p className="text-sm sm:text-base font-normal text-[#9097a2] leading-relaxed mb-4 max-w-[65ch]">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-none space-y-2 mb-6 pl-0" role="list">
        {children}
      </ul>
    ),
    li: ({ children }) => (
      <li className="text-sm text-[#9097a2] flex items-start">
        <span className="font-mono text-[#00e5ff] mr-3 select-none" aria-hidden="true">&gt;</span>
        <span className="flex-1">{children}</span>
      </li>
    ),
    strong: ({ children }) => (
      <strong className="text-[#f4f5f6] font-semibold">
        {children}
      </strong>
    ),
    ...components,
  };
}
