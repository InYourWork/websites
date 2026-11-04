export interface SiteContent {
  brand: {
    name: string;
    english: string;
    descriptor: string;
    copyright: string;
  };
  nav: Array<{
    label: string;
    href: string;
  }>;
  hero: {
    eyebrow: string;
    title: Array<string>;
    description: string;
    primary: string;
    secondary: string;
    image: string;
    imageAlt: string;
    caption: string;
    note: string;
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      tags: Array<string>;
    }>;
  };
  work: {
    eyebrow: string;
    title: string;
    intro: string;
    allLabel: string;
    items: Array<{
      id: string;
      name: string;
      category: string;
      summary: string;
      image: string;
      imageAlt: string;
      detail: string;
      deliverables: Array<string>;
    }>;
    pageTitle: string;
  };
  process: {
    eyebrow: string;
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    principles: Array<string>;
  };
  faq: {
    title: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    emailLabel: string;
    placeholder: string;
    note: string;
  };
  ui: {
    menu: string;
    closeMenu: string;
    viewProject: string;
    projectLabel: string;
    closeProject: string;
    deliverables: string;
    skip: string;
    backTop: string;
    navigation: string;
    categories: string;
    language: string;
    home: string;
    allProjects: string;
    backProjects: string;
    notFound: string;
    projectIntro: string;
    languageCurrent: string;
  };
  meta: {
    title: string;
    description: string;
  };
}

export type Project = SiteContent["work"]["items"][number];
export interface BusinessConfig {
  email: string | null;
}
