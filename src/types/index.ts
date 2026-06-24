export interface TimelineStory {
  id: string;
  title: string;
  era: string;
  imagePath: string;
  alt: string;
}

export interface SiteContent {
  nav: {
    brandLabel: string;
    menuLabel: string;
  };
  hero: {
    eyebrow: string;
    tagline: string;
  };
  intro: {
    scriptTitle: string;
    heading: string;
    paragraphs: string[];
  };
  timeline: {
    heading: string;
    description: string;
  };
}
