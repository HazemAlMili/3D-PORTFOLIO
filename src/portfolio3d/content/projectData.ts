import type { ProjectEntry } from "./types";

export const PROJECT_DATA: ProjectEntry[] = [
  {
    id: "project-1",
    title: "Commerce Operations Platform",
    oneLineDescription: "A dashboard for tracking orders, fulfillment, and performance.",
    problem: "Teams needed clearer visibility across orders, delays, and handoffs.",
    built: "Role-based dashboard, order flow, performance metrics, and operational views.",
    stack: ["React", "TypeScript", "REST APIs", "Dashboard Architecture"],
    architectureNote: "UI state separated from data-fetching and role-based access flows.",
    result: "Faster operational visibility and cleaner decision-making."
  },
  {
    id: "project-2",
    title: "Interactive Brand Experience",
    oneLineDescription: "A cinematic web experience built around storytelling and 3D interaction.",
    problem: "Static landing pages were not enough to communicate premium positioning.",
    built: "Scroll-driven scenes, animated content layers, and responsive fallback experience.",
    stack: ["React", "Three.js", "R3F", "Zustand", "TypeScript"],
    architectureNote: "Scene state and scroll progress drive camera and content deterministically.",
    result: "A more memorable and premium brand journey."
  },
  {
    id: "project-3",
    title: "Admin Workflow System",
    oneLineDescription: "A structured interface for managing users, content, and internal actions.",
    problem: "Manual workflows created confusion and inconsistent follow-up.",
    built: "Admin views, reusable components, filtered tables, and action states.",
    stack: ["React", "TypeScript", "REST APIs", "Component Systems"],
    architectureNote: "Data models and UI states designed for maintainability.",
    result: "Cleaner workflow visibility and easier internal operations."
  }
];
