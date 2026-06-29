import type { ResponsivePerformanceContent } from "./types";

export const RESPONSIVE_PERFORMANCE_DATA: ResponsivePerformanceContent = {
  headline: "Responsive by structure. Fast by intention.",
  intro: "Good interfaces do not only resize. They adapt their layout, reduce unnecessary work, and keep the experience stable across devices.",
  principles: [
    {
      id: "perf-1",
      title: "Layout Reflow",
      description: "Design grids that can collapse into clear mobile stacks without losing priority."
    },
    {
      id: "perf-2",
      title: "Lazy Loading",
      description: "Load heavy visual sections only when the user is close enough to need them."
    },
    {
      id: "perf-3",
      title: "Asset Budgets",
      description: "Keep models, textures, and media within clear limits before they become performance debt."
    },
    {
      id: "perf-4",
      title: "Optimized Assets",
      description: "Prefer lightweight geometry, compressed media, and reusable materials."
    },
    {
      id: "perf-5",
      title: "Reduced Motion",
      description: "Respect users and devices by offering calmer motion when needed."
    },
    {
      id: "perf-6",
      title: "Stable Interaction",
      description: "Avoid layout jumps, overdraw, and unnecessary animation during key interactions."
    }
  ]
};

export default RESPONSIVE_PERFORMANCE_DATA;
