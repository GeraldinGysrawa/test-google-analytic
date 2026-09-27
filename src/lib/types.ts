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

export type ClickEvent = {
  id: string;
  name: string;
  label: string;
  path: string;
  timestamp: string;
};
