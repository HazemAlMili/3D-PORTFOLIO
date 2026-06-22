import { CaseStudyFrontmatter, CaseStudyPayload } from '../types/mdx';

// Symmetrical static dictionary data map acting as the local storage sync register
const localDataMap: Record<string, { frontmatter: CaseStudyFrontmatter; content: string }> = {
  'enactus-portal-v4': {
    frontmatter: {
      title: 'Enactus Portal v4.0',
      role: 'Head of IT & Lead Architecture Engineer',
      client: 'Enactus CIC Team Cohorts',
      period: '2025 - 2026',
      stack: ['React', 'Next.js App Router', 'TypeScript', 'Supabase', 'SQL Schemas'],
      metrics: [
        { label: 'Database Access Incidents', value: '0%' },
        { label: 'Migration Loss Vector', value: 'Zero' }
      ]
    },
    content: '# Structural Overview\n\nDeconstructing the system layers governing the Enactus Portal v4.0 migration track. The application acts as a centralized internal management infrastructure designed to coordinate multi-tier student cohort activities safely.\n\n## The Architectural Challenge\n\nThe legacy system relied on unstructured, multi-tenant MongoDB document setups that suffered from severe schematic drift and unoptimized data access loops. As the IT Department Head, the core directive was to engineer a clean, transaction-safe migration strategy toward a relational Supabase PostgreSQL instance while maintaining live environment operations.\n\n## Implementation & Safety Gates\n\nWe enforced a rigid SQL schema normalization layout, setting up cascade elimination loops and explicit role-based access control (RBAC) rules. Component trees were split into modular client actions, trapping unauthenticated rendering frames entirely outside server-side compilation paths.\n\n## Shipped System Outcome\n\nThe production platform achieved absolute data continuity during transition runs. Database latency vectors scaled down efficiently, securing a zero credential compromise baseline across the entire organizational lifecycle.'
  },
  'ai-job-board': {
    frontmatter: {
      title: 'AI Job Board Platform',
      role: 'Solo Software Engineer',
      client: 'Personal Production Sandbox',
      period: '2025',
      stack: ['React', 'Next.js App Router', 'TypeScript', 'Supabase', 'Server Caching'],
      metrics: [
        { label: 'Query Latency Vectors', value: 'Ultra-low' },
        { label: 'Cache Revalidation Efficiency', value: '99.2%' }
      ]
    },
    content: '# Engineering Overview\n\nAn analytical analysis of high-frequency transactional data caching executed over our AI Job Board Platform setup.\n\n## The Performance Challenge\n\nReal-time semantic search aggregation engines trigger heavy automated database processing overheads. Running continuous query requests directly to cloud nodes causes database thermal throttle threats and user interface thread lag on mobile devices.\n\n## Caching Layer Strategy\n\nI codified a type-safe client cache validation controller wrapping Supabase real-time event distribution hooks. By deploying rigid Next.js cache revalidation lifecycles and pinning incremental static regeneration parameters, expensive compilation passes were restricted strictly to content mutation timelines.\n\n## Shipped System Outcome\n\nQuery response latency dropped into ultra-low metrics zones. The application processes concurrent tracking operations safely while maintaining a 99.2% cache reuse calculation stability score.'
  },
  'gdg-real-estate': {
    frontmatter: {
      title: 'GDG Real Estate Module',
      role: 'Collaborative Component Developer',
      client: 'Google Developer Group Shared Core',
      period: '2026',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Mobile Filter Optimization'],
      metrics: [
        { label: 'UI Thread Lag Overhead', value: '0ms' },
        { label: 'Mobile Frame Rate Retention', value: '60 FPS' }
      ]
    },
    content: '# Component Breakdown\n\nTechnical documentation covering performance optimization matrices engineered for the collaborative real estate application layer.\n\n## The Computational Challenge\n\nMulti-parameter real estate listings require instantaneous reactive rendering over complex attribute arrays. Complex conditional list recalculations cause significant main-thread scripting blockages, dropping frame rates on standard mobile devices below usable metrics.\n\n## Array Optimization Matrix\n\nWe designed a memoized array lookup architecture that isolates filtering steps from secondary viewport updates. Structural property data collections undergo bitwise matching sweeps, preventing unnecessary DOM reflow triggers during heavy keyword inputs.\n\n## Shipped System Outcome\n\nMain-thread UI lag overhead dropped to a flawless 0ms baseline. Mobile devices retain native 60 FPS rendering continuity even when evaluating extensive multi-node listing records simultaneously.'
  },
  'lawyer-showcase': {
    frontmatter: {
      title: 'Lawyer Static Showcase',
      role: 'Frontend UI/UX Architect',
      client: 'Legal Private Practice Client',
      period: '2026',
      stack: ['Next.js App Router', 'TypeScript', 'Tailwind CSS', 'RTL Arabic Engine'],
      metrics: [
        { label: 'Core Web Vitals Pass Rate', value: '100%' },
        { label: 'Hydration Mismatch Errors', value: 'Zero' }
      ]
    },
    content: '# Localization Architecture\n\nA detailed look into the semantic design system and technical implementation layers governing our localized static portfolio build.\n\n## The Symmetry Challenge\n\nIntegrating bidirectional text tracks alongside complex 3D perspective background overlays frequently introduces rendering bugs, cumulative layout shifts (CLS), and explicit Next.js client-server hydration mismatch errors.\n\n## RTL Structural Protection\n\nI architected a clean semantic HTML structural layout wrapper deploying localized directional markers (`dir="rtl"`). Font parameters preloaded locally from source buffers isolate layout calculations from external request blockages, while CSS grid systems preserve perfect alignment vectors natively across asymmetric views.\n\n## Shipped System Outcome\n\nThe deployed showcase achieved a 100% Core Web Vitals score on automated auditing suites, guaranteeing perfect alignment vectors and zero layout shift defects.'
  }
};

// Type-safe extraction handler exposing individual content streams cleanly
export const getCaseStudyBySlug = (slug: string): CaseStudyPayload | null => {
  const asset = localDataMap[slug];
  if (!asset) return null;
  
  return {
    slug,
    frontmatter: asset.frontmatter,
    content: asset.content
  };
};

// Handler extracting all valid slug identifiers to safely guide dynamic routing loops
export const getAllCaseStudySlugs = (): string[] => {
  return Object.keys(localDataMap);
};
