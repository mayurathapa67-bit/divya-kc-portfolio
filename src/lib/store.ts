import { promises as fs } from "fs";
import * as fsSync from "fs";
import path from "path";

const CONTENT_OVERRIDE = path.join(process.cwd(), ".data", "content.json");

export function writeContent(content: unknown): boolean {
  try {
    if (!content || typeof content !== "object") return false;
    const existing = readContentOverride();
    const merged = deepMerge(existing, content as Record<string, unknown>);
    void fs.mkdir(path.dirname(CONTENT_OVERRIDE), { recursive: true });
    void fs.writeFile(
      CONTENT_OVERRIDE,
      JSON.stringify(merged, null, 2),
      "utf-8"
    );
    return true;
  } catch {
    return false;
  }
}

export function readContentOverride(): Record<string, unknown> {
  try {
    const raw = fsSync.readFileSync(CONTENT_OVERRIDE, "utf-8");
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function deepMerge(
  base: Record<string, unknown>,
  override: Record<string, unknown>
): Record<string, unknown> {
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
      out[k] = deepMerge(b as Record<string, unknown>, v as Record<string, unknown>);
    } else {
      out[k] = v;
    }
  }
  return out;
}

const SUBMISSIONS_PATH = path.join(process.cwd(), ".data", "submissions.json");

export async function readSubmissions(): Promise<
  Array<{
    id: string;
    name: string;
    email: string;
    projectType: string;
    budget: string;
    message: string;
    createdAt: string;
  }>
> {
  try {
    const raw = await fs.readFile(SUBMISSIONS_PATH, "utf-8");
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

export async function appendSubmission(
  entry: Omit<{ id: string; name: string; email: string; projectType: string; budget: string; message: string; createdAt: string }, "id" | "createdAt"> & { id?: string; createdAt?: string }
): Promise<boolean> {
  try {
    const list = await readSubmissions();
    list.unshift({
      id: entry.id ?? `sub_${Date.now()}`,
      name: entry.name,
      email: entry.email,
      projectType: entry.projectType,
      budget: entry.budget,
      message: entry.message,
      createdAt: entry.createdAt ?? new Date().toISOString(),
    });
    await fs.mkdir(path.dirname(SUBMISSIONS_PATH), { recursive: true });
    await fs.writeFile(SUBMISSIONS_PATH, JSON.stringify(list, null, 2), "utf-8");
    return true;
  } catch {
    return false;
  }
}
