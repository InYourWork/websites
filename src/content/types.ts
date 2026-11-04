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
    image: string;
    imageAlt: string;
    caption: string;
    note: string;
  };
  manifesto: {
    eyebrow: string;
    title: string;
    description: string;
  };
  collections: {
    eyebrow: string;
    title: string;
    pageTitle: string;
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
      highlights: Array<string>;
    }>;
  };
  story: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    link: string;
    paragraphs: Array<string>;
    values: Array<{
      title: string;
      description: string;
    }>;
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
    viewCollection: string;
    collectionLabel: string;
    highlights: string;
    skip: string;
    backTop: string;
    navigation: string;
    categories: string;
    language: string;
    home: string;
    allCollections: string;
    backCollections: string;
    notFound: string;
    collectionIntro: string;
  };
  meta: {
    title: string;
    description: string;
  };
}
export type Collection = SiteContent["collections"]["items"][number];
export interface BusinessConfig {
  email: string | null;
}
