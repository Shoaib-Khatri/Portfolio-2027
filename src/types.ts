export interface CaseStudy {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  tagline: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  highlightWords: string[];
  author: string;
  role: string;
  company: string;
}

export interface MetricItem {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  sparkline?: number[];
}
