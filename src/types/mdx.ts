export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudyFrontmatter {
  title: string;
  role: string;
  client: string;
  period: string;
  stack: string[];
  metrics: CaseStudyMetric[];
}

export interface CaseStudyPayload {
  slug: string;
  frontmatter: CaseStudyFrontmatter;
  content: string;
}
