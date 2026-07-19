import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "../auth/route";
import { writeContent } from "@/lib/store";
import { commitContentFile, isGitHubConfigured } from "@/lib/github";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { content } = await import("@/lib/content");
  const res = NextResponse.json({ content });
  res.headers.set("Cache-Control", "no-store, max-age=0");
  return res;
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as { content?: unknown };
    if (!body.content) {
      return NextResponse.json({ error: "Missing content" }, { status: 400 });
    }

    // Persist locally too (works in dev / persistent hosting).
    writeContent(body.content);

    // Push a commit to GitHub so the change survives serverless + appears in git history.
    if (isGitHubConfigured()) {
      const ghUsername =
        typeof body.content === "object" &&
        body.content &&
        "hero" in (body.content as Record<string, unknown>) &&
        (body.content as { hero?: { title?: string } }).hero?.title;
      const result = await commitContentFile(
        body.content,
        `Update site content${ghUsername ? ` (${ghUsername})` : ""}`
      );
      if (!result.ok) {
        return NextResponse.json(
          { error: result.error ?? "Failed to commit to GitHub" },
          { status: 500 }
        );
      }
      const res = NextResponse.json({
        ok: true,
        commitUrl: result.commitUrl,
        github: true,
      });
      res.headers.set("Cache-Control", "no-store, max-age=0");
      return res;
    }

    const res = NextResponse.json({ ok: true, github: false });
    res.headers.set("Cache-Control", "no-store, max-age=0");
    return res;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
