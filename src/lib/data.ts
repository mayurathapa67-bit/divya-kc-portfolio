import type { SiteContent } from "./types";
import { content as fallbackContent } from "./content";
import { readContentOverride } from "./store";
import * as fsSync from "fs";
import path from "path";

export function getContent(): SiteContent {
  const override = readContentOverride();
  const committed = readCommittedOverride();
  const merged = deepMergeContent(fallbackContent, override);
  if (Object.keys(committed).length > 0) {
    return deepMergeContent(merged, committed);
  }
  if (Object.keys(override).length === 0) return fallbackContent;
  // Merge override on top of the static fallback (override wins).
  return merged;
}

// Reads the GitHub-committed override file (src/lib/content.override.json).
function readCommittedOverride(): Record<string, unknown> {
  try {
    const p = path.join(process.cwd(), "src", "lib", "content.override.json");
    const raw = fsSync.readFileSync(p, "utf-8");
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
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
  return getContent().portfolio.find((p) => p.slug === slug) ?? null;
}

export function getPost(slug: string) {
  return getContent().blog.find((p) => p.slug === slug) ?? null;
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
