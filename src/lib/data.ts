import type { SiteContent } from "./types";
import { content as fallbackContent } from "./content";

export function getContent(): SiteContent {
  return fallbackContent;
}

export function getProject(slug: string) {
  return fallbackContent.portfolio.find((p) => p.slug === slug) ?? null;
}

export function getPost(slug: string) {
  return fallbackContent.blog.find((p) => p.slug === slug) ?? null;
}

export function formatDate(date: string): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
