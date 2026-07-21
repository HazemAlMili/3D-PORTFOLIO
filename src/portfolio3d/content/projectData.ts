import type { ProjectEntry } from "./types";

export type { ProjectEntry };

export const PROJECT_DATA: ProjectEntry[] = [
  {
    id: "project-1",
    title: "Hireny AI",
    role: "AI RECRUITMENT PLATFORM",
    oneLineDescription: "AI-powered job board featuring automated resume evaluation.",
    problem: "Job seekers needed a simpler way to discover roles and evaluate their resumes before applying.",
    built: "Built the full-stack platform, Supabase authentication, database and resume storage, plus an AI resume-analysis queue.",
    stack: ["React", "TypeScript", "Supabase", "TailwindCSS"],
    architectureNote: "Architected full-stack cloud infrastructure with automated AI resume evaluation and queue processing.",
    result: "A working job board with automated resume evaluation and complete candidate application flows.",
    liveUrl: "https://hirenyai.vercel.app/",
    githubUrl: "https://github.com/HazemAlMili/Hireny_AI",
    image: "/hirenyai.png"
  },
  {
    id: "project-2",
    title: "Aqar",
    role: "REAL ESTATE MARKETPLACE",
    oneLineDescription: "Real-estate marketplace with property listings, maps, and responsive React UI.",
    problem: "Property discovery required clearer listings, advanced filtering, search, and map-based browsing.",
    built: "Built reusable React listing and property-detail components, multi-layer filters, interactive maps, and responsive UI.",
    stack: ["React", "JavaScript", "Bootstrap", "CSS"],
    architectureNote: "Developed scalable React architecture with dynamic property filtering and interactive map integration.",
    result: "A responsive property-discovery experience for browsing, filtering, and comparing available properties.",
    liveUrl: "https://real-estate14.vercel.app/",
    githubUrl: "https://github.com/HazemAlMili/GDG-Final-Project",
    image: "/Aqar.jpg"
  },
  {
    id: "project-3",
    title: "Enactus Portal",
    role: "ORGANIZATION MANAGEMENT PLATFORM",
    oneLineDescription: "ERP portal for member management, RBAC, analytics, and departmental workflows.",
    problem: "Member records, departments, roles, performance, and contributions needed to be managed in one centralized system.",
    built: "Led the full-stack build using Next.js, Node.js, Supabase, role-based access, admin analytics, XP, and leaderboards.",
    stack: ["Next.js", "Node.js", "Supabase", "TailwindCSS"],
    architectureNote: "Full-stack ERP system with Supabase schema, RBAC security, and departmental workflow engine.",
    result: "A centralized portal for member management, departmental workflows, performance tracking, and contribution recognition.",
    liveUrl: "https://enactus-portal.vercel.app/",
    githubUrl: "https://github.com/HazemAlMili/enactus-portal",
    image: "/Enactus-portal.png"
  },
  {
    id: "project-4",
    title: "Personal Portfolio",
    role: "PERSONAL PORTFOLIO & SHOWCASE",
    oneLineDescription: "Portfolio showcasing scroll-driven experiences and project showcases.",
    problem: "Developers need a memorable visual identity to showcase full-stack applications and engineering capabilities.",
    built: "Built a portfolio website using React, Vite.",
    stack: ["React", "TypeScript", "Vite"],
    architectureNote: "Developed a Personal portfolio architecture, and responsive overlays.",
    result: "A performance-optimized portfolio experience with seamless camera transitions, micro-interactions, and responsive layouts.",
    liveUrl: "https://hazemalmelli.vercel.app/",
    githubUrl: "https://github.com/HazemAlMili/Hazem-Hub"
  }
];
