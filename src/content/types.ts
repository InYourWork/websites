export interface Product {
  id: string;
  name: string;
  category: string;
  summary: string;
  image: string;
  imageAlt: string;
  detail: string;
  highlights: string[];
}
export interface SiteContent {
  brand: {
    name: string;
    english: string;
    descriptor: string;
    copyright: string;
  };
  nav: Array<{ label: string; href: string }>;
  hero: {
    eyebrow: string;
    title: string[];
    description: string;
    primary: string;
    secondary: string;
    image: string;
    imageAlt: string;
    caption: string;
  };
  products: {
    eyebrow: string;
    title: string;
    pageTitle: string;
    intro: string;
    allLabel: string;
    categories: Array<{ id: string; label: string }>;
    items: Product[];
  };
  guide: {
    eyebrow: string;
    title: string;
    description: string;
    link: string;
    image: string;
    imageAlt: string;
    paragraphs: string[];
    steps: Array<{ title: string; description: string }>;
  };
  faq: { title: string; items: Array<{ question: string; answer: string }> };
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
    skip: string;
    backTop: string;
    navigation: string;
    categories: string;
    language: string;
    home: string;
    allProducts: string;
    backProducts: string;
    viewProduct: string;
    search: string;
    searchPlaceholder: string;
    results: string;
    resultOne: string;
    empty: string;
    reset: string;
    related: string;
    enquire: string;
    photoNote: string;
  };
  meta: { title: string; description: string };
}
export interface BusinessConfig {
  email: string | null;
}
