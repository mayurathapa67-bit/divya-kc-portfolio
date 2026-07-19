export type NavLink = {
  label: string;
  href: string;
};

export type NavContent = {
  logo: string;
  logoImage: string;
  links: NavLink[];
};

export type HeroContent = {
  title: string;
  role: string;
  tagline: string;
  subtitle: string;
  cta_primary: string;
  cta_secondary: string;
  image: string;
};

export type ExperienceItem = {
  role: string;
  company: string;
  duration: string;
  story: string;
};

export type PersonalContent = {
  hobbies: string[];
  photos: string[];
};

export type AboutContent = {
  headline: string;
  bio: string;
  philosophy: string;
  story: string;
  expertise: string[];
  experience: ExperienceItem[];
  personal: PersonalContent;
  image: string;
};

export type ServiceItem = {
  title: string;
  description: string;
  icon: string;
  price?: string;
  cover?: string;
  deliverables: string[];
};

export type ProjectResults = {
  engagement: string;
  reach: string;
  conversions: string;
};

export type ProjectTestimonial = {
  quote: string;
  name: string;
  role: string;
};

export type PortfolioItem = {
  slug: string;
  title: string;
  category: "Brand Campaigns" | "Digital Marketing" | "Creative Direction" | "Social Media";
  client: string;
  description: string;
  challenge: string;
  strategy: string;
  results: ProjectResults;
  images: string[];
  testimonial: ProjectTestimonial;
  published_date: string;
};

export type BlogItem = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  featured_image: string;
  published_date: string;
  read_time: string;
};

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
};

export type SocialLink = {
  platform: string;
  url: string;
};

export type ContactContent = {
  email: string;
  phone: string;
  location: string;
  socials: SocialLink[];
  availability: string;
};

export type SiteContent = {
  nav: NavContent;
  hero: HeroContent;
  about: AboutContent;
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  blog: BlogItem[];
  testimonials: TestimonialItem[];
  contact: ContactContent;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  createdAt: string;
};
