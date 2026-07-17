import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "../auth/route";
import { writeContent } from "@/lib/store";

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
    const ok = writeContent();
    if (!ok) {
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }
    const res = NextResponse.json({ ok: true });
    res.headers.set("Cache-Control", "no-store, max-age=0");
    return res;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
