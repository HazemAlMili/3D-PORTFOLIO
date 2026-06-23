/**
 * Content contract for the cinematic 3D portfolio.
 *
 * This file defines data shapes only.
 * It must not contain scene components, runtime logic, animation logic,
 * camera logic, or hardcoded final portfolio content.
 */

export type SceneId =
  | "scene-01-opening"
  | "scene-02-hero"
  | "scene-03-architecture"
  | "scene-04-projects"
  | "scene-05-product-ux"
  | "scene-06-responsive-performance"
  | "scene-07-system-core"
  | "scene-08-contact";

export type ScrollTarget = SceneId;

export type CtaAction = "scrollTo" | "externalLink" | "download" | "email";

export interface CtaLink {
  label: string;
  action: CtaAction;
  target: string;
  ariaLabel?: string;
}

export interface HeroContent {
  name: string;
  role: string;
  valueProposition: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  socialLinks?: {
    github?: string;
    linkedin?: string;
  };
}

export interface ArchitectureLayer {
  id: string;
  label: string;
  description: string;
}

/**
 * Architecture layers must remain ordered:
 * Frontend -> API Layer -> Backend Services -> Database -> Deployment / Infrastructure.
 */
export interface ArchitectureContent {
  headline: string;
  layers: ArchitectureLayer[];
  supportingMessages: string[];
}

export interface ProjectEntry {
  id: string;
  title: string;
  oneLineDescription: string;
  problem: string;
  built: string;
  stack: string[];
  architectureNote: string;
  result: string;
  liveUrl?: string;
  githubUrl?: string;
}

/**
 * Project count rule:
 * The final portfolio content should include 2–4 projects.
 * Runtime/build-time validation will be added in a later task.
 */
export interface ProjectsContent {
  headline: string;
  projects: ProjectEntry[];
}

export interface ProductThinkingContent {
  headline: string;
  principles: string[];
}

export interface ResponsivePerformanceContent {
  headline: string;
  coreMessage: string;
  topics: string[];
}

export interface SystemCoreContent {
  headline: string;
  requiredMessage: string;
  topics: string[];
}

export interface ContactContent {
  headline: string;
  closingLine: string;
  email: string;
  linkedin?: string;
  github?: string;
  cvUrl: string;
}

export interface NavigationItem {
  sceneId: SceneId;
  label: string;
}

export interface NavigationContent {
  quickNavLabels: NavigationItem[];
  skipToProjectsSceneId: "scene-04-projects";
  skipToContactSceneId: "scene-08-contact";
}

export interface PortfolioContentConfig {
  hero: HeroContent;
  architecture: ArchitectureContent;
  projects: ProjectsContent;
  productThinking: ProductThinkingContent;
  responsivePerformance: ResponsivePerformanceContent;
  systemCore: SystemCoreContent;
  contact: ContactContent;
  navigation: NavigationContent;
}
