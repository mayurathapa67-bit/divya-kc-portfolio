export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export const PORTFOLIO_CATEGORIES = [
  "All Work",
  "Brand Campaigns",
  "Digital Marketing",
  "Creative Direction",
  "Social Media",
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];
