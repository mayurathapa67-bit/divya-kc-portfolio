import type { SiteContent } from "./types";
import { content as fallbackContent } from "./content";
import { readContentOverride } from "./store";

export function getContent(): SiteContent {
  const override = readContentOverride();
  if (Object.keys(override).length === 0) return fallbackContent;
  // Merge override on top of the static fallback (override wins).
  return deepMergeContent(fallbackContent, override);
}

function deepMergeContent(
  base: Record<string, unknown>,
  override: Record<string, unknown>
): SiteContent {
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(override)) {
    const b = out[k];
    if (
      b &&
      typeof b === "object" &&
      !Array.isArray(b) &&
      v &&
      typeof v === "object" &&
      !Array.isArray(v)
    ) {
      out[k] = deepMergeContent(
        b as Record<string, unknown>,
        v as Record<string, unknown>
      );
    } else {
      out[k] = v;
    }
  }
  return out as unknown as SiteContent;
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
