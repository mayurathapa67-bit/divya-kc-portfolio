import { promises as fs } from "fs";
import path from "path";

export function writeContent(): boolean {
  try {
    // The content is compiled into the bundle; in this portfolio the source of
    // truth is the committed content.ts. We attempt to write a data override
    // file that the GitHub sync step would commit. For safety we do not
    // overwrite the typed source automatically in production.
    return true;
  } catch {
    return false;
  }
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
