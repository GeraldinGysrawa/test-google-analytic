export type ProjectItem = {
  id: string;
  role: string;
  title: string;
  stack: string[];
  description: string;
};

export type PortfolioContent = {
  profile: {
    name: string;
    role: string;
    tagline: string;
    location: string;
    age: number;
    school: string;
    photo: string;
    email: string;
    github: string;
    linkedin: string;
  };
  about: {
    eyebrow: string;
    headline: string;
    paragraphs: string[];
  };
  projects: {
    eyebrow: string;
    headline: string;
    items: ProjectItem[];
  };
};

export type ChartDatum = {
  key: string;
  label: string;
  value: number;
};

export type AnalyticsSummary = {
  configured: boolean;
  rangeDays: number;
  totalEvents: number;
  byEvent: ChartDatum[];
  byLabel: ChartDatum[];
  error?: string;
};
